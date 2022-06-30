const hre = require('hardhat')

// Deployed: 6/30/22 0x928514150f5914625CfBb6De11E432De4674c785
// Deployed: 6/29/22 0xb8eFC509968689f06568d606F927003CDA4cc811

async function main() {
  // get the contract and deploy 
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await BuyMeACoffee.deploy();
  await buyMeACoffee.deployed()
  console.log(`BuyMeACoffee deployed to `, buyMeACoffee.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
