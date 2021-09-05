import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { DataGrid } from '@material-ui/data-grid';
import { Grid } from '@material-ui/core';
import { LineChart, XAxis, Tooltip, Line, CartesianGrid } from 'recharts';
import Withdraw from './adminWithdraw';

const data = [
    { month: 'Январь', sum: '100000' },
    { month: 'Февраль', sum: '106800' },
    { month: 'Март',sum: '180100' },
    { month: 'Апрель', sum: '127000' },
    { month: 'Май', sum: '131000' },
    { month: 'Июнь', sum: '230000' },
    { month: 'Июль', sum: '120000' },
    { month: 'Август', sum: '135200' },
]

const paymentsColumns = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
        field: "month",
        headerName: "Месяц",
        width: 300,
        editable: true,
    },
    {
        field: "year",
        headerName: "Год",
        width: 300,
        editable: true,
    },
    {
        field: "sum",
        headerName: "Сумма платежей",
        width: 300,
        editable: true,
    },
];

const paymentsRows = [
    { id: 1, month: 'Январь', year: "2021", sum: '100 000$' },
    { id: 2, month: 'Февраль', year: "2021", sum: '106 800$' },
    { id: 3, month: 'Март', year: "2021", sum: '180 100$' },
    { id: 4, month: 'Апрель', year: "2021", sum: '127 000$' },
    { id: 5, month: 'Май', year: "2021", sum: '131 000$' },
    { id: 6, month: 'Июнь', year: "2021", sum: '230 000$' },
    { id: 7, month: 'Июль', year: "2021", sum: '120 000$' },
    { id: 8, month: 'Август', year: "2021", sum: '135 200$' },
];

const companyColumns = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
        field: "companyName",
        headerName: "Название компании",
        width: 350,
        editable: true,
    },
    {
        field: "lotId",
        headerName: "ID Лота",
        width: 150,
        editable: true,
    },
    {
        field: "lotPrice",
        headerName: "Цена Лота",
        width: 200,
        editable: true,
    },
    {
        field: "date",
        headerName: "Ближайший платеж",
        width: 250,
        editable: true,
    },
];

const companyRows = [
    { id: 1, companyName: 'Компания1', lotId: '1', lotPrice: "5000$", date: "10.09.2021" },
    { id: 2, companyName: 'Компания2', lotId: '4', lotPrice: "2000$", date: "06.09.2021" },
    { id: 3, companyName: 'Компания3', lotId: '9', lotPrice: "1450$", date: "07.09.2021" },
    { id: 4, companyName: 'Компания4', lotId: '2', lotPrice: "1000$", date: "21.09.2021" },
    { id: 5, companyName: 'Компания5', lotId: '3', lotPrice: "3000$", date: "30.09.2021" },
];

function Admin(){

    return (
        <div className="textsAdmin">
            <div>
            <h2>Ближайшие платежии</h2>
            </div>
            <div>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={4}>
                        <div>
                            {MediaCard({ id: "4", data: "06.09.2021", square: "145", price: "2000$"})}
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <div>
                            {MediaCard({ id: "9", data: "07.09.2021", square: "78", price: "1450$" })}
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <div>
                            {MediaCard({ id: "1", data: "10.09.2021", square: "221", price: "5000$" })}
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div>
                <h2>Компании</h2>
            </div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={companyRows}
                    columns={companyColumns}
                    pageSize={5}
                    disableSelectionOnClick
                />
            </div>
            <div>
                <h2>Все платежи</h2>
            </div>
            <div style={{ height: 300, width: '100%' }}>
                <DataGrid
                    rows={paymentsRows}
                    columns={paymentsColumns}
                    pageSize={4}
                    disableSelectionOnClick
                />
            </div>
            <div>
                <h2>Диаграмма платежей</h2>
            </div>
            <div style={{
                marginLeft: "200px",
            }}>
            <LineChart
                width={1000}
                height={400}
                data={data}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
                <XAxis dataKey="месяц" />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Line type="monotone" dataKey="sum" stroke="#ff7300" yAxisId={0} />
                </LineChart>
            </div>
            <Withdraw/>
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