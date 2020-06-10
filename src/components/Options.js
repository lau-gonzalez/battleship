import React from 'react'
import ButtonShip from './../containers/ButtonShipConnected'
import ButtonPosition from './../containers/ButtonPositionConnected'
import BoardConnected from './../containers/BoardConnected'
import { Link } from 'react-router-dom';


export default function Options(props) {

    if (props.gamePhase === 'endGame') {
        props.history.push('/final')
    }

    return (
        <div>
            <div className="container-fluid options d-flex flex-row flex-wrap mt-3">
                <div className="col-md-12 d-flex flex-row mb-3 justify-content-start flex-wrap">
                    <ButtonShip name='CR' displayName='Carrier' />
                    <ButtonShip name='C1' displayName='Cruiser 1' />
                    <ButtonShip name='C2' displayName='Cruiser 2' />
                    <ButtonShip name='C3' displayName='Cruiser 3' />
                    <ButtonShip name='S' displayName='Sub' />
                </div>
                <div className="col-md-12 d-flex flex-row mb-3 justify-content-start flex-wrap">
                    <ButtonPosition name='vertical' />
                    <ButtonPosition name='horizontal' />
                </div>
                <div className="col-md-6 col-sm-12 d-flex flex-row align-items-center flex-wrap">
                    <div className="col-md-12 mb-3">
                        <h2 className='text-center'>{!props.inputName ? 'Player' : props.inputName}</h2>
                    </div>
                    <div className="col-md-12">
                        <BoardConnected className="playerBoard" boardType="playerBoard" />
                    </div>
                </div>
                <div className="col-md-6 d-flex flex-row align-items-center flex-wrap">
                    <div className="col-md-12 mb-3">
                        <h2 className='text-center'>CPU</h2>
                    </div>
                    <div className="col-md-12">
                        <BoardConnected className="enemyBoard" boardType="enemyBoard" />
                    </div>
                </div>
            </div>
            <div className='d-flex flex-row justify-content-end mb-3'>
                <h3 className='mr-3'>Playing: {props.player}</h3>
                <button className='btn btn-secondary mr-4'>
                    <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                        Surrender
                        </Link>
                </button>
            </div>
        </div>
    )
}
