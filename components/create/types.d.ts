type NftTypes = "NFT" | "FUNGIBLE"

type Fa2NftMetadata = {
  name: string;
  description: string;
  externalLink: string;
};

type Fa2FungibleMetadata = {
  name: string;
  description: string;
  externalLink: string;
  editions:number // total supply of token
}

export {NftTypes,Fa2FungibleMetadata,Fa2NftMetadata}

