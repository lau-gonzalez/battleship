import React from 'react'

export default function ButtonShip(props) {
    const selectionClass = props.selectedPosition && props.selectedPosition === props.name ? 'selected' : 'unselected'
    return (
        <div>
            <button className={`btn btn-dark mr-3 ${selectionClass}`}
             name={props.name} onClick={e => {props.onButtonClick(e.target.name)}}>{props.name}</button>
            
        </div>
    )
}
