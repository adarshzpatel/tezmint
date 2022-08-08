import { AccountInfo } from '@airgap/beacon-sdk'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Heading from '../components/design/Heading'
import useContractStore from '../tezos/useContractStore'
import useWalletStore from '../tezos/useWalletStore'

type Props = {}

const Profile = (props: Props) => {
  const {isConnected,walletInstance,connectWallet} = useWalletStore()
  const [accountInfo,setAccountInfo] = useState<AccountInfo>();
  const {tezos} = useContractStore();
  // get account info
  useEffect(()=>{
    (async() => {
      if(walletInstance?.client){
        setAccountInfo(await walletInstance?.client?.getActiveAccount())
      console.log()
      }
    })()
  },[walletInstance])

  // check if wallet is connected
  useEffect(()=>{
    if(!isConnected) connectWallet(true);
  },[])

  if(!isConnected){
    return <div>
      Please Connect your wallet.
    </div>
  }

  return (
    <div>
      <Heading>My Profile</Heading>
      <div>
      {accountInfo?.address}
      </div>
      
    </div>
  )
}

export default Profile 