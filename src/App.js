import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, TextField, Toolbar, Typography, Drawer, List, ListItem, AppBar, CssBaseline } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import { LocalPhone, BorderAll, Forum, FilterNone } from '@material-ui/icons';
import Map from './map';
import Home from './home';
import Terms from './terms';
import Contacts from './contacts';
import Lots from './lots';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import useWeb3 from "./useWeb3";
import { useStoreApi } from "./storeApi";

import ConnectButton from './connectButton';
import Deposit from './handlePayments';


const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "#ed8b00",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        marginTop: "0.7rem",
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    title: {
        textAlign: "center",
    },
    deposit: {
        display: "flex",
        "flex-direction": "column",
        "min-height": "50vh",
    }
}));

export default function App() {
    const classes = useStyles();
    
    const { balance, address, message, setAddress, setBalance } = useStoreApi(); 
    const web3 = useWeb3();

    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <h1>Сервис Аренды Шереметьево</h1>
                        <div style={{
                          display: "block",
                          transform: "translate(54rem, 0)"
                        }}><ConnectButton/>
                        {message ? (
                        <p>
                            <code>{message}</code>
                        </p>
                        ) : null}
                        </div>
                        
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <Toolbar />
                    <div className={classes.drawerContainer}>
                        <List>
                            <ListItem button key="Home page" onTouchTap={<a href="/"/>}>
                                <ListItemIcon> <HomeIcon /> </ListItemIcon>
                                    <Typography><a href="/"> Home page </a></Typography>
                            </ListItem>
                            <Divider />
                            <ListItem button key="Areas map">
                                <ListItemIcon> <BorderAll /> </ListItemIcon>
                                    <Typography><a href="/map"> Areas map </a></Typography>
                            </ListItem>
                            <ListItem button key="Lots">
                                <ListItemIcon> <FilterNone /> </ListItemIcon>
                                <Typography><a href="/lots"> Lots </a></Typography>
                            </ListItem>
                            <Divider />
                            <ListItem button key="Terms">
                                <ListItemIcon> <Forum /> </ListItemIcon>
                                    <Typography><a href="/terms"> Terms </a></Typography>
                            </ListItem>
                            <ListItem button key="Contact us">
                                <ListItemIcon> <LocalPhone /> </ListItemIcon>
                                    <Typography><a href="/contacts"> Contact us </a></Typography>
                            </ListItem>
                            <Divider />

                            <div className={classes.deposit}/>
                            
                            <Deposit/>
                        </List>
                    </div>
                </Drawer>
            </div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/map" component={Map} />
                <Route exact path="/lots" component={Lots} />
                <Route exact path="/terms" component={Terms} />
                <Route exact path="/contacts" component={Contacts} />
            </Switch>
        </Router>
    );
}
