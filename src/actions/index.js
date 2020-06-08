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

export const battlePhase = (row, col) =>{
    return (dispatch, getState) =>{
        const state = getState();
        const { enemyBoard, enemyFleet } = state.gameLogic
        const { enemyBoardHitCount } = state.hitCounts

        dispatch(destroyEnemySpot(row, col, 'enemyBoard', 'enemyFleet'))

        if(enemyBoard[row][col].piece !== 'E'){
            dispatch(isHit(enemyBoard[row][col], enemyFleet, enemyBoardHitCount))
            dispatch(changeTurn(types.ENEMY_NAME))
        }else {
            dispatch(changeTurn(types.ENEMY_NAME))
        }
    }
}


const isHit = (spot, fleet, boardHitCount) => {
    return(dispatch) =>{
        if (helpers.isShipDestroyed(spot,fleet)){
            dispatch(destroyShip(spot, 'enemyBoard'))
            dispatch(incrementHitCount('enemyBoard'))
        }
        
        if(boardHitCount === 4 ){
            dispatch(changeGamePhase('endGame'))
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

export const incrementHitCount = (boardType) => {
    return {
        type: types.INCREMENT_HIT_COUNT,
        boardType
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

export const inputName = (name) => {
    if(!name) return;
    return{
        type: types.INPUT_NAME,
        name
    }
}

export const destroyEnemySpot = (row, col, board, fleet) =>{
    return {
        type: types.DESTROY_SPOT,
        row,
        col,
        board,
        fleet
    }
}

export const destroyShip = (ship, board) => {
    return{
        type: types.DESTROY_SHIP,
        ship,
        board
    }
}

export const changeTurn = (turn) => {
    return{
        type: types.CHANGE_TURN,
        turn
    }
}