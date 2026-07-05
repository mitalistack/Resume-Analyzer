const requiredSkills = [
  "React",
  "JavaScript",
  "HTML",
  "CSS",
  "Node.js",
  "MongoDB",
  "Express",
  "Git",
  "Tailwind",
  "REST API",
];

const importantKeywords = [
  "developer",
  "frontend",
  "backend",
  "full stack",
  "project",
  "api",
  "responsive",
  "database",
  "team",
  "problem solving",
];

export const calculateATS = (resume) => {
  let score = 0;

  // Skills
  let matchedSkills = 0;

  requiredSkills.forEach((skill) => {
    if (
      resume.skills.some(
        (item) =>
          item.toLowerCase() === skill.toLowerCase()
      )
    ) {
      matchedSkills++;
    }
  });

  score += (matchedSkills / requiredSkills.length) * 30;

  // Education
  if (resume.education.length > 0) {
    score += 10;
  }

  // Projects
  if (resume.projects.length >= 2) {
    score += 15;
  } else if (resume.projects.length === 1) {
    score += 8;
  }

  // Experience
  if (resume.experience.length > 0) {
    score += 15;
  }

  // Keywords
  let keywordCount = 0;

  importantKeywords.forEach((word) => {
    const resumeText = JSON.stringify(resume).toLowerCase();

    if (resumeText.includes(word.toLowerCase())) {
      keywordCount++;
    }
  });

  score += (keywordCount / importantKeywords.length) * 15;

  // Contact
  if (
    resume.email &&
    resume.phone &&
    resume.name
  ) {
    score += 5;
  }

  // Resume Length
  const totalWords = JSON.stringify(resume).split(" ").length;

  if (totalWords >= 300) {
    score += 5;
  } else if (totalWords >= 200) {
    score += 3;
  }

  // Formatting
  score += 5;

  return Math.round(score);
};