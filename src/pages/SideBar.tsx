import { SECTIONS } from "../Types/ResumeTypes";
import { type Section } from "../Types/ResumeTypes";

 interface SidebarProps {
  selected: Section;
  setSelected: (section: Section) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ selected, setSelected }) => {
  return (
    <div className="w-64 h-screen bg-blue-600 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-8 text-center">
        Resume Builder
      </h1>

      <nav className="flex flex-col gap-2">
        {SECTIONS.map((section) => (
          <button
            key={section}
            onClick={() => setSelected(section)}
            className={`text-left px-4 py-2 rounded hover:bg-blue-500 transition ${
              selected === section ? "bg-blue-800 font-semibold" : ""
            }`}
          >
            {section}
          </button>
        ))}
      </nav>
    </div>
  );
};
