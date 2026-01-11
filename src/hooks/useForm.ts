import { useState, useCallback, useMemo } from 'react';

export function useForm<T>(initialValues: T) {
    const [formData, setFormData] = useState<T>(initialValues);

    // Initialize validity state: assume all fields start as false (invalid) 
    const [validity, setValidity] = useState<Record<string, boolean>>(() => {
        const initialValidity: Record<string, boolean> = {};
        for (const key in initialValues) {
            // cast key to string to satisfy index signature
            initialValidity[key as string] = false;
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
    const handleValidation = useCallback((key: string, isValid: boolean) => {
        setValidity(prev => ({
            ...prev,
            [key]: isValid
        }));
    }, []);

    // Derived State: Is the whole form valid?
    const isFormValid = useMemo(() => {
        return Object.values(validity).every(status => status === true);
    }, [validity]);

    // Reset form to initial values
    const resetForm = useCallback(() => {
        setFormData(initialValues);
        // We might want to reset validity too, but for now let's keep it simple
        setValidity(() => {
            const initialValidity: Record<string, boolean> = {};
            for (const key in initialValues) {
                initialValidity[key as string] = false;
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
        setFormData,
        resetForm
    };
}
