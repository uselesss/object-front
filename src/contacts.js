import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        width: 500,
        height: 350,
        backgroundColor: "#ebf5fc",
        marginTop: "13rem",
        marginLeft: "47rem",
        zIndex: "1",
    },
    title: {
        marginTop: "4rem",
        fontSize: 28,
        fontFamily: "Courier",
    },
    text: {
        fontSize: 24,
        fontFamily: "Courier",
    },
    pos: {
        marginBottom: 12,
    },
});

function Contacts() {
    const classes = useStyles();

    return (
        <div>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title}><strong>Contacts of landlord</strong></Typography>
                    <div><h1></h1></div>
                    <div><h1></h1></div>
                    <Typography className={classes.text}>mobile: +79998241231</Typography>
                    <Typography className={classes.text}>fax: +79998241231</Typography>
                    <Typography className={classes.text}>email: rent@svo.aero</Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default Contacts;