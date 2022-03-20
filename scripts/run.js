const main = async () => {
  const Counter = await hre.ethers.getContractFactory("Counter");
  // 将合约部署到区块链
  const counter = await Counter.deploy();
  counter.deployed();

  console.log("合约地址", counter.address);

  console.log("counts", await counter.getCounts());

  await counter.add();
  console.log("counts", await counter.getCounts());

  await counter.add();
  console.log("counts", await counter.getCounts());
};
main()
  .then(() => {
    console.log("success");
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(0);
  });
