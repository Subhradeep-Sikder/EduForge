"use client";
import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="grid min-h-[calc(100vh-64px)] place-items-center">
      <SignIn
        appearance={{
          baseTheme: theme === "light" ? dark : undefined,
        }}
      />
    </div>
  );
}