import { useStoreApi } from "./storeApi";
import useWeb3 from "./useWeb3";

import { Button } from "@material-ui/core";
import { useEffect } from "react";
import jsonAbi from "./abi/rentContract.json";


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
    console.log("zxc deadinside");
  }, [address]);

  const updateBalance = async fromAddress => {
    await web3.eth.getBalance(fromAddress).then(value => {
      setBalance(web3.utils.fromWei(value, "ether"));
    });
  };

  const getBalance = async (e) => {
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0].toString();
    
    var RentContract = new web3.eth.Contract(jsonAbi, "0x6a799980f5499f8000c5d842eeb95e38ded69052");
    
    var balance = await RentContract.methods.balances(sender).call();
    
    return balance;
  }; 

  return address ?(
    <div>
      {address.slice(0, 6)}...{address.slice(
              address.length - 12,
              address.length
        )}
    </div>
  ) : (
    <Button
        onClick={() => getUserAccount()}
        variant="outlined"
        style={{backgroundColor: "#584C7F", color: "white"}}
        >
        Подключить кошелек
        </Button>
  );
}

export default ConnectButton; 