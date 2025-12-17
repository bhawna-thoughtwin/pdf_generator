import type { EducationForm } from "../Types/ResumeTypes";

export const validateEducation = (
  form: EducationForm
): Partial<Record<keyof EducationForm, string>> => {
  const errors: Partial<Record<keyof EducationForm, string>> = {};

  if (!form.degree.trim()) {
    errors.degree = "Degree is required";
  }

  if (!form.institution.trim()) {
    errors.institution = "Institution is required";
  }

  if (!form.startYear.trim()) {
    errors.startYear = "Start year is required";
  }

  if (!form.endYear.trim()) {
    errors.endYear = "End year is required";
  }

  if (
    form.startYear &&
    form.endYear &&
    Number(form.startYear) > Number(form.endYear)
  ) {
    errors.endYear = "End year must be after start year";
  }

  return errors;
};
