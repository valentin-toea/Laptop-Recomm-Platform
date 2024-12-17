"use client";
import React from "react";
import { Laptop, LaptopRecord } from "../types";
import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import Link from "next/link";

const ItemCard = ({ laptop }: { laptop: Laptop }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder maw={300}>
      <Card.Section>
        <Image
          src="https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          height={130}
        />
      </Card.Section>
      <Group justify="space-between" mt="md" mb="xs">
        <Text
          fw={500}
          truncate="end"
          component={Link}
          href={`products/${laptop.productId}`}
        >
          {laptop.laptop}
        </Text>
      </Group>
      <Text size="sm" c="dimmed">
        Brand: {laptop.brand}
      </Text>
      <Text size="sm" c="dimmed">
        CPU: {laptop.cpu}
      </Text>
      <Text size="sm" c="dimmed">
        GPU: {laptop.gpu}
      </Text>
      <Text size="sm" c="dimmed">
        RAM: {laptop.ram}
      </Text>
      <Text size="sm" c="dimmed">
        Storage: {laptop.storage} {laptop.storageType}
      </Text>
      <Text size="sm" c="dimmed">
        Screen: {laptop.screen}"
      </Text>
      <Group mt={10} align="center">
        <Text c="blue" size="xl">
          {laptop.finalPrice} $
        </Text>
        <Badge color="pink" size="md">
          {laptop.status}
        </Badge>
      </Group>
    </Card>
  );
};

export default ItemCard;
