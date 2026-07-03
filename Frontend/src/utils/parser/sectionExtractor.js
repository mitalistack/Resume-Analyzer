export const extractSection = (text, startHeading, endHeading) => {
  const upperText = text.toUpperCase();

  const startIndex = upperText.indexOf(startHeading.toUpperCase());

  if (startIndex === -1) {
    return "";
  }

  let endIndex = text.length;

  if (endHeading) {
    const foundEnd = upperText.indexOf(
      endHeading.toUpperCase(),
      startIndex
    );

    if (foundEnd !== -1) {
      endIndex = foundEnd;
    }
  }

  return text.substring(startIndex, endIndex).trim();
};