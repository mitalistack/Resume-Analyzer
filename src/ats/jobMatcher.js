import jobs from "../data/jobs";

export const matchJobs = (resumeData) => {
  const resumeSkills = (resumeData.skills || []).map(skill =>
    skill.toLowerCase().trim()
  );

  const experience = resumeData.experience?.length || 0;

  const matchedJobs = jobs.map((job) => {
    const requiredSkills = job.skills.map(skill =>
      skill.toLowerCase().trim()
    );

    const matchingSkills = requiredSkills.filter(skill =>
      resumeSkills.includes(skill)
    );

    const missingSkills = requiredSkills.filter(skill =>
      !resumeSkills.includes(skill)
    );

    // Skill Match Score
    const skillScore = Math.round(
      (matchingSkills.length / requiredSkills.length) * 100
    );

    // Experience Bonus
    let experienceBonus = 0;

    if (experience >= job.experience) {
      experienceBonus = 10;
    }

    // Final Match Score
    const matchScore = Math.min(skillScore + experienceBonus, 100);

    return {
      ...job,
      matchScore,
      matchingSkills,
      missingSkills
    };
  });

  return matchedJobs.sort((a, b) => b.matchScore - a.matchScore);
};