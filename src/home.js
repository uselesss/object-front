import React, { useState, useEffect } from 'react';

import Nice from './images/nice.png';

import { useStoreApi } from "./storeApi";
import useWeb3 from "./useWeb3";
import jsonAbi from "./abi/rentContract.json";
import {contractAddress} from "./contractAddress"

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Collapse, Grid } from '@material-ui/core';
import { AccountTree } from '@material-ui/icons';

function UserRents() {
    const { balance, address, message, setAddress } = useStoreApi();
    const web3 = useWeb3();

    const [cards, setCards] = useState();
    const [contBalance, setBalance] = useState();

    useEffect(async () => {
        if (web3) {
            const getContractsLength = async () => {
                var RentContract = new web3.eth.Contract(jsonAbi, contractAddress)
                var rentsCount = await RentContract.methods.getContractsLength().call()
                return rentsCount
            }

            const getContract = async (id) => {
                var RentContract = new web3.eth.Contract(jsonAbi, contractAddress)
                var contract = await RentContract.methods.rentContracts(id).call()
                return contract
            }

            const getBalance = async (userAddress) => {
                var RentContract = new web3.eth.Contract(jsonAbi, contractAddress)
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

                    if (info.tenant == sender) {
                        cardsRender.push(
                            <Grid item xs={12} sm={6} md={4}>
                                <RentInfoCard
                                    id={i}
                                    area={info.area}
                                    price={info.monthlyPrice}
                                    timestamp={info.paymentTimestamp}
                                    payed={info.opPayed}
                                    imagePath={info.imagePath}
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
                setCards(<h2 style={{ marginTop: "20px", marginLeft: "20px", fontSize: "40px" }}>MetaMask не подключен!</h2>)
            }
        }
    });


    return (
        <div className="mainPageDiv">
            <div>Ваш баланс: {contBalance ? contBalance : "0"} ETH</div>
            <div>Ваши лоты:</div>

            <Grid container spacing={4}>
                {cards}
            </Grid>
        </div>
    );

}


function RentInfoCard(props) {
    const { balance, address, message, setAddress } = useStoreApi();
    const web3 = useWeb3();
    var paymentDate = new Date(parseInt(props.timestamp) * 1000);


    const terminate = async e => {

        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0].toString();

        var RentContract = new web3.eth.Contract(jsonAbi, contractAddress)
        var term = await RentContract.methods.terminateContract(
            props.id,
        ).send(
            {
                from: sender,
                value: 0,
                gas: 4000000
            },
            (err, res) => err ? console.log(`error ${err}`) : console.log(`Success ${res}`)
        );

    }

    const payOp = async e => {
        e.preventDefault()
        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0].toString();

        var RentContract = new web3.eth.Contract(jsonAbi, contractAddress)
        var term = await RentContract.methods.payOffOp(
            props.id,
        ).send(
            {
                from: sender,
                value: 0,
                gas: 4000000
            },
            (err, res) => err ? console.log(`error ${err}`) : console.log(`Success ${res}`)
        );

    }
    return (
        <Card style={{backgroundColor: "#181a1b"}}>
            <CardContent style={{color: "#fff"}}>
                <img src={props.imagePath} alt="Nice!" style={{display: "block", marginLeft: "auto", marginRight: "auto", marginBottom: "10px", width:"300px"}}/>
                <Typography gutterBottom variant="h5" component="h2" style={{color: "#fff"}}>
                    Лот #{props.id + 1}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{color: "#fff"}}>
                    Площадь: {props.area} м^2
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{color: "#fff"}}>
                    Договор заключен: {paymentDate.toString()}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{color: "#fff"}}>
                    Статус ОП: {props.payed ? ("Оплачен") : ("Не оплачен")}
                </Typography>
                {props.payed ? ("") :
                    <Typography variant="body2" color="textSecondary" component="p" style={{color: "#fff"}}>
                        Осталось дней для оплаты: {"TODO FIX ME"}
                    </Typography>
                }
            </CardContent>

            <CardActions>
                <Button onClick={e => terminate(e, props.id)} color="primary"> 
                    Расторгнуть контракт
                </Button>
                {props.payed ? ("") :
                    <Button 
                        onClick={e => payOp(e)}
                        style={{ position: "relative", left: "4rem"}}
                        color="primary"
                    >
                        Оплатить ОП
                    </Button>
                }
            </CardActions>
        </Card>
    );
}

export default UserRents;