import Image from 'next/image';
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import useMetamask from '../hooks/useMetamask'

type Props = {
  setTipmessage: Dispatch<SetStateAction<string>>;
}
const ChainCheck = ({ setTipmessage }: Props) => {
  const { metaState } = useMetamask()

  useEffect(() => {
    setTipmessage("Please switch to Matic Mainnet")
  }, [setTipmessage])

  return (
    <div className='mt-6'>
      <Image src="/imgs/bell.png" width={80} height={80} alt="Warning, please select different chain" />
      <p className='max-w-xs font-bold'>Please use MetaMask to switch to MATIC Mainnet. This message will dissapear once you&apos;re on the correct chain.</p>
      <p className='text-xs mt-5'>You are currently on {metaState.chain.name}</p>
    </div>
  )
}

export default ChainCheck