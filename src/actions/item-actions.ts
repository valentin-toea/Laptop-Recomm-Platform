"use server";

import { Laptop } from "../types";
import { client } from "../utils/recombee-client";
import { requests as rqs } from "recombee-api-client";

export const getRecommendedItems = async (userId: string) => {
  const response = await client.send(
    new rqs.RecommendItemsToUser(userId, 10, { returnProperties: true })
  );

  return response.recomms.map((recomm) => ({
    productId: recomm.id,
    ...recomm.values,
  })) as unknown as Laptop[];
};

export const getItemDetails = async (itemId: string) => {
  const itemDetails = (await client.send(
    new rqs.GetItemValues(itemId)
  )) as object;

  return { productId: itemId, ...itemDetails } as Laptop;
};

export const getSimilarItems = async (
  itemId: string,
  userId: string | undefined
) => {
  const items = await client.send(
    new rqs.RecommendItemsToItem(itemId, userId ?? "None", 10, {
      returnProperties: true,
    })
  );

  return items.recomms.map((recomm) => ({
    productId: recomm.id,
    ...recomm.values,
  })) as unknown as Laptop[];
};
