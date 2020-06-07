import { connect } from 'react-redux';
import ButtonPosition from './../components/ButtonPosition';
import { selectPosition } from './../actions'


const mapStateToProps = state => {
    return{
        selectedPosition: state.gameLogic.selectedPosition,
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onButtonClick: buttonPosition => dispatch(selectPosition(buttonPosition))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)(ButtonPosition)
