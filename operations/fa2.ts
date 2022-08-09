
import { MichelsonMap, WalletContract } from "@taquito/taquito"
import {char2Bytes} from "@taquito/utils"
import toast from "react-hot-toast";

export const mintOperation = async (metadata:string,contract:WalletContract,pkh:string) => {
  try{
        const metadataURI = char2Bytes(metadata);
        console.log({metadataURI})
        console
        const op = await contract.methods.mint(pkh,MichelsonMap.fromLiteral({"":metadataURI})).send()
        return op;
      } catch(e) {
      toast.error("Transaction Failed!")
      console.log(e)
    }
}
