import { analyzeKeywords } from "../services/keywordEngine";
import { calculateATSScore } from "../services/scoringEngine";

export const useATSAnalysis = (resumeText = "", jobDescription = "") => {
  const keywordResult = analyzeKeywords(resumeText, jobDescription);

  const atsScore = calculateATSScore({
    keywordMatch: keywordResult.matchScore,
    skillsMatch: 0,
    experienceMatch: 0,
    structureScore: 0,
    readabilityScore: 0,
    hasQuantifiedAchievements: false,
    repetitionPenalty: 0,
  });

  return {
    atsScore,
    matchedKeywords: keywordResult.matched,
    missingKeywords: keywordResult.missing,
    matchScore: keywordResult.matchScore,
  };
};