import React, { useEffect } from 'react'
import useMetamask from '../hooks/useMetamask';
import { StepProps } from './Web3Start';

const ThankYou = ({ setTipmessage }: StepProps) => {
  useEffect(() => {
    setTipmessage("");
  }, [setTipmessage]);

  return (
    <>Thank you</>
  )
}

export default ThankYou