import React, { Component } from "react";
let token = not;


const header = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}
let URL="http://80.87.192.94:8080/api/login";

class Request extends Component {
    handleSubmit() {

    }
    handleSubmit(event, username, password) {
        fetch(URL, {
            method: 'POST',
            headers: header,
            body: new URLSearchParams({
                'username': 'user',
                'password': 'user'}).toString()
        })
            .then((response) => response.json())
            .then((responseData) => {
                const object = JSON.stringify(responseData)
                const data = JSON.parse(object)
                if (data.status == "success") {
                        token = data.token;
                      console.log(data.token);

                    }
                else
                    console.log(data.error);
            });
        event.preventDefault();
    }




    render() {
        return(
            <form onsubmit={this.handleSubmit}} >

                <input type="text" name = 'username'/><br/>
                <input type="text" name = 'password'/><br/>
                <button  type="submit" value="Submit" onClick={()=>{this.props.updateData(token)}}>SUBMIT</button>
            </form>

        );
    }
}
export default Request;