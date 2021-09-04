import React from 'react';
import logo from './images/logoMain.png';

function Home() {

    return (
        <div className="mainPageDiv">
            <img className='logoMainPage' src={logo} alt="logo image" />
        </div>
    );
}

export default Home;