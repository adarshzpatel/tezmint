# TezMint

### Important Links
  - Youtube Demo Video Link : https://www.youtube.com/watch?v=EUwN-9CfXEk
  - Live Demo website : https://tezmint.vercel.app/
### Contract Details 
  NOTE: ALL the contracts are deployed to `JAKARTANET` testnet.

  - FA2 NFT DEPLOYED CONTRACT : [KT1Qsy19tB9VpLWW1thEoREFujaQe9FEYhi7](https://better-call.dev/jakartanet/KT1Qsy19tB9VpLWW1thEoREFujaQe9FEYhi7/operations)
  - FA2 FUNGIBLE (SFT) DEPLOYED CONTRACT : [KT1BkSid4kxYd3Lmht6jv8Z1RdpSkkjEJ8Gq](https://better-call.dev/jakartanet/KT1BkSid4kxYd3Lmht6jv8Z1RdpSkkjEJ8Gq/operations)

  Deployed via smartpy.io 

### Tech Stack 
  - Next.js (React Framework)
  - TailwindCss (styling)
  - SmartPy (smart contract)
  - Taquito (Smart contract integration with frontend)
  - nft.storage (to store images and metadata to ipfs)
  - TzKT api ( to get on-chain data )
  - zustand ( state management library )

## Steps to run this project locally
1. Fork and clone this repo
2. Run `npm install`
3. Create `.env` file
4. Add the following environment variable to your `.env` file
  ```
    NEXT_PUBLIC_NFT_STORAGE_TOKEN=<YOUR_NFT_STORAGE_TOKEN_HERE>
  ```

  You can check how to get your nft.storage api token [here](https://nft.storage/docs/)

  5. Run `npm run dev` to start the local server on `localhost:3000`