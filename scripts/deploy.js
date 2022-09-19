const hre = require('hardhat')

// Mumbai Deployments
// Deployed: 9/19/22 0x069C1Cf0aA774b3cdc70Fe487fDE4f30C64D78Cc

// Goerli Deployments
// Deployed: 6/30/22 0x928514150f5914625CfBb6De11E432De4674c785
// Deployed: 6/29/22 0xb8eFC509968689f06568d606F927003CDA4cc811

async function main() {
  // get the contract and deploy 
  const TipADeveloper = await hre.ethers.getContractFactory("TipADeveloper");
  const tipADeveloper = await TipADeveloper.deploy();
  await tipADeveloper.deployed()
  console.log(`TipADeveloper deployed to `, tipADeveloper.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
