import type { ParsedUrlQuery } from "node:querystring";
import { type FC, Suspense } from "react";
import type { Metadata } from "next";

import { fetchItems } from "./_fetchers/fetch-items";
import { getSortingOption_ParsedUrlQuery } from "./_query-params/sorting";

import { SearchResult, SearchResultFallback } from "./search-result";
import { SortSelect } from "./sort-select";

export const metadata: Metadata = {
  title: "商品一覧",
};

type Props = {
  searchParams: ParsedUrlQuery;
};

const Page: FC<Props> = async ({ searchParams }) => {
  const option = getSortingOption_ParsedUrlQuery(searchParams);
  const itemsPromise = fetchItems(option.sort, option.order);

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold px-4">商品一覧</h1>

        <div className="flex items-center">
          <div className="ml-auto">ソート順：</div>
          <SortSelect />
        </div>
      </div>

      <Suspense fallback={<SearchResultFallback />}>
        <SearchResult itemsPromise={itemsPromise.then(({ items }) => items)} />
      </Suspense>
    </div>
  );
};

export default Page;
