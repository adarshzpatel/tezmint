import { NetworkType } from "@airgap/beacon-sdk";

export const apiUrl = "https://api.jakartanet.tzkt.io/v1";
export const SFT_CONTRACT = "KT1KZ5kCFj51s7nqzEfeE3rmTcrPEvoYS75E"; // Semi fungible Token Contract Address
export const NFT_CONTRACT = "KT1LJoFUrAx1V2oHigFsNZXRsB6oYc4Wt5LP"; // Non Fungible Token Contract Address

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