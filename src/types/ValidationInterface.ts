export type validityType = {isValid: boolean, message: string}
export type ValidatorFunctionType = ( value: string) => validityType
export type AsyncValidatorFunctionType = ( value: string) => Promise<validityType>

export type CustomValidatorType = {
    asyncFunction: true,
    validatorFunction: AsyncValidatorFunctionType
} | {
    asyncFunction: false,
    validatorFunction: ValidatorFunctionType
}

export type handleValidationType = (
    key: string,
    value: string, 
    required: boolean, 
    customValidator?: CustomValidatorType
) => Promise<{isValid: boolean, message: string}>;