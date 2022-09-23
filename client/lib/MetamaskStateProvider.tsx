import React, { createContext, ReactNode, useReducer } from "react";
import { ExternalProvider } from "@ethersproject/providers";
export type MetaMaskState = {
  account: string[];
  chain: { id: string | null, name: string | null };
  isConnected: boolean;
  web3: undefined | ExternalProvider,
}

type ReducerAction = {
  type: string,
  payload: number | string | object | boolean
}

const typeStateMap = {
  SET_ACCOUNT: "account",
  SET_CHAIN: "chain",
  SET_CONNECTED: "isConnected",
  SET_WEB3: "web3",
};

export const initialState: MetaMaskState = {
  account: [],
  chain: { id: null, name: "" },
  isConnected: false,
  web3: undefined,
};

const reducer = (state: any, action: ReducerAction) => {
  const stateName = typeStateMap[action.type as keyof typeof typeStateMap];
  if (!stateName) {
    console.warn(`Unkown action type: ${action.type}`);
    return state;
  }
  return { ...state, [stateName]: action.payload };
}

const MetaStateContext = createContext(initialState);
const MetaDispatchContext = createContext<React.Dispatch<ReducerAction>>(() => null);


type Props = {
  children?: ReactNode
}


const MetamaskStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <MetaDispatchContext.Provider value={dispatch}>
      <MetaStateContext.Provider value={state}>
        {children}
      </MetaStateContext.Provider>
    </MetaDispatchContext.Provider>
  );
};

export {
  typeStateMap,
  MetaStateContext,
  MetaDispatchContext,
  MetamaskStateProvider
}