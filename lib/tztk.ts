import axios from "axios"
import { apiUrl } from "../tezos/config"

// get the list of tezmint nfts owned by a address
export const getFa2NftOwned = async (tokenAddress:string,accountPkh:string):Promise<any> => {
  try{
    const _res = await axios.get(`${apiUrl}/tokens/balances?account=${accountPkh}&?standard=fa2`);
    // console.log(_res.data);
    const filteredByToken = _res.data.filter((item:any)=>item.token.contract.address === tokenAddress);
    // console.log(filteredByToken);
    return filteredByToken;
  } catch(err) {
    throw err
  }
}