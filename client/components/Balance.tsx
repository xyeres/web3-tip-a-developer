import React, { useEffect, useState } from 'react'
import useMetamask from '../hooks/useMetamask'

type Props = {}

const Balance = (props: Props) => {
  const { metaState } = useMetamask()
  const [balance, setBalance] = useState('loading...')

  useEffect(() => {
    const { account, isConnected, web3 } = metaState;

    console.log(isConnected, account, web3)

    if (account.length && web3) {
      (async () => {
        let _balance;
        //@ts-ignore
        if (web3?.eth) {
        //@ts-ignore
          _balance = await web3.eth.getBalance(metaState.account[0]);
        } else {
        //@ts-ignore
          _balance = await web3.getBalance(metaState.account[0]);
        }
        //@ts-ignore
        setBalance(parseFloat(_balance / 10 ** 18).toFixed(3));
      })();
    }
  }, [metaState]);


  return (
    <div>
      And you have {" "} <b><code>{balance}</code></b> in your account
    </div>
  )
}

export default Balance