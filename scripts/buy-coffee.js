const hre = require("hardhat");

// Returns the Ether balance of a given address 
async function getBalance(address) {
  const balanceBigInt = await hre.waffle.provider.getBalance(address)
  return hre.ethers.utils.formatEther(balanceBigInt)
}

// Logs the Ether balance for a list of address
async function printBalances(addresses) {
  let idx = 0;
  for (const address of addresses) {
    console.log(`Address ${idx} balance `, await getBalance(address));
    idx++;
  }
}

// Logs memos stored on-chain from coffee purchases
async function printMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp
    const tipper = memo.name
    const tipperAddress = memo.from
    const message = memo.message
    console.log(`At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"`)
  }
}

async function main() {
  // get example accounts
  const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();

  // get the contract and deploy 
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await BuyMeACoffee.deploy();
  await buyMeACoffee.deployed()
  console.log(`BuyMeACoffee deployed to `, buyMeACoffee.address)

  // check balances before coffee purchase
  const addresses = [owner.address, tipper3.address, tipper2.address, buyMeACoffee.address]
  console.log('==== start ===')
  await printBalances(addresses)

  // buy the owner a few coffees
  const tip = { value: hre.ethers.utils.parseEther('2') }
  await buyMeACoffee.connect(tipper3).buyCoffee("Bobby", "Love it", tip)
  await buyMeACoffee.connect(tipper2).buyCoffee("Tallbutt", "Cool!", tip)
  console.log('==== bought coffee ===')
  await printBalances(addresses)

  // withdraw funds
  // await buyMeACoffee.connect(owner).withdrawTips();

  // check balance after withdraw
  console.log('==== did not withdraw tips ===')
  await printBalances(addresses)

  //read all the memos left for the owner
  console.log('==== memos ===')
  const memos = await buyMeACoffee.getMemos()
  printMemos(memos)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
