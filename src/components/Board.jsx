/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import PropTypes from 'prop-types';

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function Board(props) {
  const {
    boardType, playerBoard, enemyBoard, className, gamePhase, onCellClick, getCursorOnEnter,
  } = props;
  const board = boardType === 'playerBoard' ? playerBoard : enemyBoard;

  return (
    <div
      className={className}
      onMouseEnter={getCursorOnEnter}
    >
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              {columns.map((column) => <th scope="col" key={column}>{column}</th>)}
            </tr>
          </thead>
          <tbody>
            {board.map((row, rowIdx) => (
              <tr key={rowIdx}>
                <th scope="row">{rows[rowIdx]}</th>
                {columns.map((col, colIdx) => (
                  <td
                    key={colIdx}
                    onClick={() => onCellClick(rowIdx, colIdx, boardType, gamePhase)}
                  >
                    {board[rowIdx][colIdx]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}

Board.propTypes = {
  boardType: PropTypes.string.isRequired,
  playerBoard: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
  enemyBoard: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
  getCursorOnEnter: PropTypes.func.isRequired,
  onCellClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  gamePhase: PropTypes.string.isRequired,
};

export default Board;
