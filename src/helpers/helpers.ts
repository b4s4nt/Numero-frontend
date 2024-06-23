export function capFirst(word: string) {
    let capitalised = "";
    if (word) {
        const firstLetter = word.charAt(0);
        const firstLetterCap = firstLetter.toUpperCase();
        const remainingLetters = word.slice(1);
        capitalised = firstLetterCap + remainingLetters;
    }
    return capitalised;
}

export function camelize(str: string) {
    var words = str.replace(/[-_\s]+(.)?/g, function (match, chr) {
        return chr ? chr.toUpperCase() : "";
    });
    return words.charAt(0).toLowerCase() + words.slice(1);
}

export function revertCamelCase(str: string) {
    // Split the string into an array of words
    const words = str.split(/(?=[A-Z])/);

    // Convert the words to lowercase
    const lowerCaseWords = words.map((word) => word.toLowerCase());

    // Join the words back together and return the result
    return lowerCaseWords.join(" ");
}

export function generatePassword(length: number, type: "simple" | "complex" = "simple") {
    const characters =
        type === "simple"
            ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
            : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$&+,:;=?@#|'<>.^*()%!-";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
}

export function allFieldsHaveValues(array: any[]) {
    return array.every((object: any) => {
        return Object.values(object).every((value) => value);
    });
}

// capitalize first letter each word of a string
export function capFirstLetterOfEachWord(str: string) {
    return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}
