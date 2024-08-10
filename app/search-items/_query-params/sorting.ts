/**
 * @fileoverview クエリパラメータ -> SortingOption およびその逆の変換のためのユーティリティ群
 */

import { ParsedUrlQuery } from "node:querystring";
import {
  SortingOption,
  getSortingOption,
  sortingOptions,
} from "../__models/misc/sorting";
import { getSingleQueryParam } from "@honey32/next-query-utils";

export const defaultSortingOption = sortingOptions.priceAsc;

/**
 * undefined を返しうる関数をラップして、undefined の代わりに引数で指定したフォールバック値を返す関数を提供する。
 *
 * @param fn undefined を返しうる関数
 * @param fallbackValue fn が undefined を返した場合に代わりに返すためのフォールバック値
 */
const withDefault = <Fn extends (...args: any) => any>(
  fn: Fn,
  fallbackValue: NoInfer<NonNullable<ReturnType<Fn>>>,
): ((...args: Parameters<Fn>) => NonNullable<ReturnType<Fn>>) => {
  return (...args: Parameters<Fn>) => {
    const result = fn(...args);
    return result ?? fallbackValue;
  };
};

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
