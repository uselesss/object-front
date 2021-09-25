﻿import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Collapse, Grid } from '@material-ui/core';
import { ExpandLess, ExpandMore, InfoSharp } from '@material-ui/icons';

import { useStoreApi } from "./storeApi";
import useWeb3 from "./useWeb3";
import jsonAbi from "./abi/rentContract.json";

const header = {
    'Access-Control-Allow-Origin': '*',
}

/*let data = {}*/
let propsForCard = {};
let mounted = false;

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        minWidth: 200,
    },
    media: {
        height: 140,
    },
});

function Lots() {

    const { balance, address, message, setAddress, setBalance } = useStoreApi();
    const web3 = useWeb3();

    const [cards, setCards] = useState();
    
    useEffect(async () => {

        if (web3 && !mounted) {
            mounted = true // чтобы не вызывалось 200 раз

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

            let rentsCount = await getContractsLength()

            let cardsRender = [];

            for (let i = 0; i < rentsCount; i++) {
                let info = await getContract(i)

                if (info) {
                    cardsRender.push(
                        <Grid item xs={12} sm={6} md={4}>
                            <MediaCard
                                id={i}
                                area={info.area}
                                status={info.isOccupied ? "Занято" : "Свободно"}
                                price={info.monthlyPrice}
                                rentStatus={info.isOccupied ? ("Лот занят") : ("Арендовать за " + (info.monthlyPrice / 10 ** 18).toString()) + " ETH"}
                                boolStatus={info.isOccupied}
                            />
                        </Grid>
                    )
                }
            }

            setCards(cardsRender)
        }
    });


    return (
        <div className="cardsGrid">
            <Grid container spacing={4}>
                {cards}
            </Grid>
        </div>
    );

}

function MediaCard(props) {
    const { balance, address, message, setAddress, setBalance } = useStoreApi();
    const web3 = useWeb3();

    const sign = async e => {

        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0].toString();

        let newDate = new Date()
        let day = newDate.getDate();
        let month = newDate.getMonth();
        let contractDate = day.toString() + month.toString()

        console.log(props.id)
        console.log(props.price)
        console.log(contractDate)

        var RentContract = new web3.eth.Contract(jsonAbi, "0x6a799980f5499f8000c5d842eeb95e38ded69052")
        var contract = await RentContract.methods.signContract(
            props.id,
            false,
            day
        ).send(
            {
                from: sender,
                value: props.price,
                gas: 4000000
            },
            (err, res) => err ? console.log(`error ${err}`) : console.log(`Success ${res}`)
        );

    }

    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Лот #{props.id + 1}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Площадь: {props.area} м^2
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Статус: {props.status}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                { props.boolStatus ? 
                <Button size="medium" color="primary">
                    {props.rentStatus}
                </Button> 
                : 
                <Button size="medium" color="primary" onClick={e => sign(e)}>
                    {props.rentStatus}
                </Button>
                }
            </CardActions>
        </Card>
    );
}

export default Lots;