import * as types from './../../constants'
import reducer from './../../reducers'
import { createStore } from 'redux'

let store = createStore(reducer);

describe('gameLogic', () =>{
    it('should handle ADD_SHIP', () => {
        const addShipVertical = {
            type: types.ADD_SHIP,
            piece: 'S',
            pos: 'vertical',
            row: 1,
            col: 1
        }

        const addShipHorizontal = {
            type: types.ADD_SHIP,
            piece: 'S',
            pos: 'horizontal',
            row: 1,
            col: 1
        }

        expect(reducer({}, addShipVertical).gameLogic.playerBoard[1][1].piece).toEqual('S')
        expect(reducer({}, addShipVertical).gameLogic.playerBoard[2][1].piece).toEqual('S')
        expect(reducer({}, addShipVertical).gameLogic.playerBoard[3][1].piece).toEqual('E')
        expect(reducer({}, addShipVertical).gameLogic.playerBoard[1][1].show).toEqual(false)
        expect(reducer({}, addShipVertical).gameLogic.playerBoard[1][1].hit).toEqual(false)
        expect(reducer({}, addShipVertical).gameLogic.playerBoard[1][1].pos).toEqual('vertical')

        expect(reducer({}, addShipHorizontal).gameLogic.playerBoard[1][1].piece).toEqual('S')
        expect(reducer({}, addShipHorizontal).gameLogic.playerBoard[1][2].piece).toEqual('S')
        expect(reducer({}, addShipHorizontal).gameLogic.playerBoard[1][3].piece).toEqual('E')
        expect(reducer({}, addShipHorizontal).gameLogic.playerBoard[1][1].show).toEqual(false)
        expect(reducer({}, addShipHorizontal).gameLogic.playerBoard[1][1].hit).toEqual(false)
        expect(reducer({}, addShipHorizontal).gameLogic.playerBoard[1][1].pos).toEqual('horizontal')
    })

    it('should handle DESTROY_SPOT', () => {
        const destroySpotOnPlayerBoard = {
            type: types.DESTROY_SPOT,
            row: 1,
            col: 1,
            board: 'playerBoard',
            fleet: 'playerFleet'
        }

        const destroySpotOnEnemyBoard = {
            type: types.DESTROY_SPOT,
            row: 1,
            col: 1,
            board: 'enemyBoard',
            fleet: 'enemyFleet'
        }

        store.getState().gameLogic.playerBoard[1][1] = {piece: 'C1', hit: false, show: false, pos: 'vertical'}
        expect(reducer({}, destroySpotOnPlayerBoard).gameLogic.playerFleet[1]).toEqual(['C1', 1, 3])
        expect(reducer({}, destroySpotOnPlayerBoard).gameLogic.playerBoard[1][1].hit).toEqual(true)
        store.getState().gameLogic.playerBoard[1][1] = 'E'

        store.getState().gameLogic.enemyBoard[1][1] = {piece: 'C1', hit: false, show: false, pos: 'vertical'}
        expect(reducer({}, destroySpotOnEnemyBoard).gameLogic.enemyFleet[1]).toEqual(['C1', 1, 3])
        expect(reducer({}, destroySpotOnEnemyBoard).gameLogic.enemyBoard[1][1].hit).toEqual(true)
        store.getState().gameLogic.enemyBoard[1][1] = 'E'



    })
})