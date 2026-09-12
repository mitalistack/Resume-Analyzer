import jobs from "../data/jobs";
import { normalizeSkill } from "./skillNormalizer";

export const matchJobs = (resumeData) => {

  const resumeSkills = (resumeData.skills || []).map((skill) =>
  normalizeSkill(skill)
);

  // Handle experience whether it is an object or array
  let experienceYears = 0;

  if (Array.isArray(resumeData.experience)) {
    experienceYears = resumeData.experience.length;
  } else if (resumeData.experience) {
    experienceYears = 1;
  }

  const matchedJobs = jobs.map((job) => {

    const requiredSkills = job.skills.map((skill) =>
  normalizeSkill(skill)
);

    // Find matching skills
    const matchingSkills = requiredSkills.filter((skill) =>
      resumeSkills.includes(skill)
    );

    // Find missing skills
    const missingSkills = requiredSkills.filter(
      (skill) => !resumeSkills.includes(skill)
    );

    // Skill Match Score
    const skillScore =
      requiredSkills.length > 0
        ? Math.round(
            (matchingSkills.length / requiredSkills.length) * 100
          )
        : 0;

    // Experience Score
    let experienceScore = 0;

    if (experienceYears >= job.experience) {
      experienceScore = 10;
    }

    // Final Match Score
    const matchScore = Math.min(
      skillScore + experienceScore,
      100
    );

    return {
      ...job,
      matchScore,
      matchingSkills,
      missingSkills,
    };
  });

  return matchedJobs.sort(
    (a, b) => b.matchScore - a.matchScore
  );
};