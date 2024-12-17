import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import React from "react";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import MainLayout from "../components/MainLayout";

export const metadata = {
  title: "Emag Recomm",
  description: "I am using Mantine with Next.js!",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
