import React, { Component } from "react";
import Test from "./images/e_terminal.svg";
import "./css/style.css";

class Map extends Component {
    render() {
        return (
            <div style={{ "overflow": "hidden" }}>
                <img
                    src={Test}
                    className="map"
                />
            </div>
        );
    }
}

export default Map;