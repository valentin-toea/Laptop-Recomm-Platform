"use server";

import { Laptop } from "../types";
import { client } from "../utils/recombee-client";
import { requests as rqs } from "recombee-api-client";

export const getRecommendedItems = async (userId: string) => {
  const response = await client.send(
    new rqs.RecommendItemsToUser(userId, 10, {
      returnProperties: true,
      scenario: "laptopx",
    })
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

export async function recommendInPriceRange(itemId: string, price: string) {
  const minPrice = Number(price) * 0.8;
  const maxPrice = Number(price) * 1.2;

  try {
    const response = await client.send(
      new rqs.RecommendItemsToItem(itemId, "None", 10, {
        returnProperties: true,
        scenario: "laptop-to-laptop",
        filter: `'finalPrice' >= ${minPrice} AND 'finalPrice' <= ${maxPrice}`,
      })
    );

    return response.recomms.map((recomm) => ({
      productId: recomm.id,
      ...recomm.values,
    })) as unknown as Laptop[];
  } catch (error) {
    return [];
  }
}

export const getSimilarItems = async (
  itemId: string,
  userId: string | undefined
) => {
  const items = await client.send(
    new rqs.RecommendItemsToItem(itemId, userId ?? "None", 10, {
      returnProperties: true,
      scenario: "laptop-to-laptop",
    })
  );

  return items.recomms.map((recomm) => ({
    productId: recomm.id,
    ...recomm.values,
  })) as unknown as Laptop[];
};

const gamingCPUList = [
  "Intel Core i7",
  "Intel Core i5",
  "AMD Ryzen 7",
  "AMD Ryzen 5",
  "Intel Core i9",
  "AMD Ryzen 9",
];

export const getGamingLaptops = async () => {
  const minRAM = 8;
  const minSSD = 512;

  const filter = `'cpu' IN [${gamingCPUList
    .map((cpu) => `"${cpu}"`)
    .join(
      ", "
    )}] AND 'ram' >= ${minRAM} AND 'storage' >= ${minSSD} AND 'gpu' != ""`;

  const response = await client.send(
    new rqs.ListItems({
      filter: filter,
      returnProperties: true,
    })
  );

  const shuffledItems = response.sort(() => 0.5 - Math.random());

  const limitedItems = shuffledItems.slice(0, 15);

  return limitedItems.map((recomm) => ({
    productId: recomm.itemId,
    ...recomm,
  })) as unknown as Laptop[];
};

export const getStudentLaptops = async () => {
  const minSSD = 256;

  const filter = `'cpu' NOT IN [${gamingCPUList
    .map((cpu) => `"${cpu}"`)
    .join(
      ", "
    )}] AND 'ram' >= 4 AND 'ram' <= 8 AND 'storage' >= ${minSSD}  AND 'gpu' == "" AND 'finalPrice' <= 1000`;

  const response = await client.send(
    new rqs.ListItems({
      filter: filter,
      returnProperties: true,
    })
  );

  const shuffledItems = response.sort(() => 0.5 - Math.random());

  const limitedItems = shuffledItems.slice(0, 15);

  return limitedItems.map((recomm) => ({
    productId: recomm.itemId,
    ...recomm,
  })) as unknown as Laptop[];
};

const designerCPUList = [
  "Intel Core i7",
  "AMD Ryzen 7",
  "Intel Core i9",
  "AMD Ryzen 9",
];

export const getGraficLaptops = async () => {
  const minSSD = 1000;

  const filter = `'cpu' IN [${designerCPUList
    .map((cpu) => `"${cpu}"`)
    .join(
      ", "
    )}] AND 'ram' >= 16 AND 'storage' >= ${minSSD}  AND 'gpu' != "" AND 'finalPrice' >= 1300`;

  const response = await client.send(
    new rqs.ListItems({
      filter: filter,
      returnProperties: true,
    })
  );

  const shuffledItems = response.sort(() => 0.5 - Math.random());

  const limitedItems = shuffledItems.slice(0, 15);

  return limitedItems.map((recomm) => ({
    productId: recomm.itemId,
    ...recomm,
  })) as unknown as Laptop[];
};

export const getOfficeLaptops = async () => {
  const minSSD = 512;

  const filter = `'cpu' IN [${gamingCPUList
    .map((cpu) => `"${cpu}"`)
    .join(
      ", "
    )}] AND 'ram' >= 16 AND 'storage' >= ${minSSD} AND 'finalPrice' >= 800 AND 'finalPrice' <= 1500 AND 'screen' <= 15.6 AND "Gaming" NOT IN split('laptop', " ")`;

  const response = await client.send(
    new rqs.ListItems({
      filter: filter,
      returnProperties: true,
    })
  );

  const shuffledItems = response.sort(() => 0.5 - Math.random());

  const limitedItems = shuffledItems.slice(0, 15);

  return limitedItems.map((recomm) => ({
    productId: recomm.itemId,
    ...recomm,
  })) as unknown as Laptop[];
};

export async function markLaptopAsViewed(userId: string, laptopId: string) {
  try {
    const response = await client.send(
      new rqs.AddDetailView(userId, laptopId, {
        timestamp: new Date().toISOString(),
        cascadeCreate: true,
      })
    );

    return response;
  } catch (error) {
    console.error("Err", error);
  }
}

export async function markLaptopAsPurchased(
  userId: string,
  laptopId: string,
  amount = 1
) {
  try {
    const response = await client.send(
      new rqs.AddPurchase(userId, laptopId, {
        timestamp: new Date().toISOString(),
        cascadeCreate: true,
        amount: amount,
      })
    );

    return response;
  } catch (error) {
    console.error("err", error);
  }
}

export async function markLaptopAsBookmark(userId: string, laptopId: string) {
  try {
    const response = await client.send(
      new rqs.AddBookmark(userId, laptopId, {
        timestamp: new Date().toISOString(),
        cascadeCreate: true,
      })
    );

    return response;
  } catch (error) {
    console.error("err", error);
  }
}
