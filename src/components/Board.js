import React, { Component } from 'react';

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
const columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class Board extends Component {

    render() {
        const props = this.props;
        const board = props.boardType === 'playerBoard' ? props.playerBoard : props.enemyBoard;

        return (
            <div className={props.className}>
                <div>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                {columns.map(column => <th scope='col' key={column}>{column}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {board.map((row, rowIdx) => {
                                return <tr key={rowIdx}><th scope='row'>{rows[rowIdx]}</th>
                                    {columns.map((col, colIdx) => {
                                        return <td
                                            className='td'
                                            key={colIdx}
                                            onClick={() => props.onCellClick(rowIdx, colIdx, props.boardType, props.gamePhase)}>
                                            {board[rowIdx][colIdx]}
                                        </td>
                                    })}</tr>
                            })}
                        </tbody>

                    </table>

                </div>
            </div>
        );
    }
}

export default Board;