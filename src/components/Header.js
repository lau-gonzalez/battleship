import React from 'react'

export default function Header() {
    return (
        <header className='mb-3'>
            <div className='container d-flex flex-column align-items-center'>
                <h2>Battleship</h2>
                <button className='col-md-4 btn btn-primary'>Restart</button>
            </div>
        </header>
    )
}
