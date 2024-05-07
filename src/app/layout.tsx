import type { Metadata } from "next";
import '@mantine/core/styles.css';
import { Inter, Bai_Jamjuree } from "next/font/google";
import "./globals.css";
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import AuthProvider from "./api/auth/[...nextauth]/AuthProvider";

const inter = Inter({ subsets: ["latin"] });
const bj = Bai_Jamjuree({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
})

export const metadata: Metadata = {
  title: '3liink-Example-Applications',
  description: 'I have followed setup instructions carefully',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/3liink-logo-icon-only-100.png" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet"></link>
        <ColorSchemeScript />
      </head>
      <body className={bj.className}>
        <MantineProvider
          theme={{
            fontFamily: 'Bai Jamjuree, sans-serif',
            fontFamilyMonospace: 'Monaco, Courier, monospace',
            headings: { fontFamily: "Bai Jamjuree, sans-serif" },
          }}
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
