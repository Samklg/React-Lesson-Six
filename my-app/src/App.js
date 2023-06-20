import React, { useState, useEffect } from 'react';

function TodoList() {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((response) => response.json())
			.then((data) => setTodos(data));
	}, []);

	return (
		<div>
			<h1>Todo List</h1>
			<ul>
				{todos.map((todo) => (
					<li key={todo.id}>{todo.title}</li>
				))}
			</ul>
		</div>
	);
}

export default TodoList;
