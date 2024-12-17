"use client";
import {
  AppShell,
  Button,
  Container,
  Group,
  MantineProvider,
  UnstyledButton,
} from "@mantine/core";
import React, { PropsWithChildren } from "react";
import { theme } from "../theme";
import { ROUTES } from "../routes";
import Link from "next/link";
import UserDropdown from "./UserDropdown";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <MantineProvider theme={theme}>
      <AppShell header={{ height: 60 }} padding="md">
        <AppShell.Header>
          <Group h="100%" px="md" justify="space-between">
            <Group>
              <UnstyledButton
                component={Link}
                href={"/"}
                style={{ fontWeight: "bold" }}
              >
                EEmag
              </UnstyledButton>
              <Group ml="xl" gap={0}>
                {ROUTES.map((route, idx) => (
                  <Button
                    key={idx}
                    variant="white"
                    component={Link}
                    href={route.href}
                  >
                    {route.name}
                  </Button>
                ))}
              </Group>
            </Group>
            <UserDropdown />
          </Group>
        </AppShell.Header>
        <AppShell.Main>
          <div style={{ padding: "0 20px" }}>{children}</div>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
};

export default MainLayout;
