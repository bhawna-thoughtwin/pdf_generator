export const SECTIONS = [
    "Personal Details",
    "Education",
    "Experience",
    "Skills",
    "Preview",
] as const;
export type Section = (typeof SECTIONS)[number];
export interface PersonalDetailsForm {
    fullName: string;
    LastName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    summary: string;
    photo: string | null;     
    photoType: "JPEG" | "PNG" | "WEBP" | "SVG";
}
export interface EducationForm {
    degree: string;
    institution: string;
    startYear: string;
    endYear: string;
    location: string;
}
export interface ExperienceForm {
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string;
}
export interface SkillsForm {
    skills: string[];
}
export interface ResumeForm {
    personal: PersonalDetailsForm;
    education: EducationForm;
    experience: ExperienceForm[];
    skills: SkillsForm;
}
