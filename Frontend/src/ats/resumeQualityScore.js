export const calculateATSScore = (resume) => {
    // =========================================
    // Basic Resume Data
    // =========================================
    const skillsCount = resume.skills?.length || 0;
    const projectsCount = resume.projects?.length || 0;
    const certificationsCount = resume.certifications?.length || 0;

    const experience = resume.experience;

    // =========================================
    // 1. Contact Information
    // Maximum: 100
    // =========================================
    let contactScore = 0;

    if (resume.email) contactScore += 25;
    if (resume.phone) contactScore += 20;
    if (resume.linkedin) contactScore += 30;
    if (resume.github) contactScore += 25;

    // =========================================
    // 2. Skills Match
    // Maximum: 100
    // =========================================
    let skillsMatch = 0;

    if (skillsCount >= 12) skillsMatch = 100;
    else if (skillsCount >= 10) skillsMatch = 90;
    else if (skillsCount >= 8) skillsMatch = 80;
    else if (skillsCount >= 6) skillsMatch = 65;
    else if (skillsCount >= 4) skillsMatch = 50;
    else if (skillsCount > 0) skillsMatch = 30;

    // =========================================
    // 3. Experience Fit
    // Maximum: 100
    // =========================================
    let experienceFit = 0;

    if (Array.isArray(experience)) {
        if (experience.length >= 2) {
            experienceFit = 100;
        } else if (experience.length === 1) {
            experienceFit = 80;
        }
    } else if (experience) {
        if (experience.jobTitle) experienceFit += 30;
        if (experience.company) experienceFit += 20;
        if (experience.startDate) experienceFit += 15;

        if (experience.responsibilities?.length >= 3) {
            experienceFit += 35;
        }
    }

    experienceFit = Math.min(experienceFit, 100);

    // =========================================
    // 4. Resume Structure
    // Maximum: 100
    // =========================================
    let resumeStructure = 0;

    if (resume.email || resume.phone) resumeStructure += 20;
    if (skillsCount > 0) resumeStructure += 20;
    if (projectsCount > 0) resumeStructure += 20;
    if (resume.education?.degree) resumeStructure += 20;
    if (experience) resumeStructure += 20;

    // =========================================
    // 5. Readability / Content Quality
    // Maximum: 100
    // =========================================
    let readability = 0;

    const experienceText = Array.isArray(experience)
        ? experience
            .map((item) => item.responsibilities?.join(" ") || "")
            .join(" ")
        : experience?.responsibilities?.join(" ") || "";

    const projectText = Array.isArray(resume.projects)
        ? resume.projects
            .map(
                (project) =>
                    `${project.title || ""} ${project.description || ""}`
            )
            .join(" ")
        : "";

    const resumeText = `${experienceText} ${projectText}`.trim();

    // Description length
    if (resumeText.length >= 500) {
        readability += 40;
    } else if (resumeText.length >= 300) {
        readability += 30;
    } else if (resumeText.length >= 150) {
        readability += 20;
    } else if (resumeText.length > 0) {
        readability += 10;
    }

    // Quantified achievements
    if (
        /\d+%|\d+\+|\d+\s*(users|projects|months|years|clients|members)/i.test(
            resumeText
        )
    ) {
        readability += 25;
    }

    // Certifications
    if (certificationsCount > 0) {
        readability += 15;
    }

    // Professional profiles
    if (resume.github || resume.linkedin) {
        readability += 20;
    }

    readability = Math.min(readability, 100);

    // =========================================
    // 6. Keyword Match
    // =========================================
    // At this stage we use the detected skill coverage.
    // Job-specific keyword matching will be improved
    // later in the Job Matching Engine.
    const keywordMatch = Math.min(
        Math.round(
            skillsMatch * 0.7 +
            resumeStructure * 0.3
        ),
        100
    );

    // =========================================
    // Final ATS Score
    // =========================================
    // Weighted score
    let rawScore =
        contactScore * 0.10 +
        skillsMatch * 0.25 +
        experienceFit * 0.15 +
        resumeStructure * 0.20 +
        readability * 0.10 +
        keywordMatch * 0.20;

    // =========================================
    // Realistic ATS Cap
    // Maximum possible score = 92
    // =========================================
    const finalScore = Math.min(
        Math.round(rawScore),
        92
    );

    return {
        atsScore: finalScore,

        breakdown: {
            keywordMatch,
            skillsMatch,
            experienceFit,
            resumeStructure,
            readability,

            // Keep these values too so existing
            // components don't break.
            contact: contactScore,
            skills: skillsMatch,
            projects: projectsCount,
            experience: experienceFit,
            education: resume.education?.degree ? 100 : 0,
            certifications: certificationsCount > 0 ? 100 : 0,
            completeness: resumeStructure,
            quality: readability,
        },
    };
};