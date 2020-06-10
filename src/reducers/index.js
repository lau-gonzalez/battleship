import { combineReducers } from 'redux';
import * as helpers from '../lib';
import * as types from '../constants';
import { gamePieces } from '../constants';

const initialState = {
    selectedPiece: null,
    selectedPosition: null,
    playerBoard: helpers.createBoard(),
    enemyBoard: helpers.createBoardWithRandomPieces(),
    enemyFleet: [['CR', 0, gamePieces['CR']], ['C1', 0, gamePieces['C1']], ['C2', 0, gamePieces['C2']], ['C3', 0, gamePieces['C3']], ['S', 0, gamePieces['S']]],
    playerFleet: [['CR', 0, gamePieces['CR']], ['C1', 0, gamePieces['C1']], ['C2', 0, gamePieces['C2']], ['C3', 0, gamePieces['C3']], ['S', 0, gamePieces['S']]],
    playerName: types.PLAYER_NAME,
    enemyName: types.ENEMY_NAME,
    turn: types.PLAYER_NAME,
    alreadySelectedShips: [],
    lastRowHit: null,
    lastColumnHit: null,
    inputName: null
}

function gameLogic(state = initialState, action) {
    switch (action.type) {
        case types.ADD_SHIP:
            return Object.assign({}, state, {
                playerBoard: helpers.getNewBoard(state.playerBoard, action)
            })
        case types.SELECT_SHIP:
            return Object.assign({}, state, {
                selectedPiece: action.piece
            })
        case types.ADD_SHIP_TO_ALREADY_CHOSEN_LIST:
            return Object.assign({}, state, {
                alreadySelectedShips: [...state.alreadySelectedShips, action.selectedShip]
            })
        case types.SELECT_POSITION:
            return Object.assign({}, state, {
                selectedPosition: action.position
            })
        case types.INPUT_NAME:
            return Object.assign({}, state, {
                inputName: action.name
            })
        case types.DESTROY_SPOT:
            return Object.assign({}, state, {
                [action.board]: state[action.board].map((row, rowIdx) => {
                    return row.map((spot, colIdx) => {
                        if (rowIdx === action.row && colIdx === action.col) {
                            return Object.assign({}, spot, { hit: true })
                        }
                        return spot;
                    })
                }),
                [action.fleet]: state[action.fleet].map(shipHitCount => {
                    let spotName = state[action.board][action.row][action.col].piece;
                    if (spotName === shipHitCount[0]) {
                        shipHitCount[1]++;
                        return shipHitCount
                    }
                    return shipHitCount;
                }),
                lastRowHit: action.row,
                lastColumnHit: action.col
            })
        case types.DESTROY_SHIP:
            return Object.assign({}, state, {
                [action.board]: state[action.board].map((row, rowIdx) => {
                    return row.map((spot, colIdx) => {
                        if (spot.piece === action.ship.piece) {
                            return Object.assign({}, spot, { show: true })
                        }
                        return spot;
                    })
                })
            })
        case types.CHANGE_TURN:
            return Object.assign({}, state, {
                turn: action.turn
            })
        default: return state
    }
}

const initialComputerMoveLogic = {
    mode: 'hunt',
    firstSpotHit: null,
    lastSpotHit: null,
    targetDirection: 'above',
    didComputerHitLastTurn: false,
    targetShipHitCount: 0
}

function computerMoveLogic(state = initialComputerMoveLogic, action) {
    switch (action.type) {
        case types.CHANGE_COMPUTER_MODE:
            return Object.assign({}, state, {
                mode: action.mode,
            })
        case types.CHANGE_TARGET_DIRECTION:
            return Object.assign({}, state, {
                targetDirection: action.targetDirection
            })
        case types.CHANGE_FIRST_SPOT_HIT:
            return Object.assign({}, state, {
                firstSpotHit: [action.row, action.col],
                lastSpotHit: [action.row, action.col]
            })
        case types.CHANGE_LAST_SPOT_HIT:
            return Object.assign({}, state, {
                lastSpotHit: [action.row, action.col],
                didComputerHitLastTurn: true
            })
        case types.CHANGE_HIT_LAST_TURN:
            return Object.assign({}, state, {
                didComputerHitLastTurn: action.hit
            })
        case types.CHANGE_TARGET_SHIP_HIT_COUNT:
            return Object.assign({}, state, {
                targetShipHitCount: action.hits
            })
        default: return state;
    }
}

function shipsOnBoard(state = { playerShipCount: 0 }, action) {
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

function gamePhase(state = 'pregamePhase', action) {
    switch (action.type) {
        case types.CHANGE_GAME_PHASE:
            return action.phase;
        default: return state;
    }
}

function hitCounts(state = { playerBoardHitCount: 0, enemyBoardHitCount: 0 }, action) {
    switch (action.type) {
        case types.INCREMENT_HIT_COUNT:
            const boardType = action.boardType === 'playerBoard' ? 'playerBoardHitCount' : 'enemyBoardHitCount'
            let count = state[boardType]
            count++
            return Object.assign({}, state, {
                [boardType]: count
            })

        default: return state
    }
}

const Battleship = combineReducers({
    gameLogic,
    gamePhase,
    shipsOnBoard,
    hitCounts,
    computerMoveLogic
})

export default Battleship;