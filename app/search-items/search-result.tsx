import { type FC, use } from "react";
import clsx from "clsx";

import type { Item } from "./__models/item";

type Props = {
  itemsPromise: Promise<Item[]>;
};

const PriceFormatter = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
});

export const SearchResult: FC<Props> = ({ itemsPromise }) => {
  const items = use(itemsPromise);

  return (
    <div className="container mx-auto px-4">
      {items.map((item) => (
        <div key={item.id} className="p-4 border-b">
          <div className="text-xl text-slate font-bold">{item.name}</div>
          <div className="flex justify-between">
            <div>{PriceFormatter.format(item.price)}</div>
            <div className="text-slate-400">
              <Rating rating={item.rating} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Rating: FC<{ rating: number }> = ({ rating }) => {
  return (
    <span className="inline-flex items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={clsx(
            "w-4 h-4 fill-current",
            i < rating ? "text-slate" : "text-slate-200",
          )}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path d="M12 2l2.4 6.8H22l-5.6 4.4 2.4 6.8L12 17.6 4.8 20l2.4-6.8L2 8.8h7.6z" />
        </svg>
      ))}
      <span className="sr-only">Rating: {rating}</span>
    </span>
  );
};

export const SearchResultFallback: FC = () => {
  return (
    <div className="container mx-auto px-4 ">
      <div className="px-4 py-16 text-xl text-center text-slate-700 bg-slate-100 animate-pulse">
        読み込み中…
      </div>
    </div>
  );
};
