"use server";

import { Laptop, RecombeeUser } from "../types";
import { client } from "../utils/recombee-client";
import { BatchResponse, requests as rqs } from "recombee-api-client";

export const getAllUsers = async () => {
  const users = (await client.send(
    new rqs.ListUsers({ returnProperties: true })
  )) as unknown as RecombeeUser[];

  return users;
};

export const getUserPurchases = async (userId: string) => {
  const purchases = await client.send(new rqs.ListUserPurchases(userId));

  const itemIds = purchases.map((purchase) => purchase.itemId);

  const items: BatchResponse = await client.send(
    new rqs.Batch(itemIds.map((id) => new rqs.GetItemValues(id)))
  );

  return itemIds.map((id, index) => ({
    productId: id,
    ...items[index].json,
  })) as Laptop[];
};
