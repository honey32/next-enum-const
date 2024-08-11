"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FC, useState, useTransition } from "react";
import clsx from "clsx";

import { toUpdatedSearchParams } from "../_utils/search-params/update";
import {
  getSortingOptionById,
  SortingOption,
  sortingOptions,
} from "./__models/misc/sorting";
import {
  getSortingOption_URLSearchParams,
  setSortingOption_URLSearchParams,
} from "./_query-params/sorting";

/**
 * ページ遷移が完了せずとも、セレクトボックスの状態は先に更新したいので、楽観的更新として扱う。
 *
 * TODO: たぶん React 19 なら useOptimistic で置き換えできそう。
 */
const useOptimisticSorting = (state: SortingOption) => {
  const [optimisticSorting, setOptimisticSorting] = useState(state);
  const [isPending, startTransition] = useTransition();

  return [
    isPending ? optimisticSorting : state,
    setOptimisticSorting,
    startTransition,
  ] as const;
};

// select に、この順番で表示する。
const options = [
  sortingOptions.priceDesc,
  sortingOptions.priceAsc,
  sortingOptions.ratingDesc,
  sortingOptions.ratingAsc,
];

type Props = {
  className?: string;
};

export const SortSelect: FC<Props> = ({ className }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sorting = getSortingOption_URLSearchParams(searchParams);
  const [optimisticSorting, setOptimisticSorting, startTransition] =
    useOptimisticSorting(sorting);

  return (
    <select
      className={clsx(
        "p-2 border-2 bg-slate-100 hover:bg-slate-200 rounded cursor-pointer",
        className,
      )}
      value={optimisticSorting.id}
      onChange={(e) => {
        const option = getSortingOptionById(e.target.value);
        if (!option) return;
        setOptimisticSorting(option);
        startTransition(() => {
          const newSearchParams = toUpdatedSearchParams(
            searchParams, //
            (it) => setSortingOption_URLSearchParams(it, option),
          );
          router.push(`?${newSearchParams.toString()}`);
        });
      }}
    >
      {options.map((option) => (
        <option
          key={option.id}
          value={option.id}
          className="p-2 hover:bg-slate-100 rounded hover:outline-none"
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};
