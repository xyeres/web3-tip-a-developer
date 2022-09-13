import React, { useEffect } from 'react'
import useMetamask from '../hooks/useMetamask';

const ThankYou = () => {
  const { setMessage } = useMetamask()

  useEffect(() => {
    setMessage("Thank You for your cheers!")
  }, [])

  return (
    <></>
  )
}

export default ThankYou