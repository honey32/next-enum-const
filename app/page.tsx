import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-8">
      <h1 className="text-5xl font-bold">
        Next.js で「選択肢」定数を動作確認するためのデモ
      </h1>

      <Link
        href="/search-items"
        className="text-3xl text-sky-600 font-bold hover:text-sky-400 hover:underline"
      >
        <code>/search-items</code>を見る
      </Link>
    </main>
  );
}
