export const calculateATSScore = (resume) => {

    let score = 0;

    // Contact (15)
    if (resume.email) score += 5;
    if (resume.phone) score += 5;
    if (resume.linkedin || resume.github) score += 5;

    // Skills (25)
    score += Math.min(resume.skills.length * 2, 25);

    // Education (15)
    if (resume.education?.degree) score += 5;
    if (resume.education?.college) score += 5;
    if (resume.education?.branch) score += 5;

    // Experience (20)
    if (resume.experience?.jobTitle) score += 5;
    if (resume.experience?.company) score += 5;
    if (resume.experience?.startDate) score += 5;
    if (resume.experience?.responsibilities?.length > 0) score += 5;

    // Projects (15)
    score += Math.min(resume.projects.length * 7.5, 15);

    // Certifications (5)
    if (resume.certifications?.length > 0) score += 5;

    // Extra Profiles (5)
    if (resume.github) score += 2.5;
    if (resume.linkedin) score += 2.5;

    return Math.round(score);
};