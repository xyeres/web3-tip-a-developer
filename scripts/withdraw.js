const hre = require('hardhat');
const contractJSON = require("../artifacts/contracts/BuyMeACoffee.sol/BuyMeACoffee.json")


async function getBalance(provider, address) {
  const balanceBigInt = await provider.getBalance(address)
  return hre.ethers.utils.formatEther(balanceBigInt)
}


async function main() {
  // Get contract that has been deployed:
  const contractAddress = '0x59b013582fBc9089604349e2040406Fd52B44eeC'
  const contractABI = contractJSON.abi

  // get the node connection to blockchain
  const provider = new hre.ethers.providers.AlchemyProvider("goerli", process.env.GOERLI_API_KEY)

  // and wallet connection
  // (ensure wallet address is same as original deployer address
  // or else this script will throw an error)
  const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider)

  // instantiate connected contract
  const buyMeACoffee = new hre.ethers.Contract(contractAddress, contractABI, signer)

  // Check starting balances
  const signerBalance = await getBalance(provider, signer.address)
  console.log("Initial Acccount Balances:")
  console.log('Current owner balance: ', signerBalance, " ETH")
  const contractBalance = await getBalance(provider, buyMeACoffee.address)
  console.log("Current contract balance: ", contractBalance, " ETH")



  // const tx = await buyMeACoffee.updateWithdrawAddr('0x0702f85EC828861C37821Ed5557c702BaA1a490c')
  // await tx.wait()
  // console.log('transfered', tx)

  // Ensure there is balance before withdrawing
  if (contractBalance !== "0.0") {
    // Withdraw funds to owner
    console.log("Withdrawing", contractBalance, "ETH")
    const withdrawTxn = await buyMeACoffee.withdrawTips()
    await withdrawTxn.wait()
    console.log("Withdraw successful")
  } else {
    console.log("No balance to withdraw")
  }
  console.log("Current balance of owner:", await getBalance(provider, signer.address), "ETH")
  console.log("Current balance of contract:", await getBalance(provider, buyMeACoffee.address), "ETH")
}

// ensure error handling 
// and proper execution of all promises
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });