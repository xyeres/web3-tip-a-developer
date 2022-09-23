import { expect } from "chai";
import { ethers } from "hardhat";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { BigNumber } from "ethers";

describe("TipADeveloper", function tipADeveloperSuite() {
  async function deployTipADevFixture() {
    // get example accounts
    const [owner, newOwner, tipper2, tipper3] = await ethers.getSigners();

    // setup contract
    const TipADeveloper = await ethers.getContractFactory("TipADeveloper");
    const tipADeveloper = await TipADeveloper.deploy();

    await tipADeveloper.deployed();

    // Create a tip amount:
    function createTip(amount: string): { value: BigNumber } {
      return { value: ethers.utils.parseEther(amount) };
    }

    return { tipADeveloper, createTip, owner, newOwner, tipper2, tipper3 };
  }

  describe("Deployment", function testDeployment() {
    it("Should set the right owner", async function setRightOwner() {
      const { tipADeveloper, owner } = await loadFixture(deployTipADevFixture);
      expect(await tipADeveloper.owner()).to.equal(owner.address);
    });

    it("Should store funds as payable address", async function receieveFunds() {
      const { tipADeveloper } = await loadFixture(deployTipADevFixture);
      expect(await ethers.provider.getBalance(tipADeveloper.address)).to.equal(
        "0"
      );
    });
  });

  describe("Tipping", function testTipping() {
    describe("Validations", function testValidations() {
      it("Should revert with the right error if called with zero value", async function revertWhenValueZero() {
        const { tipADeveloper, createTip, tipper2 } = await loadFixture(
          deployTipADevFixture
        );

        let tip = createTip("0");

        // SUT
        await expect(
          tipADeveloper.connect(tipper2).tip("test name", "test msg", tip)
        ).to.be.revertedWith("Tip must be greater than 0");
      });

      it("Should successfully add tip to contract balance", async function addTipToBalance() {
        const { tipADeveloper, createTip, tipper3 } = await loadFixture(
          deployTipADevFixture
        );

        let tip = createTip("0.005");

        await expect(
          tipADeveloper.connect(tipper3).tip("Test user", "test message", tip)
        ).to.changeEtherBalance(tipADeveloper.address, "5000000000000000");
      });
    });

    describe("Transfers", function testTransfers() {
      it("Should transfer balance to owner's wallet when called by anyone", async function () {
        const { tipADeveloper, createTip, owner, tipper3, tipper2 } =
          await loadFixture(deployTipADevFixture);

        let tip = createTip("2");
        tipADeveloper.connect(tipper2).tip("Test user", "Test tip", tip);

        // SUT
        await expect(() =>
          tipADeveloper.connect(tipper3).withdrawTips()
        ).to.changeEtherBalances(
          [owner, tipADeveloper],
          ["2000000000000000000", "-2000000000000000000"]
        );

        await expect(tipADeveloper.withdrawTips()).not.to.be.reverted;
      });
    });
  });

  describe("Events", function testEvents() {
    it("Should emit an event when tip receieved", async function emitEventWhenTipRecieved() {
      const { tipADeveloper, createTip, tipper2 } = await loadFixture(
        deployTipADevFixture
      );

      // Used to pass args later
      let testMemo = "A test memo";
      let testUser = "Test User";
      let tip = createTip("0.001");

      await expect(tipADeveloper.connect(tipper2).tip(testUser, testMemo, tip))
        .to.emit(tipADeveloper, "NewMemo")
        .withArgs(tipper2.address, anyValue, testUser, testMemo);
    });
  });

  describe("Protected", function testProtected() {
    describe("Ownership", function testOwnership() {
      it("Should revert with correct error when called by non-owner", async function revertWhenNotOwner() {
        const { tipADeveloper, owner, tipper3 } = await loadFixture(
          deployTipADevFixture
        );
        await expect(
          tipADeveloper.connect(tipper3).transferOwner(tipper3.address)
        ).to.be.revertedWith(
          "You must be owner of contract to transfer ownership"
        );
        expect(await tipADeveloper.owner()).to.equal(owner.address)
        expect(await tipADeveloper.owner()).to.not.equal(tipper3.address)
      });

      it("Should transfer ownership to new owner and shouldn't revert", async function shouldTransferOwner() {
        const { tipADeveloper, owner, newOwner } = await loadFixture(
          deployTipADevFixture
        );

        // Check initial expected state
        expect(await tipADeveloper.owner()).to.equal(owner.address);

        // Call SUT correctly
        await expect(
          tipADeveloper.connect(owner).transferOwner(newOwner.address)
        ).to.not.be.reverted;

        expect(await tipADeveloper.owner()).to.equal(newOwner.address);
      });
    });
  });
  describe("Views", function testProtected() {
    it("Should return an array of Memos", async function returnArrayOfMemos() {
      const { tipADeveloper, createTip, tipper2, tipper3 } = await loadFixture(
        deployTipADevFixture
      );
      let tip = createTip("0.0005");
      let tip2 = createTip("0.0005");
      await tipADeveloper.connect(tipper2).tip("Test name", "test memo", tip);
      await tipADeveloper.connect(tipper3).tip("Test name", "test memo", tip2);
      expect(await tipADeveloper.getMemos()).to.have.lengthOf(2);
    });
  });
});
