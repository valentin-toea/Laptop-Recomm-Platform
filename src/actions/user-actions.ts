"use server";

import { Laptop, RecombeeUser } from "../types";
import { client } from "../utils/recombee-client";
import { BatchResponse, requests as rqs } from "recombee-api-client";
import * as _ from "lodash";

export const getAllUsers = async () => {
  const users = (await client.send(
    new rqs.ListUsers({ returnProperties: true })
  )) as unknown as RecombeeUser[];

  return users;
};

export const createNewUser = async (idNumber: number) => {
  const setUserValueRequests = [
    new rqs.SetUserValues(
      `user-SP${idNumber + 1}`,
      { name: `new user - ${idNumber + 1}`, team: "new", location: "new" },
      {
        cascadeCreate: true,
      }
    ),
  ];
  await client.send(new rqs.Batch(setUserValueRequests));
};

export const getUserPurchases = async (userId: string) => {
  try {
    const purchases = await client.send(new rqs.ListUserPurchases(userId));

    const itemIds = purchases.map((purchase) => purchase.itemId);

    const items: BatchResponse = await client.send(
      new rqs.Batch(itemIds.map((id) => new rqs.GetItemValues(id)))
    );

    return itemIds.map((id, index) => ({
      productId: id,
      ...items[index].json,
    })) as Laptop[];
  } catch (err) {
    return [];
  }
};

export const getUserBookmarks = async (userId: string) => {
  try {
    const purchases = await client.send(new rqs.ListUserBookmarks(userId));

    const itemIds = purchases.map((purchase) => purchase.itemId);

    const items: BatchResponse = await client.send(
      new rqs.Batch(itemIds.map((id) => new rqs.GetItemValues(id)))
    );

    return itemIds.map((id, index) => ({
      productId: id,
      ...items[index].json,
    })) as Laptop[];
  } catch (err) {
    return [];
  }
};

export const getUserViews = async (userId: string) => {
  try {
    const purchases = await client.send(new rqs.ListUserDetailViews(userId));

    const itemIds = purchases.map((purchase) => purchase.itemId);

    const items: BatchResponse = await client.send(
      new rqs.Batch(itemIds.map((id) => new rqs.GetItemValues(id)))
    );

    const allViews = itemIds.map((id, index) => ({
      productId: id,
      ...items[index].json,
    })) as Laptop[];

    return _.uniqWith(allViews, _.isEqual);
  } catch (err) {
    return [];
  }
};

export async function calculatePreferredBrandFromDetailViews(userId: string) {
  const COMMON_STORAGE_SIZES = [128, 256, 512, 1024, 2048];
  function approximateStorageSize(size: number): number {
    return COMMON_STORAGE_SIZES.reduce((prev, curr) =>
      Math.abs(curr - size) < Math.abs(prev - size) ? curr : prev
    );
  }

  try {
    const purchases = await client.send(new rqs.ListUserDetailViews(userId));

    if (purchases.length === 0) return {};

    const itemIds = purchases.map((purchase) => purchase.itemId);

    const items: BatchResponse = await client.send(
      new rqs.Batch(itemIds.map((id) => new rqs.GetItemValues(id)))
    );

    const allViews = itemIds.map((id, index) => ({
      productId: id,
      ...items[index].json,
    })) as Laptop[];

    const brandCounts: Record<string, number> = {};
    const cpuCounts: Record<string, number> = {};
    const gpuCounts: Record<string, number> = {};
    const screenSizes: number[] = [];
    const storageSizes: number[] = [];

    allViews.forEach((event) => {
      const brand = event.brand;
      const cpu = event.cpu;
      const screen = event.screen;
      const gpu = event.gpu;
      const storage = event.storage;

      if (brand) {
        brandCounts[brand] = (brandCounts[brand] || 0) + 1;
      }
      if (cpu) {
        cpuCounts[cpu] = (cpuCounts[cpu] || 0) + 1;
      }
      if (gpu) {
        gpuCounts[gpu] = (gpuCounts[gpu] || 0) + 1;
      }
      if (screen !== undefined) {
        const screenSize = parseFloat(screen);
        if (!isNaN(screenSize)) {
          screenSizes.push(screenSize);
        }
      }
      if (storage !== undefined) {
        const storageSize = parseInt(storage, 10);
        if (!isNaN(storageSize)) {
          storageSizes.push(storageSize);
        }
      }
    });

    const preferredBrand = Object.keys(brandCounts).reduce((a, b) =>
      brandCounts[a] > brandCounts[b] ? a : b
    );

    const preferredCPU = Object.keys(cpuCounts).reduce((a, b) =>
      cpuCounts[a] > cpuCounts[b] ? a : b
    );

    const preferredGPU = Object.keys(gpuCounts).reduce((a, b) =>
      gpuCounts[a] > gpuCounts[b] ? a : b
    );

    const preferredScreen =
      screenSizes.reduce((sum, size) => sum + size, 0) / screenSizes.length;

    const preferredStorage =
      storageSizes.reduce((sum, size) => sum + size, 0) / storageSizes.length;

    return {
      preferredBrand,
      preferredCPU,
      preferredScreen,
      preferredGPU,
      preferredStorage: approximateStorageSize(preferredStorage),
    };
  } catch (err) {
    throw err;
  }
}

export async function calculatePurchaseFrequency(
  userId: string
): Promise<number> {
  try {
    const response = await client.send(new rqs.ListUserPurchases(userId));

    if (response.length === 0) {
      return 0;
    }

    const timestamps = response.map((event) => new Date(event.timestamp || ""));
    timestamps.sort((a, b) => a.getTime() - b.getTime());

    const firstPurchaseDate = timestamps[0];
    const lastPurchaseDate = timestamps[timestamps.length - 1];

    const timeSpanInDays =
      Math.floor(
        (lastPurchaseDate.getTime() - firstPurchaseDate.getTime()) /
          (1000 * 60 * 60 * 24)
      ) || 1;

    const frequency = response.length / (timeSpanInDays || 1);

    return frequency;
  } catch (error) {
    return 0;
  }
}
