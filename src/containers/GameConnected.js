/* eslint linebreak-style: ["error", "windows"] */
import { connect } from 'react-redux';
import Game from '../components/Game';

const mapStateToProps = (state) => ({
  inputName: state.gameLogic.inputName,
  gamePhase: state.gamePhase,
  player: state.gameLogic.turn,
});

export default connect(
  mapStateToProps,
)(Game);
