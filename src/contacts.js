import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        display: "flex",
        width: 500,
        height: 350,
        backgroundColor: "#21262d",
        color: "#e8e6e3",
        marginTop: "10%",
        marginLeft: "35%",
        zIndex: "1",
    },
    title: {
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
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
                    <br/>
                    <Typography className={classes.text}>mobile: +79998241231</Typography>
                    <Typography className={classes.text}>fax: +79998241231</Typography>
                    <Typography className={classes.text}>email: admin@rent.tech</Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default Contacts;