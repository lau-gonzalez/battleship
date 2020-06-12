/* eslint linebreak-style: ["error", "windows"] */
import { connect } from 'react-redux';
import ButtonShip from '../components/ButtonShip';
import { selectShip } from '../actions';

const mapStateToProps = (state) => ({
  selectedPiece: state.gameLogic.selectedPiece,
});

const mapDispatchToProps = (dispatch) => ({
  onButtonClick: (buttonName) => dispatch(selectShip(buttonName)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ButtonShip);
