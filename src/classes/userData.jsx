import React, { Component } from "react";
import Request from "./request";



class UserData extends React.Component {
    state = {
        token: -2
    };

    updateData = (value) => {
        this.setState({ token: value })

    }

    render() {
        return (
            <div>
                <p>State: {this.state.token}</p>
                <Request updateData={this.updateData} />
            </div>
        )
    }
}

export default UserData;