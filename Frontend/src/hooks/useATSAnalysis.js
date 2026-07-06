import { analyzeKeywords } from "../services/keywordEngine";
import { calculateATSScore } from "../services/scoringEngine";

export const useATSAnalysis = (resumeText, jobDescription) => {
  const keywordResult = analyzeKeywords(resumeText, jobDescription);

  // dummy scores (abhi basic rakhenge)
  const atsScore = calculateATSScore({
    matchScore: keywordResult.matchScore,
    skillsScore: 75,
    experienceScore: 70,
    structureScore: 80,
    readabilityScore: 72,
    hasQuantifiedAchievements: false,
  });

  return {
    atsScore,
    matchedKeywords: keywordResult.matched,
    missingKeywords: keywordResult.missing,
    matchScore: keywordResult.matchScore,
  };
};