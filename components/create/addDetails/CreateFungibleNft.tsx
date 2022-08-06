import React, { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form';
import Button from '../../design/Button';
import Heading from '../../design/Heading';
import { Input } from '../../design/Input';
import { TextArea } from '../../design/TextArea';
import { Fa2FungibleMetadata } from '../types';
import NftPreview from './NftPreview';

type Props = {
  setStep:Dispatch<SetStateAction<1|2|3>>
  nftFile: File | null;
  nftThumbnail: string;
}

const CreateFungibleNft = ({setStep,nftFile,nftThumbnail}: Props) => {
 
  const initialValues:Fa2FungibleMetadata={
    name: "Name your NFT",
    description: "Give a brief description about your NFT",
    externalLink: "https://www.example.com",
    editions: 10 
  }
  const { register, handleSubmit, formState, watch } = useForm<Fa2FungibleMetadata>({
    defaultValues: initialValues,
  });

  return (
    <div className="max-w-screen-lg mx-auto flex justify-between">
      <div className="flex-1">
        <Heading className="mb-8">Add NFT Details</Heading>
        <form className="max-w-lg flex flex-col gap-4">
          <Input label="Name" placeholder={initialValues.name} {...register("name")} className="w-full"/>
          <Input label="Editions ( Total Supply of token )" placeholder={initialValues.editions.toString()} {...register("editions")} className="w-full"/>
          <TextArea rows={4} label="Description" placeholder={initialValues.description} {...register("description")} />
          <Input label="External Link" placeholder={initialValues.externalLink} {...register("externalLink")} />
          <div className="flex gap-4 mt-4">
            <Button variant="primary" size="lg" outline className="w-full">Cancel</Button>
            <Button variant="primary" size="lg" className="w-full">Mint my NFT</Button>
          </div>
        </form>
      </div>
      <div className="flex-grow-0">
        <Heading className="mb-8">NFT Preview</Heading>
        <NftPreview description={watch("description")} name={watch("name")} externalLink={watch("externalLink")} thumbnail={nftThumbnail}/>
      </div>
    </div>
  );
}

export default CreateFungibleNft