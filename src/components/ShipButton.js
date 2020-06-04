import React from 'react'


function ShipButton(props) {
    const selectionClass = props.selectedPiece && props.selectedPiece === props.name ? 'selected' : 'unselected'
    return (
        <div>
            <button type='button' name={props.name}
            className={selectionClass}
            onClick={e => {props.onButtonClick(e.target.name)}}>
                {props.displayName}
            </button> 
        </div>
    )
}


export default ShipButton

