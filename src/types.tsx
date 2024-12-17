import { User } from "recombee-api-client";

export type RecombeeUser = User & { name: string; location: string };

export const LAPTOP_PROPERTIES = {
  laptop: "string",
  status: "string",
  brand: "string",
  model: "string",
  cpu: "string",
  ram: "int",
  storage: "int",
  storageType: "string",
  gpu: "string",
  screen: "double",
  touch: "boolean",
  finalPrice: "double",
} as const;

type LaptopProperty = keyof typeof LAPTOP_PROPERTIES;

export type LaptopRecord = {
  [key in LaptopProperty]: string;
};

export type Laptop = LaptopRecord & { productId: string };

export type RecommendedLaptop = {
  id: string;
  values: LaptopRecord;
};
