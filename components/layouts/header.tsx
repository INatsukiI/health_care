import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header>
      <div className="flex items-center h-30 border-b-4 container">
        <Link href="/">
          <Image src="/logo.png" width={100} height={100} alt="Health Care" />
        </Link>
        <span className="flex-1"></span>
        <div>ログイン</div>
      </div>
    </header>
  );
};

export default Header;
