import { useState } from "react";

type Errors<T> = Partial<Record<keyof T, string>>;

export function useFormWithValidation<T>(
  initialValues: T,
  validate: (values: T) => Errors<T>
) {
  const [form, setForm] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Errors<T>>({});
  // Handles any field change, including files
  const handleChange = (name: keyof T, value: any) => {
    setForm(prev => {
      const updated = { ...prev, [name]: value };
      const fieldErrors = validate(updated);
      setErrors(fieldErrors);
      return updated;
    });
  };
  // Validate entire form manually
  const validateForm = () => {
    const fieldErrors = validate(form);
    setErrors(fieldErrors);
    return fieldErrors;
  };
  
  const resetForm =()=>{
    setForm(initialValues);
    setErrors({});  
  }
  return {
    form,
    errors,
    handleChange,
    validateForm,
    setForm,
    setErrors,
    resetForm
  };
}
