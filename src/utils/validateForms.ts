import type { ValidatorFunctionType } from "../types/ValidationInterface";

interface validateForms {
    formType: "login" | "register" | "verifyEmail";
}



export const validateForms =  ( key: string, value: string, required: boolean): {isValid: boolean, message: string } => {
    
    let result = {
        isValid: false,
        message: ""
    }  

    
    if ( required && typeof value === "string" && value?.trim() === "" )  {
        return result = { isValid: false, message: "This field is required" } 
    }
    
    const nameRegex = /^[a-zA-Z\u00C0-\u01FF ]+([-']?[a-zA-Z\u00C0-\u01FF ]+)*$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (key.toLowerCase().includes("name")) {
        const isValid = nameRegex.test(value);
        if (!isValid) {
            result = {isValid: false, message: "Name contains invalid characters or is empty"};
        } else if (isValid) {
            result = {isValid: true, message: "Name is valid"};
        }

    } else if (key.toLowerCase().includes("email")) {
        const isValid = emailRegex.test(value);
        if (!isValid) {
            result = {isValid: false, message: "Email is invalid"};
        } else if (isValid) {
            result = {isValid: true, message: "Email is valid"};
        }

    } else if (key.toLowerCase().includes("password")) {
        
            const isTooShort = value.length < 8;
            const isTooLong = value.length > 20;
            const hasNoUppercase = !/[A-Z]/.test(value);
            const hasNoLowercase = !/[a-z]/.test(value);
            const hasNoNumber = !/[0-9]/.test(value);
            const hasNoSpecialChar = !/[!@#$%^&*()_+\-=[\]{};':",./<>?]/.test(value);

            if (isTooShort) {
                result = {isValid: false, message: "Password must be at least 8 characters long"};
            }else if (isTooLong) {
                result = {isValid: false, message: "Password must be at most 20 characters long"};
            }else if (hasNoUppercase) {
                result = {isValid: false, message: "Password must contain at least one uppercase letter"};
            }else if (hasNoLowercase) {
                result = {isValid: false, message: "Password must contain at least one lowercase letter"};
            }else if (hasNoNumber) {
                result = {isValid: false, message: "Password must contain at least one number"};
            }else if (hasNoSpecialChar) {
                result = {isValid: false, message: "Password must contain at least one special character"};
            } else {
                result = {isValid: true, message: "Password is valid"};
            }

        
    } else if (key.toLowerCase().includes("description")) {
        if (typeof value === "string") {
            const count = value.length || 0;
            const isValid = count >= 30;
            if (!isValid) {
                result = {isValid: false, message: "Description must be at least 30 characters long"};
            } else if (isValid) {
                result = {isValid: true, message: "Description is valid"};
            }
        } else {
            result = {isValid: false, message: "Description must be a string"};
        }
    }

    return result;
   
}


export const numberValidator: ValidatorFunctionType = ( value: string) => {
   const priceRegex = /^[0-9]+(\.[0-9]+)?$/;

    const isFormatValid = priceRegex.test(value);

    const isPositive = parseFloat(value) > 0;

    const isValid = isFormatValid && isPositive;

    const result = {
        isValid,
        message: isValid ? "Value is valid" : "Value must be greater than zero"
    };

    return result;
}

export const categoryValidator: ValidatorFunctionType = ( value: string) => {
    const isValid = value.length > 0;
    const result = {
        isValid,
        message: isValid ? "Value is valid" : "you must select a category"
    };
    return result;
}

export const imageValidator: ValidatorFunctionType = ( value: string) => {
    const isValid = value.length > 0;
    const result = {
        isValid,
        message: isValid ? "Value is valid" : "you must upload at least one image"
    };
    return result;
}

export const shopValidator: ValidatorFunctionType = ( value: string) => {
    const isValid = value.length > 0;
    const result = {
        isValid,
        message: isValid ? "Value is valid" : "you must select a shop"
    };
    return result;
}

export const productNameValidator: ValidatorFunctionType = ( value: string) => {
    const nameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9\s\-\.\(\)\[\]]{0,98}[a-zA-Z0-9\)\!])?$/;
    const isTooShort = value.length < 3;
    const isTooLong = value.length > 100;
    const isFormatValid = nameRegex.test(value);

    if (isTooShort) {
        return {isValid: false, message: "Product name must be at least 3 characters long"};
    }
    if (isTooLong) {
        return {isValid: false, message: "Product name must be at most 100 characters long"};
    }
    if (!isFormatValid) {
        return {isValid: false, message: "Product name contains invalid characters"};
    }
    const isValid = isFormatValid && !isTooShort && !isTooLong;
    const result = {
        isValid,
        message: isValid ? "Value is valid" : "you must enter a product name"
    };
    return result;
}


