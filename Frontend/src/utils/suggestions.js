export const generateSuggestions = (resume) => {
  const suggestions = [];

  // Skills
  if (resume.skills.length < 8) {
    suggestions.push(
      "Add more relevant technical skills related to your target job."
    );
  }

  // Projects
  if (resume.projects.length < 2) {
    suggestions.push(
      "Include at least 2 strong projects with technologies used and achievements."
    );
  }

  // Experience
  if (resume.experience.length === 0) {
    suggestions.push(
      "Add internship, freelance, or practical experience if available."
    );
  }

  // Education
  if (resume.education.length === 0) {
    suggestions.push(
      "Education details are missing."
    );
  }

  // Contact
  if (!resume.email) {
    suggestions.push("Add your email address.");
  }

  if (!resume.phone) {
    suggestions.push("Add your phone number.");
  }

  if (!resume.linkedin) {
    suggestions.push("Add your LinkedIn profile.");
  }

  if (!resume.github) {
    suggestions.push("Add your GitHub profile.");
  }

  // Resume Length
  const words = JSON.stringify(resume).split(" ").length;

  if (words < 250) {
    suggestions.push(
      "Resume is too short. Aim for 300–600 words."
    );
  }

  if (suggestions.length === 0) {
    suggestions.push(
      "Excellent! Your resume follows most ATS best practices."
    );
  }

  return suggestions;
};