// const { ethers, run, network } = require("hardhat");
// require("dotenv").config();


import { ethers, run, network}  from "hardhat";
import "dotenv/config";
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("deploying contract ....");

  const simpleStorage = await SimpleStorageFactory.deploy();
  // await simpleStorage.deployed();
   const contractAddress= await simpleStorage.getAddress();
console.log(contractAddress);

if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
 await simpleStorage.deployTransaction.wait(6);
  await verify( contractAddress, []);
}

const currentValue = await simpleStorage.retrieve();
console.log(`Current value is ${currentValue}`);

const transactionResponse =  await simpleStorage.store(7);
await transactionResponse.wait(1);

const updatedValue= await simpleStorage.retrieve();
console.log(`Updated value is ${updatedValue}`)

 
}



async function verify(contractAddress :string, args:any[]) {
  console.log("Verifying contract...")
  try{
    await run("verify:verify", {
      address:contractAddress,
      constructorArguments:args,
    });
  }
  catch(e:any){
    if(e.message.toLowerCase().icludes("already verified")) {
      console.log("already verified");

    } else {
      console.log(e);
    }
  }
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
