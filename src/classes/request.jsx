import React, { Component } from "react";
import axios from 'axios';
import qs from 'querystring'
let token = null
const header = {

    "Access-Control-Allow-Origin": "*",
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}
let URL="80.87.192.94:8080/api/login";

class Request extends Component {



    handleSubmit(event, username, password) {
        fetch(URL, {
            method: 'POST',
            headers: header,
            body: new URLSearchParams({
                'login': username,
                'password': password
            })
        })
            .then(res => {
                console.log(res);
                const jsonResponse = JSON.parse(res);
                if (jsonResponse.status == "success")
                    token = jsonResponse.token;
                else
                    console.log(jsonResponse.error);


            });

        // axios.post(URL, body: qs.stringify({
        //         'username': username,
        //         'password': password,
        //     }),
        //     headers:header}).
        // then(function (response) {
        //     console.log(response);
        //     const jsonResponse = JSON.parse(response);
        //     if (jsonResponse.status == "success")
        //         token = jsonResponse.token;
        //     else
        //         console.log(jsonResponse.error);
        //
        // })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
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