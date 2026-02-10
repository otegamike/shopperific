import { useState } from "react"

export interface ErrorObject {
    errorState: boolean;
    errorMsg?: string;
}

export const usePage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [errorObj, setErrorObj] = useState<ErrorObject>({ errorState: false, errorMsg: "" });

    const handleError = (errorObj: ErrorObject) => {
        setErrorObj(errorObj);
    }

    const setLoading = (isLoading: boolean) => {
        setIsLoading(isLoading);
    }

    return {
        isLoading,
        errorObj,
        handleError,
        setLoading
    }
}