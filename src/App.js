// React
import React, {useCallback} from 'react';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

// Material-Ui
import { makeStyles } from '@material-ui/core/styles';
import { Divider, TextField, Toolbar, Typography, Drawer, List, ListItem, AppBar, CssBaseline } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import { LocalPhone, BorderAll, Forum, FilterNone } from '@material-ui/icons';

// Routing & Components
import Map from './map';
import UserRents from './home';
import Terms from './terms';
import Contacts from './contacts';
import Lots from './lots';
import Admin from "./admin";
import { useStoreApi } from "./storeApi";
import ConnectButton from './connectButton';
import Deposit from './handlePayments';
import Login from './auth/Login';

// Css
import "./css/style.css";

// Web3
import useWeb3 from "./useWeb3";

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        background: "#161b22",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        marginTop: "0.7rem",
        width: drawerWidth,
        background: "#21262d"
    },
    drawerContainer: {
        overflow: 'auto',
        color: "#584C7F"
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
        marginBottom: "27rem",
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
                        <h1>Rent service</h1>
                        <div style={{
                          display: "block",
                          transform: "translate(68rem, 0)"
                        }}>
                        <ConnectButton/>{message ? (<p><code>{message}</code></p>) : null}
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
                            <Divider />
                            <Link to="/">
                                <ListItem button key="Home page" >
                                    <ListItemIcon > <HomeIcon style={{color: "#9e9689"}}/> </ListItemIcon>
                                        <Typography style={{color: "#e8e6e3"}}> Домой </Typography>
                                </ListItem>
                            </Link>
                            <Link to="/lots">
                                <ListItem button key="Lots">
                                    <ListItemIcon> <FilterNone style={{color: "#9e9689"}}/> </ListItemIcon>
                                    <Typography style={{color: "#e8e6e3"}}> Лоты </Typography>
                                </ListItem>
                            </Link>
                            <Divider />
                            <Link to="/terms">
                            <ListItem button key="Terms">
                                <ListItemIcon> <Forum style={{color: "#9e9689"}}/> </ListItemIcon>
                                    <Typography style={{color: "#e8e6e3"}}> Условия </Typography>
                            </ListItem>
                            </Link>
                            <Link to="/contacts">
                                <ListItem button key="Contact us">
                                    <ListItemIcon> <LocalPhone style={{color: "#9e9689"}}/> </ListItemIcon>
                                        <Typography style={{color: "#e8e6e3"}}> Контакты </Typography>
                                </ListItem>
                            </Link>
                            <Divider />

                            <div className={classes.deposit}/>
                            
                            <Deposit/>
                        </List>
                    </div>
                </Drawer>
                </div>
                <Switch>
                    <Route exact path="/" component={UserRents} />
                    <Route exact path="/map" component={Map} />
                    <Route exact path="/lots" component={Lots} />
                    <Route exact path="/terms" component={Terms} />
                    <Route exact path="/contacts" component={Contacts} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/admin" component={Admin} />
                </Switch>
            </Router>
    );
}
