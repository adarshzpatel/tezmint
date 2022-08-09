import React from "react";
import { ipfsToGatewayLink } from "../../lib/utils";
import Tooltip from "../design/Tooltip";

type Props = {
  imgSrc: string;
  name: string;
  description: string;
};

const NftCard = ({ name, imgSrc, description }: Props) => {
  return (
    <Tooltip content="Click to view details">
      <div className="rounded-lg cursor-pointer hover:shadow-xl hover:-translate-y-2 duration-200 ease-out border p-3">
        <img
          className="rounded-md  bg-gray-100 shadow-inner object-cover object-center w-full"
          src={ipfsToGatewayLink(imgSrc)}
          alt="nft-image"
        />

        <p className="font-medium  mt-4">{name}</p>
        <p className="text-gray-400 text-sm mt-1 whitespace-pre-wrap">
          {description}
        </p>
      </div>
    </Tooltip>
  );
};

export default NftCard;
