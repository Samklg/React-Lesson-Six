import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link,
	useParams,
	Routes,
	useNavigate,
} from 'react-router-dom';
import './App.css';

function TodoList() {
	const [todos, setTodos] = useState([]);
	const [sorted, setSorted] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		fetch('http://localhost:3001/todos')
			.then((response) => response.json())
			.then((data) => setTodos(data));
	}, []);

	const addTodo = (title) => {
		fetch('http://localhost:3001/todos', {
			method: 'POST',
			body: JSON.stringify({ title: title, completed: false }),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => setTodos([...todos, data]));
	};

	const deleteTodo = (id) => {
		fetch(`http://localhost:3001/todos/${id}`, {
			method: 'DELETE',
		}).then(() =>
			setTodos(
				todos.filter((todo) => {
					return todo.id !== id;
				}),
			),
		);
	};

	const updateTodo = (id, title) => {
		fetch(`http://localhost:3001/todos/${id}`, {
			method: 'PATCH',
			body: JSON.stringify({ title: title }),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setTodos((todos) => {
					const newTodos = [...todos];
					const index = newTodos.findIndex((todo) => todo.id === id);
					newTodos[index].title = data.title;
					return newTodos;
				});
			});
	};

	const handleSearchTodo = (e) => {
		setSearchValue(e.target.value);
	};

	const sortedTodo = () => {
		setSorted(!sorted);
	};

	const todosSorted = sorted
		? todos.sort((a, b) => (a.title > b.title ? 1 : -1))
		: todos;

	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<TodoListPage
							todosSorted={todosSorted}
							searchValue={searchValue}
							sorted={sorted}
							sortedTodo={sortedTodo}
							addTodo={addTodo}
							handleSearchTodo={handleSearchTodo}
							updateTodo={updateTodo}
						/>
					}
				/>
				<Route path="/task/:id" element={<TaskPage deleteTodo={deleteTodo} />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</Router>
	);
}

function TodoListPage({
	todosSorted,
	searchValue,
	sorted,
	sortedTodo,
	addTodo,
	handleSearchTodo,
}) {
	return (
		<div className="todo-list-wrapper">
			<h1>Todo List</h1>
			<form onSubmit={(e) => e.preventDefault()}>
				<input type="text" onChange={handleSearchTodo} value={searchValue} />
			</form>
			<button onClick={sortedTodo}>
				{sorted ? 'Отключить сортировку' : 'Включить сортировку'}
			</button>
			<ul className="todo-list">
				{todosSorted
					.filter((todo) => todo.title.includes(searchValue))
					.map((todo) => (
						<li key={todo.id} className="todo-item">
							<Link to={`/task/${todo.id}`} title={todo.title}>
								{`${todo.title.substring(0, 20)}${
									todo.title.length > 20 ? '...' : ''
								}`}
							</Link>
						</li>
					))}
			</ul>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					addTodo(e.target.elements[0].value);
				}}
			>
				<input type="text" />
				<button type="submit">Добавить</button>
			</form>
		</div>
	);
}

function TaskPage({ deleteTodo }) {
	const { id } = useParams();
	const [currentTodo, setCurrentTodo] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`http://localhost:3001/todos/${id}`)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Ошибка при получении данных о задаче');
				}
				return response.json();
			})
			.then((data) => {
				setCurrentTodo(data);
			})
			.catch((error) => {
				console.error(error);
				setCurrentTodo(null);
			});
	}, [id]);

	const goBack = () => {
		navigate(-1);
	};

	const handleDelete = () => {
		deleteTodo(String(currentTodo.id));
	};

	if (!currentTodo) {
		return (
			<div>
				<h1>Ошибка 404</h1>
				<p>Страница не найдена</p>
			</div>
		);
	}

	return (
		<div>
			<h1>Задача</h1>
			<p>{currentTodo.title}</p>
			<button onClick={handleDelete}>Удалить</button>
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<input type="text" defaultValue={currentTodo.title} />
				<button type="submit">Изменить</button>
			</form>
			<button onClick={goBack} className="back-button">
				Назад
			</button>
		</div>
	);
}

function NotFoundPage() {
	return (
		<div>
			<h1>Ошибка 404</h1>
			<p>Страница не найдена</p>
		</div>
	);
}

export default TodoList;
