import { valueFormatter } from "@/lib/utils";
import { CustomTooltipProps } from "@tremor/react";

const CustomTooltip = (customProps: CustomTooltipProps) => {
  const { payload, active } = customProps;
  if (!active || !payload) return null;

  return (
    <div className="bg-zinc-100 border-zinc-200 border rounded-md shadow-sm">
      {payload.map((category, idx) => (
        <div key={idx} className="flex flex-col gap-y-1 px-3 py-2">
          <p className="text-zinc-700 capitalize">{category.dataKey}</p>
          <p className="font-medium text-zinc-600">
            {valueFormatter(parseFloat(category.value?.toString() || "0"))}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CustomTooltip;
