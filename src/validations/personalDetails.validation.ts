import type { PersonalDetailsForm } from "../Types/ResumeTypes";
export type ValidationErrors<T> = Partial<Record<keyof T, string>>;
export const validatePersonalDetails = (
  data: PersonalDetailsForm
): ValidationErrors<PersonalDetailsForm> => {
  const errors: ValidationErrors<PersonalDetailsForm> = {};
  if (!data.fullName.trim()) {
    errors.fullName = "Full name is required";
  }
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = "Invalid email address";
  }
  if (!data.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^\+?\d{10,14}$/.test(data.phone.replace(/\s/g, ""))) {
    errors.phone = "Invalid phone number";
  }
  if (data.linkedin && !data.linkedin.startsWith("http")) {
    errors.linkedin = "LinkedIn URL must start with http";
  }
  if (!data.summary.trim()) {
    errors.summary = "Professional summary is required";
  } 
  return errors;
};
