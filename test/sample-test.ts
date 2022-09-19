import { expect } from "chai";
import { ethers } from "hardhat";

import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Tip A Developer Contract", async function () {
  async function deployTipADevFixture() {
    // get example accounts
    const [owner, newOwner, tipper2, tipper3] = await ethers.getSigners();

    // setup contract
    const TipADeveloper = await ethers.getContractFactory("TipADeveloper");
    const tipADeveloper = await TipADeveloper.deploy();
    // await tipADeveloper.deployed();

    return { tipADeveloper, owner, newOwner, tipper2, tipper3 };
  }

  it("withdrawTips should be callable by anyone", async function () {
    const { tipADeveloper, owner, tipper3, tipper2 } = await loadFixture(
      deployTipADevFixture
    );
    // test making a tip
    const tip = { value: ethers.utils.parseEther("2") };
    tipADeveloper.connect(tipper2).tip("Bobby", "Love it", tip);

    await expect(() =>
      tipADeveloper.connect(tipper3).withdrawTips()
    ).to.changeEtherBalance(owner, "2000000000000000000");
  });

  // it("tips should be added to contract balance", async function () {
  //   // expect memos to be empty at deployment
  //   expect(await tipADeveloper.getMemos()).to.have.lengthOf(0);

  //   // test making a tip
  //   const tip = { value: ethers.utils.parseEther("2") };

  //   // ensure contract balance changed
  //   await expect(() =>
  //     tipADeveloper.connect(tipper3).tip("Bobby", "Love it", tip)
  //   ).to.changeEtherBalance(tipADeveloper.address, "2000000000000000000");

  //   // expect memos length now to be 1
  //   expect(await tipADeveloper.getMemos()).to.have.lengthOf(1);
  // });
});
