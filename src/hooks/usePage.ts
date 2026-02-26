import { useState } from "react"

export interface ErrorObject {
    errorState: boolean;
    errorMsg: string;
}

export const usePage = (initialLoading: boolean = true) => {

    const [isLoading, setIsLoading] = useState(initialLoading);
    const [errorObj, setErrorObj] = useState<ErrorObject>({ errorState: false, errorMsg: "" });

    const handleError = (errorObj: ErrorObject) => {
        setErrorObj(errorObj);
    }

    const setLoading = (isLoading: boolean) => {
        setIsLoading(isLoading);
    }

    const handleRetry = () => {
        handleError({ errorState: false, errorMsg: "" });
        window.location.reload();
    }

    return {
        isLoading,
        errorObj,
        handleError,
        setLoading,
        handleRetry
    }
}