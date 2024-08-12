import type { Metadata } from "next";
import type { FC } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "DEMO: 選択肢定数",
};

type Props = {
  children: React.ReactNode;
};

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
