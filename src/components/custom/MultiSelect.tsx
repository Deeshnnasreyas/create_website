import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type MultiSelectProps = {
  options: string[];
  defaultSelected?: string[];
  onChange?: (selected: string[]) => void;
};

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  defaultSelected = [],
  onChange,
}) => {
  const [selected, setSelected] = useState<string[]>(defaultSelected);

  const toggle = (option: string) => {
    const newSelected = selected.includes(option)
      ? selected.filter((item) => item !== option)
      : [...selected, option];
    setSelected(newSelected);
    onChange?.(newSelected);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4">
      {options.map((option) => (
        <div
          key={option}
          className="flex items-center space-x-2 px-[2px] py-[8px] lg:px-[8px] lg:py-[10px] w-[218px]"
        >
          <Checkbox
            color="#613FDD"
            id={option}
            checked={selected.includes(option)}
            onCheckedChange={() => toggle(option)}
            className="bg-[#613FDD];
"
          />
          <Label htmlFor={option} className="text-sm">
            {option}
          </Label>
        </div>
      ))}
    </div>
  );
};
