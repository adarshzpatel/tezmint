import React, { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import Button from "../../design/Button";
import Heading from "../../design/Heading";
import { Input } from "../../design/Input";
import { TextArea } from "../../design/TextArea";
import NftPreview from "./NftPreview";
import { Fa2NftMetadata } from "../types";
import { createNftMetadata } from "../../../lib/utils";
import useWalletStore from "../../../tezos/useWalletStore";
import { storeToIpfs } from "../../../lib/nftStorage";
import toast from "react-hot-toast";
import { mintOperation } from "../../../operations/fa2";
import useContractStore from "../../../tezos/useContractStore";

type Props = {
  setStep: Dispatch<SetStateAction<1 | 2 | 3>>;
  nftFile: File | null;
  nftThumbnail: string;
};

type FormData = {
  name: string;
  description: string;
  tagString: string;
};

type Status = "Uploading" | "Minting" | "Failed" | "Success";

const CreateNft = ({ nftFile, nftThumbnail }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();
  const [status, setStatus] = useState<Status>();
  const currentAccountPkh = useWalletStore((state) => state.accountPkh);
  const nftContract = useContractStore(state => state.nftContract)
  const handleMint: SubmitHandler<FormData> = async (data) => {
    try {
      if (nftFile) {
        // get name and description from the form
        const { name, description, tagString } = data;
        const tags = tagString.split(",");
        // get the mime type from the file
        const mimeType = nftFile?.type;
        // upload the file to ipfs and get the artifactUri
        // upload thumbnail to ipfs and get the thumbnailUri
        setStatus("Uploading");
        console.log("Uploading file ")
        const fileCid = await storeToIpfs(nftFile);
        console.log("File uploaded successfully ")
        if (fileCid) {
          const metadata = createNftMetadata({
            name,
            artifactUri: fileCid,
            creator: currentAccountPkh,
            description,
            mimeType: mimeType ? mimeType : "",
            thumbnailUri: nftThumbnail,
            tags,
          });
          const metadataBlob = new Blob([JSON.stringify(metadata)]);
          console.log({metadataBlob});
          // upload metadata to ipfs
          console.log('Uploading metadata')
          const metadataCid = await storeToIpfs(metadataBlob);
          console.log('Metadata uploaded successfully');
          // mint the nft 
          console.log("Minting nft")
          console.log({metadataCid,fileCid})
          if(nftContract && metadataCid){
            const mintOp = mintOperation("ipfs://"+metadataCid,nftContract,currentAccountPkh)
            console.log({mintOp});
          } else {
            console.log("contract or metadata cid not found ")
          }
        }
      }
    } catch (err) {
      setStatus("Failed");
      console.error(err);
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto flex flex-wrap gap-4 justify-between">
      <div className="flex-1">
        <Heading className="mb-8">Add NFT Details</Heading>
        <form
          onSubmit={handleSubmit(handleMint)}
          className="max-w-lg flex flex-col gap-4"
        >
          <Input
            label="Name"
            placeholder="Name your NFT"
            {...register("name", {
              required: {
                value: true,
                message: "This field cannot be empty.",
              },
            })}
            error={errors.name?.message}
            className="w-full"
          />
          <TextArea
            rows={4}
            label="Description"
            placeholder="A brief description about your nft"
            {...register("description", {
              required: {
                value: true,
                message: "This field cannot be empty.",
              },
            })}
            error={errors.description?.message}
          />
          <Input
            {...register("tagString")}
            label="Tags ( Comma separated )"
            placeholder="Enter tags separeated by comma . Eg art,nft,gaming"
          />
          <div className="flex flex-wrap gap-4 mt-4">
            <Button
              variant="primary"
              size="lg"
              outline
              className="flex-1 w-full"
            >
              Change image
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="flex-1 w-full"
            >
              Mint my NFT 🚀
            </Button>
          </div>
        </form>
      </div>
      <div className="flex-grow-0">
        <Heading className="mb-8">NFT Preview</Heading>
        <NftPreview
          tagString={watch("tagString")}
          description={watch("description")}
          name={watch("name")}
          thumbnail={nftThumbnail}
        />
      </div>
    </div>
  );
};
export default CreateNft;
