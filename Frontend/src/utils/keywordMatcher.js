import { normalizeSkill } from "../ats/skillNormalizer";

export const keywordMatcher = (resumeText, jobDescription) => {
  const normalize = (text = "") =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9+#.\s-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const stopWords = new Set([
    "the",
    "and",
    "for",
    "with",
    "using",
    "use",
    "from",
    "this",
    "that",
    "are",
    "was",
    "were",
    "will",
    "into",
    "your",
    "their",
    "have",
    "has",
    "had",
    "our",
    "you",
    "job",
    "work",
    "working",
    "develop",
    "developed",
    "development",
    "build",
    "built",
    "create",
    "created",
    "design",
    "designed",
    "ensure",
    "ensuring",
    "modern",
    "based",
    "required",
    "responsible",
    "responsibilities",
  ]);

  // Resume keywords
  const resumeWords = normalize(resumeText)
    .split(/\s+/)
    .map((word) => normalizeSkill(word))
    .filter(
      (word) => word.length >= 3 && !stopWords.has(word)
    );

  // Job keywords
  const jobWords = normalize(jobDescription)
    .split(/\s+/)
    .map((word) => normalizeSkill(word))
    .filter(
      (word) => word.length >= 3 && !stopWords.has(word)
    );

  // Remove duplicates
  const resumeSet = new Set(resumeWords);
  const uniqueJobWords = [...new Set(jobWords)];

  // Matching keywords
  const foundKeywords = uniqueJobWords.filter((word) =>
    resumeSet.has(word)
  );

  // Missing keywords
  const missingKeywords = uniqueJobWords.filter(
    (word) => !resumeSet.has(word)
  );

  // Keyword Match Percentage
  const matchPercentage =
    uniqueJobWords.length === 0
      ? 0
      : Math.round(
          (foundKeywords.length / uniqueJobWords.length) * 100
        );

  return {
    matchPercentage,
    foundKeywords,
    missingKeywords,
  };
};