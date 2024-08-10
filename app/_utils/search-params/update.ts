/**
 * 引数で受け取った URLSearchParams を変更せず、コピーして更新した新しいインスタンスを返す。
 */
export const toUpdatedSearchParams = (
  previous: URLSearchParams,
  fn: (value: URLSearchParams) => void,
) => {
  const params = new URLSearchParams(previous);
  fn(params);
  return params;
};
