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

// Logo 
import Logo from "./images/logo.svg";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        display: 'flex',
        zIndex: theme.zIndex.drawer + 1,
        background: "#161b22",
    },
    drawerContainer: {
        overflow: 'auto',
        color: "#584C7F"
    },
    title: {
        textAlign: "center",
    },
    deposit: {
        display: "flex",
        "flex-direction": "column",
        marginBottom: "27rem",
    },
    navBar: {
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    }
}));

export default function App() {
    const classes = useStyles();

    const { balance, address, message, setAddress, setBalance } = useStoreApi();

    return (
        <Router>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar >
                    <Link to="/">
                        <img src={Logo} alt="Logo" className="logo"/>
                    </Link>

                    <div className={classes.navBar}>
                        <Link to="/">
                            <ListItem button key="Home page" className={classes.zxc}>
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
                    </div>
                    
                    <ConnectButton/>{message ? (<p><code>{message}</code></p>) : null}
                    
                </Toolbar>
            </AppBar>

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
