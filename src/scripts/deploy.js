async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    const balance = await deployer.getBalance();
    console.log("Account balance:", balance.toString());

    const MyNFTWithRoyalties = await ethers.getContractFactory("MyNFTWithRoyalties");
    const myNFTWithRoyalties = await MyNFTWithRoyalties.deploy();

    console.log("MyNFTWithRoyalties address:", myNFTWithRoyalties.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });