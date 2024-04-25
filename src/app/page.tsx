"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import LineGraph from "@/components/LineGraph";
import { MAE_SCORES, R_SQUARED_SCORES, RMSE_SCORES } from "@/mockup/scores";
import { PREDICTIONS } from "@/mockup/predictions";
import MultiLineGraph from "@/components/MultiLineGraph";

export default function Home() {
  const [data, setData] = useState<any>(null);

  const fetchData = async () => {
    const { data } = await axios.get("http://localhost:8080/api/home");
    setData(data.message);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mt-8 flex flex-col">
      <h1 className="mb-10 text-3xl font-bold text-zinc-800">Dashboard</h1>
      <div className="flex flex-col gap-8">
        <MultiLineGraph
          title="Actual vs Predicted Values"
          index="medicine"
          predictions={PREDICTIONS}
        />
        <LineGraph
          title="MAE Scores"
          chartData={MAE_SCORES}
          index="medicine"
          categories={["score"]}
        />
        <LineGraph
          title="RMSE Scores"
          chartData={RMSE_SCORES}
          index="medicine"
          categories={["score"]}
        />
        <LineGraph
          title="R-Squared Scores"
          chartData={R_SQUARED_SCORES}
          index="medicine"
          categories={["score"]}
        />
      </div>
    </div>
  );
}
