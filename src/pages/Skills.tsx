import React, { useState } from "react";
import type { SkillsForm } from "../Types/ResumeTypes";

interface Props {
  form: SkillsForm;
  errors: Partial<Record<keyof SkillsForm, string>>;
  onChange: (name: keyof SkillsForm, value: any) => void;
}
const Skills: React.FC<Props> = ({ form, errors, onChange }) => {
  const [skillInput, setSkillInput] = useState("");

  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) return;
    onChange("skills", [...form.skills, trimmed]);
    setSkillInput("");
  };

  const handleRemoveSkill = (index: number) => {
    const updated = form.skills.filter((_, i) => i !== index);
    onChange("skills", updated);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillInput(e.target.value);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Skills</h1>

      {/* Skill Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter a skill"
          value={skillInput}
          onChange={handleInputChange}
          className="flex-1 border rounded px-3 py-2 border-gray-300"
        />
        <button
          type="button"
          onClick={handleAddSkill}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          Add
        </button>
      </div>

      {/* Error */}
      {errors.skills && (
        <p className="text-red-500 text-xs mb-2">{errors.skills}</p>
      )}

      {/* Skills List */}
      <div className="flex flex-wrap gap-2">
        {form.skills.map((skill, index) => (
          <div
            key={index}
            className="bg-gray-200 text-gray-800 px-3 py-1 rounded flex items-center gap-2"
          >
            <span>{skill}</span>
            <button
              type="button"
              onClick={() => handleRemoveSkill(index)}
              className="text-red-500 font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
