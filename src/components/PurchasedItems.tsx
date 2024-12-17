"use client";
import { Grid, SimpleGrid, Stack, Text } from "@mantine/core";
import React from "react";
import ItemCard from "./ItemCard";
import { useUserData } from "../hooks/useUserData";
import { usePurchasedItems } from "../hooks/usePurchasedItems";

const PurchasedItems = () => {
  const { mainUser } = useUserData();
  const { purchasedItems } = usePurchasedItems(mainUser?.userId);

  return (
    <Stack>
      <Text size="lg" fw={700}>
        Purchased Items
      </Text>
      <SimpleGrid
        cols={{ base: 2, sm: 3, lg: 5 }}
        spacing={{ base: 10, sm: "xl" }}
        verticalSpacing={{ base: "md", sm: "xl" }}
      >
        {purchasedItems.map((laptop) => (
          <div key={laptop.productId}>
            <ItemCard laptop={laptop} />
          </div>
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default PurchasedItems;
