import { extractSection } from "./sectionExtractor";

export const extractProjects = (text) => {

    const projectSection = extractSection(
        text,
        "PROJECTS",
        "TECHNICAL SKILLS"
    );

    if (!projectSection) {
        return [];
    }

    const lines = projectSection
        .split("  ")
        .map(line => line.trim())
        .filter(Boolean);

    const projects = [];

    let currentProject = null;

    for (const line of lines) {

        // Skip unwanted lines
        if (
            line === "PROJECTS" ||
            line === "–" ||
            line === "•"
        ) {
            continue;
        }

        // Project Title
        if (
            !line.includes("[GitHub]") &&
            !/^\d{4}$/.test(line) &&
            line !== "Full Stack Development" &&
            line !== "Frontend Development" &&
            !line.startsWith("Developed") &&
            !line.startsWith("Built") &&
            !line.startsWith("Designed") &&
            !line.startsWith("Implemented") &&
            !line.startsWith("Integrated") &&
            !line.startsWith("Enhanced")
        ) {

            currentProject = {
                title: line,
                type: "",
                year: "",
                category: "",
                description: [],
            };

            projects.push(currentProject);
            continue;
        }

        if (!currentProject) continue;

        // Project Type
        if (line.includes("[GitHub]")) {
            currentProject.type = line.replace("[GitHub]", "").trim();
            continue;
        }

        // Year
        if (/^\d{4}$/.test(line)) {
            currentProject.year = line;
            continue;
        }

        // Category
        if (
            line === "Full Stack Development" ||
            line === "Frontend Development"
        ) {
            currentProject.category = line;
            continue;
        }

        // Description
        currentProject.description.push(line);
    }

    return projects;
};