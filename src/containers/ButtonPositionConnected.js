/* eslint linebreak-style: ["error", "windows"] */
import { connect } from 'react-redux';
import ButtonPosition from '../components/ButtonPosition';
import { selectPosition } from '../actions';

const mapStateToProps = (state) => ({
  selectedPosition: state.gameLogic.selectedPosition,
});

const mapDispatchToProps = (dispatch) => ({
  onButtonClick: (buttonPosition) => dispatch(selectPosition(buttonPosition)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ButtonPosition);
