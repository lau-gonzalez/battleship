import * as actions from '../../actions'
import * as types from '../../constants'

describe('actions', () => {

    it ('should create an action to select a ship, even without position selected', () => {
        const piece = 'CR'
        const position = 'vertical'
        const expectedAction = {
            type: types.SELECT_SHIP,
            piece,
            position
        }

        expect(actions.selectShip(piece, position)).toEqual(expectedAction)
        expect(actions.selectShip(piece)).toEqual(expectedAction)


    })

    it('should create an action to select a orientation of ship', ()=>{
        const position = 'horizontal'
        const expectedAction = {
            type: types.SELECT_POSITION,
            position
        }
        expect(actions.selectPosition(position)).toEqual(expectedAction)
    })

    it('should create an action to add ship', ()=>{
        const selectedShip = 'CR'
        const selectedPosition = 'horizontal'
        const row = 2
        const col = 3
        const expectedAction = {
            type: types.ADD_SHIP,
            piece: selectedShip,
            pos: selectedPosition,
            row,
            col
        }
        expect(actions.addShip(selectedShip,selectedPosition, row, col)).toEqual(expectedAction)
    })


})