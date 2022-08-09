import clsx from "clsx";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import Confetti from "react-confetti/dist/types/Confetti";
import { FiCheck, FiCheckCircle, FiChevronRight, FiExternalLink } from "react-icons/fi";
import { HiCheck } from "react-icons/hi";
import Breadcrumbs from "../../design/Breadcrumbs";
import Button from "../../design/Button";
import NextLink from "../../design/NextLink";
import Spinner from "../../design/Spinner";

type Props = {
  steps: string[];
  loading: number; // index which idenfies which step is being donet
  txHash:string | undefined
};

const MintProgress = ({ steps, loading,txHash }: Props) => {
  if(loading === -1) {
    return <div> Oops ! Something went wrong , please try again. </div>
  }


  return (
    <div className="mx-auto max-w-screen-md flex flex-col gap-8 items-center justify-center">
      {/* <Spinner variant="primary" className="h-20 w-20 border-4" /> */}
      {loading === steps.length && (
        <ReactConfetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <div className="flex bg-white p-8 rounded-lg shadow-lg flex-col w-full">
        {steps?.map((item, index) => (
          <div key={index}>
            <div key={index} className="flex items-center gap-4">
              <motion.div
                layout
                animate={{ scale: [0, 1], rotate: [-120, 0] }}
                transition={{ delay: 0.2 * index }}
                className={clsx(
                  {
                    "bg-primary-100 border border-primary-500":
                      loading === index,
                    "bg-primary-600 text-white": index < loading,
                    "bg-slate-200": index > loading,
                  },
                  "h-8 w-8 flex items-center z-[2] justify-center rounded-full "
                )}
              >
                {index < loading ? <HiCheck /> : index + 1}
              </motion.div>
              <motion.p
                animate={{
                  translateX: [-40, 0],
                  opacity: [0, 1],
                }}
                transition={{ delay: 0.2 * index }}
                className="origin-left z-[0] text-xl font-medium"
              >
                {item}
              </motion.p>
              {loading === index && (
                <motion.div
                  animate={{ scale: [0, 1] }}
                  transition={{ delay: 0.1 }}
                >
                  <Spinner variant="primary" size="md" />
                </motion.div>
              )}
            </div>
            {index < steps.length - 1 && (
              <motion.div
                layout
                animate={{ scaleY: [0, 1] }}
                transition={{ delay: 0.4 * index }}
                className={`h-8 origin-top w-0.5 relative left-[15px] ${
                  index < loading ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      {loading === steps.length && txHash !== undefined && (
        <>
        <div className="flex gap-4 items-center bg-white px-4 text-lg font-semibold py-4 rounded-lg shadow-xl ring-1 ring-green-500  w-full ">
          <HiCheck className="bg-green-500 rounded-full text-white p-1 h-8 w-8"/>Your NFT has been minted successfully ! 
          <NextLink href={"https://jakartanet.tzkt.io/"+txHash}>
          <Button  className="ml-auto flex items-center gap-2">View Transaction<FiExternalLink className="h-5 w-5"/></Button>
          </NextLink>
        </div>
        <div className="flex justify-between w-full">
          <Button size="lg" variant="primary" outline>Mint another NFT</Button>
          <Button size="lg" variant="primary" >Show in Profile</Button>
        </div>
        </>
      )}
    </div>
  );
};

export default MintProgress;
