import type { ExperienceForm } from "../Types/ResumeTypes";
export const validateExperience = (form: ExperienceForm) => {
  const errors: Partial<Record<keyof ExperienceForm, string>> = {};

  if (!form.jobTitle.trim()) errors.jobTitle = "Job title is required";
  if (!form.company.trim()) errors.company = "Company name is required";
  if (!form.startDate.trim()) errors.startDate = "Start date is required";
  if (!form.endDate.trim()) errors.endDate = "End date is required";
  if (!form.location.trim()) errors.location = "Location is required";
  if (!form.description.trim()) errors.description = "Description is required";

  return errors;
};
