/* eslint-disable no-undef */
/* eslint linebreak-style: ["error", "windows"] */
import * as helpers from '../../lib';

describe('Create board with random pieces', () => {
  const board = helpers.createBoardWithRandomPieces();

  it('is a 10x10 board', () => {
    expect(board.length).toBe(10);
    expect(board[0].length).toBe(10);
  });

  it('board has object with correct properties', () => {
    expect(board[0][0]).toHaveProperty('piece');
    expect(board[0][0]).toHaveProperty('pos');
    expect(board[0][0]).toHaveProperty('hit');
    expect(board[0][0]).toHaveProperty('show');
  });
});

describe('check if ship is destroyed', () => {
  const fleet = [
    ['CR', 1, 4],
    ['C1', 3, 3],
    ['C2', 1, 3],
    ['C3', 1, 3],
    ['S', 1, 2]];

  const testShip1 = { piece: 'C1' };
  const testShip2 = { piece: 'C2' };

  it('should return true when fleet hits equal fleet pieces', () => {
    const isDestroyed = helpers.isShipDestroyed(testShip1, fleet);
    expect(isDestroyed).toBe(true);
  });
  it('should return false when fleet hits and fleet pieces are different', () => {
    const isDestroyed = helpers.isShipDestroyed(testShip2, fleet);
    expect(isDestroyed).toBe(false);
  });
});
