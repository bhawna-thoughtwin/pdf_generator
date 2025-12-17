import type { SkillsForm } from "../Types/ResumeTypes";



export const validateSkills = (form: SkillsForm) => {
  const errors: Partial<Record<keyof SkillsForm, string>> = {};

  if (!form.skills || form.skills.length === 0) {
    errors.skills = "Please add at least one skill";
  }

  return errors;
};
