import React, { ReactNode } from "react";
import Footer from "./footer";
import Header from "./header/header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container min-h-screen relative pb-20 box-border">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
