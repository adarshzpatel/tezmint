import { MichelsonMap, TezosToolkit } from "@taquito/taquito";
import toast from "react-hot-toast";

export const originateContract = async (Tezos:TezosToolkit,codeJSON:string|object[],initString:string) => {
  // Check if tezos toolkit is initialialized or not
  return Tezos?.wallet?.originate({
    code: codeJSON,
    init: initString
  }).send().then((op)=> {
    console.log(`Waiting for confirmation for ${op.opHash}`);
    return op.contract();
  }).then(contract=>{
    toast.success("Origination Successfull! Address " + contract.address )
  }).catch(err=>console.log(err))
}