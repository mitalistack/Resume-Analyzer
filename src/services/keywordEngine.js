export const analyzeKeywords = (resumeText = "", jobDescription = "") => {
  const normalize = (text) =>
    text.toLowerCase().replace(/[^a-z0-9\s]/g, " ");

  const resume = normalize(resumeText);
  const job = normalize(jobDescription);

  const jobKeywords = [...new Set(job.split(" "))].filter(
    (word) => word.length > 3
  );

  const matched = [];
  const missing = [];

  jobKeywords.forEach((kw) => {
    if (resume.includes(kw)) {
      matched.push(kw);
    } else {
      missing.push(kw);
    }
  });

  const matchScore = jobKeywords.length
    ? (matched.length / jobKeywords.length) * 100
    : 0;

  return {
    matchScore: Math.round(matchScore),
    matched,
    missing,
  };
};