import { useStoreApi } from "./storeApi";
import useWeb3 from "./useWeb3";

import { Button } from "@material-ui/core";
import { useEffect } from "react";
import jsonAbi from "./abi/rentContract.json";
import {contractAddress} from "./contractAddress"

function ConnectButton() {
  const { balance, address, message, setAddress, setBalance } = useStoreApi();
  const web3 = useWeb3();

  // get user account on button click
  const getUserAccount = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        web3.eth.getAccounts().then(accounts => {
          setAddress(accounts[0]);
          updateBalance(accounts[0]);
        });
        
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Metamask extensions not detected!");
    }
  };
  
  useEffect(() => {
    getUserAccount();
  }, [address]);

  const updateBalance = async fromAddress => {
    await web3.eth.getBalance(fromAddress).then(value => {
      setBalance(web3.utils.fromWei(value, "ether"));
    });
  };

  const getBalance = async (e) => {
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0].toString();
    
    var RentContract = new web3.eth.Contract(jsonAbi, contractAddress);
    
    var balance = await RentContract.methods.balances(sender).call();
    
    return balance;
  }; 

  return address ? (
    <div className = "connect">
      {address.slice(0, 4)}...{address.slice(
              address.length - 4,
              address.length
        )}
    </div>
  ) : (
    <div className = "connect">
    <Button
      onClick={() => getUserAccount()}
      variant="outlined"
      className="connect"
      style={{backgroundColor: "#584C7F", color: "white", fontSize: "10px"}}
    >
      Подключить кошелек
    </Button>
    </div>
  );
}

export default ConnectButton; 