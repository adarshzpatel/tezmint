
import { MichelsonMap, WalletContract } from "@taquito/taquito"
import {char2Bytes} from "@taquito/utils"
import toast from "react-hot-toast";

export const mintNFTOperation = async (metadata:string,contract:WalletContract,pkh:string) => {
  try{
        const metadataURI = char2Bytes(metadata);
        const op = await contract.methods.mint(pkh,MichelsonMap.fromLiteral({"":metadataURI})).send()
        return op;
      } catch(e) {
      toast.error("Transaction Failed!")
      console.log(e)
    }
}

export const mintSFTOperation = async(metadata:string,contract:WalletContract,pkh:string,amount:number) => {
  try{
    const metadataURI = char2Bytes(metadata);
    const op = await contract.methods.mint(pkh,MichelsonMap.fromLiteral({"":metadataURI}),amount).send()
    return op;
  } catch (err) {
    console.error(err)
    throw err
  }
}
