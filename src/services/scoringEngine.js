import { ATS_WEIGHTS } from "../constants/atsWeights";

/**
 * MAIN ATS SCORING ENGINE
 * Real-world style weighted + penalty based scoring
 */

export const calculateATSScore = ({
  keywordMatch = 0,
  skillsMatch = 0,
  experienceMatch = 0,
  structureScore = 0,
  readabilityScore = 0,
  hasQuantifiedAchievements = false,
  repetitionPenalty = 0,
}) => {
  // 1. Base weighted score
  let score =
    keywordMatch * ATS_WEIGHTS.keyword +
    skillsMatch * ATS_WEIGHTS.skills +
    experienceMatch * ATS_WEIGHTS.experience +
    structureScore * ATS_WEIGHTS.structure +
    readabilityScore * ATS_WEIGHTS.readability;

  // 2. Penalties (REAL ATS BEHAVIOR)
  if (!hasQuantifiedAchievements) {
    score -= 8; // weak resumes penalty
  }

  score -= repetitionPenalty * 2; // repeated phrases penalty

  // 3. Boundaries (IMPORTANT for realism)
  if (score > 92) score = 92; // cap (real ATS never gives 100 easily)
  if (score < 10) score = 10;

  return Math.round(score);
};