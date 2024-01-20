import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "1commitperday",
  description: "Get your today's github commit heatmap png.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx("min-h-screen", robotoMono.className)}>
        <div className="max-w-2xl h-full min-h-screen flex flex-col mx-auto">
          <main className="flex-1  px-4 md:px-0">{children}</main>
          <footer className="py-1 border-t">
            <p className="text-center text-xs leading-loose text-slate-600 space-x-2">
              Made with ❤️ by{" "}
              <a
                href={"https://x.com/immanu10x"}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline"
              >
                @immanu10
              </a>
              <span>|</span>
              <a
                href={"https://github.com/immanu10/1commitperday"}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline"
              >
                Github
              </a>
            </p>
          </footer>
        </div>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
