import React, { useEffect, useState } from "react";
import useWalletStore from "../../tezos/useWalletStore";
import Button from "../design/Button";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import AccountDetailsModal from "./AccountDetailsModal";
import Tooltip from "../design/Tooltip";
import NextLink from "../design/NextLink";
type Props = {};

const ConnectWallet = (props: Props) => {
  const { connectWallet, accountPkh, isConnected } = useWalletStore();
  const [showModal, setShowModal] = useState<boolean>(false);
  useEffect(() => {
    async () => await connectWallet(false);
  }, []);

  return (
    <div>
      {isConnected ? (
        <NextLink href='/profile'>
          <Tooltip content="Go to Profile ">
            <button
              onClick={() => setShowModal(true)}
              className="bg-white py-1.5 px-4 divide-x-2 font-semibold hover:shadow border-gray-300 border cursor-pointer hover:border-blue-500 duration-300 ease-out  flex items-center rounded-xl"
            >
              <div className="pl-2 flex items-center gap-1">
                {accountPkh.slice(0, 5) + " ... " + accountPkh.slice(-5, -1)}
                <FiChevronDown className="h-6 w-6" />
              </div>
            </button>
          </Tooltip>
        </NextLink>
      ) : (
        <Button variant="primary" onClick={() => connectWallet(true)}>
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default ConnectWallet;
