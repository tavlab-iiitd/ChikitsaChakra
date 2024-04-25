"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LineChart } from "@tremor/react";
import { useState } from "react";
import CustomTooltip from "./CustomTooltip";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Predictions = {
  medicine: string;
  actualValues: number[];
  predictedValues: number[];
};

type MultiLineGraphProps = {
  title: string;
  index: string;
  predictions: Predictions[];
};

const MultiLineGraph = (props: MultiLineGraphProps) => {
  const { title, index, predictions } = props;

  const options = predictions.map((prediction) => prediction.medicine);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <div className="p-1.5 w-full bg-zinc-100 border border-zinc-200 rounded-lg shadow-sm">
      <Card className="border w-full border-zinc-200 shadown-none">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-zinc-800 w-fit">{title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{selectedOption}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {options.map((option) => (
                <DropdownMenuCheckboxItem
                  checked={selectedOption === option}
                  onCheckedChange={() => setSelectedOption(option)}
                  key={option}
                >
                  {option}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="w-full pb-10 pr-12">
          <LineChart
            className="mt-4 h-72"
            data={formChartData(predictions[options.indexOf(selectedOption)])}
            index={index}
            categories={["Actual value", "Predicted value"]}
            colors={["blue", "indigo"]}
            customTooltip={CustomTooltip}
            intervalType="preserveStartEnd"
            showXAxis={false}
          />
        </CardContent>
      </Card>
    </div>
  );
};

const formChartData = (
  prediction: Predictions
): {
  medicine: string;
  "Actual value": number;
  "Predicted value": number;
}[] => {
  const data = prediction.actualValues.map((actualValue, index) => {
    return {
      medicine: prediction.medicine,
      "Actual value": actualValue,
      "Predicted value": prediction.predictedValues[index],
    };
  });

  return data;
};

export default MultiLineGraph;
