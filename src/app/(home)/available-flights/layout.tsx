import React, { FC, ReactNode } from "react";
import QueryProvider from "./providers/query-providers";
import Flightproviders from "./providers/flight-providers";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <QueryProvider>
      <Flightproviders>{children}</Flightproviders>
    </QueryProvider>
  );
};

export default Layout;
