import { extractContact } from "./parser/contactExtractor";
import { extractSkills } from "./parser/skillExtractor";
import { extractEducation } from "./parser/educationExtractor";
import { extractExperience } from "./parser/experienceExtractor";
import { extractProjects } from "./parser/projectExtractor";
import { calculateATSScore as calculateResumeQualityScore } from "../ats/resumeQualityScore";
import { matchJobs } from "../ats/jobMatcher";
import { extractCertifications } from "./parser/certificationExtractor";
import { analyzeWriting } from "./writingAnalyzer";

export const analyzeResume = (text) => {

    const { email, phone, linkedin, github } = extractContact(text);

    const skills = extractSkills(text);

    const education = extractEducation(text);

    const experience = extractExperience(text);

    const projects = extractProjects(text);

    const certifications = extractCertifications(text);

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

    const writingAnalysis = analyzeWriting(text);

    const resumeQualityResult = calculateResumeQualityScore(resumeData);

    const suggestions = [];

    if (!email) {
        suggestions.push("Add your email address.");
    }

    if (!phone) {
        suggestions.push("Add your phone number.");
    }

    if (!linkedin) {
        suggestions.push("Add your LinkedIn profile.");
    }

    if (!github) {
        suggestions.push("Add your GitHub profile.");
    }

    if (skills.length < 8) {
        suggestions.push("Add more relevant technical skills.");
    }

    if (projects.length < 2) {
        suggestions.push("Include at least 2 strong projects.");
    }

    if (certifications.length === 0) {
        suggestions.push("Add relevant certifications.");
    }

    if (!experience?.jobTitle) {
        suggestions.push("Include internships or work experience if available.");
    }

    const recommendedJobs = matchJobs(resumeData);

    return {
        ...resumeData,

        rawText: text,

        resumeQualityScore: resumeQualityResult.atsScore,
        resumeQualityBreakdown: resumeQualityResult.breakdown,

        suggestions,

        writingAnalysis,

        recommendedJobs,
    };
};