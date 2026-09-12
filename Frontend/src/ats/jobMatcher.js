import jobs from "../data/jobs";
import { normalizeSkills } from "./skillNormalizer";

const getExperienceYears = (experience) => {
    if (!experience) return 0;

    if (Array.isArray(experience)) {
        return experience.length;
    }

    if (experience.jobTitle) {
        return 1;
    }

    return 0;
};

const getMatchLabel = (score) => {
    if (score >= 85) return "High Match";
    if (score >= 70) return "Moderate Match";
    return "Low Match";
};

export const matchJobs = (resumeData) => {
    const resumeSkills = normalizeSkills(resumeData.skills || []);

    const experienceYears = getExperienceYears(
        resumeData.experience
    );

    const resumeText = (
        resumeData.rawText || ""
    ).toLowerCase();

    const matchedJobs = jobs.map((job) => {
        const requiredSkills = normalizeSkills(
            job.skills || []
        );

        // =========================================
        // Skill Matching
        // =========================================
        const matchingSkills = requiredSkills.filter((skill) =>
            resumeSkills.includes(skill)
        );

        const missingSkills = requiredSkills.filter(
            (skill) => !resumeSkills.includes(skill)
        );

        const skillMatchScore =
            requiredSkills.length > 0
                ? Math.round(
                      (matchingSkills.length /
                          requiredSkills.length) *
                          100
                  )
                : 0;

        // =========================================
        // Experience Fit
        // =========================================
        let experienceFitScore = 100;

        if (job.experience > 0) {
            if (experienceYears >= job.experience) {
                experienceFitScore = 100;
            } else if (experienceYears > 0) {
                experienceFitScore = 70;
            } else {
                experienceFitScore = 40;
            }
        }

        // =========================================
        // Role / Keyword Relevance
        // =========================================
        const jobTitleWords = job.title
            .toLowerCase()
            .split(/\s+/)
            .filter((word) => word.length > 2);

        const matchedRoleWords = jobTitleWords.filter((word) =>
            resumeText.includes(word)
        );

        const roleRelevanceScore =
            jobTitleWords.length > 0
                ? Math.round(
                      (matchedRoleWords.length /
                          jobTitleWords.length) *
                          100
                  )
                : 0;

        // =========================================
        // Final Weighted Match
        // =========================================
        const matchScore = Math.min(
            Math.round(
                skillMatchScore * 0.60 +
                experienceFitScore * 0.20 +
                roleRelevanceScore * 0.20
            ),
            100
        );

        return {
            ...job,

            matchScore,

            matchLabel: getMatchLabel(matchScore),

            matchingSkills,
            missingSkills,

            skillMatchScore,
            experienceFitScore,
            roleRelevanceScore,
        };
    });

    return matchedJobs.sort(
        (a, b) => b.matchScore - a.matchScore
    );
};