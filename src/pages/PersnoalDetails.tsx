import React from "react";
import type { PersonalDetailsForm } from "../Types/ResumeTypes";

interface Props {
  form: PersonalDetailsForm;
  errors: Partial<Record<keyof PersonalDetailsForm, string>>;
  onChange: <K extends keyof PersonalDetailsForm>(
    key: K,
    value: PersonalDetailsForm[K]
  ) => void;
  onImageChange: (file: File) => void;
}

const PersonalDetails: React.FC<Props> = ({
  form,
  errors,
  onChange,
  onImageChange,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange(name as keyof PersonalDetailsForm, value);
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    onImageChange(e.target.files[0]);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-6">Personal Details</h1>

      {/* IMAGE */}
      <div className="flex items-center gap-6 mb-6">
        <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
          {form.photo ? (
            <img
              src={form.photo}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500 text-sm">Photo</span>
          )}
        </div>

        <label className="cursor-pointer text-blue-600 text-sm font-medium">
          Upload Photo
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImage}
          />
        </label>
      </div>

      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "First Name", name: "fullName" },
          { label: "Last Name", name: "LastName" },
          { label: "Email", name: "email", type: "email" },
          { label: "Phone", name: "phone" },
          { label: "Location", name: "location" },
          { label: "LinkedIn", name: "linkedin" },
        ].map((field) => {
          const error = errors[field.name as keyof PersonalDetailsForm];

          return (
            <div key={field.name}>
              <label className="text-sm text-gray-600">{field.label}</label>
              <input
                name={field.name}
                type={field.type || "text"}
                value={form[field.name as keyof PersonalDetailsForm] as string}
                onChange={handleInputChange}
                className={`w-full border rounded px-3 py-2 ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
              />
              {error && <p className="text-red-500 text-xs">{error}</p>}
            </div>
          );
        })}
      </div>

      {/* SUMMARY */}
      <div className="mt-4">
        <label className="text-sm text-gray-600">Summary</label>
        <textarea
          name="summary"
          value={form.summary}
          onChange={handleInputChange}
          rows={4}
          className={`w-full border rounded px-3 py-2 ${
            errors.summary ? "border-red-500" : "border-gray-300"
          }`}
        />
      </div>
    </div>
  );
};

export default PersonalDetails;
