import { Stack, Text } from "@mantine/core";
import UserRecommendedItems from "../components/UserRecommendedItems";

export default function HomePage() {
  return (
    <Stack>
      <Text size="lg" fw={700}>
        Recommended Laptops For You
      </Text>
      <UserRecommendedItems />
      <Text size="lg" fw={700}>
        Laptops
      </Text>
    </Stack>
  );
}
