import { useContext } from 'react';
import { FormGroupContext } from '../context/formGroupContext';

export const useFormContext = () => {
  const context = useContext(FormGroupContext);
  if (!context) throw new Error("useFormContext must be used within AuthProvider");
  return context;
};