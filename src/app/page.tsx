import { Stack, Text } from "@mantine/core";
import UserRecommendedItems from "../components/UserRecommendedItems";
import Categories from "../components/Categories";

export default function HomePage() {
  return (
    <Stack>
      <Text size="lg" fw={700}>
        Recommended Laptops For You
      </Text>
      <UserRecommendedItems />
      <Text size="xl" fw={700}>
        Categories
      </Text>
      <Categories />
    </Stack>
  );
}
