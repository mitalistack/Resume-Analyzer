export const extractSection = (text, startHeading, endHeading) => {

  const startRegex = new RegExp(
    `(^|\\s{2,})${startHeading}(\\s{2,}|$)`,
    "i"
  );

  const startMatch = text.match(startRegex);

  const startIndex = startMatch ? startMatch.index : -1;

  if (startIndex === -1) {
    return "";
  }

  let endIndex = text.length;

  if (endHeading) {
    
    const endRegex = new RegExp(
      `(^|\\s{2,})${endHeading}(\\s{2,}|$)`,
      "i"
    );

    const remainingText = text.substring(startIndex);

    const endMatch = remainingText.match(endRegex);

    if (endMatch) {
      endIndex = startIndex + endMatch.index;
    }
  }

  return text.substring(startIndex, endIndex).trim();
};