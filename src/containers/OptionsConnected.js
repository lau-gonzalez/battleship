import { connect } from 'react-redux'
import Options from './../components/Options'

const mapStateToProps = state =>{
    return{
        inputName: state.gameLogic.inputName,
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Options)
