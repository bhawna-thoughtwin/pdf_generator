import React from "react";

interface FooterProps {
  onBack: () => void;
  onContinue: () => void;
  disableBack?: boolean;
  disableContinue?: boolean;
  continueLabel?: string;
}

const Footer: React.FC<FooterProps> = ({
  onBack,
  onContinue,
  disableBack = false,
  disableContinue = false,
  continueLabel = "Continue",
}) => {
  return (
    <div className="flex justify-between border-t pt-4 mt-6">
      <button
        type="button" 
        onClick={onBack}
        disabled={disableBack}
        className="px-5 py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
      >
        Back
      </button>

      <button
        type="button" 
        onClick={onContinue}
        disabled={disableContinue}
        className="px-5 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
      >
        {continueLabel}
      </button>
    </div>
  );
};

export default Footer;
