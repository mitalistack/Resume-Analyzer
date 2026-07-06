const ACTION_VERBS = [
    "developed",
    "designed",
    "implemented",
    "built",
    "created",
    "optimized",
    "integrated",
    "managed",
    "engineered",
    "deployed",
    "automated",
    "collaborated",
    "improved",
    "led",
    "delivered",
];

const WEAK_VERBS = [
    "worked",
    "helped",
    "responsible",
    "assisted",
    "participated",
    "involved",
];

const GENERIC_PHRASES = [
    "highly motivated",
    "results driven",
    "dynamic professional",
    "passionate",
    "hardworking",
    "team player",
    "quick learner",
    "self motivated",
    "detail oriented",
];

export const analyzeWriting = (text) => {
    const resume = text.toLowerCase();

    // Action Verbs
    const actionVerbs = ACTION_VERBS.filter((word) =>
        resume.includes(word)
    );

    // Weak Verbs
    const weakVerbs = WEAK_VERBS.filter((word) =>
        resume.includes(word)
    );

    // Generic AI Style Phrases
    const genericPhrases = GENERIC_PHRASES.filter((phrase) =>
        resume.includes(phrase)
    );

    // Numbers / Achievements
    const achievementMatches =
        resume.match(
            /\b\d+%|\b\d+\+|\b\d+\s?(users?|clients?|projects?|apis?|features?|days?|months?|years?)\b/gi
        ) || [];

    // Writing Score
    let score = 100;

    score -= weakVerbs.length * 5;
    score -= genericPhrases.length * 5;

    if (actionVerbs.length < 5) score -= 10;

    if (achievementMatches.length < 3) score -= 15;

    score = Math.max(score, 0);

    const suggestions = [];

    if (actionVerbs.length < 5) {
        suggestions.push("Use more strong action verbs like Developed, Built, Implemented.");
    }

    if (weakVerbs.length > 0) {
        suggestions.push("Replace weak verbs such as 'worked' or 'helped' with stronger action verbs.");
    }

    if (genericPhrases.length > 0) {
        suggestions.push("Avoid generic phrases and use measurable accomplishments instead.");
    }

    if (achievementMatches.length < 3) {
        suggestions.push("Add more quantified achievements using numbers or percentages.");
    }

    return {
        writingScore: score,
        actionVerbs,
        weakVerbs,
        genericPhrases,
        achievements: achievementMatches,
        suggestions,
    };
};