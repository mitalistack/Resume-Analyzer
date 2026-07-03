import { extractSection } from "./sectionExtractor";
import { DATE_REGEX } from "./patterns/experiencePatterns";

export const extractExperience = (text) => {
    const experienceSection = extractSection(
        text,
        "EXPERIENCE",
        "PROJECTS"
    );

    if (!experienceSection) {
        return null;
    }

    const lines = experienceSection
        .split("  ")
        .map((line) => line.trim())
        .filter((line) => line);

    const jobTitle = lines.find(
        (line) =>
            !line.toUpperCase().includes("EXPERIENCE") &&
            !line.match(DATE_REGEX)
    );

    const companyLine = lines.find((line) => line.includes(","));

    const company = companyLine
        ? companyLine.split(",")[0].trim()
        : "";

    const location = companyLine
        ? companyLine.split(",").slice(1).join(",").trim()
        : "";

    const dateMatch = experienceSection.match(DATE_REGEX);

    const startDate = dateMatch ? dateMatch[0].split("–")[0].trim() : "";

    const endDate = dateMatch
        ? dateMatch[0].split("–")[1]?.trim() || ""
        : "";

    const responsibilities = experienceSection
        .split("•")
        .slice(1)
        .map((item) => item.trim())
        .filter((item) => item);

    return {
        section: experienceSection,

        jobTitle: jobTitle || "",

        company,

        location,

        startDate,

        endDate,

        responsibilities,
    };
};