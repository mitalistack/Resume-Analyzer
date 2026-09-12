import { extractContact } from "./parser/contactExtractor";
import { extractSkills } from "./parser/skillExtractor";
import { extractEducation } from "./parser/educationExtractor";
import { extractExperience } from "./parser/experienceExtractor";
import { extractProjects } from "./parser/projectExtractor";
import { calculateATSScore as calculateResumeQualityScore } from "../ats/resumeQualityScore";
import { matchJobs } from "../ats/jobMatcher";
import { extractCertifications } from "./parser/certificationExtractor";
import { analyzeWriting } from "./writingAnalyzer";
import { generateSuggestions } from "./suggestions";

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
        rawText: text
    };
    const writingAnalysis = analyzeWriting(text);

    const resumeQualityResult = calculateResumeQualityScore(resumeData);

    const suggestions = generateSuggestions(resumeData);

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