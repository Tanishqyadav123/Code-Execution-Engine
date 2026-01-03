import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface CommonSelectOption {
  label: string;
  value: number | string;
}

interface CommonSelectProps {
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  options: CommonSelectOption[];
}

export function CommonSelect({
  onChange,
  options,
  placeholder,
  value,
}: CommonSelectProps) {
  console.log({ options });
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue
          placeholder={placeholder ? placeholder : "Select any one"}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map(({ label, value }) => {
            return (
              <SelectItem key={value} value={value.toString()}>
                {label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
