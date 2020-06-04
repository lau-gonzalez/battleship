import React from 'react'


function PositionButton(props) {
    const selectionClass = props.selectedPosition && props.selectedPosition === props.name ? 'selected' : 'unselected'
    return (
        <div>
            <button type='button' name={props.name}
            className={selectionClass}
            onClick={e => {props.onButtonClick(e.target.name)}}>
                {props.name}
            </button>            
        </div>
    )
}



export default PositionButton

