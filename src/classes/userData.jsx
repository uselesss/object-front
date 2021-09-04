import React, { Component } from "react";
import Request from "./request";
import token from './request';


class UserData extends React.Component {
    state = {
        token: token
    };

    updateData = (value) => {
        this.setState({ name: value })
    }

    render() {
        return (
            <div>
                <p>State: {this.state.name}</p>
                <Request updateData={this.updateData} />
            </div>
        )
    }
}

export default UserData;