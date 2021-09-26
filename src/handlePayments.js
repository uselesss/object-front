import { useStoreApi } from "./storeApi";
import useWeb3 from "./useWeb3";

import { Button, TextField } from "@material-ui/core";
import jsonAbi from "./abi/rentContract.json";
import Withdraw from "./adminWithdraw.js";
import {contractAddress} from "./contractAddress"

function Deposit() {
  const { balance, address, message, setAddress, setBalance } = useStoreApi();
  const web3 = useWeb3();

  const sendTransaction = async e => {
    e.preventDefault();

    const amount = e.target[0].value;
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0].toString();
    
    var RentContract = new web3.eth.Contract(jsonAbi, contractAddress);
    
    var transact = await RentContract.methods.deposit(sender).send(
      { 
        from: sender, 
        value: web3.utils.toWei(amount.toString(), "ether"), 
        gas: 4000000
      }, 
      (err, res) => 
      err ? console.log(`error ${err}`): console.log(`Success ${res}`)
      );
      
  }; 

  return address ? (
    
    <form onSubmit={e => sendTransaction(e)}>
      <TextField
        required
        label="Кол-во ETH"
        inputProps={{ step: "any" }}
        type="number"
        variant="filled"
        color="primary"
      />
      <Button
      variant="filled"
      color="primary"
      type="submit"
      style={{color: "white"}}
      >
      Пополнить счет
      </Button>
    </form>
    ) : (<a/>);
}

export default Deposit; 