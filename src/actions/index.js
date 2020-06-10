import * as helpers from '../lib/index.js';
import { gamePieces } from '../constants';
import * as types from '../constants';

//THUNKS

//-----------------------------------------------------------------------------------------------------------//

//PREGAME-PHASE

export const preGameBoard = (row, col) => {
    return (dispatch, getState) => {
        const state = getState()
        const { selectedPiece, selectedPosition, playerBoard, alreadySelectedShips } = state.gameLogic;
        const { playerShipCount } = state.shipsOnBoard;

        if (!selectedPiece || !selectedPosition) {
            alert('Please select a ship and position');
            return;            
        } else if (alreadySelectedShips.indexOf(selectedPiece) > -1) {
            alert(`You have already chosen the ${selectedPiece}. Please choose another`)
            return;
        }else if (!helpers.checkRangeValid(row, col, gamePieces[selectedPiece], selectedPosition, playerBoard)) {
            alert('Invalid spot!');
            return;
        }

        dispatch(incrementShipCount())
        dispatch(addShip(selectedPiece, selectedPosition, row, col))
        dispatch(addShipToAlreadyChosenList(selectedPiece))

        if (playerShipCount === 4) {
            dispatch(changeGamePhase('battle'))
            alert('START!')
        }
    }
}

//END PREGAME

//--------------------------------------------------------------------------------------//

//BATTLE-PHASE

export const battlePhase = (row, col) => {
    return (dispatch, getState) => {
        const state = getState();
        const { enemyBoard, enemyFleet, turn } = state.gameLogic
        const { enemyBoardHitCount } = state.hitCounts

        if (turn !== 'Player') {
            alert('Wait your turn!');
            return;
          }

        dispatch(destroyEnemySpot(row, col, 'enemyBoard', 'enemyFleet'))

        if (enemyBoard[row][col].piece !== 'E') {
            dispatch(isHit(enemyBoard[row][col], enemyFleet, enemyBoardHitCount))
            dispatch(changeTurn(types.ENEMY_NAME))
            setTimeout(() => dispatch(enemyTurn()), 4000);
        } else {
            dispatch(changeTurn(types.ENEMY_NAME))
            setTimeout(() => dispatch(enemyTurn()), 3000);
        }
    }
}

//--------------------------------------------------------------------------------------//

//ENEMY TURN


const enemyTurn = () => {
    return (dispatch, getState) => {
        const state = getState();
        if (state.gamePhase === 'endGame') { return; }

        const { playerBoard, playerFleet } = state.gameLogic;
        const { playerBoardHitCount } = state.hitCounts;
        const { mode, targetDirection, firstSpotHit, lastSpotHit, didComputerHitLastTurn, targetShipHitCount } = state.computerMoveLogic;

        const { row, col, currentTargetDirection } = helpers.decideWhichSpotToHit(playerBoard, mode, firstSpotHit, lastSpotHit, targetDirection, didComputerHitLastTurn)
        dispatch(destroyEnemySpot(row, col, 'playerBoard', 'playerFleet'))
        if (playerBoard[row][col].piece !== 'E') {
            //enemy hits ship on player board
            if (mode === 'target') {
                dispatch(changeTargetShipHitCount(targetShipHitCount + 1))
                dispatch(changeLastSpotHit(row, col))
                dispatch(changeTargetDirection(currentTargetDirection))
                dispatch(changeTurn(types.PLAYER_NAME))
                dispatch(onPlayerSpotIsHit(playerBoard[row][col], playerFleet, playerBoardHitCount))
            } else {
                dispatch(changeComputerMode('target'))
                dispatch(changeTargetShipHitCount(targetShipHitCount + 1))
                dispatch(changeFirstSpotHit(row, col))
                dispatch(changeTurn(types.PLAYER_NAME))
                dispatch(onPlayerSpotIsHit(playerBoard[row][col], playerFleet, playerBoardHitCount))
            }
        } else {
            if (mode === 'target') {
                if (targetShipHitCount > 1) {
                    dispatch(changeTargetDirection(helpers.getOppositeTargetDirection(targetDirection)))
                    dispatch(changeHitLastTurn(false))

                } else {
                    dispatch(changeTargetDirection(helpers.getNextTargetDirection(targetDirection)))
                    dispatch(changeHitLastTurn(false))
                }
            }
            dispatch(changeTurn(types.PLAYER_NAME));
        }
    }
}


const onPlayerSpotIsHit = (spot, fleet, boardHitCount) => {
    return (dispatch) => {
      if (helpers.isShipDestroyed(spot, fleet)) {     
      
          dispatch(destroyShip(spot, 'playerBoard'))
          dispatch(incrementHitCount('playerBoard'))
          dispatch(changeComputerMode('hunt'))
          dispatch(changeTargetShipHitCount(0))
        
        if (boardHitCount === 4) {
          dispatch(changeGamePhase('endGame'));
        }
      } else {
        dispatch(changeHitLastTurn(true));
      }
    }
  }

// END ENEMY TURN

//-------------------------------------------------------------------------------------------//

const isHit = (spot, fleet, boardHitCount) => {
    return (dispatch) => {
        if (helpers.isShipDestroyed(spot, fleet)) {
            dispatch(destroyShip(spot, 'enemyBoard'))
            dispatch(incrementHitCount('enemyBoard'))

            if (boardHitCount === 4) {
                dispatch(changeGamePhase('endGame'))
            }
        }       

    }
}


//END THUNKS

//------------------------------------------------------------------------------------------------------------------------//

//ACTIONS CREATORS


export const addShip = (selectedPiece, selectedPosition, row, col) => {
    if (!selectedPiece || !selectedPosition) return;
    return {
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

export const selectShip = (piece, position = 'vertical') => {
    if (!piece) return;
    return {
        type: types.SELECT_SHIP,
        piece,
        position
    }
}

export const addShipToAlreadyChosenList = (selectedShip) => {
    return {
      type: types.ADD_SHIP_TO_ALREADY_CHOSEN_LIST,
      selectedShip
    }
  }

export const selectPosition = (position) => {
    if (!position) return;
    return {
        type: types.SELECT_POSITION,
        position
    }
}

export const inputName = (name) => {
    if (!name) return;
    return {
        type: types.INPUT_NAME,
        name
    }
}

export const destroyEnemySpot = (row, col, board, fleet) => {
    return {
        type: types.DESTROY_SPOT,
        row,
        col,
        board,
        fleet
    }
}

export const destroyShip = (ship, board) => {
    return {
        type: types.DESTROY_SHIP,
        ship,
        board
    }
}

export const changeTurn = (turn) => {
    return {
        type: types.CHANGE_TURN,
        turn
    }
}

export const changeComputerMode = (mode) => {
    return {
      type: types.CHANGE_COMPUTER_MODE,
      mode
    }
  }
  
  export const changeTargetDirection = (targetDirection) => {
    return {
      type: types.CHANGE_TARGET_DIRECTION,
      targetDirection
    }
  }
  
  export const changeFirstSpotHit = (row, col) => {
    return {
      type: types.CHANGE_FIRST_SPOT_HIT,
      row,
      col
    }
  }
  export const changeLastSpotHit = (row, col) => {
    return {
      type: types.CHANGE_LAST_SPOT_HIT,
      row, 
      col
    }
  }
  
  export const changeHitLastTurn = (hit) => {
    return {
      type: types.CHANGE_HIT_LAST_TURN,
      hit
    }
  }

  export const changeTargetShipHitCount = (hits) => {
    return {
        type: types.CHANGE_TARGET_SHIP_HIT_COUNT,
        hits
      }
    }