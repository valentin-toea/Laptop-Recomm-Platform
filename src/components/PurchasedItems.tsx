"use client";
import { Grid, SimpleGrid, Stack, Text } from "@mantine/core";
import React from "react";
import ItemCard from "./ItemCard";
import { useUserData } from "../hooks/useUserData";
import { usePurchasedItems } from "../hooks/usePurchasedItems";

const PurchasedItems = () => {
  const { mainUser } = useUserData();
  const { purchasedItems, viewedItems, bookmarkItems } = usePurchasedItems(
    mainUser?.userId
  );

  return (
    <Stack>
      <Text size="lg" fw={700}>
        Purchased Items
      </Text>
      {!purchasedItems.length && <h2>No items</h2>}
      <SimpleGrid
        cols={{ base: 2, sm: 3, lg: 5 }}
        spacing={{ base: 10, sm: "xl" }}
        verticalSpacing={{ base: "md", sm: "xl" }}
      >
        {purchasedItems.map((laptop, idx) => (
          <div key={idx}>
            <ItemCard laptop={laptop} />
          </div>
        ))}
      </SimpleGrid>
      <Text size="lg" fw={700}>
        Bookmarks
      </Text>
      {!bookmarkItems.length && <h2>No items</h2>}
      <SimpleGrid
        cols={{ base: 2, sm: 3, lg: 5 }}
        spacing={{ base: 10, sm: "xl" }}
        verticalSpacing={{ base: "md", sm: "xl" }}
      >
        {bookmarkItems.map((laptop, idx) => (
          <div key={idx}>
            <ItemCard laptop={laptop} />
          </div>
        ))}
      </SimpleGrid>
      <Text size="lg" fw={700}>
        Viewed Items
      </Text>
      {!viewedItems.length && <h2>No items</h2>}
      <SimpleGrid
        cols={{ base: 2, sm: 3, lg: 5 }}
        spacing={{ base: 10, sm: "xl" }}
        verticalSpacing={{ base: "md", sm: "xl" }}
      >
        {viewedItems.map((laptop, idx) => (
          <div key={idx}>
            <ItemCard laptop={laptop} />
          </div>
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default PurchasedItems;
