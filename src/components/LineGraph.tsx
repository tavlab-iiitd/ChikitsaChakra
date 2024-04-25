"use client";

import { LineChart } from "@tremor/react";
import CustomTooltip from "./CustomTooltip";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type LineGraphProps = {
  title: string;
  chartData: any;
  index: string;
  categories: string[];
};

const LineGraph = (props: LineGraphProps) => {
  const { title, index, categories, chartData } = props;

  return (
    <div className="p-1.5 w-full bg-zinc-100 border border-zinc-200 rounded-lg shadow-sm">
      <Card className="border w-full border-zinc-200 shadown-none">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-zinc-800 w-fit">{title}</CardTitle>
        </CardHeader>
        <CardContent className="w-full pr-12">
          <LineChart
            className="mt-4 h-72"
            data={chartData}
            index={index}
            categories={categories}
            colors={["blue", "indigo", "cyan"]}
            showLegend={false}
            customTooltip={CustomTooltip}
            intervalType="preserveStartEnd"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default LineGraph;
