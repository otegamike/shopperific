import { useState, useCallback, useMemo } from 'react';
import { validateForms } from '../utils/validateForms';
import type { handleValidationType, CustomValidatorType, validityType } from '../types/ValidationInterface';

export function useForm<T>(initialValues: T, customValidatorArray?: {key: string, customvalidator: CustomValidatorType}[] ) {

    const [formData, setFormData] = useState<T>(initialValues);

    // Initialize validity state: assume all fields start as false (invalid) 
    const [validity, setValidity] = useState<Record<string, { isValid: boolean, message: string }>>(() => {
        const initialValidity: Record<string, { isValid: boolean, message: string }> = {};
        for (const key in initialValues) {
            // cast key to string to satisfy index signature
            initialValidity[key as string] = { isValid: false, message: "" };
        }
        return initialValidity;
    });

    // Handle Input Changes
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    // Handle Validation Updates
    const handleValidation: handleValidationType = useCallback(async (key, value, required) => {
        // Set type of result to validityType
        let result: validityType = { isValid: false, message: "" };

        // Check if custom validator is provided
        if (customValidatorArray && customValidatorArray.filter((validator) => validator.key === key)[0]) {

            const customValidator = customValidatorArray.filter((validator) => validator.key === key)[0].customvalidator;
            // Check if custom validator is async
            if (customValidator.asyncFunction) {
                result = await customValidator.validatorFunction(value)
                console.log(result);
            } else {
                result = customValidator.validatorFunction(value);
            }
        } else {
            result = validateForms(key, value, required);
        }

        setValidity(prev => ({
            ...prev,
            [key]: result
        }));

        console.log(validity);

        return result;
    }, []);


    const validateAll = useCallback(async () => {
        for (const key in formData) {
            await handleValidation(key, (formData as any)[key], true);
        }
    }, [validity]);

    // Derived State: Is the whole form valid?
    const isFormValid = useMemo(() => {
        return Object.values(validity).every(status => status.isValid === true);
    }, [validity]);

    const getValidity = useCallback((key: string) => {
        return validity[key];
    }, [validity]);

    // Reset form to initial values
    const resetForm = useCallback(() => {
        setFormData(initialValues);
        // We might want to reset validity too, but for now let's keep it simple
        setValidity(() => {
            const initialValidity: Record<string, { isValid: boolean, message: string }> = {};
            for (const key in initialValues) {
                initialValidity[key as string] = { isValid: false, message: "" };
            }
            return initialValidity;
        });
    }, [initialValues]);

    return {
        formData,
        validity, // Exposed in case we need specific field validity
        handleChange,
        handleValidation,
        isFormValid,
        getValidity,
        setFormData,
        resetForm,
        validateAll
    };
}
