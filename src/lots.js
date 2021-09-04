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

    handleSubmit(event) {
        event.preventDefault();
        fetch("http://80.87.192.94:8080/api/admin/getLots", {
            method: 'POST',
            headers: header,
            body: null
        })
            .then((response) => response.json())
            .then((responseData) => {
                const object = JSON.stringify(responseData);
                const data = JSON.parse(object);
                console.log(data);
                propsForCard = data;
            });
    }

    render() {

        return (
            <div className="cardsGrid">
                <form onSubmit={this.handleSubmit} className="form">
                    <input type="submit" value="Submit" />
                </form>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6} md={4}>
                            <div>
                                {MediaCard(propsForCard)}
                            </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <MediaCard />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <MediaCard />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <MediaCard />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <MediaCard />
                    </Grid>
                    </Grid>
            </div>
        );
    }
}

function MediaCard(props) {
    /*const classes = useStyles();*/

    console.log(props);

    return (
        <Card>
 {/*           <Card className={classes.root}>*/}
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Area #{props.id}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Square {props.square} m^2
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Status {props.status}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="medium" color="primary">
                    Applicate
                </Button>
            </CardActions>
        </Card>
    );
}

export default Lots;