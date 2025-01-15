import { useEffect, useState } from "react";
import { Laptop, LaptopRecord, RecommendedLaptop } from "../types";
import { getRecommendedItems } from "../actions/item-actions";
import {
  getUserBookmarks,
  getUserPurchases,
  getUserViews,
} from "../actions/user-actions";

export const usePurchasedItems = (userId: string | undefined) => {
  const [purchasedItems, setPurchasedItems] = useState<Laptop[]>([]);
  const [viewedItems, setViewedItems] = useState<Laptop[]>([]);
  const [bookmarkItems, setBookmarkItems] = useState<Laptop[]>([]);

  useEffect(() => {
    (async () => {
      if (!userId) return;

      const items = await getUserPurchases(userId);
      setPurchasedItems(items);

      const viewed = await getUserViews(userId);
      setViewedItems(viewed);

      const bookmark = await getUserBookmarks(userId);
      setBookmarkItems(bookmark);
    })();
  }, [userId]);

  return { purchasedItems, viewedItems, bookmarkItems };
};
