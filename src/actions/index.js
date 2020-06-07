import * as helpers from '../lib/index.js';
import { gamePieces } from '../constants';
import * as types from '../constants';

export const preGameBoard = (row,col) =>{
    return (dispatch, getState) =>{
        const state = getState()
        const {selectedPiece, selectedPosition, playerBoard } = state.gameLogic;
        const { playerShipCount } = state.shipsOnBoard;

        if(!selectedPiece || !selectedPosition){
            alert('Please select a ship and position');
            return;
        }else if(!helpers.checkRangeValid(row,col,gamePieces[selectedPiece], selectedPosition, playerBoard)){
            alert('Invalid spot!');
            return;
        }

        dispatch(incrementShipCount())
        dispatch(addShip(selectedPiece,selectedPosition, row, col))
        
        if (playerShipCount === 4){
            dispatch(changeGamePhase('battle'))
            alert('START!')
        }


    }
}

export const addShip = (selectedPiece, selectedPosition, row, col) =>{
    if(!selectedPiece || !selectedPosition) return;
    return{
        type: types.ADD_SHIP,
        piece: selectedPiece,
        pos: selectedPosition,
        row,
        col
    }
}

export const incrementShipCount = () => {
    return {
      type: types.INCREMENT_SHIP_COUNT
    }
}

export const changeGamePhase = (phase) => {
    return {
      type: types.CHANGE_GAME_PHASE,
      phase
    }
}

export const selectShip = (piece, position='vertical') => {
    if (!piece) return;
    return {
        type: types.SELECT_SHIP,
        piece,
        position
    }
}

export const selectPosition = (position) => {
    if (!position) return;
    return{
        type: types.SELECT_POSITION,
        position
    }
}