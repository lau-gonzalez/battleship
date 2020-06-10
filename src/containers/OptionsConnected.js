import { connect } from 'react-redux'
import Options from './../components/Options'

const mapStateToProps = state =>{
    return{
        inputName: state.gameLogic.inputName,
        gamePhase: state.gamePhase,
        player: state.gameLogic.turn
    }
}


export default connect(
    mapStateToProps
)(Options)
