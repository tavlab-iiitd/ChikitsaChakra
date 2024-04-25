"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

type SearchBoxProps = {
  value: string;
  setValue: (value: string) => void;
  medicines: {
    value: string;
    label: string;
  }[];
};

const SearchBox = (props: SearchBoxProps) => {
  const { value, setValue, medicines } = props;

  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[800px] mx-auto justify-between"
        >
          {value
            ? medicines.find((medicine) => medicine.value === value)?.label
            : "Select medicine..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[800px]">
        <Command>
          <CommandInput placeholder="Search for medicine..." />
          <CommandEmpty>No medicine found.</CommandEmpty>
          <CommandList>
            {medicines.map((medicine) => (
              <CommandItem
                key={medicine.value}
                value={medicine.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === medicine.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {medicine.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchBox;
