const hre = require("hardhat");

async function main() {
  const GLDTokenContract = await hre.ethers.getContractFactory("GoldERC20");
  const gldTokenContract = await GLDTokenContract.deploy();
  await gldTokenContract.deployed();
  console.log("Deployed to", gldTokenContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
