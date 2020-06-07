import { connect } from 'react-redux';
import ButtonShip from './../components/ButtonShip'
import { selectShip } from './../actions'

const mapStateToProps = state =>{
    return{
        selectedPiece: state.gameLogic.selectedPiece,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onButtonClick: buttonName => dispatch(selectShip(buttonName))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ButtonShip)