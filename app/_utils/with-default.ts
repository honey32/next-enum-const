/**
 * undefined を返しうる関数をラップして、undefined の代わりに引数で指定したフォールバック値を返す関数を提供する。
 *
 * @param fn undefined を返しうる関数
 * @param fallbackValue fn が undefined を返した場合に代わりに返すためのフォールバック値
 */
export const withDefault = <Fn extends (...args: any) => any>(
  fn: Fn,
  fallbackValue: NoInfer<NonNullable<ReturnType<Fn>>>,
): ((...args: Parameters<Fn>) => NonNullable<ReturnType<Fn>>) => {
  return (...args: Parameters<Fn>) => {
    const result = fn(...args);
    return result ?? fallbackValue;
  };
};
