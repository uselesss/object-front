import React, {useCallback, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Withdraw from './adminWithdraw';
import { useStoreApi } from "./storeApi";
import useWeb3 from "./useWeb3";
import jsonAbi from "./abi/rentContract.json";
import {contractAddress} from "./contractAddress"

import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import {FloatingLabel} from "react-bootstrap";
import './css/admin.css';
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import moment from 'moment';
import { DateTime } from 'react-datetime-bootstrap';
import TextField from '@material-ui/core/TextField';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';

function Admin() {
    const [showauct, setShow] = useState('')
    const [neworupdate, setNeworupdate] = useState('')
    const [contractBalance, setContractBalance] = useState('')

    const web3 = useWeb3();
    const { balance, address, message, setAddress } = useStoreApi();

    const getBal = async () => {
        let bal;
        if (web3) {
            bal = await web3.eth.getBalance(contractAddress)
            setContractBalance(bal / 1e18)
        }
    }
    getBal()
    const createC = async e => {
        e.preventDefault()
        const price = (e.target[0].value * 1e18).toString()
        const area = e.target[1].value
        const image = e.target[2].value
        let endTimestamp

        if (showauct) {
            endTimestamp = e.target[4].value
        }

        if (web3) {
            var RentContract = new web3.eth.Contract(jsonAbi, contractAddress)
            const accounts = await web3.eth.getAccounts()
            const sender = accounts[0].toString()

            var createContract = await RentContract.methods.createRentContract(
                [
                    false,
                    "0x0000000000000000000000000000000000000000",
                    showauct,
                    false,
                    false,
                    0,
                    showauct ? Date.parse(endTimestamp) : 0,
                    0,
                    0,
                    0,
                    area,
                    price,
                    image
                ]
            ).send(
                {
                    from: sender,
                    value: 0,
                    gas: 4000000
                },
                (err, res) => err ? console.log(`error ${err}`) : console.log(`Success ${res}`)
            );
        }
        
    }

    const updateC = async e => {
        e.preventDefault()
        const price = (e.target[0].value * 1e18).toString()
        const area = e.target[1].value
        const image = e.target[2].value
        const contractId = e.target[4].value - 1
        let endTimestamp, auctTick

        if (showauct) {
            endTimestamp = e.target[6].value
            auctTick = e.target[7].value
        }

        if (web3) {
            var RentContract = new web3.eth.Contract(jsonAbi, contractAddress)
            const accounts = await web3.eth.getAccounts()
            const sender = accounts[0].toString()

            var updateContract = await RentContract.methods.editRentContract(
                [
                    false,
                    "0x0000000000000000000000000000000000000000",
                    showauct,
                    false,
                    false,
                    showauct ? auctTick : 0,
                    showauct ? Date.parse(endTimestamp) : 0,
                    0,
                    0,
                    0,
                    area,
                    price,
                    image
                ], 
                contractId
            ).send(
                {
                    from: sender,
                    value: 0,
                    gas: 4000000
                },
                (err, res) => err ? console.log(`error ${err}`) : console.log(`Success ${res}`)
            );
        }
        
    }

    const removeC = async e => {
        e.preventDefault()
        const id = e.target[0].value - 1

        if (web3) {
            var RentContract = new web3.eth.Contract(jsonAbi, contractAddress)
            const accounts = await web3.eth.getAccounts()
            const sender = accounts[0].toString()

            var removeContract = await RentContract.methods.deleteRentContract(
                id
            ).send(
                {
                    from: sender,
                    value: 0,
                    gas: 4000000
                },
                (err, res) => err ? console.log(`error ${err}`) : console.log(`Success ${res}`)
            );
        }
    }
    
    return (
        <div className="main__cards">
            <div className="card">
                <i
                        className="fa fa-user-o fa-2x text-lightblue"
                        aria-hidden="true"
                ></i>
                <div className="texts" style={{fontSize: "big"}}>Ожидаемый доход за этот месяц: 1.3 ETH</div>
            </div>
            <form onSubmit={neworupdate ? e => updateC(e) : e => createC(e)}>
                <div className="card">
                    <h3 className="texts">Создание/Обновление лота</h3>
                    <i
                        className="fa fa-user-o fa-2x text-lightblue"
                        aria-hidden="true"
                    ></i>
                    <FloatingLabel controlId="floatingTextarea" label="Цена в мес. (ETH)" className="mb-3">
                        <Form.Control placeholder="Enter amount"/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingTextarea" label="Площадь (м²)" className="mb-3">
                        <Form.Control placeholder="Enter area"/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingTextarea" label="Изображение (ссылка)" className="mb-3">
                        <Form.Control placeholder="Image address"/>
                    </FloatingLabel>
                    <Form.Check classname="texts" style={{color: "white"}} type="checkbox" label="Обновление" onChange={() => setNeworupdate(!neworupdate)} />
                    {
                        neworupdate ?
                        <div style={{margin:"10px 0 10px 0"}}>
                            <FloatingLabel controlId="floatingTextarea" label="Номер контракта" className="mb-3">
                                <Form.Control placeholder="Contract Id"/>
                            </FloatingLabel>
                        </div> : ""
                    }
                    <Form.Check classname="texts" style={{color: "white"}} type="checkbox" label="Аукцион" onChange={() => setShow(!showauct)} />
                    {
                        showauct ? 
                        <div style={{margin:"10px 0 10px 0"}}>
                            <div>
                                <h5 className="texts">Парметры аукциона:</h5>
                                <div className="texts">Конец аукцона</div>
                                <Datetime input='true'/>
                                <br/>
                                <FloatingLabel controlId="floatingTextarea" label="Шаг аукцона (ETH)" className="mb-3">
                                    <Form.Control placeholder="Tick"/>
                                </FloatingLabel>
                            </div>
                        </div> : ""
                    }
                    <Button className="submit texts" style={{color: "white"}} type="submit">Подтвердить</Button>
                </div>
            </form>
            
            <form onSubmit={e => removeC(e)}>
                <div className="card">
                    <h3 className="texts">Удаление лота</h3>
                    <i
                        className="fa fa-user-o fa-2x text-lightblue"
                        aria-hidden="true"
                    ></i>
                    <FloatingLabel controlId="floatingTextarea" label="Номер договора" className="mb-3">
                        <Form.Control placeholder="Enter amount"/>
                    </FloatingLabel>
                    <Button className="submit texts" style={{color: "white"}} type="submit">Подтвердить</Button>
                </div>
            </form>
            <div className="card">
                <div className="texts" style={{fontSize: "medium"}}>Баланс контракта: {contractBalance} ETH</div>
                <br/>
                <Withdraw/> 
            </div>
        </div>
    );
}

function MediaCard(props) {
    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Лот #{props.id}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Дата оплаты {props.data}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Площадь {props.square} m^2
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Цена {props.price}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default Admin;