import { createContext, Dispatch, SetStateAction, useState } from "react"

export type Tip = {
  user: string
  message: string
  amount: string
}

interface TipContext {
  tip: Tip,
  config: {
    setUser: Dispatch<SetStateAction<string>>
    setMessage: Dispatch<SetStateAction<string>>
    setAmount: Dispatch<SetStateAction<string>>
  }
}


const initialState = {
  tip: {
    user: "",
    message: "",
    amount: "0",
  },
  config: {
    setUser: () => { },
    setMessage: () => { },
    setAmount: () => { }
  }
}

const TipContext = createContext<TipContext>(initialState)

function TipProvider({ children }: any) {

  const [user, setUser] = useState("")
  const [message, setMessage] = useState("")
  const [amount, setAmount] = useState("0")


  const context = {
    tip: {
      user,
      message,
      amount,
    },
    config: {
      setUser,
      setMessage,
      setAmount
    }
  }


  return (
    <TipContext.Provider value={context}>
      {children}
    </TipContext.Provider>
  )
}

export { TipProvider, TipContext }