import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Header from "../components/Header";
const inter = Inter({ subsets: ["latin"] });

const pretendard = localFont({
  src: "../../public/static/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "PANGssenger",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body className={`${pretendard.className} ${inter.className} max-h-screen-xl mx-auto`}>
        <Header/>
        <div className="px-4 sm:px-[40%] lg:px-[30%] pt-20 h-full">
        {children}
        </div>
      </body>
    </html>
  );  
}
