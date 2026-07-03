export const DEGREE_REGEX =
  /(B\.?Tech|Bachelor of Technology|B\.?E|Bachelor of Engineering|BCA|MCA|M\.?Tech|M\.?E|B\.?Sc|M\.?Sc)/i;

export const YEAR_REGEX =
  /\b(19|20)\d{2}\b/g;

export const COLLEGE_REGEX =
  /EDUCATION\s+(.*?)\s+(?:[A-Za-z]+\s*,\s*[A-Za-z]+)\s+B\.?Tech/i;

export const BRANCH_REGEX =
  /B\.?Tech\s+in\s+([A-Za-z\s&]+?)\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|July|Aug|Sep|Sept|Oct|Nov|Dec)/i;