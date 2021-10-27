import React, { useState, useEffect } from 'react';
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
import {contractAddress} from "./contractAddress";

import { useStoreApi } from "./storeApi";
import useWeb3 from "./useWeb3";
import jsonAbi from "./abi/rentContract.json";

function Lots() {
    const web3 = useWeb3();

    const [cards, setCards] = useState();
    
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
                            imagePath={info.imagePath}
                            isAuction={info.isAuction}
                            info={info}
                        />
                    </Grid>
                )
            }
        }

        setCards(cardsRender)
    } else {
        setCards(<div class="lds-hourglass"></div>)
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
    const web3 = useWeb3();
    const { balance, address, message, setAddress } = useStoreApi();
    const now = Date.now();

    const dt = new Date((parseInt(props.info.auctionEndTime) - now))

    let hr = dt.getHours()
    let min = dt.getMinutes()
    let sec = dt.getSeconds()

    if (min < 10) min = "0"+min.toString()
    if (sec < 10) sec = "0"+sec.toString()

    const sign = async e => {

        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0].toString();

        console.log(props.info)
        
        if (!props.boolStatus) {
            var RentContract = new web3.eth.Contract(jsonAbi, contractAddress)
            var signContract = await RentContract.methods.signContract(
                props.id,
                props.isAuction ? (parseInt(props.price) + parseInt(props.info.auctionTick)).toString() : 0,
                false
            ).send(
                {
                    from: sender,
                    value: props.isAuction ? props.price * 0.05 : props.price,
                    gas: 4000000
                },
                (err, res) => err ? console.log(`error ${err}`) : console.log(`Success ${res}`)
            );
            
        }
    }

    const claim = async e => { }

    return (
        <Card style={{backgroundColor: "#181a1b"}}>
            <CardContent>
                <img src={props.imagePath} alt="rentImg" style={{display: "block", marginLeft: "auto", marginRight: "auto", marginBottom: "10px", width:"300px", height: "200px"}}/>
                <Typography gutterBottom variant="h5" component="h2" style={{color: "#fff"}}> 
                    Лот #{props.id + 1}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{color: "#a3a2a0"}}>
                    Площадь: {props.area} м^2
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{color: "#a3a2a0"}}>
                    Статус: 
                    {
                    props.info.isAuction ? 
                        (
                            props.info.hasEnded ? (" Аукцион завершен") : (` Идет аукцион, шаг цены ${props.info.auctionTick/1e18} ETH`)
                        ) 
                        : 
                        (props.status)
                    }
                </Typography>
                {props.info.isAuction && !props.info.hasEnded ?
                <Typography variant="body2" color="textSecondary" component="p" style={{color: "#a3a2a0"}}>
                    Конец аукциона: {hr}:{min}:{sec} 
                </Typography>
                : ""}
                {props.info.isAuction && !props.info.hasEnded ?
                <Typography variant="body2" color="textSecondary" component="p" style={{color: "#a3a2a0"}}>
                    Текущий победитель: {props.info.tenant} 
                </Typography>
                : ""}
                
                
            </CardContent>
            <CardActions>
                <Button size="medium" color="primary" onClick={props.info.hasEnded ? ("") : (e => sign(e))}>
                    {props.isAuction ? 
                        (props.info.hasEnded ? "аукцион завершен" : `Предложить ${parseInt(props.info.monthlyPrice)/1e18} ETH`)  
                        : 
                        (props.rentStatus)
                    }
                </Button> 
                {
                    props.info.hasEnded ? (
                        props.info.tenant == address ? (
                            <Button size="medium" color="primary" onClick={e => claim(e)}>
                                Подтвердить аренду
                            </Button> 
                        ) : ""
                    ) : ""
                }
                
            </CardActions>
        </Card>
    );
}

export default Lots;