'use client';

import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';


interface EditorButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  tooltip: string;
  isActive?: boolean;
}

export default function Toolbar({handleFormat, activeFormats}: {
  handleFormat: (command: string) => void;
  activeFormats: Set<string>;}) {
  return (
    <div className="flex items-center justify-center gap-1 ">
      <EditorButton
        icon={<Bold size={18} />}
        onClick={() => handleFormat("bold")}
        tooltip="Bold"
        isActive={activeFormats.has("bold")}
      />
      <EditorButton
        icon={<Italic size={18} />}
        onClick={() => handleFormat("italic")}
        tooltip="Italic"
        isActive={activeFormats.has("italic")}
      />
      <EditorButton
        icon={<Underline size={18} />}
        onClick={() => handleFormat("underline")}
        tooltip="Underline"
        isActive={activeFormats.has("underline")}
      />
      <div className="w-px h-6 bg-gray-200 mx-2" />
      <EditorButton
        icon={<AlignLeft size={18} />}
        onClick={() => handleFormat("justifyLeft")}
        tooltip="Align Left"
        isActive={activeFormats.has("justifyLeft")}
      />
      <EditorButton
        icon={<AlignCenter size={18} />}
        onClick={() => handleFormat("justifyCenter")}
        tooltip="Align Center"
        isActive={activeFormats.has("justifyCenter")}
      />
      <EditorButton
        icon={<AlignRight size={18} />}
        onClick={() => handleFormat("justifyRight")}
        tooltip="Align Right"
        isActive={activeFormats.has("justifyRight")}
      />
    </div>
  );
}

export function EditorButton({
  icon,
  onClick,
  tooltip,
  isActive = false,
}: EditorButtonProps) {
  return (
    <button
      type="button"
      className={`p-2 rounded transition-all duration-200 relative group
        ${
          isActive
            ? "bg-indigo-100 text-primary-blue hover:bg-indigo-200"
            : "hover:bg-gray-100 text-gray-600 hover:text-gray-800"
        }`}
      onClick={onClick}
      title={tooltip}
    >
      <span className="transform transition-transform group-hover:scale-110">
        {icon}
      </span>
      <span className="sr-only">{tooltip}</span>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        {tooltip}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
          <div className="border-4 border-transparent border-t-gray-900" />
        </div>
      </div>
    </button>
  );
}
