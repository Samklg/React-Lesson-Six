import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import calculateWinner from './calculateWinner';

const Board = ({ xIsNext, squares, onPlay }) => {
	const handleClick = (i) => {
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		const nextSquares = squares.slice();
		if (xIsNext) {
			nextSquares[i] = 'X';
		} else {
			nextSquares[i] = 'O';
		}
		onPlay(nextSquares);
	};

	const winner = calculateWinner(squares);
	let status;
	if (winner) {
		status = 'Победил: ' + winner;
	} else {
		status = 'Сейчас ходит: ' + (xIsNext ? 'X' : 'O');
	}

	return (
		<>
			<div className="status">{status}</div>
			{squares.map((value, index) => {
				if (index === 0 || index === 3 || index === 6) {
					return (
						<div key={index} className="board-row">
							<Square
								key={index}
								value={squares[index]}
								onSquareClick={() => handleClick(index)}
							/>
							<Square
								key={index + 1}
								value={squares[index + 1]}
								onSquareClick={() => handleClick(index + 1)}
							/>
							<Square
								key={index + 2}
								value={squares[index + 2]}
								onSquareClick={() => handleClick(index + 2)}
							/>
						</div>
					);
				}
			})}
		</>
	);
};

Board.propTypes = {
	xIsNext: PropTypes.bool,
	squares: PropTypes.array,
	onPlay: PropTypes.func,
};

export default Board;
