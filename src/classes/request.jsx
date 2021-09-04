import React, { Component } from "react";
let token = null;
let con = false;
const header = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}
let URL="http://80.87.192.94:8080/api/login";


class Request extends Component {
    newVar;

    constructor(props) {
        super(props);

        this.state = {username: '', password: ''};
        this.onChangeUsername = this.onChangeLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChangeUsername(event) {
        this.setState({username: event.target.value});
    }
    onChangePassword(event){
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        if(con === false) {
            fetch(URL, {
                method: 'POST',
                headers: header,
                body: new URLSearchParams({
                    'username': username,
                    'password': password
                }).toString()
            })
                .then((response) => response.json())
                .then((responseData) => {
                    const object = JSON.stringify(responseData)
                    console.log('login');
                    const data = JSON.parse(object);
                    if (data.status == "success") {

                        token = data.token;
                        con = true;
                        console.log(token);
                    }
                });
        }
        event.preventDefault();
    }
    render() {
        return(
             <form onSubmit={this.handleSubmit}>
                 <label>
                     Username:
                 <input type="text" name = 'username' value={this.state.username} onChange={this.onChangeUssername} /><br/>
                 </label>
                 <label>
                     Password:
                 <input type="text" name = 'password' value={this.state.password}/><br/>
                 </label>
                 <button  type="submit" value="Submit" onChange={this.onChangePassword}>SUBMIT</button>
             </form>

        );
    }
}


export default Request;