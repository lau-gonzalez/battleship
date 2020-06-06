import { combineReducers } from 'redux';
import * as helpers from '../lib';
import * as types from '../constants';
import { gamePieces } from '../constants';

const initialState = {
    selectedPiece: null,
    selectedPosition: null,
    playerBoard: helpers.createBoard(),
    enemyBoard: helpers.createBoardWithRandomPieces(),
    playerName: types.PLAYER_NAME,
    enemyName: types.ENEMY_NAME,
    turn: types.PLAYER_NAME    
}

function gameLogic (state = initialState, action ){
    switch (action.type) {
        case types.ADD_SHIP:            
            return Object.assign({}, state, {
                playerBoard: helpers.getNewBoard(state.playerBoard, action)
            })    
        default:
            return state
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
    gamePhase
})

export default Battleship;