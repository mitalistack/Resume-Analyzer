export const generateSuggestions = (resume = {}) => {
    const suggestions = [];

    const skills = resume.skills || [];
    const projects = resume.projects || [];
    const certifications = resume.certifications || [];
    const experience = resume.experience;

    // -----------------------------------
    // Contact information
    // -----------------------------------
    if (!resume.email) {
        suggestions.push({
            type: "critical",
            title: "Add your email address",
            description:
                "Make sure recruiters can contact you directly through your resume.",
        });
    }

    if (!resume.phone) {
        suggestions.push({
            type: "critical",
            title: "Add your phone number",
            description:
                "A professional phone number improves resume completeness.",
        });
    }

    if (!resume.linkedin) {
        suggestions.push({
            type: "warning",
            title: "Add your LinkedIn profile",
            description:
                "A LinkedIn profile gives recruiters another way to verify your professional profile.",
        });
    }

    if (!resume.github) {
        suggestions.push({
            type: "warning",
            title: "Add your GitHub profile",
            description:
                "For technical roles, GitHub helps recruiters evaluate your projects and coding work.",
        });
    }


    // -----------------------------------
    // Technical skills
    // -----------------------------------
    if (skills.length < 5) {
        suggestions.push({
            type: "warning",
            title: "Add more technical skills",
            description:
                "Include relevant technologies that match the jobs you are targeting.",
        });
    } else if (skills.length < 8) {
        suggestions.push({
            type: "improvement",
            title: "Strengthen your skills section",
            description:
                "Consider adding a few more job-relevant technical skills.",
        });
    } else {
        suggestions.push({
            type: "success",
            title: "Good technical skill coverage",
            description:
                "Your resume contains a solid number of technical skills.",
        });
    }


    // -----------------------------------
    // Projects
    // -----------------------------------
    if (projects.length === 0) {
        suggestions.push({
            type: "critical",
            title: "Add projects",
            description:
                "Projects demonstrate practical experience and are especially important for entry-level roles.",
        });
    } else if (projects.length < 2) {
        suggestions.push({
            type: "warning",
            title: "Add another strong project",
            description:
                "Include at least two relevant projects with technologies and measurable results.",
        });
    } else {
        suggestions.push({
            type: "success",
            title: "Good project experience",
            description:
                "Your resume includes multiple projects that can demonstrate practical skills.",
        });
    }


    // -----------------------------------
    // Certifications
    // -----------------------------------
    if (certifications.length === 0) {
        suggestions.push({
            type: "improvement",
            title: "Consider adding certifications",
            description:
                "Relevant certifications can strengthen your profile, especially when you have limited work experience.",
        });
    }


    // -----------------------------------
    // Experience
    // -----------------------------------
    const hasExperience =
        Array.isArray(experience)
            ? experience.length > 0
            : Boolean(experience?.jobTitle);

    if (!hasExperience) {
        suggestions.push({
            type: "warning",
            title: "Add internship or work experience",
            description:
                "Include internships, freelance work, or relevant professional experience whenever available.",
        });
    } else {
        suggestions.push({
            type: "success",
            title: "Experience section detected",
            description:
                "Your resume includes professional experience that can support your job applications.",
        });
    }


    // -----------------------------------
    // Resume summary / objective
    // -----------------------------------
    const resumeText = resume.rawText || "";

    const hasSummary =
        /\b(summary|profile|objective|about me)\b/i.test(
            resumeText
        );

    if (!hasSummary) {
        suggestions.push({
            type: "improvement",
            title: "Add a professional summary",
            description:
                "A short role-focused summary can quickly communicate your strengths to recruiters.",
        });
    }


    // -----------------------------------
    // Quantifiable achievements
    // -----------------------------------
    const hasMetrics =
        /\b\d+(\.\d+)?\s*(%|\+|users|clients|projects|months|years|members|items)\b/i.test(
            resumeText
        );

    if (!hasMetrics) {
        suggestions.push({
            type: "warning",
            title: "Add measurable achievements",
            description:
                "Use numbers wherever possible, such as performance improvements, users, projects, or time saved.",
        });
    } else {
        suggestions.push({
            type: "success",
            title: "Good use of measurable results",
            description:
                "Your resume includes measurable information that helps demonstrate impact.",
        });
    }


    // -----------------------------------
    // Limit suggestions
    // -----------------------------------
    return suggestions.slice(0, 8);
};