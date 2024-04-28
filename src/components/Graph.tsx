"use client";

import { useQuery } from "@tanstack/react-query";
import { LineChart } from "@tremor/react";
import axios from "axios";
import { CircleX, Loader2 } from "lucide-react";
import CustomTooltip from "./CustomTooltip";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { formatDate } from "@/utils/utils";

type GraphProps = {
  medicine: string;
};

type ActualValue = {
  ds: string;
  y: number;
};

type ForecastValue = {
  ds: string;
  yhat: number;
  yhat_lower: number;
  yhat_upper: number;
};

type Prediction = {
  history: ActualValue[];
  forecast: ForecastValue[];
};

const Graph = (props: GraphProps) => {
  const { medicine } = props;

  const { data: predictions, status } = useQuery({
    queryKey: [`${medicine}-prediction`],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:8080/api/prediction?medicine=${medicine.toLowerCase()}`
      );
      return data as Prediction;
    },
  });

  return (
    <div className="p-1.5 w-[800px] mx-auto bg-zinc-100 border border-zinc-200 rounded-lg shadow-sm">
      <Card className="border w-full border-zinc-200 shadown-none">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-zinc-800 w-fit capitalize">
            {medicine}
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full h-full pb-10 pr-12 flex justify-center items-center">
          {status === "pending" && (
            <div className="flex py-36 items-center gap-2">
              <Loader2 className="size-4 text-blue-500 animate-spin" />
              Predicting...
            </div>
          )}
          {status === "error" && (
            <div className="flex py-36 items-center gap-2">
              <CircleX className="size-4 text-red-500" />
              <p className="text-sm text-red-600">
                Unable to predict. Try again later!
              </p>
            </div>
          )}
          {status === "success" && (
            <LineChart
              className="mt-4 h-80"
              data={predictions ? getChartData(predictions) : []}
              index="date"
              categories={["Cases", "Predictions"]}
              colors={["blue", "emerald"]}
              customTooltip={CustomTooltip}
              rotateLabelX={{
                angle: -45,
                verticalShift: 20,
                xAxisHeight: 48,
              }}
              showAnimation
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const getChartData = (predictions: Prediction) => {
  const historyData = predictions.history.map((item) => ({
    date: formatDate(item.ds),
    Cases: item.y,
  }));

  const forecastData = predictions.forecast.map((item) => ({
    date: formatDate(item.ds),
    Predictions: item.yhat,
  }));

  return [...historyData, ...forecastData];
};

export default Graph;
