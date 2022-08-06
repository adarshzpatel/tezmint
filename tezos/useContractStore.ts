import { TezosToolkit, WalletContract } from "@taquito/taquito";

import create from "zustand";
import { MARKETPLACE_CONTRACT, NFT_CONTRACT, tezosConfig } from "./config";
import useWalletStore from "./useWalletStore";

interface ContractState {
  tezos: TezosToolkit | null;
  nftContract: WalletContract | null;
  marketplaceContract: WalletContract | null;
  loadContracts: any;
}

const useContractStore = create<ContractState>((set,get) => ({
  tezos: null,
  nftContract: null,
  marketplaceContract: null,
  loadContracts: async () => {
    try {
      const tezos = new TezosToolkit(tezosConfig.rpcUrl)
      const walletinstance = useWalletStore.getState().walletInstance;
      if (walletinstance) {
        await tezos.setWalletProvider(walletinstance);
        const nftContract = await tezos.wallet.at(NFT_CONTRACT);
        const marketplaceContract = await tezos.wallet.at(MARKETPLACE_CONTRACT);
        set({ tezos, nftContract, marketplaceContract });
        console.log("Contracts loaded Successfully !");
      } else {
        console.log("Wallet Instance Not found , please connect your awllet")
      }
    } catch (err) {
      console.log(err);
    }
  },

}));

export default useContractStore;
