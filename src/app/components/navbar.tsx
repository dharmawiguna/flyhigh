import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav
      id="Navbar"
      className="container max-w-[1130px] mx-auto flex justify-between items-center pt-[30px]"
    >
      <Link href="index.html" className="flex items-center shrink-0">
        <Image
          src="/assets/images/logos/logo.svg"
          alt="logo"
          width={120}
          height={120}
        />
      </Link>
      <ul className="nav-menus flex gap-[30px] items-center w-fit">
        <li>
          <a href="" className="font-medium">
            Flash Sale
          </a>
        </li>
        <li>
          <a href="" className="font-medium">
            Discover
          </a>
        </li>
        <li>
          <a href="" className="font-medium">
            Packages
          </a>
        </li>
        <li>
          <a href="" className="font-medium">
            Stories
          </a>
        </li>
        <li>
          <a href="" className="font-medium">
            About
          </a>
        </li>
        <a
          href="signin.html"
          className="font-bold text-flysha-black bg-flysha-light-purple rounded-full p-[12px_30px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF]"
        >
          Sign In
        </a>
      </ul>
    </nav>
  );
}
