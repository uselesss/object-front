import React, { useState, useEffect } from 'react';

import Nice from './images/nice.png';

import { useStoreApi } from "./storeApi";
import useWeb3 from "./useWeb3";
import jsonAbi from "./abi/rentContract.json";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Collapse, Grid } from '@material-ui/core';
import { AccountTree } from '@material-ui/icons';

let mounted = false;

function UserRents() {
    const { balance, address, message, setAddress } = useStoreApi();
    const web3 = useWeb3();
    
    const [cards, setCards] = useState();
    const [contBalance, setBalance] = useState();

    useEffect(async () => {
        if (web3 && !mounted) {
            mounted = true
            const getContractsLength = async () => {
                var RentContract = new web3.eth.Contract(jsonAbi, "0x6a799980f5499f8000c5d842eeb95e38ded69052")
                var rentsCount = await RentContract.methods.getContractsLength().call()
                return rentsCount
            }

            const getContract = async (id) => {
                var RentContract = new web3.eth.Contract(jsonAbi, "0x6a799980f5499f8000c5d842eeb95e38ded69052")
                var contract = await RentContract.methods.rentContracts(id).call()
                return contract
            }

            const getBalance = async (userAddress) => {
                var RentContract = new web3.eth.Contract(jsonAbi, "0x6a799980f5499f8000c5d842eeb95e38ded69052")
                var balance = await RentContract.methods.balances(userAddress).call()
                return balance
            }

            let rentsCount = await getContractsLength()
            const accounts = await web3.eth.getAccounts()

            if (accounts[0]) {
                const sender = accounts[0].toString()

                let cardsRender = [];

                for (let i = 0; i < rentsCount; i++) {
                    let info = await getContract(i)
                    console.log(info.tenant)

                    if (info.tenant == sender) {
                        cardsRender.push(
                            <Grid item xs={12} sm={6} md={4}>
                                <RentInfoCard
                                    id={i}
                                    area={info.area}
                                    price={info.monthlyPrice}
                                    date={info.paymentDate}
                                />
                            </Grid>
                        )
                    }
                }

                setCards(cardsRender)


                //get the balance
                let bal = await getBalance(accounts[0].toString())
                setBalance(bal / 1e18)
            }
            else {
                setCards(<h2 style={{marginTop: "20px", marginLeft: "20px"}}>MetaMask не подключен!</h2>)
            }
        }
    });    
 

    return (
        <div className="mainPageDiv">
            <div>Ваш баланс: {contBalance ? contBalance : "..."} ETH 😳</div>
            <div>Ваши лоты:</div>

            <Grid container spacing={4}>
                {cards}
            </Grid>
        </div>
    );

}

function RentInfoCard(props) {
    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <img src={Nice} alt="Nice!" />
                    <Typography gutterBottom variant="h5" component="h2">
                        Лот #{props.id+1}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Площадь: {props.area} м^2
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Статус: Оплачено
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Дата оплаты: {props.date} число
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default UserRents;