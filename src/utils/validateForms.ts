
interface validateForms {
    formType: "login" | "register" | "verifyEmail";
}



export const validateForms =  ( key: string, value: string, required: boolean): {isValid: boolean, message: string } => {
    
    let result = {
        isValid: false,
        message: ""
    }  
    
    if ( required && value.trim() === "" )  {
        console.log(value);
        return result = { isValid: false, message: "This field is required" } 
    }
    
    const nameRegex = /^[a-zA-Z\u00C0-\u01FF ]+([-']?[a-zA-Z\u00C0-\u01FF ]+)*$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (key.toLowerCase().includes("name")) {
        const isValid = nameRegex.test(value);
        if (!isValid) {
            result = {isValid: false, message: "Name contains invalid characters"};
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
        const count = value.length;
        const isValid = count >= 30;
        if (!isValid) {
            result = {isValid: false, message: "Description must be at least 30 characters long"};
        } else if (isValid) {
            result = {isValid: true, message: "Description is valid"};
        }
    }

    return result;
   
}
