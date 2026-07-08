export const keywordMatcher = (resumeText, jobDescription) => {
  const normalize = (text) =>
    text.toLowerCase().replace(/[^a-z0-9\s]/g, " ");

  const resumeWords = normalize(resumeText).split(/\s+/);
  const jobWords = normalize(jobDescription).split(/\s+/);

  const resumeSet = new Set(resumeWords);

  let foundKeywords = [];
  let missingKeywords = [];

  jobWords.forEach((word) => {
    if (word.length < 3) return;

    if (resumeSet.has(word)) {
      foundKeywords.push(word);
    } else {
      missingKeywords.push(word);
    }
  });

  const matchPercentage =
    jobWords.length === 0
      ? 0
      : Math.round((foundKeywords.length / jobWords.length) * 100);

  return {
    matchPercentage,
    foundKeywords,
    missingKeywords,
  };
};