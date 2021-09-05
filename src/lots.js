import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Collapse, Grid } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const header = {
    'Access-Control-Allow-Origin': '*',
}

/*let data = {}*/
let propsForCard = {};

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        minWidth: 200,
    },
    media: {
        height: 140,
    },
});

class Lots extends Component {
    
    constructor () {
        super();
        this.handleSubmit();
    };

    handleSubmit() {
        fetch("http://80.87.192.94:8080/api/contract/getAllAuction", {
            method: 'POST',
            headers: header,
            body: null
        })
            .then((response) => response.json())
            .then((responseData) => {
                const object = JSON.stringify(responseData);
                const data = JSON.parse(object);

                propsForCard = data.auctions;
                console.log(propsForCard);
                console.log(propsForCard.length);  
            });
    }

    render() {

        return (
            <div className="cardsGrid">{this.props.propsForCard}
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6} md={4}>
                            <MediaCard id ={5} square={500} status={"занят"} boolStatus={false}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <MediaCard id ={4} square={120} status={"свободен"} boolStatus={true}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <MediaCard id ={3} square={120} status={"свободен"} boolStatus={true}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <MediaCard id ={2} square={120} status={"занят"} boolStatus={false}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <MediaCard id ={1} square={120} status={"свободен"} boolStatus={true}/>
                    </Grid>
                    </Grid>
            </div>
        );
    }
}

function MediaCard(props) {
    // const classes = useStyles();

    // console.log(props);

    return (
        <Card>
           {/* <Card className={classes.root}> */}
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Лот #{props.id}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Площадь: {props.square} м^2
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Статус: {props.status}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="medium" color="primary">
                    {props.boolStatus ? ("Предложить цену"):("Лот занят")}
                </Button>
            </CardActions>
        </Card>
    );
}

export default Lots;