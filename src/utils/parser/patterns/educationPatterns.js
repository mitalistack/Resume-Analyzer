export const DEGREE_REGEX =
  /(Bachelor of Technology|B\.?Tech|Bachelor of Engineering|B\.?E|BCA|MCA|M\.?Tech|M\.?E|B\.?Sc|M\.?Sc|BCom|MCom|MBA|Diploma|PhD)/i;

export const YEAR_REGEX =
  /\b(19|20)\d{2}\b/g;

export const COLLEGE_REGEX =
  /(?:EDUCATION\s*)?([A-Z][A-Za-z0-9,&.\-\s]+?(?:University|College|Institute|Institution))/i;

export const BRANCH_REGEX =
  /B\.?Tech\s+in\s+([A-Za-z\s&]+?)\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|July|Aug|Sep|Sept|Oct|Nov|Dec)/i;