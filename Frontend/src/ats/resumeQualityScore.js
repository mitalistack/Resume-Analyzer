export const calculateATSScore = (resume) => {
    let score = 0;

    // ==========================
    // Contact Information (10)
    // ==========================
    if (resume.email) score += 3;
    if (resume.phone) score += 2;
    if (resume.linkedin) score += 3;
    if (resume.github) score += 2;

    // ==========================
    // Skills (25)
    // ==========================
    const skillsCount = resume.skills?.length || 0;

    if (skillsCount >= 12) score += 25;
    else if (skillsCount >= 10) score += 22;
    else if (skillsCount >= 8) score += 18;
    else if (skillsCount >= 5) score += 12;
    else score += 5;

    // ==========================
    // Projects (20)
    // ==========================
    const projectsCount = resume.projects?.length || 0;

    if (projectsCount >= 3) score += 20;
    else if (projectsCount === 2) score += 18;
    else if (projectsCount === 1) score += 10;

    // ==========================
    // Experience (20)
    // ==========================
    if (resume.experience?.jobTitle) score += 5;
    if (resume.experience?.company) score += 5;
    if (resume.experience?.startDate) score += 5;

    if (resume.experience?.responsibilities?.length >= 3)
        score += 5;

    // ==========================
    // Education (10)
    // ==========================
    if (resume.education?.degree) score += 3;
    if (resume.education?.college) score += 4;
    if (resume.education?.branch) score += 3;

    // ==========================
    // Certifications (5)
    // ==========================
    if (resume.certifications?.length > 0) score += 5;

    // ==========================
    // Resume Completeness (10)
    // ==========================
    if (
        resume.skills?.length &&
        resume.projects?.length &&
        resume.education?.degree &&
        resume.experience?.jobTitle
    ) {
        score += 10;
    }

    const finalScore = Math.min(Math.round(score), 100);

    return {
        atsScore: finalScore,

        breakdown: {
            contact:
                (resume.email ? 3 : 0) +
                (resume.phone ? 2 : 0) +
                (resume.linkedin ? 3 : 0) +
                (resume.github ? 2 : 0),

            skills:
                skillsCount >= 12
                    ? 25
                    : skillsCount >= 10
                        ? 22
                        : skillsCount >= 8
                            ? 18
                            : skillsCount >= 5
                                ? 12
                                : 5,

            projects:
                projectsCount >= 3
                    ? 20
                    : projectsCount === 2
                        ? 18
                        : projectsCount === 1
                            ? 10
                            : 0,

            experience:
                (resume.experience?.jobTitle ? 5 : 0) +
                (resume.experience?.company ? 5 : 0) +
                (resume.experience?.startDate ? 5 : 0) +
                (resume.experience?.responsibilities?.length >= 3 ? 5 : 0),

            education:
                (resume.education?.degree ? 3 : 0) +
                (resume.education?.college ? 4 : 0) +
                (resume.education?.branch ? 3 : 0),

            certifications:
                resume.certifications?.length > 0 ? 5 : 0,

            completeness:
                resume.skills?.length &&
                    resume.projects?.length &&
                    resume.education?.degree &&
                    resume.experience?.jobTitle
                    ? 10
                    : 0,
        },
    };
};