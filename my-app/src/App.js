import React, { useState } from 'react';
import Board from './Board';
import calculateWinner from './calculateWinner';

const App = () => {
	const [currentSquares, setCurrentSquares] = useState(Array(9).fill(null));
	const [xIsNext, setXIsNext] = useState(true);

	const handlePlay = (nextSquares) => {
		setCurrentSquares(nextSquares);
		setXIsNext(!xIsNext);
	};

	const handleReset = () => {
		setCurrentSquares(Array(9).fill(null));
		setXIsNext(true);
	};

	const winner = calculateWinner(currentSquares);
	let status;
	if (winner) {
		status = 'Победил: ' + winner;
	} else {
		status = 'Сейчас ходит: ' + (xIsNext ? 'X' : 'O');
	}

	return (
		<div className="game">
			<div className="game-board">
				<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
			</div>
			<div className="game-info">
				<div className="status">{status}</div>
				<button onClick={handleReset}>Начать заново</button>
			</div>
		</div>
	);
};

export default App;
