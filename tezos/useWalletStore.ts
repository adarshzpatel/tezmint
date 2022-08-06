import create from "zustand";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import { tezosConfig } from "./config";

interface WalletState {
  isConnected: boolean;
  walletInstance: BeaconWallet | null;
  accountPkh: string;
  connectWallet: (request: boolean) => Promise<void>;
}

const useWalletStore = create<WalletState>((set) => ({
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
      
      console.log("Wallet connected successfully!")
    }
  },
}));

export default useWalletStore;
