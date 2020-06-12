/* eslint-disable max-len */
/* eslint linebreak-style: ["error", "windows"] */
import { gamePieces } from '../constants';

// ----------------------------------------------------------------------------------------------//

//                                        Main functions

// ----------------------------------------------------------------------------------------------//

// Math functions

export const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomPosition = () => (Math.random() > 1 ? 'horizontal' : 'vertical');

// END Math functions

// ----------------------------------------------------------------------------------------------//

export const getNextTargetDirection = (targetDirection) => {
  const directions = {
    above: 'right',
    right: 'below',
    below: 'left',
    left: 'above',
  };
  return directions[targetDirection];
};

export const getOppositeTargetDirection = (targetDirection) => {
  const directions = {
    above: 'below',
    left: 'right',
    below: 'above',
    right: 'left',
  };

  return directions[targetDirection];
};

export const mapDirectionToNextSpot = (direction, row, col) => {
  let newRow = row;
  let newCol = col;

  if (direction === 'above') {
    newRow = row - 1;
    newCol = col;
  } else if (direction === 'right') {
    newRow = row;
    newCol = col + 1;
  } else if (direction === 'below') {
    newRow = row + 1;
    newCol = col;
  } else if (direction === 'left') {
    newRow = row;
    newCol = col - 1;
  }
  return { newRow, newCol };
};

export const destroyRandomSpotOnPlayerBoard = (board) => {
  let isSpaceOccupied = true;
  let row;
  let col;
  while (isSpaceOccupied) {
    row = getRandomNumber(0, 9);
    col = getRandomNumber(0, 9);
    if (!board[row][col].hit) {
      isSpaceOccupied = false;
    }
  }
  return { row, col };
};

// END Attack functions

// ----------------------------------------------------------------------------------------------//

// ----------------------------------------------------------------------------------------------//

//                                         Auxiliary functions

// ----------------------------------------------------------------------------------------------//

// Position functions

export const checkIfRangeIsOccupied = (row, column, spaces, position, board) => {
  for (let i = 0; i < spaces; i += 1) {
    if (position === 'horizontal' && board[row][column + i].piece !== 'E') {
      return true;
    } if (position === 'vertical' && board[row + i][column].piece !== 'E') {
      return true;
    }
  }
  return false;
};

export const getValidPosition = (shipName, position, board) => {
  const boardLength = 10;
  let row;
  let column;
  let isSpaceOccupied = true;
  while (isSpaceOccupied) {
    if (position === 'horizontal') {
      const horizontalRange = boardLength - gamePieces[shipName];
      row = getRandomNumber(0, boardLength - 1);
      column = getRandomNumber(0, horizontalRange);
      isSpaceOccupied = checkIfRangeIsOccupied(row, column, gamePieces[shipName], position, board);
    } else {
      const verticalRange = boardLength - gamePieces[shipName];
      row = getRandomNumber(0, verticalRange);
      column = getRandomNumber(0, boardLength - 1);
      isSpaceOccupied = checkIfRangeIsOccupied(row, column, gamePieces[shipName], position, board);
    }
  }

  return { row, column };
};

export const checkRangeValid = (row, column, spaces, position, board) => {
  for (let i = 0; i < spaces; i += 1) {
    // check if valid spot for function reuse. Computer generated row and position
    // will be valid
    if (position === 'horizontal' && !board[row][column + i]) {
      return false;
    } if (position === 'vertical' && !board[row + i]) {
      return false;
    }
  }
  return true;
};

// END Position functions

// ----------------------------------------------------------------------------------------------//

// Attack functions

export const isShipDestroyed = (spot, fleets) => {
  const shipName = spot.piece;
  for (let i = 0; i < fleets.length; i += 1) {
    if (fleets[i][0] === shipName) {
      if (fleets[i][1] === fleets[i][2]) {
        return true;
      }
      return false;
    }
  }
  return null;
};

export const decideWhichSpotToHit = (board, mode, firstSpotHit, lastSpotHit, direction, didComputerHitLastTurn) => {
  let currentTargetDirection = direction;

  if (mode === 'hunt') {
    const { row, col } = destroyRandomSpotOnPlayerBoard(board);
    return { row, col };
  }
  // target mode
  let initialRow;
  let initialColumn;
  let row;
  let col;
  const i = 0;
  const j = 1;

  if (!didComputerHitLastTurn) {
    initialRow = firstSpotHit[i];
    initialColumn = firstSpotHit[j];
  } else {
    initialRow = lastSpotHit[i];
    initialColumn = lastSpotHit[j];
  }

  let nextSpotIsInvalid = true;
  let loopCount = 0;
  do {
    const { newRow, newCol } = mapDirectionToNextSpot(currentTargetDirection, initialRow, initialColumn);
    row = newRow;
    col = newCol;

    if (board[row] && board[row][col] && !board[row][col].hit) {
      nextSpotIsInvalid = false;
    } else {
      currentTargetDirection = getNextTargetDirection(currentTargetDirection);
      loopCount += 1;
      if (loopCount > 4) {
        initialRow = firstSpotHit[i];
        initialColumn = firstSpotHit[j];
      }
    }
  } while (nextSpotIsInvalid);

  return { row, col, currentTargetDirection };
};

// Creation Boards

export const createBoard = (board) => {
  const newBoard = [];
  for (let m = 0; m < 10; m += 1) {
    const row = [];
    for (let n = 0; n < 10; n += 1) {
      const piece = board ? board[m][n] : {
        piece: 'E', pos: null, hit: false, show: false,
      };
      row.push(piece);
    }
    newBoard.push(row);
  }
  return newBoard;
};

export const getNewBoard = (board, action) => {
  const newBoard = createBoard(board);
  const newPiece = {
    piece: action.piece, pos: action.pos, hit: false, show: false,
  };
  if (action.pos === 'horizontal') {
    for (let n = 0; n < gamePieces[action.piece]; n += 1) {
      newBoard[action.row][n + action.col] = newPiece;
    }
  } else {
    for (let m = 0; m < gamePieces[action.piece]; m += 1) {
      newBoard[m + action.row][action.col] = newPiece;
    }
  }

  return newBoard;
};

export const createBoardWithRandomPieces = () => {
  const newBoard = createBoard();
  const ships = ['CR', 'C1', 'C2', 'C3', 'S'];
  for (let i = 0; i < ships.length; i += 1) {
    const shipName = ships[i];
    const position = getRandomPosition();
    const { row, column } = getValidPosition(shipName, position, newBoard);
    const newPiece = {
      piece: shipName, pos: position, hit: false, show: false,
    };
    for (let j = 0; j < gamePieces[shipName]; j += 1) {
      if (position === 'horizontal') {
        newBoard[row][column + j] = newPiece;
      } else {
        newBoard[row + j][column] = newPiece;
      }
    }
  }
  return newBoard;
};

// END Creation Boards
