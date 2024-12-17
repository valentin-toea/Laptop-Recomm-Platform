import { useEffect, useState } from "react";
import { Laptop, RecommendedLaptop } from "../types";
import { getRecommendedItems } from "../actions/item-actions";

export const useRecommendedItems = (userId: string | undefined) => {
  const [recommItems, setRecommItems] = useState<Laptop[]>([]);

  useEffect(() => {
    (async () => {
      if (!userId) return;

      const items = await getRecommendedItems(userId);
      setRecommItems(items);
    })();
  }, [userId]);

  return { recommItems };
};
