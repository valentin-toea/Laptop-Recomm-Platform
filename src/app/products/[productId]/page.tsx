"use client";
import React, { useEffect, useState } from "react";
import {
  getItemDetails,
  markLaptopAsBookmark,
  markLaptopAsPurchased,
  markLaptopAsViewed,
} from "../../../actions/item-actions";
import { Badge, Button, Flex, Group, Image, Stack, Text } from "@mantine/core";
import SimilarItems from "../../../components/SimilarItems";
import { useParams } from "next/navigation";
import { Laptop } from "../../../types";
import { useUserData } from "../../../hooks/useUserData";
import { notifications } from "@mantine/notifications";

const page = () => {
  const { productId } = useParams();
  const [laptop, setLaptop] = useState<Laptop>();
  const { mainUser } = useUserData();

  async function buyLaptop() {
    try {
      await markLaptopAsPurchased(mainUser.userId, productId as string);
      notifications.show({
        title: "",
        message: "Product purchased succesfully! 🌟",
      });
    } catch (err) {
      notifications.show({
        title: "Error",
        message: "Error purchasing item",
      });
    }
  }

  async function bookmarkLaptop() {
    try {
      await markLaptopAsBookmark(mainUser.userId, productId as string);
      notifications.show({
        title: "Bookmark",
        message: "Product bookmarked succesfully! 🌟",
      });
    } catch (err) {
      notifications.show({
        title: "Error",
        message: "Error bookmarking item",
      });
    }
  }

  useEffect(() => {
    async function getData() {
      if (!productId) return;
      const data = await getItemDetails(productId as string);
      setLaptop(data);
    }
    markLaptopAsViewed(mainUser.userId, productId as string);
    getData();
  }, []);

  if (!laptop) return <p></p>;

  return (
    <Stack>
      <Group align="center" gap={30}>
        <Image
          src="https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          height={350}
        />
        <Stack>
          <Text fw={500} maw={450}>
            {laptop.laptop}
          </Text>
          <Text size="md">Brand: {laptop.brand}</Text>
          <Text size="MD">CPU: {laptop.cpu}</Text>
          <Text size="md">GPU: {laptop.gpu}</Text>
          <Text size="md">RAM: {laptop.ram}</Text>
          <Text size="md">
            Storage: {laptop.storage} {laptop.storageType}
          </Text>
          <Text size="md">Screen: {laptop.screen}"</Text>
          <Group align="center">
            <Text c="blue" size="xl">
              {laptop.finalPrice} $
            </Text>
            <Badge color="pink" size="md">
              {laptop.status}
            </Badge>
          </Group>
          <Flex direction="row" gap={20}>
            <Button miw={150} onClick={() => buyLaptop()}>
              Buy
            </Button>
            <Button color="orange" miw={150} onClick={() => bookmarkLaptop()}>
              Bookmark
            </Button>
          </Flex>
        </Stack>
      </Group>
      <Stack>
        <SimilarItems
          itemId={laptop.productId}
          itemPrice={laptop.finalPrice}
          userPersonalised
        />
      </Stack>
    </Stack>
  );
};

export default page;
