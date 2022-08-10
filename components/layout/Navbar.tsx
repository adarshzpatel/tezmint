import Link from "next/link";
import React from "react";
import Heading from "../design/Heading";
import Logo from "../design/Logo";
import NextLink from "../design/NextLink";
import AccountDetailsModal from "./AccountDetailsModal";
import ConnectWallet from "./ConnectWallet";

type Props = {};

const Navbar = (props: Props) => {
  return (<>
    <header className="px-4 sm:px-8 py-4 sticky border-b  border-gray-300">
      <nav className="flex items-center gap-4  mx-auto justify-between ">
        <NextLink href="/">
          <Logo />
        </NextLink>
        <div className="flex items-center gap-4">
        <Link href={"/create"}>
          <a className="hover:bg-gray-100 px-3 py-1.5 rounded-xl">Create</a>
        </Link>
        <ConnectWallet />
        </div>
      </nav>
    </header>
  </>
  );
};

export default Navbar;
