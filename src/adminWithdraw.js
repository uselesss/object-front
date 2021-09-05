import { useStoreApi } from "./storeApi";
import useWeb3 from "./useWeb3";

import { Button, TextField } from "@material-ui/core";
import jsonAbi from "./abi/rentContract.json";

function Withdraw() {
  const { balance, address, message, setAddress, setBalance } = useStoreApi();
  const web3 = useWeb3();

  const sendTransaction = async e => {
    e.preventDefault();

    const amount = e.target[0].value;
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0].toString();
    
    const wamount = web3.utils.toWei(amount, "ether");

    var RentContract = new web3.eth.Contract(jsonAbi, "0x6a799980f5499f8000c5d842eeb95e38ded69052");
    
    var transact = await RentContract.methods.withdraw(sender, wamount).send(
      { 
        from: sender, 
        value: 0, 
        gas: 4000000
      }, 
      (err, res) => 
      err ? console.log(`error ${err}`): console.log(`Success ${res}`)
      );
      
  }; 

  return (
    
    <form onSubmit={e => sendTransaction(e)}>
      <TextField
        required
        label="Кол-во ETH"
        inputProps={{ step: "any" }}
        type="number"
        variant="filled"
      />
      <Button
      variant="filled"
      color="primary"
      type="submit">
      Вывести средства
      </Button>
    </form>
  );
}

export default Withdraw; 