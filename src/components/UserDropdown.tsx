"use client";
import {
  ActionIcon,
  Button,
  Container,
  Group,
  Menu,
  Modal,
  Radio,
  Stack,
  Text,
} from "@mantine/core";
import { IconShoppingCart, IconTransfer, IconUser } from "@tabler/icons-react";
import React, { useRef, useState } from "react";
import { useUserData } from "../hooks/useUserData";
import Link from "next/link";

const UserDropdown = () => {
  const { mainUser, users, changeUser } = useUserData({ loadAllUsers: true });

  const [openModal, setOpenModal] = useState(false);
  const selectedUserId = useRef<string>();

  return (
    <Group gap={10}>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <ActionIcon variant="filled" aria-label="User" radius="lg">
            <IconUser style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>{mainUser?.name as string}</Menu.Label>
          <Menu.Item
            leftSection={
              <IconTransfer style={{ width: "16px", height: "16px" }} />
            }
            onClick={() => setOpenModal(true)}
          >
            Change Account
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <Modal
        opened={openModal}
        onClose={() => setOpenModal(false)}
        title="Select User"
      >
        <Container mah="600px" mb={20} style={{ overflow: "auto" }}>
          <Radio.Group onChange={(value) => (selectedUserId.current = value)}>
            <Stack gap={6}>
              {users.map((user) => (
                <Radio
                  key={user.userId}
                  value={user.userId}
                  label={`${user.userId} - ${user.name}`}
                />
              ))}
            </Stack>
          </Radio.Group>
        </Container>
        <Button
          fullWidth
          onClick={() => {
            if (!selectedUserId.current) return;

            changeUser(selectedUserId.current);
            setOpenModal(false);
          }}
        >
          Switch To Selected User
        </Button>
      </Modal>
      <ActionIcon
        variant="filled"
        aria-label="User"
        radius="lg"
        component={Link}
        href="/cart"
      >
        <IconShoppingCart
          style={{ width: "70%", height: "70%" }}
          stroke={1.5}
        />
      </ActionIcon>
    </Group>
  );
};

export default UserDropdown;
