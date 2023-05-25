import React from 'react';
import PropTypes from 'prop-types';

const Square = ({ value, onSquareClick }) => {
	return (
		<button className="square" onClick={onSquareClick}>
			{value}
		</button>
	);
};

Square.propTypes = {
	value: PropTypes.string,
	onSquareClick: PropTypes.func,
};

export default Square;
