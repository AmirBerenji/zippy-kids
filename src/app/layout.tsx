import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "./component/toast/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KidooHub",
  description:
    "KidooHub is your trusted platform to explore child care, education, and development services across Armenia. Powered by Nofeh Code Studio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToastProvider>{children}</ToastProvider>
    </>
  );
}
