/**
 * セレクトボックス等の選択肢としての「ソート条件・ソート順」の選択肢
 */
export type SortingOption = {
  /**
   * 一意の id。select の value として使う。
   */
  id: string;

  /**
   * sort クエリパラメータの値
   */
  sort: string;
  /**
   * order クエリパラメータの値
   */
  order: string;

  /**
   * 表示名。select の表示等に使う
   */
  label: string;
};

/**
 * 「商品一覧」ページの「ソート順」の選択肢をまとめた SSoT
 */
export const sortingOptions = {
  priceDesc: {
    id: "priceDesc",
    sort: "price",
    order: "desc",
    label: "価格が高い順",
  },
  priceAsc: {
    id: "priceAsc",
    sort: "price",
    order: "asc",
    label: "価格が安い順",
  },
  ratingDesc: {
    id: "ratingDesc",
    sort: "rating",
    order: "desc",
    label: "平均評価が高い順",
  },
  ratingAsc: {
    id: "ratingAsc",
    sort: "rating",
    order: "asc",
    label: "平均評価が低い順",
  },
} as const satisfies Record<string, SortingOption>;

/**
 * {@link SortingOption} の id が取りうる値のユニオン型。
 */
export type SortingOptionId = keyof typeof sortingOptions;

//
// Single Source of Truth ここまで ---
//
// ここから、逆引き用のロジックおよびそのためのデータ置き場
//

// SortingOption の一意の id -> SortingOption のマッピングのためのデータ置き場

const idOptionMap = new Map<string, SortingOption>(
  Object.values(sortingOptions).map((v) => [v.id, v]),
);

/**
 * `id` から逆引きで {@link SortingOption} を取得する。見つからない場合は undefined を返す。
 */
export const getSortingOptionById = (id: string): SortingOption | undefined =>
  idOptionMap.get(id);

// SortingOption の key と order から SortingOption を取得するためのデータ置き場

const options = Object.values(sortingOptions);

/**
 * `{ sort, order }` の組から、逆引きで {@link SortingOption} を取得する。見つからない場合は undefined を返す。
 */
export const getSortingOption = (
  sortOption: Pick<SortingOption, "sort" | "order">,
): SortingOption | undefined => {
  const { sort, order } = sortOption;
  return options.find((it) => it.sort === sort && it.order === order);
};
