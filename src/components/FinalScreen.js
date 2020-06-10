import React from 'react'
import loser from './../img/loser.png'
import winner from './../img/winner.png'
import { Link } from 'react-router-dom'

export default function FinalScreen(props) {
    return (
        <div className='container-fluid d-flex bg-primary welcome justify-content-center flex-row align-items-center'>
            <div className="col-md-4 text-center d-flex  flex-column align-items-center">

                {props.gamePhase === 'You Lose!' ? <img src={loser} alt="loser" /> : <img src={winner} alt="winner" />}
                <h1 className='mb-4'>{props.gamePhase}</h1>
                <button className='btn btn-secondary'>
                    <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                        Play Again!
                    </Link>
                </button>
            </div>
        </div>
    )
}
