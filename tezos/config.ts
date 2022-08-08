import { NetworkType } from "@airgap/beacon-sdk";


export const SFT_CONTRACT = "KT1CRmYMuug6DeTuKqokjEKXKDKG83yf4NfG";
export const NFT_CONTRACT = "KT1LJoFUrAx1V2oHigFsNZXRsB6oYc4Wt5LP";

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