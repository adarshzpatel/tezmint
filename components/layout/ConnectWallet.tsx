import React, { useEffect } from "react";
import useWalletStore from "../../tezos/useWalletStore";
import Button from "../design/Button";
import {motion} from 'framer-motion'
import { FiChevronDown } from "react-icons/fi";
type Props = {};

const ConnectWallet = (props: Props) => {
  const { connectWallet, accountPkh, isConnected } = useWalletStore();

  useEffect(() => {
    async () => await connectWallet(false);
  }, []);

  return (
    <div>
      {isConnected ? (
        <div className="bg-white font-semibold shadow-custom p-0.5 flex items-center rounded-xl">
          {/* <div className="flex items-center gap-1 px-3"> */}
          {/* <img className="h-6 w-6 rounded-full" src="https://s2.coinmarketcap.com/static/img/coins/64x64/2011.png" alt="tezos-coin-logo"></img> */}
         <p className="px-3">
          999 XTZ
         </p>
          {/* </div> */}
          <div className="bg-gray-200/50 py-1.5 px-3 rounded-lg flex items-center gap-1">
          {accountPkh.slice(0, 5) + " ... " + accountPkh.slice(-5, -1)}
          <FiChevronDown className="h-6 w-6" />
          </div>
        </div>
      ) : (
        <Button variant="primary" onClick={() => connectWallet(true)}>Connect Wallet</Button>
      )}
    </div>
  );
};

export default ConnectWallet;
