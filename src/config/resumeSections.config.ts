import Education from "../pages/Education";
import Experience from "../pages/Experince";
import PersonalDetails from "../pages/PersnoalDetails";
import Skills from "../pages/Skills";
export const RESUME_CONFIG = {
  "Personal Details": {
    hook: "personal",
    component: PersonalDetails,
  },
  Education: {
    hook: "education",
    component: Education,
  },
  Experience: {
    hook: "experience",
    component: Experience,
  },
  Skills: {
    hook: "skills",
    component: Skills,
  },
} as const;

export type ResumeSectionKey = keyof typeof RESUME_CONFIG;
