const skillAliases = {
    // React
    "react.js": "react",
    "reactjs": "react",
    "react js": "react",

    // JavaScript
    "javascript": "javascript",
    "js": "javascript",

    // TypeScript
    "typescript": "typescript",
    "ts": "typescript",

    // HTML
    "html5": "html",
    "html": "html",

    // CSS
    "css3": "css",
    "css": "css",

    // Tailwind CSS
    "tailwindcss": "tailwind css",
    "tailwind": "tailwind css",
    "tailwind css": "tailwind css",

    // Bootstrap
    "bootstrap": "bootstrap",

    // Node.js
    "node.js": "node.js",
    "nodejs": "node.js",
    "node js": "node.js",
    "node": "node.js",

    // Express.js
    "express.js": "express.js",
    "expressjs": "express.js",
    "express js": "express.js",
    "express": "express.js",

    // MongoDB
    "mongodb": "mongodb",
    "mongo db": "mongodb",
    "mongo": "mongodb",

    // REST API
    "rest api": "rest api",
    "rest apis": "rest api",
    "restful api": "rest api",
    "restful apis": "rest api",
    "restful": "rest api",

    // Git
    "git": "git",
    "gitlab": "git",

    // GitHub
    "github": "github",

    // Redux
    "redux": "redux",

    // Firebase
    "firebase": "firebase",

    // Next.js
    "next.js": "next.js",
    "nextjs": "next.js",
    "next js": "next.js",

    // Vite
    "vite": "vite",

    // Programming Languages
    "java": "java",
    "python": "python",
    "c": "c",
    "c++": "c++",
    "cpp": "c++",

    // Database
    "mysql": "mysql",
};

export const normalizeSkill = (skill = "") => {
    const cleanedSkill = skill
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");

    return skillAliases[cleanedSkill] || cleanedSkill;
};

export const normalizeSkills = (skills = []) => {
    return [
        ...new Set(
            skills
                .map(normalizeSkill)
                .filter(Boolean)
        ),
    ];
};