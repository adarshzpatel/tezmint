import { NFTStorage } from "nft.storage";
import toast from "react-hot-toast";

const token = process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN;

const client = new NFTStorage({ token: token ? token : "" });

export const storeToIpfs = async (data: Blob): Promise<string | undefined> => {
  try {
    const cid = await client.storeBlob(data);
    return cid;
  } catch (err) {
    console.error(err);
  }
};
