import React, { useEffect } from 'react'
import useMetamask from '../../hooks/useMetamask';
import { StepProps } from '../Web3Start';

const ThankYou = ({ setTipmessage }: StepProps) => {
  useEffect(() => {
    setTipmessage("");
  }, [setTipmessage]);

  return (
    <div className='max-w-xs mt-4 text-sm'>
      Wow, thank you! Your kindness will appear in the memo list above shortly.
    </div>
  )
}

export default ThankYou