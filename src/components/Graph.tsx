"use client";

import { LineChart } from "@tremor/react";
import CustomTooltip from "./CustomTooltip";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Prediction = {
  medicine: string;
  actualValues: number[];
  predictedValues: number[];
};

type GraphProps = {
  title: string;
  index: string;
  predictions: Prediction;
};

const Graph = (props: GraphProps) => {
  const { title, index, predictions } = props;

  return (
    <div className="p-1.5 w-[800px] mx-auto bg-zinc-100 border border-zinc-200 rounded-lg shadow-sm">
      <Card className="border w-full border-zinc-200 shadown-none">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-zinc-800 w-fit">{title}</CardTitle>
        </CardHeader>
        <CardContent className="w-full pb-10 pr-12">
          <LineChart
            className="mt-4 h-72"
            data={getChartData(predictions)}
            index={index}
            categories={["Actual value", "Predicted value"]}
            colors={["blue", "emerald"]}
            customTooltip={CustomTooltip}
            intervalType="preserveStartEnd"
            showXAxis={false}
          />
        </CardContent>
      </Card>
    </div>
  );
};

const getChartData = (
  predictions: Prediction
): {
  medicine: string;
  "Actual value": number;
  "Predicted value": number;
}[] => {
  const data = predictions.actualValues.map((actualValue, index) => {
    return {
      medicine: predictions.medicine,
      "Actual value": actualValue,
      "Predicted value": predictions.predictedValues[index],
    };
  });

  return data;
};

export default Graph;
