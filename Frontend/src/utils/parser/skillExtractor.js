import { skillDatabase } from "../../data/skills";

export const extractSkills = (text) => {
  const resume = text.toLowerCase();

  return skillDatabase.filter((skill) =>
    resume.includes(skill.toLowerCase())
  );
};