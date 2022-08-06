import { RadioGroup } from "@headlessui/react";
import React, { Dispatch, SetStateAction } from "react";
import { FiChevronLeft, FiChevronRight, FiExternalLink } from "react-icons/fi";
import { HiStar } from "react-icons/hi";
import Button from "../../design/Button";
import Heading from "../../design/Heading";
import { NftTypes } from "../types";
import NftTypeCard from "./NftTypeCard";
import { BsStars } from "react-icons/bs";
import NextLink from "../../design/NextLink";
type Props = {
  nftType: NftTypes;
  setStep: Dispatch<SetStateAction<1 | 2 | 3>>;
  setType: Dispatch<SetStateAction<NftTypes>>;
};

const ChooseNftType = ({ nftType, setStep, setType }: Props) => {
  return (
    <div className="max-w-screen-md mx-auto">
      <RadioGroup value={nftType} onChange={setType}>
        <RadioGroup.Label>
          <Heading className="text-center">Choose your NFT Type</Heading>
        </RadioGroup.Label>
        <div className="flex  mt-12 gap-8">
          <RadioGroup.Option value="NFT">
            {({ checked }) => (
              <NftTypeCard
                Icon={<HiStar className="h-8 w-8" />}
                selected={checked}
                title={"FA2 NFT"}
                description={
                  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus inventore ipsum explicabo nostrum porro nihil rerum? Quasi sed numquam nulla dolore accusantium provident quod, enim beatae molestias amet dicta laborum?"
                }
              />
            )}
          </RadioGroup.Option>
          <RadioGroup.Option value="FUNGIBLE">
            {({ checked }) => (
              <NftTypeCard
                Icon={<BsStars className="h-8 w-8" />}
                selected={checked}
                title={"FA2 FUNGIBLE"}
                description={
                  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus inventore ipsum explicabo nostrum porro nihil rerum? Quasi sed numquam nulla dolore accusantium provident quod, enim beatae molestias amet dicta laborum?"
                }
              />
            )}
          </RadioGroup.Option>
        </div>
      </RadioGroup>
      <div className="flex mt-8 justify-between ">
        <Button
          onClick={() => setStep(2)}
          outline
          variant="primary"
          size="lg"
          className="flex items-center gap-1  justify-center"
        >
          Go Back
        </Button>
        <Button
          onClick={() => setStep(2)}
          variant="primary"
          size="lg"
          className="flex items-center gap-1 "
        >
          Upload Nft
        </Button>
      </div>
      <div className="my-8">
      <a href={"#"} target="_blank" rel="noreferrer" className="text-center text-lg flex items-center gap-2 hover:text-primary-600 hover:underline underline-offset-4 duration-200 ease-out">Still Confused ? Learn more about Nfts on Tezos Blockchain. <FiExternalLink className="h-5 w-5"/></a>
      </div>
    </div>
  );
};

export default ChooseNftType;
