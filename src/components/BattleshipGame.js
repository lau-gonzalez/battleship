import React, { Component } from 'react';
import Header from './Header'
import BoardConnected from '../containers/BoardConnected'

class Battleship extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="container">
                    <Header />
                    <div className="container d-flex flex-row col-md-12">
                        <div className="col-md-6"><BoardConnected className="playerBoard" boardType="playerBoard"/></div>
                        
                        <div className="col-md-6"><BoardConnected className="enemyBoard" boardType="enemyBoard"/></div>
                    </div>                    
                </div>
            </div>
        );
    }
}

export default Battleship;
