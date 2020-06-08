import React from 'react'
import ButtonShip from './../containers/ButtonShipConnected'
import ButtonPosition from './../containers/ButtonPositionConnected'
import BoardConnected from './../containers/BoardConnected'

export default function Options(props) {
    return (
        <div>
            <div className="col-md-12 d-flex flex-row flex-wrap mt-3">
                <div className="col-md-12 d-flex flex-row mb-3 justify-content-start">
                    <ButtonShip name='CR' displayName='Carrier' />
                    <ButtonShip name='C1' displayName='Cruiser 1' />
                    <ButtonShip name='C2' displayName='Cruiser 2' />
                    <ButtonShip name='C3' displayName='Cruiser 3' />
                    <ButtonShip name='S' displayName='Sub' />
                </div>
                <div className="col-md-12 d-flex flex-row mb-3 justify-content-start">
                    <ButtonPosition name='vertical' />
                    <ButtonPosition name='horizontal' />
                </div>
                <div className="col-md-6">
                    <div className="col-md-12 mb-3">
                        <h2 className='text-center'>{!props.inputName ? 'Player' : props.inputName}</h2>
                    </div>
                    <BoardConnected className="playerBoard" boardType="playerBoard" />
                </div>
                <div className="col-md-6">
                    <div className="col-md-12 mb-3">
                        <h2 className='text-center'>CPU</h2>
                    </div>
                    <BoardConnected className="enemyBoard" boardType="enemyBoard" />
                </div>
            </div>
        </div>
    )
}
