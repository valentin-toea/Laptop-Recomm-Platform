"use client";
import { Carousel } from "@mantine/carousel";
import React from "react";
import ItemCard from "./ItemCard";
import { Center, Flex } from "@mantine/core";
import classes from "./UserRecommendedItems.module.css";
import { useGetCategories } from "../hooks/useGetCategories";

const Categories = () => {
  const { gamingLaptops, studentLaptops, powerLaptops, officeLaptops } =
    useGetCategories();

  return (
    <Flex direction="column" gap={20}>
      <div>
        <h3>Gaming Laptops</h3>
        <Carousel
          height={450}
          slideSize="10%"
          slideGap="xl"
          align="start"
          slidesToScroll={2}
          classNames={classes}
        >
          {gamingLaptops.map((item) => (
            <Carousel.Slide component={Center} key={item.productId}>
              <ItemCard laptop={item} />
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>

      <div>
        <h3>Student Laptops</h3>
        <Carousel
          height={450}
          slideSize="10%"
          slideGap="xl"
          align="start"
          slidesToScroll={2}
          classNames={classes}
        >
          {studentLaptops.map((item) => (
            <Carousel.Slide component={Center} key={item.productId}>
              <ItemCard laptop={item} />
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>

      <div>
        <h3>Power Laptops {"(Grafic Designers, Power Users)"}</h3>
        <Carousel
          height={450}
          slideSize="10%"
          slideGap="xl"
          align="start"
          slidesToScroll={2}
          classNames={classes}
        >
          {powerLaptops.map((item) => (
            <Carousel.Slide component={Center} key={item.productId}>
              <ItemCard laptop={item} />
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>

      <div>
        <h3>Office/Bussiness Laptops</h3>
        <Carousel
          height={450}
          slideSize="10%"
          slideGap="xl"
          align="start"
          slidesToScroll={2}
          classNames={classes}
        >
          {officeLaptops.map((item) => (
            <Carousel.Slide component={Center} key={item.productId}>
              <ItemCard laptop={item} />
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </Flex>
  );
};

export default Categories;
