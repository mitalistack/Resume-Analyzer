import { skillDatabase } from "../../data/skills";

export const extractSkills = (text) => {
    const resume = text.toLowerCase();

    return skillDatabase.filter((skill) => {
        const normalizedSkill = skill.toLowerCase().trim();

        // Escape special regex characters
        const escapedSkill = normalizedSkill.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );

        // Match complete words instead of substrings
        const skillRegex = new RegExp(
            `(?<![a-z0-9])${escapedSkill}(?![a-z0-9])`,
            "i"
        );

        return skillRegex.test(resume);
    });
};