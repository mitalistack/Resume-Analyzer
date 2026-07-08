export const extractContact = (text) => {

    const email =
        text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/)?.[0] || "";

    const phone =
        text.match(/(\+91[\s-]?)?[6-9]\d{9}/)?.[0] || "";

    const linkedin =
        text.match(/(https?:\/\/)?(www\.)?linkedin\.com\/[^\s]+/i)?.[0] || "";

    const github =
        text.match(/(https?:\/\/)?(www\.)?github\.com\/[^\s]+/i)?.[0] || "";

    return {
        email,
        phone,
        linkedin,
        github,
    };
};