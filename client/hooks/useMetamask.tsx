import { ExternalProvider } from "@ethersproject/providers";
import { useContext, useEffect, useState, useRef } from "react";
import { MetaDispatchContext, MetaStateContext } from "../lib/MetamaskStateProvider";

const chains = (chainId: string) => {
  if (!!Number(chainId) && chainId.length > 9) {
    return "local";
  }
  switch (chainId) {
    case "1": return "Ethereum mainnet";
    case "3": return "Ethereum testnet ropsten";
    case "4": return "Ethereum testnet rinkeby";
    case "5": return "Ethereum testnet goerli";
    case "42": return "Ethereum testnet kovan";
    case "137": return "Matic mainnet";
    case "80001": return "Matic testnet (mumbai)";
    default: return `unknown`;
  }
};

const useMetamask = () => {
  const state = useContext(MetaStateContext);
  const dispatch = useContext(MetaDispatchContext);
  const _isMounted = useRef(true);
  const [provider, setProvider] = useState<ExternalProvider>();

  // Set provider in browser only (NextJS)
  useEffect(() => {
    setProvider(window.ethereum)
  }, [provider])

  useEffect(() => {
    return () => {
      _isMounted.current = false;
    }
  }, []);


  const connect = async (Web3Interface: any, settings = {}, requestPermission: boolean = false) => {
    if (!provider) throw Error("MetaMask is not available.");
    if (state.account[0]) return;
    if (!Web3Interface)
      throw Error("Web3 Provider is required. You can use ethers.js");
    // if (!_isMounted.current) throw Error("Component is not mounted.");

    if (!state.web3) {
      const _web3 = new Web3Interface(
        ...(Object.keys(settings).length
          ? [provider, settings]
          : [provider])
      );

      dispatch({ type: "SET_WEB3", payload: _web3 });
    }

    function chainChangedHandler(chainId: string) {
      const _chainId = parseInt(chainId, 16).toString();
      const _chainInfo = { id: _chainId, name: chains(_chainId) };
      dispatch({ type: "SET_CHAIN", payload: _chainInfo });
      window.location.reload();
    }

    function accountsChangedHandler(accounts: []) {
      if (!accounts.length) dispatch({ type: "SET_CONNECTED", payload: false });
      dispatch({ type: "SET_ACCOUNT", payload: accounts });
    }

    //@ts-ignore
    provider.on("accountsChanged", accountsChangedHandler);
    //@ts-ignore
    provider.on("chainChanged", chainChangedHandler);

    await getAccounts({ requestPermission });
    await getChain();
  };

  const getAccounts = async ({ requestPermission } = { requestPermission: false }) => {
    if (!provider) {
      console.warn("MetaMask is not available.");
      return;
    }
    try {
      //@ts-ignore
      const accounts = await provider.request({
        method: requestPermission ? "eth_requestAccounts" : "eth_accounts",
        params: []
      });
      if (accounts.length) {
        dispatch({ type: "SET_CONNECTED", payload: true });
        dispatch({ type: "SET_ACCOUNT", payload: accounts });
      }
      return accounts;
    } catch (error) {
      throw error;
    }
  }

  const getChain = async () => {
    if (!provider) {
      console.warn("MetaMask is not available.");
      return;
    }
    try {
      //@ts-ignore
      const chainId = await provider.request({
        method: "net_version",
        params: []
      });
      const _chainInfo = { id: chainId, name: chains(chainId) };
      dispatch({
        type: "SET_CHAIN",
        payload: _chainInfo
      });
      return _chainInfo;
    } catch (error) {
      throw error;
    }
  }


  return {
    connect,
    getAccounts,
    getChain,
    metaState: { ...state, isAvailable: !!provider },
  };
}

export default useMetamask;