import { useEffect, useState } from "react";
import { Laptop } from "../types";
import {
  getSimilarItems,
  recommendInPriceRange,
} from "../actions/item-actions";

export const useSimilarItems = (
  itemId: string | undefined,
  userId: string | undefined,
  itemPrice: string | undefined
) => {
  const [personalItems, setPersonalItems] = useState<Laptop[]>([]);
  const [inRangeItems, setInRangeItems] = useState<Laptop[]>([]);

  useEffect(() => {
    (async () => {
      if (!itemId) return;

      const items = await getSimilarItems(itemId, userId);
      setPersonalItems(items);

      const rangeItems = await recommendInPriceRange(
        itemId,
        itemPrice || "300"
      );
      setInRangeItems(rangeItems);
    })();
  }, [userId]);

  return { personalItems, inRangeItems };
};
