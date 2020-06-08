import React from 'react'

export default function Header() {
    return (
        <header className='mb-3 mt-3'>
            <div className='container d-flex flex-row justify-content-between'>
                <h2>Battleship</h2>
                <button className='col-md-2 btn btn-dark'>Restart</button>
            </div>
        </header>
    )
}
