function getContract() {
  // TODO: Refactor this pattern in app:
  /**
   *    const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const tipADeveloper = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
   */
}

export default getContract;
