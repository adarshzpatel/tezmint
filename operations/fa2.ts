import { MichelsonMap, WalletContract } from "@taquito/taquito"
import {char2Bytes} from "@taquito/utils"
import toast from "react-hot-toast";

export const mintNFT = async (amount:number,metadata:string,contract:WalletContract,pkh:string) => {
  try{
        const metadataURI = char2Bytes(metadata);
        const op = await contract.methods.mint(pkh,1,MichelsonMap.fromLiteral({"":metadataURI}),1).send()
        await op.confirmation(1);
        console.log(op)
        toast.success("Trasaction Success!")
      } catch(e) {
      toast.error("Transaction Failed!")
      console.log(e)
    }
}
