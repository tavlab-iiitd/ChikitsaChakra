import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const valueFormatter = (value: number) => {
  return value.toFixed(2);
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleString("default", {
    month: "short",
    year: "numeric",
  });

  return formattedDate;
};
