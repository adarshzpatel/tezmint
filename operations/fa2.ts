
import { MichelsonMap, WalletContract } from "@taquito/taquito"
import {char2Bytes} from "@taquito/utils"
import toast from "react-hot-toast";

export const mintOperation = async (metadata:string,contract:WalletContract,pkh:string) => {
  try{
        const metadataURI = char2Bytes(metadata);
        console.log({metadataURI})
        console
        const op = await contract.methods.mint(pkh,MichelsonMap.fromLiteral({"":metadataURI})).send()
        await op.confirmation(1);
        console.log(op)
        toast.success("Trasaction Success!")
      } catch(e) {
      toast.error("Transaction Failed!")
      console.log(e)
    }
}
