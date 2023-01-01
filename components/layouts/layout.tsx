import React, { ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
