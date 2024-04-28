import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/utils/utils";
import PageWrapper from "@/components/PageWrapper";
import Providers from "@/utils/providers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ChikitsaChakra",
  description:
    "AI/ML Based Resource Allocation Optimizer for Primary Health Centers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-white font-sans antialiased text-zinc-600",
          process.env.NODE_ENV === "development" && "debug-screens",
          fontSans.variable
        )}
      >
        <Providers>
          <PageWrapper>{children}</PageWrapper>
        </Providers>
      </body>
    </html>
  );
}
