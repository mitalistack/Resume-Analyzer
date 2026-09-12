export const calculateATSScore = (resume) => {
  let score = 0;

  // ==========================
  // Contact Information (10)
  // ==========================
  const contactScore =
    (resume.email ? 3 : 0) +
    (resume.phone ? 2 : 0) +
    (resume.linkedin ? 3 : 0) +
    (resume.github ? 2 : 0);

  score += contactScore;

  // ==========================
  // Skills (25)
  // ==========================
  const skillsCount = resume.skills?.length || 0;

  let skillsScore = 0;

  if (skillsCount >= 12) skillsScore = 25;
  else if (skillsCount >= 10) skillsScore = 22;
  else if (skillsCount >= 8) skillsScore = 18;
  else if (skillsCount >= 5) skillsScore = 12;
  else if (skillsCount > 0) skillsScore = 5;

  score += skillsScore;

  // ==========================
  // Projects (20)
  // ==========================
  const projectsCount = resume.projects?.length || 0;

  let projectsScore = 0;

  if (projectsCount >= 3) projectsScore = 20;
  else if (projectsCount === 2) projectsScore = 16;
  else if (projectsCount === 1) projectsScore = 10;

  score += projectsScore;

  // ==========================
  // Experience (15)
  // ==========================
  const experience = resume.experience;

  let experienceScore = 0;

  if (Array.isArray(experience)) {
    if (experience.length >= 2) experienceScore = 15;
    else if (experience.length === 1) experienceScore = 10;
  } else if (experience) {
    if (experience.jobTitle) experienceScore += 4;
    if (experience.company) experienceScore += 3;
    if (experience.startDate) experienceScore += 3;

    if (experience.responsibilities?.length >= 3) {
      experienceScore += 5;
    }
  }

  score += experienceScore;

  // ==========================
  // Education (10)
  // ==========================
  const educationScore =
    (resume.education?.degree ? 3 : 0) +
    (resume.education?.college ? 4 : 0) +
    (resume.education?.branch ? 3 : 0);

  score += educationScore;

  // ==========================
  // Certifications (5)
  // ==========================
  const certificationsScore =
    resume.certifications?.length > 0 ? 5 : 0;

  score += certificationsScore;

  // ==========================
  // Resume Completeness (10)
  // ==========================
  let completenessScore = 0;

  if (resume.email) completenessScore += 2;
  if (skillsCount > 0) completenessScore += 2;
  if (projectsCount > 0) completenessScore += 2;
  if (resume.education?.degree) completenessScore += 2;
  if (experience) completenessScore += 2;

  score += completenessScore;

  // ==========================
  // Quality / Content (5)
  // ==========================
  let qualityScore = 0;

  const experienceText = Array.isArray(experience)
    ? experience
        .map((item) =>
          item.responsibilities?.join(" ") || ""
        )
        .join(" ")
    : experience?.responsibilities?.join(" ") || "";

  const projectText = Array.isArray(resume.projects)
    ? resume.projects
        .map((project) =>
          `${project.title || ""} ${project.description || ""}`
        )
        .join(" ")
    : "";

  const resumeText = `${experienceText} ${projectText}`;

  // Quantified achievements
  if (/\d+%|\d+\+|\d+\s*(users|projects|months|years|clients)/i.test(resumeText)) {
    qualityScore += 2;
  }

  // Sufficient experience/project descriptions
  if (resumeText.length >= 100) {
    qualityScore += 2;
  }

  // Certifications or GitHub/LinkedIn improves profile quality
  if (
    resume.certifications?.length > 0 ||
    resume.github ||
    resume.linkedin
  ) {
    qualityScore += 1;
  }

  score += qualityScore;

  // ==========================
  // Final Score
  // ==========================
  const finalScore = Math.min(Math.round(score), 100);

  return {
    atsScore: finalScore,

    breakdown: {
      contact: contactScore,
      skills: skillsScore,
      projects: projectsScore,
      experience: experienceScore,
      education: educationScore,
      certifications: certificationsScore,
      completeness: completenessScore,
      quality: qualityScore,
    },
  };
};