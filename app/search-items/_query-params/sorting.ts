/**
 * @fileoverview クエリパラメータ -> SortingOption およびその逆の変換のためのユーティリティ群
 */

import type { ParsedUrlQuery } from "node:querystring";
import { getSingleQueryParam } from "@honey32/next-query-utils";

import { withDefault } from "@/app/_utils/with-default";
import {
  type SortingOption,
  getSortingOption,
  sortingOptions,
} from "../__models/misc/sorting";

export const defaultSortingOption = sortingOptions.priceAsc;

/**
 * {@link URLSearchParams} から {@link SortingOption} を取得する。
 *
 * 該当するものが無い場合は、{@link defaultSortingOption} を返す。
 */
export const getSortingOption_URLSearchParams = withDefault(
  (query: URLSearchParams): SortingOption | undefined => {
    const sort = query.get("sort");
    const order = query.get("order");

    if (!sort || !order) return undefined;
    return getSortingOption({ sort, order });
  },
  defaultSortingOption,
);

/**
 * {@link ParsedUrlQuery} から {@link SortingOption} を取得する
 *
 * 該当するものが無い場合は、{@link defaultSortingOption} を返す。
 */
export const getSortingOption_ParsedUrlQuery = withDefault(
  (query: ParsedUrlQuery): SortingOption | undefined => {
    const sort = getSingleQueryParam(query, "sort");
    const order = getSingleQueryParam(query, "order");

    if (!sort || !order) return undefined;
    return getSortingOption({ sort, order });
  },
  defaultSortingOption,
);

/**
 * {@link URLSearchParams} を、与えられた {@link SortingOption} で破壊的に更新する
 */
export const setSortingOption_URLSearchParams = (
  it: URLSearchParams,
  option: Pick<SortingOption, "sort" | "order">,
): void => {
  it.set("sort", option.sort);
  it.set("order", option.order);
};
