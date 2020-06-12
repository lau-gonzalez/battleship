/* eslint linebreak-style: ["error", "windows"] */
import { connect } from 'react-redux';
import FinalScreen from '../components/FinalScreen';
import { PLAYER_NAME } from '../constants';

const gamePhaseStatus = (gamePhase, player) => {
  if (gamePhase === 'endGame') {
    return player === PLAYER_NAME ? 'You Lose!' : 'You Win!';
  }
  return null;
};

const mapStateToProps = (state) => ({
  gamePhase: gamePhaseStatus(state.gamePhase, state.gameLogic.turn),
});

export default connect(
  mapStateToProps,
)(FinalScreen);
