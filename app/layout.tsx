import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "桌面日历",
  description: "桌面日历，时间，天气",
  referrer: "no-referrer"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.ico' />
      </head>
      <body>
        {children}
        {/* <Script src='https://unpkg.com/holiday-calendar/src/index.min.js' /> */}
      </body>
    </html>
  );
}
