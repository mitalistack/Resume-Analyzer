export const extractCertifications = (text) => {
  if (!text) return [];

  // Certification section nikalo
  const match = text.match(
    /CERTIFICATIONS?([\s\S]*?)(ACHIEVEMENTS|PROJECTS|SKILLS|EXPERIENCE|EDUCATION|$)/i
  );

  if (!match) return [];

  const certificationText = match[1];

  // Lines me tod do
  const lines = certificationText
    .split(/\n|•|-/)
    .map((line) => line.trim())
    .filter(Boolean);

  // Duplicate remove
  return [...new Set(lines)];
};