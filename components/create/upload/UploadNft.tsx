import React, { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Button from "../../design/Button";
import Heading from "../../design/Heading";
import UploadDropzone from "./UploadDropzone";

type Props = {
  setStep: Dispatch<SetStateAction<1 | 2 | 3>>;
  setThumbnail: Dispatch<SetStateAction<string>>;
  setFile: Dispatch<SetStateAction<File | null>>;
  thumbnail: string;
  file: File | null;
};

const UploadNft = ({
  setStep,
  setThumbnail,
  setFile,
  file,
  thumbnail,
}: Props) => {
  return (
    <div className="max-w-screen-md mx-auto">
      <Heading className="text-center">Upload your NFT</Heading>
      <p className="my-4 text-center text-lg ">Drag and drop or select file </p>
      <UploadDropzone
        file={file}
        thumbnail={thumbnail}
        setFile={setFile}
        setThumbnail={setThumbnail}
      />
      <div className="mt-8 flex justify-between ">
        <Button
          onClick={() => setStep(1)}
          outline
          variant="primary"
          size="lg"
          className="flex items-center gap-1  justify-center"
        >
          Go Back
        </Button>
        {file ? (
          <Button
            onClick={() => setStep(3)}
            variant="primary"
            size="lg"
            className="flex items-center gap-1 "
          >
            Add NFT Details
            <FiChevronRight className="h-6 w-6" />
          </Button>
        ) : (
          <Button
            onClick={() => toast.error("Please upload a file")}
            size="lg"
            className="flex items-center gap-1 px-8
            "
          >
            Add NFT Details
            <FiChevronRight className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default UploadNft;
