const skillAliases = {
    
  "react.js": "react",
  "reactjs": "react",

  "node.js": "node",
  "nodejs": "node",

  "express.js": "express",
  "expressjs": "express",

  "javascript": "javascript",
  "js": "javascript",

  "typescript": "typescript",
  "ts": "typescript",

  "html5": "html",
  "css3": "css",

  "tailwindcss": "tailwind css",
  "tailwind": "tailwind css",

  "mongodb": "mongodb",
  "mongo": "mongodb",

  "restful api": "rest api",
  "restful": "rest api",

  "gitlab": "git",
};

export const normalizeSkill = (skill = "") => {
  const cleanedSkill = skill
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");

  return skillAliases[cleanedSkill] || cleanedSkill;
};