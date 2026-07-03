import { extractContact } from "./parser/contactExtractor";

export const analyzeResume = (text) => {

    const resume = text.toLowerCase();

    const { email, phone, linkedin, github } = extractContact(text);

    const skillDatabase = [
        "React",
        "JavaScript",
        "TypeScript",
        "HTML",
        "CSS",
        "Tailwind CSS",
        "Bootstrap",
        "Node.js",
        "Express.js",
        "MongoDB",
        "MySQL",
        "Java",
        "Python",
        "C",
        "C++",
        "Git",
        "GitHub",
        "Redux",
        "REST API",
        "Firebase",
        "Vite",
        "Next.js"
    ];

    const skills = skillDatabase.filter((skill) =>
        resume.includes(skill.toLowerCase())
    );

    let atsScore = 0;

    // Contact Details
    if (email) atsScore += 10;
    if (phone) atsScore += 10;
    if (linkedin) atsScore += 10;
    if (github) atsScore += 10;

    // Skills
    atsScore += Math.min(skills.length * 5, 30);

    // Maximum Score = 70 (abhi)

    return {
        skills,

        education: "",

        experience: "",

        projects: [],

        certifications: [],

        email,

        phone,

        linkedin,

        github,

        atsScore,

        suggestions: [],

        recommendedJobs: [],
    };

};