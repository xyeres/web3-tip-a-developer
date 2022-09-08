async function connectMetaMask() {
  var currentAccount = null;
  var error = null;

  try {
    // @ts-ignore
    const { ethereum } = window;

    if (!ethereum) {
      error = new Error("Please install MetaMask")
    }

    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    currentAccount = accounts[0];

  } catch (err) {
    error = err;
  }
  return [currentAccount, error]
};

export default connectMetaMask;