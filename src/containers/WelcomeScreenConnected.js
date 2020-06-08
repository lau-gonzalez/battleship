import { connect } from 'react-redux'
import WelcomeScreen from './../components/WelcomeScreen'
import { inputName } from './../actions'


const mapStateToProps = state =>{
    return{
        inputName: state.gameLogic.inputName,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onSubmitWelcome: input => dispatch(inputName(input))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WelcomeScreen)