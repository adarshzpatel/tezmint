import React, { useEffect, useState } from "react";
import useWalletStore from "../../tezos/useWalletStore";
import Button from "../design/Button";
import {motion} from 'framer-motion'
import { FiChevronDown } from "react-icons/fi";
import AccountDetailsModal from "./AccountDetailsModal";
type Props = {};

const ConnectWallet = (props: Props) => {
  const { connectWallet, accountPkh, isConnected } = useWalletStore();
  const [showModal,setShowModal] = useState<boolean>(false);
  useEffect(() => {
    async () => await connectWallet(false);
  }, []);

  return (
    <div>
      {isConnected ? (
        <>
        <AccountDetailsModal isOpen={showModal} closeModal={()=>setShowModal(false)}/>
        <button onClick={()=>setShowModal(true)} className="bg-white/50 to-transparent py-1.5 px-4 divide-x-2 font-semibold border-gray-300 border cursor-pointer hover:shadow-lg duration-300 ease-out  flex items-center rounded-xl">
          {/* <div className="flex items-center gap-1 px-3"> */}
          {/* <img className="h-6 w-6 rounded-full" src="https://s2.coinmarketcap.com/static/img/coins/64x64/2011.png" alt="tezos-coin-logo"></img> */}
            <p className="pr-2">999 XTZ</p>
            <div className="pl-2 flex items-center gap-1">
              
          {accountPkh.slice(0, 5) + " ... " + accountPkh.slice(-5, -1)}
          <FiChevronDown className="h-6 w-6" />
            </div>
        </button>
        </>
      ) : (
        <Button variant="primary" onClick={() => connectWallet(true)}>Connect Wallet</Button>
      )}
    </div>
  );
};

export default ConnectWallet;
