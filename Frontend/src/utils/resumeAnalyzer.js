import { extractContact } from "./parser/contactExtractor";
import { extractSkills } from "./parser/skillExtractor";
import { extractEducation } from "./parser/educationExtractor";
import { extractExperience } from "./parser/experienceExtractor";
import { extractProjects } from "./parser/projectExtractor";
import { calculateATSScore } from "../ats/atsScore";
import { recommendJobs } from "./jobRecommendation";

export const analyzeResume = (text) => {

    const { email, phone, linkedin, github } = extractContact(text);

    const skills = extractSkills(text);

    const education = extractEducation(text);

    const experience = extractExperience(text);

    const projects = extractProjects(text);

    const certifications = [];

    const resumeData = {
        email,
        phone,
        linkedin,
        github,

        skills,

        education,

        experience,

        projects,

        certifications,
    };

    const atsScore = calculateATSScore(resumeData);

    const recommendedJobs = recommendJobs(resumeData);

    return {
        ...resumeData,

        atsScore,

        suggestions: [],

        recommendedJobs,
    };
};