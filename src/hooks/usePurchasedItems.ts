import { useEffect, useState } from "react";
import { Laptop, LaptopRecord, RecommendedLaptop } from "../types";
import { getRecommendedItems } from "../actions/item-actions";
import { getUserPurchases } from "../actions/user-actions";

export const usePurchasedItems = (userId: string | undefined) => {
  const [purchasedItems, setPurchasedItems] = useState<Laptop[]>([]);

  useEffect(() => {
    (async () => {
      if (!userId) return;

      const items = await getUserPurchases(userId);
      setPurchasedItems(items);
    })();
  }, [userId]);

  return { purchasedItems };
};
