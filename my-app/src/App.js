import React, { useState } from 'react';
import './App.css';

export function App() {
	const [displayValue, setDisplayValue] = useState('');
	const [firstValue, setFirstValue] = useState('');
	const [operator, setOperator] = useState('');
	const [displayColor, setDisplayColor] = useState('black');

	const handleNumberClick = (number) => {
		setDisplayValue(`${displayValue}${number}`);
		setDisplayColor('black');
	};

	const handleOperatorClick = (op) => {
		setFirstValue(displayValue);
		setOperator(op);
		setDisplayValue('');
	};

	const handleReset = () => {
		setDisplayValue('');
		setFirstValue('');
		setOperator('');
		setDisplayColor('black');
	};

	const handleResult = () => {
		const secondValue = parseInt(displayValue);
		let result = 0;

		switch (operator) {
			case '+':
				result = parseInt(firstValue) + secondValue;
				break;
			case '-':
				result = parseInt(firstValue) - secondValue;
				break;
			default:
				result = 0;
				break;
		}

		setDisplayValue(result.toString());
		setFirstValue(result.toString());
		setOperator('');
		setDisplayColor('green');
	};

	return (
		<div className="calculator">
			<div className="display" style={{ color: displayColor }}>
				{displayValue}
			</div>
			<div className="buttons">
				<button onClick={() => handleNumberClick(0)}>0</button>
				<button onClick={() => handleNumberClick(1)}>1</button>
				<button onClick={() => handleNumberClick(2)}>2</button>
				<button onClick={() => handleNumberClick(3)}>3</button>
				<button onClick={() => handleNumberClick(4)}>4</button>
				<button onClick={() => handleNumberClick(5)}>5</button>
				<button onClick={() => handleNumberClick(6)}>6</button>
				<button onClick={() => handleNumberClick(7)}>7</button>
				<button onClick={() => handleNumberClick(8)}>8</button>
				<button onClick={() => handleNumberClick(9)}>9</button>
				<button onClick={() => handleOperatorClick('+')}>+</button>
				<button onClick={() => handleOperatorClick('-')}>-</button>
				<button onClick={handleResult}>=</button>
				<button onClick={handleReset}>C</button>
			</div>
		</div>
	);
}

export default App;
