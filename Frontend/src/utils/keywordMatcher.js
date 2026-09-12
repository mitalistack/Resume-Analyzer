import { normalizeSkill } from "../ats/skillNormalizer";
import { skillDatabase } from "../data/skills";

export const keywordMatcher = (
  resumeText = "",
  jobDescription = ""
) => {

  // -----------------------------------
  // 1. Basic text cleaning
  // -----------------------------------
  const normalizeText = (text = "") =>
    text
      .toLowerCase()
      .replace(/[^\w+#.\s-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const resume = normalizeText(resumeText);
  const job = normalizeText(jobDescription);


  // -----------------------------------
  // 2. Generic ATS stop words
  // -----------------------------------
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
    "these",
    "those",
    "are",
    "was",
    "were",
    "will",
    "would",
    "could",
    "should",
    "your",
    "their",
    "our",
    "you",
    "have",
    "has",
    "had",
    "into",
    "about",
    "over",
    "under",
    "than",
    "then",
    "also",
    "very",
    "more",
    "most",
    "some",
    "such",
    "each",
    "both",
    "other",
    "user",
    "users",
    "computer",
    "science",
    "information",
    "technology",
    "technologies",
    "control",
    "version",
    "interface",
    "interfaces",
    "designer",
    "designers",
    "developer",
    "developers",

    // Hiring / JD generic words
    "job",
    "role",
    "work",
    "working",
    "candidate",
    "candidates",
    "company",
    "position",
    "team",
    "teams",
    "experience",
    "responsible",
    "responsibilities",
    "required",
    "requirements",
    "preferred",
    "ability",
    "abilities",
    "skills",
    "skill",
    "knowledge",
    "understanding",
    "familiarity",
    "strong",
    "good",
    "looking",
    "seeking",
    "join",
    "support",
    "provide",
    "including",
    "within",
    "across",
    "based",
    "modern",

    // Generic action words
    "develop",
    "developed",
    "development",
    "build",
    "built",
    "create",
    "created",
    "creating",
    "design",
    "designed",
    "implement",
    "implemented",
    "ensure",
    "ensuring",
    "deliver",
    "delivered",
    "improve",
    "improved",
    "optimize",
    "optimized",
    "collaborate",
    "collaborated",

    // Generic application words
    "application",
    "applications",
    "project",
    "projects",
    "feature",
    "features",
    "website",
    "web",
    "technology",
    "technologies",
    "developer",
    "developers",
    "frontend",
    "backend",

    // Education / hiring boilerplate
    "freshers",
    "fresher",
    "welcome",
    "apply",
    "applying",
    "bachelor",
    "degree",
    "education",
    "related",
    "field",
    "plus",
  ]);


  // -----------------------------------
  // 3. Normalize skill phrases
  // -----------------------------------
  const normalizePhrase = (phrase) => {
    return normalizeSkill(
      phrase
        .toLowerCase()
        .replace(/[^\w+#.\s-]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
    );
  };


  // -----------------------------------
  // 4. Extract technical skills
  // -----------------------------------
  const extractKnownSkills = (text) => {

    const skillVariations = {
      "rest api": [
        "rest api",
        "rest apis",
        "restful api",
        "restful apis",
        "restful"
      ],

      "react": [
        "react",
        "react.js",
        "reactjs",
        "react js"
      ],

      "node.js": [
        "node.js",
        "nodejs",
        "node js",
        "node"
      ],

      "express.js": [
        "express.js",
        "expressjs",
        "express js",
        "express"
      ],

      "mongodb": [
        "mongodb",
        "mongo db",
        "mongo"
      ],

      "javascript": [
        "javascript",
        "js"
      ],

      "typescript": [
        "typescript",
        "ts"
      ],

      "html": [
        "html",
        "html5"
      ],

      "css": [
        "css",
        "css3"
      ],

      "tailwind css": [
        "tailwind css",
        "tailwindcss",
        "tailwind"
      ],

      "github": [
        "github"
      ],

      "git": [
        "git"
      ]
    };

    const detectedSkills = [];

    skillDatabase.forEach((skill) => {

      const normalizedSkill = normalizePhrase(skill);

      const variations =
        skillVariations[normalizedSkill] || [
          normalizedSkill
        ];

      const found = variations.some((variation) => {

        const escapedVariation = variation.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&"
        );

        const regex = new RegExp(
          `(?<![a-z0-9])${escapedVariation}(?![a-z0-9])`,
          "i"
        );

        return regex.test(text);
      });

      if (found) {
        detectedSkills.push(normalizedSkill);
      }
    });

    return [...new Set(detectedSkills)];
  };;


  const resumeSkills = extractKnownSkills(resume);
  const jobSkills = extractKnownSkills(job);


  // -----------------------------------
  // 5. Match technical skills
  // -----------------------------------
  const foundSkills = jobSkills.filter((skill) =>
    resumeSkills.includes(skill)
  );

  const missingSkills = jobSkills.filter(
    (skill) => !resumeSkills.includes(skill)
  );


  // -----------------------------------
  // 6. Remove skill phrases
  // -----------------------------------
  const removeSkillPhrases = (text, skills) => {

    let cleanedText = text;

    const allSkillPhrases = [
      ...skills,

      // Common variations
      "rest apis",
      "rest api",
      "react js",
      "react.js",
      "node js",
      "node.js",
      "express js",
      "express.js",
      "tailwind css",
      "html5",
      "css3",
    ];

    [
      ...new Set(allSkillPhrases),
    ]
      .sort((a, b) => b.length - a.length)
      .forEach((skill) => {

        const escapedSkill = skill.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&"
        );

        const regex = new RegExp(
          `(?<![a-z0-9])${escapedSkill}(?![a-z0-9])`,
          "gi"
        );

        cleanedText = cleanedText.replace(
          regex,
          " "
        );
      });

    return cleanedText
      .replace(/\s+/g, " ")
      .trim();
  };


  const jobWithoutSkills = removeSkillPhrases(
    job,
    jobSkills
  );

  const resumeWithoutSkills = removeSkillPhrases(
    resume,
    resumeSkills
  );


  // -----------------------------------
  // 7. Meaningful general keywords
  // -----------------------------------
  
   const extractKeywords = (text) => {

    return [
      ...new Set(
        text
          .split(/\s+/)
          .map((word) =>
            word
              .replace(
                /^[^a-z0-9+#]+|[^a-z0-9+#]+$/gi,
                ""
              )
              .toLowerCase()
          )
          .filter(
            (word) =>
              word.length >= 4 &&
              !stopWords.has(word) &&
              !/^\d+$/.test(word)
          )
      ),
    ];
  };

  // -----------------------------------
  // 8. Meaningful phrase keywords
  // -----------------------------------
  const importantPhrases = [
    "user-friendly",
    "reusable components",
    "responsive design",
    "responsive web",
    "user experience",
    "version control",
    "problem solving",
    "problem-solving",
    "performance optimization",
    "cross browser",
    "cross-browser",
    "software development",
    "web applications",
    "frontend development",
    "backend development",
  ];


  const extractImportantPhrases = (text) => {

    return importantPhrases.filter((phrase) =>
      text.includes(phrase)
    );
  };


  const jobPhrases = extractImportantPhrases(job);
  const resumePhrases = extractImportantPhrases(resume);


  // -----------------------------------
  // 9. Match general keywords
  // -----------------------------------
  const foundGeneralKeywords = jobKeywords.filter(
    (keyword) => resumeKeywords.has(keyword)
  );

  const missingGeneralKeywords = jobKeywords.filter(
    (keyword) => !resumeKeywords.has(keyword)
  );


  // -----------------------------------
  // 10. Match important phrases
  // -----------------------------------
  const foundPhrases = jobPhrases.filter(
    (phrase) => resumePhrases.includes(phrase)
  );

  const missingPhrases = jobPhrases.filter(
    (phrase) => !resumePhrases.includes(phrase)
  );


  // -----------------------------------
  // 11. Final keyword lists
  // -----------------------------------
  const foundKeywords = [
    ...new Set([
      ...foundSkills,
      ...foundGeneralKeywords,
      ...foundPhrases,
    ]),
  ];

  const missingKeywords = [
    ...new Set([
      ...missingSkills,
      ...missingGeneralKeywords,
      ...missingPhrases,
    ]),
  ];


  // -----------------------------------
  // 12. Technical skill percentage
  // -----------------------------------
  const skillMatchPercentage =
    jobSkills.length === 0
      ? 0
      : Math.round(
        (foundSkills.length /
          jobSkills.length) *
        100
      );


  // -----------------------------------
  // 13. General keyword percentage
  // -----------------------------------
  const totalGeneralItems =
    jobKeywords.length +
    jobPhrases.length;

  const foundGeneralItems =
    foundGeneralKeywords.length +
    foundPhrases.length;

  const generalKeywordPercentage =
    totalGeneralItems === 0
      ? 0
      : Math.round(
        (foundGeneralItems /
          totalGeneralItems) *
        100
      );


  // -----------------------------------
  // 14. Final ATS score
  // -----------------------------------
  let matchPercentage;

  if (
    jobSkills.length > 0 &&
    totalGeneralItems > 0
  ) {

    matchPercentage = Math.round(
      skillMatchPercentage * 0.70 +
      generalKeywordPercentage * 0.30
    );

  } else if (jobSkills.length > 0) {

    matchPercentage = skillMatchPercentage;

  } else {

    matchPercentage =
      generalKeywordPercentage;
  }


  // -----------------------------------
  // 15. Return analysis
  // -----------------------------------
  return {
    matchPercentage: Math.min(
      matchPercentage,
      100
    ),

    foundKeywords,
    missingKeywords,

    foundSkills,
    missingSkills,

    foundGeneralKeywords,
    missingGeneralKeywords,

    foundPhrases,
    missingPhrases,

    skillMatchPercentage,
    generalKeywordPercentage,
  };
};