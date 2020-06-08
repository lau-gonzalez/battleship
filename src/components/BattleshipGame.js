import React from 'react';
import Header from './Header'
import Options from './Options';
import WelcomeScreenConnected from './../containers/WelcomeScreenConnected';

function BattleshipGame (props) {   
        return (
            <div className="container-fluid">
                {!props.inputName ? <WelcomeScreenConnected/> :
                <div className="container">                    
                    <Header />
                    <Options/>                                    
                </div>            
                }   
            </div>
        );
    
}

export default BattleshipGame;
