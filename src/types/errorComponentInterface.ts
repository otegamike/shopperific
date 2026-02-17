export interface ErrorObject {
    errorState: boolean;
    errorMsg: string;
}

export interface ErrorComponentProps {
    message: string;
    retry: () => void;
}

export interface InfiniteScrollErrorInterface {
    errorState: boolean;
    errorMsg?: string;
    retry: () => void;
}

