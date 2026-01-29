export type validityType = {isValid: boolean, message: string , showError: boolean}
export type validityResult = {isValid: boolean, message: string}
export type ValidatorFunctionType = ( value: string) => validityResult
export type AsyncValidatorFunctionType = ( value: string) => Promise<validityResult>

export type CustomValidatorType = {
    asyncFunction: true,
    validatorFunction: AsyncValidatorFunctionType
} | {
    asyncFunction: false,
    validatorFunction: ValidatorFunctionType
}

export type handleValidationType<T> = (
    key: keyof T,
    value: string, 
    required?: boolean, 
    customValidator?: CustomValidatorType
) => Promise<{isValid: boolean, message: string}>;

export type validityObjType<T> = Record< keyof T, validityType >

export type validationInterface<T> = {
    validateFunction: handleValidationType<T>,
    validity: Partial<validityObjType<T>>,
    setShowError: (name: keyof T, setTo: boolean) => void
}

type Loader = "loading" | "idle"
type Button = "disable" | "enable"

export type HandleLoadingInterface = ( loader : Loader, button?: Button) => void

export type HandleLoadingProps = {
    loading: Boolean,
    disableButton: Boolean,
    buttonState: "default" | "disabled",
    handleLoading: HandleLoadingInterface
}