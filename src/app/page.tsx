"use client";

import Graph from "@/components/Graph";
import SearchBox from "@/components/SearchBox";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TextSearch } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [selectedMedicine, setSelectedMedicine] = useState<string | null>(null);

  const { data: medications, status } = useQuery({
    queryKey: ["medications"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:8080/api/medications");
      const { medicines } = data;
      return medicines as string[];
    },
  });

  return (
    <div className="mt-8 flex flex-col">
      <h1 className="mb-10 text-3xl font-bold text-zinc-800">Dashboard</h1>
      <div className="flex flex-col">
        <SearchBox
          value={selectedMedicine!!}
          setValue={setSelectedMedicine}
          medicines={medications || []}
          status={status}
        />
        <div className="mt-20">
          {!selectedMedicine && (
            <div className="border border-dashed rounded-lg w-[800px] mx-auto border-zinc-300 py-52 flex items-center justify-center text-zinc-500 gap-2">
              <TextSearch className="size-4 text-zinc-500" />
              Please select a medicine to view the prediction graph.
            </div>
          )}
          {selectedMedicine && <Graph medicine={selectedMedicine} />}
        </div>
      </div>
    </div>
  );
}
