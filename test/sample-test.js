const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Tip A Developer Contract", async function () {
  it("tips should be added to contract balance", async function () {
    // get example accounts
    const [owner, newOwner, tipper2, tipper3] = await hre.ethers.getSigners();

    // setup contract
    const TipADeveloper = await ethers.getContractFactory("TipADeveloper");
    const tipADeveloper = await TipADeveloper.deploy();
    await tipADeveloper.deployed();

    // expect memos to be empty at deployment
    expect(await tipADeveloper.getMemos()).to.have.lengthOf(0);

    // test making a tip
    const tip = { value: hre.ethers.utils.parseEther("2") };

    // ensure contract balance changed
    await expect(() =>
      tipADeveloper.connect(tipper3).tip("Bobby", "Love it", tip)
    ).to.changeEtherBalance(tipADeveloper.address, "2000000000000000000");

    // expect memos length now to be 1
    expect(await tipADeveloper.getMemos()).to.have.lengthOf(1);

    // anyone can call withDrawTips,
    await expect(() =>
      tipADeveloper.connect(tipper3).withdrawTips()
    ).to.changeEtherBalance(owner, "2000000000000000000");
  });
});
