import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppContainer from "../components/layout/AppContainer";
import useContractStore from "../tezos/useContractStore";
import { useEffect } from "react";
import useWalletStore from "../tezos/useWalletStore";

function MyApp({ Component, pageProps }: AppProps) {
  const loadContracts = useContractStore(state => state.loadContracts);
  const connectWallet = useWalletStore(state=>state.connectWallet);
  const isConnected = useWalletStore(state=>state.isConnected)
  //Initial checks and loadups
  useEffect(()=>{
      connectWallet(false);
  },[connectWallet])

  // Load the wallet contract instances once the wallet is loadd
  useEffect(()=>{
    if(isConnected){
      loadContracts();
    }
  },[isConnected,loadContracts])
  
  return (
    <AppContainer>
      <Component {...pageProps} />
    </AppContainer>
  );
}

export default MyApp;
