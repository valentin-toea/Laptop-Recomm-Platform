"use client";

import { Carousel } from "@mantine/carousel";
import React from "react";
import classes from "./UserRecommendedItems.module.css";
import { useUserData } from "../hooks/useUserData";
import { Center } from "@mantine/core";
import ItemCard from "./ItemCard";
import { useSimilarItems } from "../hooks/useSimilarItems";

const SimilarItems = ({
  itemId,
  userPersonalised = false,
}: {
  itemId: string;
  userPersonalised?: boolean;
}) => {
  const { mainUser } = useUserData();
  const { recommItems } = useSimilarItems(
    itemId,
    userPersonalised ? mainUser?.userId : undefined
  );

  return (
    <Carousel
      height={400}
      slideSize="10%"
      slideGap="xl"
      align="start"
      slidesToScroll={2}
      classNames={classes}
    >
      {recommItems.map((item) => (
        <Carousel.Slide component={Center} key={item.productId}>
          <ItemCard laptop={item} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default SimilarItems;
