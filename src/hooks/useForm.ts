import { useState, useCallback, useMemo, type ChangeEvent } from 'react';
import { validateForms } from '../utils/validateForms';
import type { handleValidationType, CustomValidatorType, validityType, validityObjType, validationInterface, validityResult, HandleLoadingInterface, HandleLoadingProps } from '../types/ValidationInterface';

export function useForm<T>(initialValues: T, customValidatorArray?: { key: string, customvalidator: CustomValidatorType }[]) {

    const [formData, setFormData] = useState<T>(initialValues);
    const [loading, setLoading] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(false);

    // Initialize validity state: assume all fields start as false (invalid) 
    const [validity, setValidity] = useState<Partial<validityObjType<T>>>(() => {
        const initialValidity: Partial<validityObjType<T>> = {};
        for (const key in initialValues) {
            // cast key to string to satisfy index signature
            initialValidity[key as keyof T] = { isValid: false, message: "", showError: false };
        }
        return initialValidity;
    });

    // Handle Input Changes
    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const updateSpecificField = useCallback((fieldName: keyof T, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }));
    }, [formData])



    const handleLoading : HandleLoadingInterface = useCallback(( loader, button ) => {
        const loadingState = loader==="loading" ? true : false;
        const buttonState = button ? (button==="disable" ? true : false) : loadingState;
        setLoading(loadingState);
        setDisableButton(buttonState);
    }, []);

    const setShowError = useCallback((name: keyof T, setTo: boolean) => {
        setValidity(prev => ({
            ...prev,
            [name]: { ...prev[name], showError: setTo }
        }));

    }, []);

    // Handle Validation Updates
    const handleValidation: handleValidationType<T> = useCallback(async (key, value, required = true) => {
        // Set type of result to validityType
        let result: validityResult = { isValid: false, message: "" };

        // Check if custom validator is provided
        if (customValidatorArray && customValidatorArray.filter((validator) => validator.key === key)[0]) {

            const customValidator = customValidatorArray.filter((validator) => validator.key === key)[0].customvalidator;
            // Check if custom validator is async
            if (customValidator.asyncFunction) {
                result = await customValidator.validatorFunction(value)
            } else {
                result = customValidator.validatorFunction(value);
            }
        } else {
            result = validateForms(key as string, value, required);
        }

        setValidity(prev => ({
            ...prev,
            [key]: { ...prev[key], ...result }
        }));

        return result;
    }, []);


    const validateAll = useCallback(async () => {
        for (const key in formData) {
            const result = await handleValidation(key, (formData as any)[key], true);
            if (result.isValid === false) setShowError(key, true);
        }
    }, [formData]);

    // Derived State: Is the whole form valid?
    const isFormValid = useMemo(() => {
        const valid = Object.values(validity)
            .filter((status): status is validityType => !!status) // Type Guard
            .every(status => status.isValid === true);
        return valid
    }, [validity]);

    const buttonState = useMemo(() => {
        return disableButton ? "disabled" : "default";
    }, [disableButton]);

    const getValidity = useCallback((key: string) => {
        return validity[key as keyof T];
    }, [validity]);

    // Reset form to initial values
    const resetForm = useCallback(() => {
        setFormData(initialValues);
        // We might want to reset validity too, but for now let's keep it simple
        setValidity(() => {
            const initialValidity: Partial<validityObjType<T>> = {};
            for (const key in initialValues) {
                initialValidity[key] = { isValid: false, message: "", showError: false };
            }
            return initialValidity;
        });
    }, [initialValues]);

    const validate: validationInterface<T> = {
        validateFunction: handleValidation,
        validity,
        setShowError
    }

    const loadHandler: HandleLoadingProps = {
        loading,
        disableButton,
        buttonState,
        handleLoading
    }

    return {
        formData,
        validity, // Exposed in case we need specific field validity
        handleChange,
        updateSpecificField,
        handleValidation,
        isFormValid,
        getValidity,
        setFormData,
        resetForm,
        validateAll,
        setShowError,
        validate,
        loadHandler
    };
}
