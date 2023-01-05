import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="absolute inset-x-0 bottom-0 p-4 md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2023{" "}
        <Link href="/" className="hover:underline">
          Health Recoder
        </Link>
        . All Rights Reserved.
      </span>
    </footer>
  );
};

export default Footer;
