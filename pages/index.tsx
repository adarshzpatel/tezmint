import type { NextPage } from "next";
import ContractJson from "../contracts/fa2_token.json";
import Button from "../components/design/Button";
import useContractStore from "../tezos/useContractStore";
import { originateContract } from "../operations/originate";
import useWalletStore from "../tezos/useWalletStore";
import { MichelsonMap } from "@taquito/taquito";
import { Input } from "../components/design/Input";
import NextLink from "../components/design/NextLink";
const Home: NextPage = () => {
  const [tezos, loadContracts] = useContractStore((state) => [
    state.tezos,
    state.loadContracts,
  ]);

  const deployNFTContract = async () => {
    const storage = new MichelsonMap();
    await loadContracts();
    if (tezos) {
      await originateContract(
        tezos,
        ContractJson,
        `(Pair (Pair 0 {}) (Pair {Elt "" 0x68747470733a2f2f6578616d706c652e636f6d} (Pair {} {})))`
      );
    }
  };

  return (
    <div>
      <h1 className="text-6xl font-black">Welcome to Tez Mint</h1>
      <NextLink href={"/create"}>
        <Button size="lg" variant="primary" className="mt-4">Mint your nft now</Button>
      </NextLink>
    </div>
  );
};

export default Home;
