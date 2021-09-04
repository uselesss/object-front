import React, { Component } from "react";
let token = -1;
let con = false;
const header = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}
const URL="http://80.87.192.94:8080/api/login";


class Request extends Component {


    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

    }
    onChangePassword(event){
        this.setState({password: event.target.value});
    }
    onChangeUsername(event) {
        this.setState({username: event.target.value});
    }


    handleSubmit(event) {
        event.preventDefault();
        if(con === false) {
            fetch(URL, {
                method: 'POST',
                headers: header,
                body: new URLSearchParams({
                    'username': this.state.username,
                    'password': this.state.password

                }).toString()
            })
                .then((response) => response.json())
                .then((responseData) => {
                    const object = JSON.stringify(responseData);
                    const data = JSON.parse(object);
                    if (data.status === "success") {
                        token = data.token;
                        console.log(token);
                        con = true;

                    } else {
                        console.log(data.error)
                    }
                });
        }

    }
    render() {
        return(
             <form onSubmit={this.handleSubmit}>
                 <label>
                     Username:
                    <input type="text" name = 'username' value={this.state.username} onChange={this.onChangeUsername} /><br/>
                 </label>
                 <label>
                     Password:
                    <input type="text" name = 'password' value={this.state.password} onChange={this.onChangePassword}/><br/>
                 </label>
                 <button  type="submit" value="Submit" onClick={() => { this.props.updateData(token)}}>SUBMIT</button>
             </form>

        );
    }
}


export default Request;