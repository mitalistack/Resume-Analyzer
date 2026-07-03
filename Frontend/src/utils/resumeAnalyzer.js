import { extractContact } from "./parser/contactExtractor";
import { extractSkills } from "./parser/skillExtractor";
import { extractEducation } from "./parser/educationExtractor";
import { extractExperience } from "./parser/experienceExtractor";
import { extractProjects } from "./parser/projectExtractor";

export const analyzeResume = (text) => {

    const resume = text.toLowerCase();

    const { email, phone, linkedin, github } = extractContact(text);

    const skills = extractSkills(text);

    const education = extractEducation(text);

    const experience = extractExperience(text);

    const projects = extractProjects(text);

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

        education,

        experience,

        projects,

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