"use client";

import Graph from "@/components/Graph";
import SearchBox from "@/components/SearchBox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChevronDown, TextSearch } from "lucide-react";
import { useState } from "react";

enum ModelType {
  Prophet = "Prophet",
  HotWinters = "Hot Winters",
}

export default function Home() {
  const [selectedMedicine, setSelectedMedicine] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<ModelType>(
    ModelType.Prophet
  );

  const { data: medications, status } = useQuery({
    queryKey: ["medications"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:8080/api/medications");
      const { medicines } = data;
      return medicines as string[];
    },
  });

  return (
    <div className="sm:mt-8 mt-4 flex flex-col">
      <h1 className="mb-10 text-3xl font-bold text-zinc-800">Dashboard</h1>
      <div className="flex flex-col">
        <div className="flex mx-auto gap-2">
          <SearchBox
            value={selectedMedicine!!}
            setValue={setSelectedMedicine}
            medicines={medications || []}
            status={status}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                {selectedModel}
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Models</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {Object.values(ModelType).map((model) => (
                <DropdownMenuItem
                  onSelect={() => setSelectedModel(model)}
                  key={model}
                >
                  {model}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="sm:mt-20 mt-14">
          {!selectedMedicine && (
            <div className="border border-dashed rounded-lg w-full lg:w-[800px] mx-auto border-zinc-300 py-52 flex items-center justify-center text-zinc-500 gap-2">
              <TextSearch className="size-4 text-zinc-500" />
              Please select a medicine to view the prediction graph.
            </div>
          )}
          {selectedMedicine && (
            <Graph medicine={selectedMedicine} model={selectedModel} />
          )}
        </div>
      </div>
    </div>
  );
}
