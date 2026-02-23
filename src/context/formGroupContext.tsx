import { createContext } from 'react';

interface FormContextType {
  isFocused?: boolean;
  handleFocus: () => void;
  handleBlur: () =>Promise<void>;
}

export const FormGroupContext = createContext<FormContextType | undefined>(undefined);