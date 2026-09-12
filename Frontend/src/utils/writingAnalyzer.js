export const analyzeWriting = (text = "") => {
    const resumeText = text.trim();

    if (!resumeText) {
        return {
            score: 0,
            label: "Not Analyzed",
            actionVerbScore: 0,
            metricsScore: 0,
            readabilityScore: 0,
            passiveVoiceScore: 0,
            weakPhraseCount: 0,
            strengths: [],
            improvements: [],
        };
    }

    // -----------------------------------
    // 1. Action verbs
    // -----------------------------------
    const actionVerbs = [
        "developed",
        "built",
        "created",
        "designed",
        "implemented",
        "develop",
        "build",
        "create",
        "design",
        "implemented",
        "engineered",
        "optimized",
        "improved",
        "integrated",
        "automated",
        "deployed",
        "managed",
        "led",
        "delivered",
        "tested",
        "debugged",
        "configured",
        "developing",
        "building",
        "designed",
    ];

    const lowerText = resumeText.toLowerCase();

    const actionVerbMatches = actionVerbs.filter((verb) =>
        new RegExp(`\\b${verb}\\b`, "i").test(lowerText)
    );

    const actionVerbScore = Math.min(
        Math.round(
            (actionVerbMatches.length / 5) * 100
        ),
        100
    );


    // -----------------------------------
    // 2. Quantifiable achievements
    // -----------------------------------
    const metricMatches =
        resumeText.match(
            /\b\d+(\.\d+)?\s*(%|\+|users|clients|projects|months|years|members|items|features|pages|components)\b/gi
        ) || [];

    const metricsScore = Math.min(
        Math.round(
            (metricMatches.length / 3) * 100
        ),
        100
    );


    // -----------------------------------
    // 3. Readability
    // -----------------------------------
    const sentences = resumeText
        .split(/[.!?]+/)
        .map((sentence) => sentence.trim())
        .filter(Boolean);

    const words = resumeText
        .split(/\s+/)
        .filter(Boolean);

    const averageSentenceLength =
        sentences.length > 0
            ? words.length / sentences.length
            : words.length;

    let readabilityScore = 100;

    if (averageSentenceLength > 30) {
        readabilityScore = 60;
    } else if (averageSentenceLength > 25) {
        readabilityScore = 70;
    } else if (averageSentenceLength > 20) {
        readabilityScore = 80;
    } else if (averageSentenceLength > 15) {
        readabilityScore = 90;
    }


    // -----------------------------------
    // 4. Passive voice detection
    // -----------------------------------
    const passiveMatches =
        lowerText.match(
            /\b(was|were|is|are|been|being)\s+\w+(ed|en)\b/gi
        ) || [];

    const passiveCount = passiveMatches.length;

    let passiveVoiceScore = 100;

    if (passiveCount >= 4) {
        passiveVoiceScore = 40;
    } else if (passiveCount === 3) {
        passiveVoiceScore = 60;
    } else if (passiveCount === 2) {
        passiveVoiceScore = 75;
    } else if (passiveCount === 1) {
        passiveVoiceScore = 90;
    }


    // -----------------------------------
    // 5. Weak phrases
    // -----------------------------------
    const weakPhrases = [
        "responsible for",
        "worked on",
        "helped with",
        "involved in",
        "good knowledge",
        "hardworking",
        "team player",
        "quick learner",
        "passionate about",
        "looking for an opportunity",
    ];

    const weakPhraseMatches = weakPhrases.filter(
        (phrase) => lowerText.includes(phrase)
    );

    const weakPhraseCount =
        weakPhraseMatches.length;


    // -----------------------------------
    // 6. Final writing score
    // -----------------------------------
    let score = Math.round(
        actionVerbScore * 0.30 +
        metricsScore * 0.25 +
        readabilityScore * 0.20 +
        passiveVoiceScore * 0.15 +
        (weakPhraseCount === 0 ? 100 : 60) * 0.10
    );

    score = Math.max(0, Math.min(score, 100));


    // -----------------------------------
    // 7. Score label
    // -----------------------------------
    let label;

    if (score >= 85) {
        label = "Excellent";
    } else if (score >= 70) {
        label = "Good";
    } else if (score >= 50) {
        label = "Needs Improvement";
    } else {
        label = "Weak";
    }


    // -----------------------------------
    // 8. Strengths
    // -----------------------------------
    const strengths = [];

    if (actionVerbScore >= 70) {
        strengths.push(
            "Strong use of action-oriented verbs."
        );
    }

    if (metricsScore >= 70) {
        strengths.push(
            "Good use of measurable achievements."
        );
    }

    if (readabilityScore >= 80) {
        strengths.push(
            "Resume content is reasonably easy to read."
        );
    }

    if (passiveVoiceScore >= 90) {
        strengths.push(
            "Very limited use of passive language."
        );
    }

    if (weakPhraseCount === 0) {
        strengths.push(
            "No common weak resume phrases detected."
        );
    }


    // -----------------------------------
    // 9. Improvements
    // -----------------------------------
    const improvements = [];

    if (actionVerbScore < 70) {
        improvements.push(
            "Use stronger action verbs such as developed, implemented, optimized, and deployed."
        );
    }

    if (metricsScore < 70) {
        improvements.push(
            "Add measurable results using numbers, percentages, users, or performance improvements."
        );
    }

    if (readabilityScore < 80) {
        improvements.push(
            "Break long sentences into shorter, clearer bullet points."
        );
    }

    if (passiveVoiceScore < 90) {
        improvements.push(
            "Reduce passive voice and start bullet points with strong action verbs."
        );
    }

    if (weakPhraseCount > 0) {
        improvements.push(
            `Replace weak phrases such as "${weakPhraseMatches.join(
                '", "'
            )}" with specific achievements.`
        );
    }


    return {
        score,
        label,
        actionVerbScore,
        metricsScore,
        readabilityScore,
        passiveVoiceScore,
        weakPhraseCount,
        strengths,
        improvements,
    };
};