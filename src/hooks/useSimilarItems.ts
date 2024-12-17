import { useEffect, useState } from "react";
import { Laptop } from "../types";
import { getSimilarItems } from "../actions/item-actions";

export const useSimilarItems = (
  itemId: string | undefined,
  userId: string | undefined
) => {
  const [recommItems, setRecommItems] = useState<Laptop[]>([]);

  useEffect(() => {
    (async () => {
      if (!itemId) return;

      const items = await getSimilarItems(itemId, userId);
      setRecommItems(items);
    })();
  }, [userId]);

  return { recommItems };
};
