import React from "react";
import type { EducationForm } from "../Types/ResumeTypes";

interface Props {
  form: EducationForm;
  errors: Partial<Record<keyof EducationForm, string>>;
  onChange: <K extends keyof EducationForm>(
    key: K,
    value: EducationForm[K]
  ) => void;
}

const Education: React.FC<Props> = ({
  form,
  errors,
  onChange,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    onChange(name as keyof EducationForm, value);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Education
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "Degree", name: "degree" },
          { label: "Institution", name: "institution" },
          { label: "Start Year", name: "startYear", type: "date" },
          { label: "End Year", name: "endYear",type:"date" },
          { label: "Location", name: "location" },
        ].map((field) => {
          const error =
            errors[field.name as keyof EducationForm];

          return (
            <div key={field.name}>
              <label className="block text-sm text-gray-600 mb-1">
                {field.label}
              </label>

              <input
                type={field.type || "text"}
                name={field.name}
                value={
                  form[field.name as keyof EducationForm] || ""
                }
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
              />

              {error && (
                <p className="text-red-500 text-xs mt-1">
                  {error}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Education;
