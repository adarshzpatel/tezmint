import create from "zustand";
import { BeaconWallet } from "@taquito/beacon-wallet";
import axios from "axios";
import { apiUrl, tezosConfig } from "./config";

interface WalletState {
  balance: number;
  isConnected: boolean;
  walletInstance: BeaconWallet | null;
  accountPkh: string;
  connectWallet: (request: boolean) => Promise<void>;
  fetchBalance: () => Promise<void>;
}

const useWalletStore = create<WalletState>((set, get) => ({
  balance: 0,
  accountPkh: "",
  isConnected: false,
  walletInstance: null,
  connectWallet: async (requestPermission: boolean) => {
    const wallet = new BeaconWallet({
      name: tezosConfig.dappName,
      preferredNetwork: tezosConfig.network,
    });

    if (!requestPermission) {
      const activeAccount = await wallet.client.getActiveAccount();
      if (activeAccount) {
        const accountPkh = await wallet.getPKH();
        set({
          isConnected: true,
          accountPkh: accountPkh,
          walletInstance: wallet,
        });
        await get().fetchBalance();
      }
    } else {
      await wallet.requestPermissions({
        network: {
          type: tezosConfig.network,
        },
      });
      const accountPkh = await wallet.getPKH();

      set({
        isConnected: true,
        accountPkh: accountPkh,
        walletInstance: wallet,
      });
      await get().fetchBalance();

      console.log("Wallet connected successfully!");
    }
  },
  fetchBalance: async () => {
    try {
      const _pkh = get().accountPkh;
      if(_pkh){
        const res = await axios.get(`${apiUrl}/accounts/${_pkh}/balance`);
        console.log(res.data);
      } else {
        console.log("pkh not found ")
      }
    } catch (err) {
      console.error("Failed to fetch Balance ");
      console.error({ err });
    }
  },
}));

export default useWalletStore;
