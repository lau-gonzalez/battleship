/* eslint linebreak-style: ["error", "windows"] */
import { connect } from 'react-redux';
import WelcomeScreen from '../components/WelcomeScreen';
import { inputName } from '../actions';

const mapStateToProps = (state) => ({
  inputName: state.gameLogic.inputName,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmitWelcome: (input) => dispatch(inputName(input)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WelcomeScreen);
