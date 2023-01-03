import Image from "next/image";
import Link from "next/link";
import React from "react";
import HeaderNav from "./header_nav";

const Header = () => {
  return (
    <div className="flex items-center justify-between border-b border-gray-400 py-8">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={140} height={40} />
      </Link>
      <HeaderNav />
    </div>
  );
};

export default Header;
