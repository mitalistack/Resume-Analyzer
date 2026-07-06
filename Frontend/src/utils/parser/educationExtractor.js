import { extractSection } from "./sectionExtractor";

import {
    DEGREE_REGEX,
    YEAR_REGEX,
    COLLEGE_REGEX,
    BRANCH_REGEX,
} from "./patterns/educationPatterns";

export const extractEducation = (text) => {
    const educationSection = extractSection(
        text,
        "EDUCATION",
        "EXPERIENCE"
    );

    if (!educationSection) {
        return {
            section: "",
            degree: "",
            startYear: "",
            endYear: "",
            college: "",
            branch: "",
        };
    }

    const degreeMatch = educationSection.match(DEGREE_REGEX);

    const yearMatches = educationSection.match(YEAR_REGEX);

    const collegeMatch = educationSection.match(COLLEGE_REGEX);

    const branchMatch = educationSection.match(BRANCH_REGEX);

    return {
        section: educationSection,
        degree: degreeMatch?.[0] || "",
        startYear: yearMatches?.[0] || "",
        endYear: yearMatches?.[1] || "",
        college: collegeMatch?.[1]?.trim() || "",
        branch: branchMatch?.[1]?.trim() || "",
    };
};