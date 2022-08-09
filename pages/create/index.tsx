import { NextPage } from "next";
import React, { useState } from "react";
import { NftTypes } from "../../components/create/types";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import ChooseNftType from "../../components/create/selectType/ChooseNftType";
import UploadNft from "../../components/create/upload/UploadNft";
import CreateFungibleNft from "../../components/create/addDetails/CreateFungibleNft";
import CreateNft from "../../components/create/addDetails/CreateNft";
import { AnimatePresence } from "framer-motion";
import { BsJustify } from "react-icons/bs";

type Props = {};

const Create: NextPage = (props: Props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [nftType, setNftType] = useState<NftTypes>("NFT");
  const [nftFile, setNftFile] = useState<File | null>(null);
  const [nftThumbnail, setNftThumbnail] = useState<string>("");

  const renderSteps = () => {
    switch (step) {
      case 1:
        return (
          <ChooseNftType
            nftType={nftType}
            setStep={setStep}
            setType={setNftType}
          />
        );
      case 2:
        return (
          <UploadNft
            setStep={setStep}
            thumbnail={nftThumbnail}
            file={nftFile}
            setThumbnail={setNftThumbnail}
            setFile={setNftFile}
          />
        );
      case 3:
        return nftType === "FUNGIBLE" ? (
          <CreateFungibleNft
            setStep={setStep}
            nftFile={nftFile}
            nftThumbnail={nftThumbnail}
          />
        ) : (
          <CreateNft
            setStep={setStep}
            nftFile={nftFile}
            nftThumbnail={nftThumbnail}
          />
        );
      default:
        return <div> Something went wrong :( </div>;
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-center">
        <Breadcrumbs
          data={["Choose NFT Type", "Upload Image", "Add NFT Details"]}
          active={step - 1}
        />
      </div>

      {/* {renderSteps()} */}
      <AnimatePresence exitBeforeEnter>
        {renderSteps()}
        </AnimatePresence>
    </div>
  );
};

export default Create;
