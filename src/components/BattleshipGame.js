import React, { Component } from 'react';
import Header from './Header'
import Options from './Options';

class Battleship extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="container">
                    <Header />
                    <Options/>                                    
                </div>
            </div>
        );
    }
}

export default Battleship;
