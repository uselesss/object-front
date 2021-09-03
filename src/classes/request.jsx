import React, { Component } from "react";
import axios from 'axios';

const header = {

    "Access-Control-Allow-Origin": "*"
}
let URL="80.87.192.94:8080/api/login";

class App extends Component {



    handleSubmit(event, username, password) {
        axios.post(URL,null, {params:{
                "username": username,
                "password": password
            },
            headers:header}).
        then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
                console.log(error);
            });
        event.preventDefault();

    }

    render() {

        return(

            <form onSubmit={this.handleSubmit}>
                <input type="submit" value="Submit" />
            </form>

        );
    }

}

export default App;