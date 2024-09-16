"use client";
import React, { FC, ReactNode } from "react";
import QueryProvider from "../available-flights/providers/query-providers";
import Script from "next/script";

interface LayoutProps {
  children: ReactNode;
}

const midtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY ?? "";
const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <QueryProvider>{children}</QueryProvider>
      <Script
        type="text/javascript"
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={midtransClientKey}
      ></Script>
    </>
  );
};

export default Layout;
