"use client";

import { Check, ChevronsUpDown, CircleX, Loader2 } from "lucide-react";
import { cn } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRef, useState } from "react";

type SearchBoxProps = {
  value: string;
  setValue: (value: string) => void;
  medicines: string[];
  status: "error" | "success" | "pending";
};

const SearchBox = (props: SearchBoxProps) => {
  const { value, setValue, medicines, status } = props;

  const [open, setOpen] = useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="lg:w-[640px] md:w-[560px] sm:w-[400px] w-full  justify-between"
        >
          {value
            ? medicines.find((medicine) => medicine === value)
            : "Select medicine..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`p-0 lg:w-[640px] md:w-[560px] sm:w-[400px]`}>
        <Command>
          <CommandInput placeholder="Search for medicine..." />
          <CommandList>
            {status === "pending" && (
              <div className="flex gap-2 items-center py-8 justify-center">
                <Loader2 className="size-4 text-blue-500 animate-spin" />
                <p className="text-sm text-zinc-600">Loading medications...</p>
              </div>
            )}
            {status === "error" && (
              <div className="flex gap-2 items-center py-8 justify-center">
                <CircleX className="size-4 text-red-500" />
                <p className="text-sm text-red-600">
                  Unable to load medications. Try again later!
                </p>
              </div>
            )}
            {status === "success" &&
              medicines.map((medicine) => (
                <CommandItem
                  key={medicine}
                  value={medicine}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === medicine ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {medicine}
                </CommandItem>
              ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchBox;
