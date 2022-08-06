import {NFTStorage,File} from 'nft.storage'
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "./design/Button";
import { Input } from "./design/Input";
import { TextArea } from "./design/TextArea";
import useContractStore from '../tezos/useContractStore';
import useWalletStore from '../tezos/useWalletStore';
import { mintNFT } from '../operations/fa2';
import toast from 'react-hot-toast';
type Props = {};

interface NFTData {
  tokenName: string;
  description: string;
  symbol: string;
  price: number;
  image: File[];
}

const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY0NmFmRGIyMjhhMGY1RjFhMURDNDQyMjFCQ0E4YTIwNTNlNWUzQzIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyNDY0NjcyNjUwMiwibmFtZSI6IlRleiBCeXRlcyJ9.JfjY624-uOXE9naYfN7Z8QfY1bbO_bZcVihhHL5ke3I";
const client = new NFTStorage({ token: apiKey });

const CreateNFT = (props: Props) => {
  const { handleSubmit, register } = useForm<NFTData>();
  const [loading,setLoading] = useState<boolean>(false);
  const nftContract = useContractStore(state=>state.nftContract)
  const isConnected = useWalletStore(state=>state.isConnected)
  const pkh = useWalletStore(state=>state.accountPkh)

  const onSubmitHandler:SubmitHandler<NFTData> = (data) => {
    (async () => {     
      setLoading(true);
      const file:File = data.image[0];
      const metadata = await client.store({
        name:data.tokenName,
        description:data.description,
        decimals:0,
        symbol: data.symbol,
        image: new File(
          [file],
          file.name,
          { type: "image/" + file.name.split(".")[1] }
        ),
      })
      if(nftContract){ 
        await mintNFT(1,"",nftContract,pkh);
      } else {
        toast.error("NFT contract missing !")
      }
      setLoading(false);
    })();
  };

  if(!isConnected){
    return <div> Connect Wallet first </div>
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className='flex flex-col gap-4'>
      <Input
        {...register("tokenName")}
        placeholder="Enter Token Name"
        label="Token Name"
      />
      <TextArea
        {...register("description")}
        placeholder="Enter Short Description"
        label="Description"
      />
      <Input
        {...register("symbol")}
        placeholder="Enter symbol"
        label="Symbol"
      />
      <Input
        type="number"
        {...register("price")}
        placeholder="Enter Price"
        label="Token Sale Price"
      />
      <Input
        {...register("image")}
        type='file'
        placeholder="Enter Image"
        label="Choose Image"
      />
      <Button loading={loading} type="submit">{loading ? "Uploading..." : "Create NFT"}</Button>
    </form>
  );
};

export default CreateNFT;
