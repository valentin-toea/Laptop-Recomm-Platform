"use client";

import { Carousel } from "@mantine/carousel";
import React from "react";
import classes from "./UserRecommendedItems.module.css";
import { useUserData } from "../hooks/useUserData";
import { Center, Stack, Text } from "@mantine/core";
import ItemCard from "./ItemCard";
import { useSimilarItems } from "../hooks/useSimilarItems";

const SimilarItems = ({
  itemId,
  userPersonalised = false,
  itemPrice = "",
}: {
  itemId: string;
  userPersonalised?: boolean;
  itemPrice: string;
}) => {
  const { mainUser } = useUserData();
  const { personalItems, inRangeItems } = useSimilarItems(
    itemId,
    mainUser?.userId,
    itemPrice
  );

  return (
    <Stack>
      <Text size="lg" fw={700}>
        Similar Laptops to this one
      </Text>
      <Carousel
        height={400}
        slideSize="10%"
        slideGap="xl"
        align="start"
        slidesToScroll={2}
        classNames={classes}
      >
        {inRangeItems.map((item) => (
          <Carousel.Slide component={Center} key={item.productId}>
            <ItemCard laptop={item} />
          </Carousel.Slide>
        ))}
      </Carousel>
      <Text size="lg" fw={700}>
        Recommended for you based on this
      </Text>
      <Carousel
        height={400}
        slideSize="10%"
        slideGap="xl"
        align="start"
        slidesToScroll={2}
        classNames={classes}
      >
        {personalItems.map((item) => (
          <Carousel.Slide component={Center} key={item.productId}>
            <ItemCard laptop={item} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Stack>
  );
};

export default SimilarItems;
