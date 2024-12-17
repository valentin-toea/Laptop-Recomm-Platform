import React from "react";
import { getItemDetails } from "../../../actions/item-actions";
import { Badge, Button, Group, Image, Stack, Text } from "@mantine/core";
import SimilarItems from "../../../components/SimilarItems";

const page = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const productId = (await params).productId;
  const laptop = await getItemDetails(productId);

  return (
    <Stack>
      <Group align="center" gap={30}>
        <Image
          src="https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          height={350}
        />
        <Stack>
          <Text fw={500} maw={450}>
            {laptop.laptop}
          </Text>
          <Text size="md">Brand: {laptop.brand}</Text>
          <Text size="MD">CPU: {laptop.cpu}</Text>
          <Text size="md">GPU: {laptop.gpu}</Text>
          <Text size="md">RAM: {laptop.ram}</Text>
          <Text size="md">
            Storage: {laptop.storage} {laptop.storageType}
          </Text>
          <Text size="md">Screen: {laptop.screen}"</Text>
          <Group align="center">
            <Text c="blue" size="xl">
              {laptop.finalPrice} $
            </Text>
            <Badge color="pink" size="md">
              {laptop.status}
            </Badge>
          </Group>
          <Button maw={150}>Buy</Button>
        </Stack>
      </Group>
      <Stack>
        <Text size="lg" fw={700}>
          Similar Laptops
        </Text>
        <SimilarItems itemId={laptop.productId} userPersonalised />
      </Stack>
    </Stack>
  );
};

export default page;
