/* eslint linebreak-style: ["error", "windows"] */
import { connect } from 'react-redux';
import Header from '../components/Header';
import { error } from '../actions';

const mapStateToProps = (state) => ({
  gamePhase: state.gamePhase,
  messageError: state.gameLogic.messageError,
  player: state.gameLogic.turn,
});

const mapDispatchToProps = (dispatch) => ({
  onError: (messageError) => dispatch(error(messageError)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
