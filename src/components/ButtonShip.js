import React from 'react'

export default function ButtonShip(props) {
    const selectionClass = props.selectedPiece && props.selectedPiece === props.name ? 'selected' : 'unselected'
    return (
        <div>
            <button className={`btn btn-primary mr-3 mb-3 ${selectionClass}`}
            name={props.name} onClick={e => {props.onButtonClick(e.target.name)}}>{props.displayName}</button>
            
        </div>
    )
}
