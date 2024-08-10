import { cache } from "react";
import type { Item } from "../__models/item";

const dummyData: Item[] = [
  {
    id: "1",
    name: "絵本「素早い茶色のきつね」",
    price: 950,
    rating: 4,
  },
  {
    id: "2",
    name: "絵本「アリスとボブ」",
    price: 2400,
    rating: 3,
  },
  {
    id: "3",
    name: "あしたから使える「のろまな犬」と「ジャンピング・オーバー法」",
    price: 4500,
    rating: 5,
  },
  {
    id: "4",
    name: "【2024年決定版】読むと CSS が完全に理解できる本",
    price: 2000,
    rating: 2,
  },
  {
    id: "5",
    name: "自然哲学の数学的諸原理",
    price: 25900,
    rating: 4,
  },
];

export const fetchItems = cache(async (sort: string, order: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    pagination: {
      total: dummyData.length,
      page: 1,
      perPage: 10,
    },
    items: dummyData.sort((a, b) => {
      if (sort === "price") {
        return order === "asc" ? a.price - b.price : b.price - a.price;
      } else {
        return order === "asc" ? a.rating - b.rating : b.rating - a.rating;
      }
    }),
  };
});
