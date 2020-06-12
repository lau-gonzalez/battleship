/* eslint-disable max-len */
/* eslint linebreak-style: ["error", "windows"] */
import { connect } from 'react-redux';
import React from 'react';
import { createSelector } from 'reselect';
import Board from '../components/Board';
import { preGameBoard, battlePhase } from '../actions/index';

const visiblePlayerBoard = (state) => state.gameLogic.playerBoard;
const visibleEnemyBoard = (state) => state.gameLogic.enemyBoard;
const getGamePhase = (state) => state.gamePhase;
const getSelectedPiece = (state) => state.gameLogic.selectedPiece;
const getSelectedPosition = (state) => state.gameLogic.selectedPosition;

const getPlayerBoard = createSelector(
  [visiblePlayerBoard],
  (board) => board.map((row) => row.map((spot) => {
    if (!spot.hit && spot.piece !== 'E') {
      return <p>-</p>;
    } if (spot.hit && spot.piece === 'E') {
      return <ul>-</ul>;
    } if (spot.show) {
      return <ol>-</ol>;
    } if (spot.hit && spot.piece !== 'E' && !spot.show) {
      return <div>-</div>;
    }
    return '';
  })),
);

const getEnemyBoard = createSelector(
  [visibleEnemyBoard],
  (board) => board.map((row) => row.map((spot) => {
    if (!spot.hit) {
      return '';
    } if (spot.hit && spot.piece === 'E') {
      return <ul>-</ul>;
    } if (spot.show) {
      return <ol>-</ol>;
    }
    return <div>-</div>;
  })),
);

const getCursorOnEnter = createSelector(
  [getGamePhase, getSelectedPiece, getSelectedPosition],
  (gamePhase, selectedPiece, selectedPosition) => {
    if (gamePhase === 'pregamePhase' && selectedPiece && selectedPosition) {
      document.getElementsByClassName('playerBoard')[0].style.cursor = 'copy';
    } else {
      document.getElementsByClassName('playerBoard')[0].style.cursor = 'pointer';
    }
  },
);

const mapStateToProps = (state) => {
  const { selectedPiece, selectedPosition } = state.gameLogic;
  return {
    playerBoard: getPlayerBoard(state),
    enemyBoard: getEnemyBoard(state),
    selectedPiece,
    selectedPos: selectedPosition,
    gamePhase: state.gamePhase,
    getCursorOnEnter: () => getCursorOnEnter(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onCellClick: (row, col, boardType, gamePhase) => {
    if (gamePhase === 'pregamePhase' && boardType === 'playerBoard') {
      dispatch(preGameBoard(row, col));
    } else if (gamePhase === 'battle' && boardType === 'enemyBoard') {
      dispatch(battlePhase(row, col));
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Board);
