
export const  capitalize = ( string : string, all?: boolean , trim?: true) => {
    let newString = string;

    if (trim) {
        newString = newString.trim();
    }

    if (all) {
       newString = newString.toUpperCase();
    } else {
        newString = newString.split(" ").map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(" ");
    }

    return newString;
}