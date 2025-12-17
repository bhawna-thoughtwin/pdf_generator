import { useState } from "react";
import { SECTIONS, type Section } from "../Types/ResumeTypes";
import PersonalDetails from "./PersnoalDetails";
import Education from "./Education";
import Experince from "./Experince";
import Skills from "./Skills";
import PdfPreview from "./PdfPreview";
import Footer from "../footer/Footer";
import { Sidebar } from "./SideBar";
import { useFormWithValidation } from "../Hooks/useFormWithValidation";
import { validatePersonalDetails } from "../validations/personalDetails.validation";
import { validateEducation } from "../validations/education.validation";
import { validateExperience } from "../validations/experience.validation";
import { validateSkills } from "../validations/skills.validation";
import jsPDF from "jspdf";
/* ---------------- Initial Values ---------------- */
const initialPersonalDetails = {
    fullName: "",
    LastName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    summary: "",
    photo: null as string | null,
    photoType: "JPEG" as "JPEG" | "PNG",
};
const initialEducation = {
    degree: "",
    institution: "",
    startYear: "",
    endYear: "",
    location: "",
};
const initialExperience = {
    jobTitle: "",
    company: "",
    startDate: "",
    endDate: "",
    location: "",
    description: "",
};
const initialSkills = { skills: [] };
/* ---------------- Component ---------------- */
export const ResumeBuilderLayout: React.FC = () => {
    const [uiState, setUiState] = useState({
        currentStep: 0,
        mode: "form" as "form" | "preview",
        previewUrl: null as string | null,
        pdfDoc: null as jsPDF | null,
    });
    //remove multiple  usestate for optimisation
    // const [currentStep, setCurrentStep] = useState(0);
    const selectedSection: Section = SECTIONS[uiState.currentStep];
    // const [pdfDoc, setPdfDoc] = useState<jsPDF | null>(null);
    // const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    // const [mode, setMode] = useState<"form" | "preview">("form");
    /* -------- Form Hooks -------- */
    const personal = useFormWithValidation(initialPersonalDetails, validatePersonalDetails);
    const education = useFormWithValidation(initialEducation, validateEducation);
    const experience = useFormWithValidation(initialExperience, validateExperience);
    const skills = useFormWithValidation(initialSkills, validateSkills);

    /* -------- Navigation -------- */
    const nextStep = () => {
        validateAllSections();
        let hasError = false;
        if (selectedSection === "Personal Details") {
            if (Object.keys(personal.validateForm()).length) hasError = true;
        } else if (selectedSection === "Education") {
            if (Object.keys(education.validateForm()).length) hasError = true;
        } else if (selectedSection === "Experience") {
            if (Object.keys(experience.validateForm()).length) hasError = true;
        } else if (selectedSection === "Skills") {
            if (Object.keys(skills.validateForm()).length) hasError = true;
        }

        if (hasError) return;

        // When user clicks "Preview Resume" from Skills
        if (selectedSection === "Skills") {
            generatePdf();
            setUiState(prev => ({
                ...prev,
                currentStep: SECTIONS.indexOf("Preview"),
            }));
            //  
            // setCurrentStep(SECTIONS.indexOf("Preview"));
            return;
        }
        // Normal navigation
        if (uiState.currentStep < SECTIONS.length - 1) {
            setUiState(prev => ({
                ...prev,
                currentStep: uiState.currentStep + 1,
            }));
        }
    };
    const handleImageUpload = async (file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
            personal.handleChange("photo", reader.result as string);
            personal.handleChange(
                "photoType",
                file.type.includes("png") ? "PNG" : "JPEG"
            );
        };
        reader.readAsDataURL(file);
    };
    const prevStep = () => {
        if (uiState.currentStep > 0) setUiState(prev => ({ ...prev, currentStep: uiState.currentStep - 1 }));
    };

    /* -------- PDF Generation -------- */
    const generatePdf = () => {
        const doc = new jsPDF("p", "mm", "a4");
        let y = 20;

        // PERSONAL DETAILS
        doc.setFontSize(18);
        doc.text(`${personal.form.fullName} ${personal.form.LastName}`, 20, y);
        y += 10;
        const pageWidth = doc.internal.pageSize.getWidth();
        const imgX = pageWidth - 45;
        if (personal.form.photo) {
            doc.addImage(
                personal.form.photo,
                personal.form.photoType,
                imgX,
                y,
                30,
                30
            );
        }
        doc.setFontSize(12);
        doc.text(`Email: ${personal.form.email}`, 20, y);
        y += 6;
        doc.text(`Phone: ${personal.form.phone}`, 20, y);
        y += 6;
        doc.text(`Location: ${personal.form.location}`, 20, y);
        y += 10;
        doc.setFontSize(14);
        doc.text("Summary", 20, y);
        y += 6;
        doc.setFontSize(12);
        doc.text(doc.splitTextToSize(personal.form.summary, 170), 20, y);
        y += 20;

        // EDUCATION
        doc.setFontSize(14);
        doc.text("Education", 20, y);
        y += 6;
        doc.setFontSize(12);
        doc.text(
            `${education.form.degree} at ${education.form.institution} (${education.form.startYear} - ${education.form.endYear}) - ${education.form.location}`,
            20,
            y
        );
        y += 10;

        // EXPERIENCE
        doc.setFontSize(14);
        doc.text("Experience", 20, y);
        y += 6;
        doc.setFontSize(12);
        doc.text(
            `${experience.form.jobTitle} at ${experience.form.company} (${experience.form.startDate} - ${experience.form.endDate}) - ${experience.form.location}`,
            20,
            y
        );
        y += 6;
        doc.text(doc.splitTextToSize(experience.form.description, 170), 20, y);
        y += 10;

        // SKILLS
        doc.setFontSize(14);
        doc.text("Skills", 20, y);
        y += 6;
        doc.setFontSize(12);
        doc.text(skills.form.skills.join(", "), 20, y);

        // SAVE / PREVIEW
        // const blobUrl = URL.createObjectURL(doc.output("blob"));
        // const blobUrl = URL.createObjectURL(doc.output("blob"));

        // const blobUrl = doc.output("bloburl");

        // setPdfDoc(doc);
        // setPreviewUrl(blobUrl);
        // setMode("preview");

        const blob = doc.output("blob"); // typed correctly
        const blobUrl = URL.createObjectURL(blob);

        setUiState({
            ...uiState,
            previewUrl: blobUrl,
            pdfDoc: doc,
            mode: "preview",
        });


    };
    const handleEdit = () => {
        setUiState(prev => ({ ...prev, mode: "form" }));
        setUiState(prev => ({ ...prev, currentStep: SECTIONS.indexOf("Skills") })); // or last form step
    };

    const handleDownload = () => {
        if (uiState.pdfDoc) {
            uiState.pdfDoc.save(`${personal.form.fullName || "resume"}.pdf`);
        }
        resetAll();


    };
    const resetAll = () => {
        // reset all form sections
        personal.resetForm();
        education.resetForm();
        experience.resetForm();
        skills.resetForm();

        // clean preview URL
        if (uiState.previewUrl) {
            URL.revokeObjectURL(uiState.previewUrl);
        }

        // reset UI state
        setUiState({
            currentStep: 0,          // back to Personal Details
            mode: "form",
            previewUrl: null,
            pdfDoc: null,
        });
    };
    const validateAllSections = () => {
        const personalErrors = personal.validateForm();
        const educationErrors = education.validateForm();
        const experienceErrors = experience.validateForm();
        const skillsErrors = skills.validateForm();

        // find first section with error (for navigation)
        if (Object.keys(personalErrors).length > 0) {
            setUiState(prev => ({
                ...prev,
                currentStep: SECTIONS.indexOf("Personal Details"),
            }));
            return false;
        }

        if (Object.keys(educationErrors).length > 0) {
            setUiState(prev => ({
                ...prev,
                currentStep: SECTIONS.indexOf("Education"),
            }));
            return false;
        }

        if (Object.keys(experienceErrors).length > 0) {
            setUiState(prev => ({
                ...prev,
                currentStep: SECTIONS.indexOf("Experience"),
            }));
            return false;
        }

        if (Object.keys(skillsErrors).length > 0) {
            setUiState(prev => ({
                ...prev,
                currentStep: SECTIONS.indexOf("Skills"),
            }));
            return false;
        }

        return true; //  all valid
    };




    /* -------- UI -------- */
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar
                selected={selectedSection}
                setSelected={(section: Section) =>
                    setUiState(prev => ({ ...prev, currentStep: SECTIONS.indexOf(section) }))
                }
            />

            <div className="flex-1 p-6 overflow-auto flex flex-col">
                <div className="flex-1">
                    {selectedSection === "Personal Details" && (
                        <PersonalDetails
                            form={personal.form}
                            errors={personal.errors}
                            onChange={personal.handleChange}
                            onImageChange={handleImageUpload}
                        />

                    )}

                    {selectedSection === "Education" && (
                        <Education
                            form={education.form}
                            errors={education.errors}
                            onChange={education.handleChange}
                        />
                    )}
                    {selectedSection === "Experience" && (
                        <Experince
                            form={experience.form}
                            errors={experience.errors}
                            onChange={experience.handleChange}
                        />
                    )}

                    {selectedSection === "Skills" && (
                        <Skills
                            form={skills.form}
                            errors={skills.errors}
                            onChange={skills.handleChange}
                        />
                    )}

                    {selectedSection === "Preview" && (
                        uiState.previewUrl ? (
                            <PdfPreview
                                previewUrl={uiState.previewUrl}
                                onEdit={handleEdit}
                                onDownload={handleDownload}
                            />
                        ) : (
                            <div className="p-4 text-center text-red-500">
                                Please fill all required fields before previewing the PDF.
                            </div>
                        )
                    )}
                </div>
                <Footer
                    onBack={prevStep}
                    onContinue={nextStep}
                    disableBack={uiState.currentStep === 0}
                    disableContinue={false}
                    continueLabel={
                        uiState.currentStep === SECTIONS.length - 2
                            ? "Preview Resume"
                            : "Continue"
                    }

                />
            </div>
        </div>
    );
};
