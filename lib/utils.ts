import { Fa2NftMetadata } from "../components/create/types";

type CreateNftMetadataProps = {
  name:string 
  description:string 
  tags:string[]  // will add tags later
  artifactUri:string
  creator:string 
  thumbnailUri:string
  mimeType:string 

}

export const createNftMetadata = ({name,artifactUri,creator,description,mimeType,tags}:CreateNftMetadataProps):Fa2NftMetadata => {
  return {
    name,
    description,
    tags:[],
    creators:[creator],
    artifactUri:"ipfs://"+artifactUri,
    formats:[{uri:"ipfs://"+artifactUri,mimeType:mimeType}],
    thumbnailUri:"ipfs://"+artifactUri,
    decimals:0,
    isBooleanAmount:false,
    shouldPreferSymbol:false,
    symbol:"TMNFT"
  }
}