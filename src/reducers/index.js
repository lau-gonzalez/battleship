import { combineReducers } from 'redux';
import * as helpers from '../lib';
import * as types from '../constants';
import { gamePieces } from '../constants';

const initialState = {
    selectedPiece: null,
    selectedPosition: null,
    playerBoard: helpers.createBoard(),
    enemyBoard: helpers.createBoardWithRandomPieces(),
    enemyFleet:[['CR', 0, gamePieces['CR']],['C1', 0, gamePieces['C1']],['C2', 0, gamePieces['C2']],['C3', 0, gamePieces['C3']], ['S', 0, gamePieces['S']]],
    playerFleet:[['CR', 0, gamePieces['CR']],['C1', 0, gamePieces['C1']],['C2', 0, gamePieces['C2']],['C3', 0, gamePieces['C3']], ['S', 0, gamePieces['S']]],
    playerName: types.PLAYER_NAME,
    enemyName: types.ENEMY_NAME,
    turn: types.PLAYER_NAME,
    lastRowHit: null,
    lastColumnHit: null,
    inputName: null    
}

function gameLogic (state = initialState, action ){
    switch (action.type) {
        case types.ADD_SHIP:            
            return Object.assign({}, state, {
                playerBoard: helpers.getNewBoard(state.playerBoard, action)
            })
        case types.SELECT_SHIP:
            return Object.assign({},state,{
                selectedPiece: action.piece
            })
        case types.SELECT_POSITION:
            return Object.assign({},state, {
                selectedPosition: action.position
            })
        case types.INPUT_NAME:
            return Object.assign({},state,{
                inputName: action.name
            })            
        case types.DESTROY_SPOT:
            return Object.assign({},state,{
                [action.board]: state[action.board].map((row, rowIdx) => {
                    return row.map((spot, colIdx) => {
                        if (rowIdx === action.row && colIdx === action.col) {
                            return Object.assign({}, spot, {hit:true})
                        }
                    } )
                })

            })
        default:
            return state
    }
}

function shipsOnBoard (state = {playerShipCount: 0}, action){
    switch (action.type) {
        case types.INCREMENT_SHIP_COUNT:
            let count = state.playerShipCount
            count++           
            return Object.assign({}, state, {
                playerShipCount: count
            })
    
        default:
            return state;
    }
}

function gamePhase (state = 'pregamePhase', action) {
    switch(action.type) {
      case types.CHANGE_GAME_PHASE:
        return action.phase;
      default: return state;  
    }
  }

const Battleship = combineReducers({
    gameLogic,
    gamePhase,
    shipsOnBoard
})

export default Battleship;