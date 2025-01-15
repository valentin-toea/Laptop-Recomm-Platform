import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import React from "react";
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import MainLayout from "../components/MainLayout";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";

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
        <MantineProvider>
          <Notifications />
          <MainLayout>{children}</MainLayout>
        </MantineProvider>
      </body>
    </html>
  );
}
