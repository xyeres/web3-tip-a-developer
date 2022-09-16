const hre = require("hardhat");

// Returns the Ether balance of a given address
async function getBalance(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

// Logs the Ether balance for a list of address
async function printBalances(addresses) {
  let idx = 0;
  for (const address of addresses) {
    console.log(`Address ${idx} balance `, await getBalance(address));
    idx++;
  }
}

// Logs memos stored on-chain from tips
async function printMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const tipper = memo.name;
    const tipperAddress = memo.from;
    const message = memo.message;
    console.log(
      `At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"`
    );
  }
}

async function main() {
  // get example accounts
  const [owner, newOwner, tipper2, tipper3] = await hre.ethers.getSigners();

  // get the contract and deploy
  const TipADeveloper = await hre.ethers.getContractFactory("TipADeveloper");
  const tipADeveloper = await TipADeveloper.deploy();
  await tipADeveloper.deployed();
  console.log(`TipADeveloper deployed to `, tipADeveloper.address);

  // check balances before sending tip
  const addresses = [
    owner.address,
    newOwner.address,
    tipper3.address,
    tipper2.address,
    tipADeveloper.address,
  ];
  console.log("==== start ===");
  await printBalances(addresses);

  // tip the contract owner a few coins
  const tip = { value: hre.ethers.utils.parseEther("2") };
  await tipADeveloper.connect(tipper3).tip("Bobby", "Love it", tip);
  await tipADeveloper.connect(tipper2).tip("Tallbutt", "Cool!", tip);
  console.log("==== tip sent ===");
  await printBalances(addresses);

  // withdraw funds
  console.log("=== withdraw tips ===");
  await tipADeveloper.connect(newOwner).withdrawTips();
  await printBalances(addresses);

  // Change Owner
  console.log("=== transfering ownership of contract ===");
  console.log("attempting to transfer...");
  await tipADeveloper.connect(owner).transferOwner(newOwner.address);
  console.log("transfer complete...");

  // Make more tips from same people
  const moreTip = { value: hre.ethers.utils.parseEther("10") };
  await tipADeveloper
    .connect(tipper3)
    .tip("Bobby", "Love it again even with the new ownership", moreTip);
  await tipADeveloper
    .connect(tipper2)
    .tip("Tallbutt", "Cool I like the new owner!", moreTip);
  console.log("*** 2 tips for 10eth each are made... ***");

  // Balance check
  console.log("=== balances after ownership transfer and those 2 tips above ===");
  await printBalances(addresses);

  // withdraw funds to new owner
  console.log("=== withdraw tips to new owner ===");
  await tipADeveloper.connect(newOwner).withdrawTips();
  await printBalances(addresses);

  //read all the memos left for the owner
  console.log("==== memos ===");
  const memos = await tipADeveloper.getMemos();
  printMemos(memos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
