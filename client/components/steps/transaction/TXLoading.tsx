import React from 'react'
import Spinner from '../../Spinner'

type Props = {
  message: string
}

const TXLoading = ({ message }: Props) => {
  return (
    <div className="mt-5 flex w-full flex-col items-center">
      <Spinner />
      <p className="mt-4 text-xs font-bold">{message}</p>
    </div>
  )
}

export default TXLoading