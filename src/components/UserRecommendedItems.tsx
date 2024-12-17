"use client";
import React from "react";
import { Carousel } from "@mantine/carousel";
import ItemCard from "./ItemCard";
import { Center } from "@mantine/core";
import { useRecommendedItems } from "../hooks/useRecommendedItems";
import { useUserData } from "../hooks/useUserData";
import classes from "./UserRecommendedItems.module.css";

const UserRecommendedItems = () => {
  const { mainUser } = useUserData();
  const { recommItems } = useRecommendedItems(mainUser?.userId);

  return (
    <Carousel
      height={450}
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

export default UserRecommendedItems;
