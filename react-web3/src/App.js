import { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import abi from "./Counter.json";
// 合约地址
const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const contractABI = abi.abi;
function App() {
  const [count, setCount] = useState(0);
  const [address, setAddress] = useState();
  const contractRef = useRef();

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      try {
        const { ethereum } = window;
        if (ethereum) {
          console.log("metamask 可用");
        } else {
          console.log("请下载 metamask");
        }
        const address = await ethereum.request({
          method: "eth_accounts",
        });
        if (address.length !== 0) {
          setAddress(address[0]);
        }
        // 获取合约对象
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        contractRef.current = contract;

        const counts = await contractRef.current.getCounts();
        setCount(counts.toNumber());
      } catch (err) {
        console.log(err);
      }
    };
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("请下载 metamask");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts[0]);
      setAddress(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const execAdd = async () => {
    const tx = await contractRef.current.add();
    await tx.wait(); // 等待上链
    const counts = await contractRef.current.getCounts();

    setCount(counts.toNumber());
  };
  return (
    <div className="App">
      <p>address: {address}</p>
      <p> count: {count}</p>
      {address ? (
        <button onClick={execAdd}>执行合约里的add</button>
      ) : (
        <button onClick={connectWallet}>连接钱包</button>
      )}
    </div>
  );
}

export default App;
