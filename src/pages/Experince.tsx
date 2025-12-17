import React from "react";
import type { ExperienceForm } from "../Types/ResumeTypes";
interface Props {
  form: ExperienceForm;
  errors: Partial<Record<keyof ExperienceForm, string>>;
  onChange: (name: keyof ExperienceForm, value: any) => void;
}

const Experience: React.FC<Props> = ({ form, errors, onChange }) => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange(name as keyof ExperienceForm, value);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Experience</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "Job Title", name: "jobTitle" },
          { label: "Company", name: "company" },
          { label: "Start Date", name: "startDate", type: "date" },
          { label: "End Date", name: "endDate", type: "date" },
          { label: "Location", name: "location" },
        ].map(field => (
          <div key={field.name}>
            <label className="block text-sm text-gray-600 mb-1">{field.label}</label>
            <input
              type={field.type || "text"}
              name={field.name}
              value={form[field.name as keyof ExperienceForm]}
              onChange={handleInput}
              className={`w-full border rounded px-3 py-2 ${
                errors[field.name as keyof ExperienceForm] ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors[field.name as keyof ExperienceForm] && (
              <p className="text-red-500 text-xs mt-1">{errors[field.name as keyof ExperienceForm]}</p>
            )}
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="mt-4">
        <label className="block text-sm text-gray-600 mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleInput}
          rows={4}
          className={`w-full border rounded px-3 py-2 ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description}</p>
        )}
      </div>
    </div>
  );
};

export default Experience;
