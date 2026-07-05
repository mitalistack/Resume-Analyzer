const COMMON_KEYWORDS = [
  "react",
  "javascript",
  "typescript",
  "html",
  "css",
  "tailwind",
  "bootstrap",
  "node",
  "express",
  "mongodb",
  "mysql",
  "sql",
  "git",
  "github",
  "docker",
  "aws",
  "linux",
  "python",
  "java",
  "c++",
  "rest api",
  "redux",
  "next.js",
  "firebase",
  "figma"
];

export const keywordMatcher = (resumeText, jobDescription) => {
  const resume = resumeText.toLowerCase();
  const jd = jobDescription.toLowerCase();

  const jdKeywords = COMMON_KEYWORDS.filter((keyword) =>
    jd.includes(keyword)
  );

  const foundKeywords = [];
  const missingKeywords = [];

  jdKeywords.forEach((keyword) => {
    if (resume.includes(keyword)) {
      foundKeywords.push(keyword);
    } else {
      missingKeywords.push(keyword);
    }
  });

  const matchPercentage =
    jdKeywords.length === 0
      ? 0
      : Math.round((foundKeywords.length / jdKeywords.length) * 100);

  return {
    matchPercentage,
    foundKeywords,
    missingKeywords,
  };
};