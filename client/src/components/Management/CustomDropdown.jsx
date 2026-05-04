import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

const CustomDropdown = ({ label, options, value, onChange }) => {
  const [open, setOpen] = useState(false);

  const selectedLabel = value || label;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-600"
      >
        <span>{selectedLabel}</span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-14 z-20 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <button
            type="button"
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-gray-500 hover:bg-gray-50"
          >
            All {label}
            {!value && <Check size={16} />}
          </button>

          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              {option}
              {value === option && <Check size={16} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
