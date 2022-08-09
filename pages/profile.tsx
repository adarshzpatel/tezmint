import { AccountInfo } from "@airgap/beacon-sdk";
import React, { useEffect, useMemo, useState } from "react";
import Heading from "../components/design/Heading";
import useContractStore from "../tezos/useContractStore";
import useWalletStore from "../tezos/useWalletStore";
import { motion } from "framer-motion";
import WalletInfo from "../components/profile/WalletInfo";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { getFa2NftOwned } from "../lib/tztk";
import { NFT_CONTRACT } from "../tezos/config";
import NftCard from "../components/profile/NftCard";
import Button from "../components/design/Button";
import { HiOutlineLogout, HiOutlineRefresh } from "react-icons/hi";
type Props = {};

const Profile = (props: Props) => {
  const {
    isConnected,
    walletInstance,
    accountPkh,
    connectWallet,
    balance,
    fetchBalance,
  } = useWalletStore();
  const [accountInfo, setAccountInfo] = useState<AccountInfo>();
  const { tezos } = useContractStore();
  const [nftsMinted, setNftsMinted] = useState<any>([]);

  // get account info
  useEffect(() => {
    (async () => {
      if (walletInstance?.client) {
        fetchBalance();
        setAccountInfo(await walletInstance?.client?.getActiveAccount());
        setNftsMinted(await getFa2NftOwned(NFT_CONTRACT, accountPkh));
      }
    })();
  }, [walletInstance, isConnected]);

  if (!isConnected) {
    return <div>Please Connect your wallet.</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex items-center ">
        <Heading className="flex-1">My Profile</Heading>
    <div className="flex items-center gap-4">
        <Button outline icon={<HiOutlineRefresh className="h-5 w-5" />}>Refresh</Button>
        <Button icon={<HiOutlineLogout className="h-5 w-5" />} variant="danger">
          Disconnect
        </Button>
    </div>
      </div>

      <WalletInfo
        network={accountInfo?.network?.type}
        address={accountPkh}
        balance={balance}
      />
      <div className="mt-8 flex flex-col bg-white p-1 rounded-lg">
        <Tab.Group>
          <Tab.List className="flex border-b-2">
            <Tab className="focus:outline-none">
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
            <Tab className="focus:outline-none">
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
            <Tab.Panel className="grid grid-cols-4 gap-4 ">
              {nftsMinted?.map((item: any) => (
                <NftCard
                  imgSrc={item?.token.metadata.thumbnailUri}
                  key={item?.id}
                  name={item?.token.metadata.name}
                  description={item?.token.metadata.description}
                />
              ))}
            </Tab.Panel>
            <Tab.Panel>SFT</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Profile;
