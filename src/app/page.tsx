"use client";

import Graph from "@/components/Graph";
import SearchBox from "@/components/SearchBox";
import { MEDICINES, PREDICTIONS } from "@/mockup/data";
import { TextSearch } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [selectedMedicine, setSelectedMedicine] = useState<string>("");

  console.log(
    PREDICTIONS.filter((prediction) => prediction.medicine === "Ibuprofen")
  );

  return (
    <div className="mt-8 flex flex-col">
      <h1 className="mb-10 text-3xl font-bold text-zinc-800">Dashboard</h1>
      <div className="flex flex-col">
        <SearchBox
          value={selectedMedicine}
          setValue={setSelectedMedicine}
          medicines={MEDICINES}
        />
        <div className="mt-20">
          {selectedMedicine.length === 0 && (
            <div className="border border-dashed rounded-lg w-[800px] mx-auto border-zinc-300 py-40 flex items-center justify-center text-zinc-500 gap-2">
              <TextSearch className="size-4 text-zinc-500" />
              Please select a medicine to view the prediction graph.
            </div>
          )}
          {selectedMedicine.length > 0 && (
            <Graph
              title={
                MEDICINES.filter(
                  (medicine) => medicine.value === selectedMedicine
                )[0].label
              }
              index="medicine"
              predictions={
                PREDICTIONS.filter(
                  (prediction) => prediction.medicine === selectedMedicine
                )[0]
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
