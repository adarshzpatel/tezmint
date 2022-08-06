import { NetworkType } from "@airgap/beacon-sdk";


export const MARKETPLACE_CONTRACT = "KT1CRmYMuug6DeTuKqokjEKXKDKG83yf4NfG";
export const NFT_CONTRACT = "KT1FKziiQAbfFRzt2rbQjXBqZpfSFoNRUByH";

type ConfigType = {
  dappName:string
  network:NetworkType
  rpcUrl:string
}

export const tezosConfig:ConfigType = {
  dappName: "TezMint",
  network: NetworkType.JAKARTANET,
  rpcUrl: "https://rpczero.tzbeta.net/"
}