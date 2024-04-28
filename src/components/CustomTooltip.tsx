import { valueFormatter } from "@/utils/utils";
import { CustomTooltipProps } from "@tremor/react";

const CustomTooltip = (customProps: CustomTooltipProps) => {
  const { payload, active } = customProps;
  if (!active || !payload) return null;

  return (
    <div className="bg-zinc-50 border-zinc-200 border rounded-md shadow-md">
      {payload.map((category, idx) => (
        <div key={idx} className="flex flex-col gap-y-1 px-3 py-2">
          <div className="border-b pb-2 border-b-zinc-200 -mx-3 px-3">
            <h3 className="text-md text-zinc-800">{payload[0].payload.date}</h3>
          </div>
          <p className="text-zinc-700 capitalize text-sm">{category.dataKey}</p>
          <p className="font-medium text-zinc-600 text-sm">
            {valueFormatter(parseFloat(category.value?.toString() || "0"))}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CustomTooltip;
