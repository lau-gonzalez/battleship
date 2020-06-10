import { connect } from 'react-redux';
import React from 'react'
import Board from './../components/Board';
import { preGameBoard, battlePhase } from '../actions/index';
import { createSelector } from 'reselect';

const visiblePlayerBoard = (state) => state.gameLogic.playerBoard;
const visibleEnemyBoard = (state) => state.gameLogic.enemyBoard;
const getGamePhase = (state) => state.gamePhase;
const getSelectedPiece = (state) => state.gameLogic.selectedPiece;
const getSelectedPosition = (state) => state.gameLogic.selectedPosition;

const getPlayerBoard = createSelector(
  [visiblePlayerBoard],
  (board) => {
    return board.map((row, rowIdx) => {
      return row.map((spot, colIdx) => {
        if (!spot.hit && spot.piece !== 'E') {
          return <p>{'[ ]'}</p>;
        } else if (spot.hit && spot.piece === 'E') {
          return <ul>{'[ ]'}</ul>;
        } else if (spot.show) {
          return <ol>{'[ ]'}</ol>;
        } else if (spot.hit && spot.piece !== 'E' && !spot.show) {
          return <div>{'[ ]'}</div>;
        } else {
          return '';
        }
      })
    })
  }
)



const getEnemyBoard = createSelector(
  [visibleEnemyBoard],
  (board) => {
    return board.map((row, rowIdx) => {
      return row.map((spot, colIdx) => {
        if (!spot.hit) {
          return '';
        } else if (spot.hit && spot.piece === 'E') {
          return <ul>{'[ ]'}</ul>;
        } else if (spot.show) {
          return <ol>{'[ ]'}</ol>;
        } else {
          return <div>{'[ ]'}</div>
        }
      })
    })
  }
)

const getCursorOnEnter = createSelector(
  [getGamePhase, getSelectedPiece, getSelectedPosition],
  (gamePhase, selectedPiece, selectedPosition) => {
    if (gamePhase === 'pregamePhase' && selectedPiece && selectedPosition) {
      document.getElementsByClassName('playerBoard')[0].style.cursor = 'copy'
    } else {
      document.getElementsByClassName('playerBoard')[0].style.cursor = 'pointer'
    }
  }
)

const mapStateToProps = state => {
  const { selectedPiece, selectedPosition } = state.gameLogic;
  return {
    playerBoard: getPlayerBoard(state),
    enemyBoard: getEnemyBoard(state),
    selectedPiece: selectedPiece,
    selectedPos: selectedPosition,
    gamePhase: state.gamePhase,
    getCursorOnEnter: () => getCursorOnEnter(state)
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onCellClick: (row, col, boardType, gamePhase) => {
      if (gamePhase === 'pregamePhase' && boardType === 'playerBoard') {
        dispatch(preGameBoard(row, col))
      } else if (gamePhase === 'battle' && boardType === 'enemyBoard') {
        dispatch(battlePhase(row, col))
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)