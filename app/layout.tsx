import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "桌面日历时钟",
  description: "桌面全屏日历、实时时钟与天气信息面板",
  referrer: "no-referrer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='zh-CN'>
      <head>
      </head>
      <body>{children}</body>
    </html>
  );
}
