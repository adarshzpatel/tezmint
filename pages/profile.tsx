import { AccountInfo } from "@airgap/beacon-sdk";
import React, {useEffect,useState } from "react";
import Heading from "../components/ui/Heading";
import useContractStore from "../tezos/useContractStore";
import useWalletStore from "../tezos/useWalletStore";
import { motion } from "framer-motion";
import WalletInfo from "../components/profile/WalletInfo";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
type Props = {};

const Profile = (props: Props) => {
  const { isConnected, walletInstance, connectWallet } = useWalletStore();
  const [accountInfo, setAccountInfo] = useState<AccountInfo>();
  const { tezos } = useContractStore();
  // get account info
  useEffect(() => {
    (async () => {
      if (walletInstance?.client) {
        setAccountInfo(await walletInstance?.client?.getActiveAccount());
        console.log();
      }
    })();
  }, [walletInstance]);

  // check if wallet is connected
  useEffect(() => {
    if (!isConnected) connectWallet(true);
  }, []);

  if (!isConnected) {
    return <div>Please Connect your wallet.</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto">
      <Heading>My Profile</Heading>
      <WalletInfo
        network={accountInfo?.network?.type}
        address={accountInfo?.address}
        balance={999}
      />
      <div className="mt-8 flex flex-col bg-white p-1 rounded-lg">
        <Tab.Group>
          <Tab.List className="flex border-b-2">
            <Tab>
              {({ selected }: { selected: boolean }) => (
                <div
                  className={clsx({
                    "bg-slate-100  rounded-t-lg": selected === true,
                  })}
                >
                  <p className="px-4 py-2 relative top-0.5 ">
                    Non-fungible Tokens (NFT)
                  </p>
                  {selected && (
                    <motion.div
                      className="h-0.5 relative top-0.5 bg-blue-400 "
                      layoutId="tabHighlight"
                    />
                  )}
                </div>
              )}
            </Tab>
            <Tab>
              {({ selected }: { selected: boolean }) => (
                <div
                  className={clsx({
                    "bg-slate-100 relative rounded-t-lg": selected === true,
                  })}
                >
                  <p className="px-4 py-2 relative top-0.5">
                    Semi-fungible Tokens (SFT)
                  </p>
                  {selected && (
                    <motion.div
                      className="h-0.5 relative top-0.5 bg-blue-400 z-10"
                      layoutId="tabHighlight"
                    />
                  )}
                </div>
              )}
            </Tab>
          </Tab.List>

          <Tab.Panels className="rounded-lg p-4">
            <Tab.Panel className="grid grid-cols-4 gap-4">
              <div className="rounded-lg hover:shadow-xl hover:-translate-y-2 duration-200 ease-out border p-3">
                <img
                  className="rounded-md aspect-square bg-gray-100 shadow-inner object-cover object-center w-full"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
                  alt="nft-image"
                />

                <p className="font-medium  mt-4">Name</p>
                <p className="text-gray-400 text-sm mt-1 whitespace-pre-wrap">
                  Description
                </p>
              </div>
            </Tab.Panel>
            <Tab.Panel>SFT</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Profile;
