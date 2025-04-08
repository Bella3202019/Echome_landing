import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { cn } from "@/utils";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={cn(
        GeistSans.variable,
        GeistMono.variable,
        "flex flex-col min-h-screen"
      )}
    >
      {children}
    </div>
  );
} 