import React from "react";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

const SimpleEditor: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div
      contentEditable
      suppressContentEditableWarning
      onInput={(e) => onChange(e.currentTarget.innerText)}
      style={{
        border: "1px solid #ccc",
        minHeight: "120px",
        padding: "10px",
        borderRadius: "6px",
        fontSize: "15px",
        outline: "none",
      }}
    >
      {value}
    </div>
  );
};

export default SimpleEditor;
