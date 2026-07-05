export const recommendJobs = (resumeData) => {
  const skills = (resumeData.skills || []).map((skill) =>
    skill.toLowerCase()
  );

  const jobs = new Set();

  // Frontend
  if (
    skills.includes("react") ||
    skills.includes("javascript") ||
    skills.includes("html") ||
    skills.includes("css") ||
    skills.includes("tailwind")
  ) {
    jobs.add("Frontend Developer");
    jobs.add("React Developer");
    jobs.add("UI Developer");
  }

  // MERN / Full Stack
  if (
    skills.includes("node") ||
    skills.includes("express") ||
    skills.includes("mongodb")
  ) {
    jobs.add("MERN Stack Developer");
    jobs.add("Full Stack Developer");
    jobs.add("Backend Developer");
  }

  // Java
  if (skills.includes("java")) {
    jobs.add("Java Developer");
    jobs.add("Software Engineer");
  }

  // Python
  if (skills.includes("python")) {
    jobs.add("Python Developer");
  }

  // AI / ML
  if (
    skills.includes("machine learning") ||
    skills.includes("tensorflow") ||
    skills.includes("pandas") ||
    skills.includes("numpy")
  ) {
    jobs.add("Machine Learning Engineer");
    jobs.add("AI Engineer");
    jobs.add("Data Scientist");
  }

  // DevOps
  if (
    skills.includes("docker") ||
    skills.includes("aws") ||
    skills.includes("linux") ||
    skills.includes("git")
  ) {
    jobs.add("DevOps Engineer");
    jobs.add("Cloud Engineer");
  }

  // SQL
  if (skills.includes("sql") || skills.includes("mysql")) {
    jobs.add("Database Developer");
  }

  // If no jobs found
  if (jobs.size === 0) {
    jobs.add("Software Developer Intern");
    jobs.add("Junior Web Developer");
  }

  return [...jobs];
};