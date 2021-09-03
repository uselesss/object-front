import React, { Component } from "react";
import axios from 'axios';

const header = {
    "Access-Control-Allow-Origin": "*"
}
let URL="80.87.192.94:8080/api/login";

class Request extends Component {



    handleSubmit(event, username, password) {
        axios.post(URL, null, {params:{
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
            <div>
            <input type="text" id="username" name="username" class="form-control" placeholder="Username" required="" autofocus=""></input>
            <br/>
            <input type="text" id="password" name="password" class="form-control" placeholder="Password" required="" autofocus=""></input>
            <form onSubmit={this.handleSubmit}>
                <input type="submit" value="Submit" />
            </form>
            </div>
        );
    }

}

export default Request;