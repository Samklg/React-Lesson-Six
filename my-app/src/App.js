import React, { useState, useRef } from 'react';
import './App.css';

function App() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [repeatPasswordError, setRepeatPasswordError] = useState('');
	const [formValid, setFormValid] = useState(false);

	const registerButtonRef = useRef();

	const validateEmail = (email) => {
		if (!/\S+@\S+\.\S+/.test(email)) {
			setEmailError('Некорректный email');
		} else {
			setEmailError('');
		}
		setEmail(email);
	};

	const validatePassword = (password) => {
		if (password.length < 6) {
			setPasswordError('Пароль должен содержать не менее 6 символов');
		} else {
			setPasswordError('');
		}
		setPassword(password);
	};

	const validateRepeatPassword = (repeatPassword) => {
		if (repeatPassword !== password) {
			setRepeatPasswordError('Пароли не совпадают');
		} else {
			setRepeatPasswordError('');
		}
		setRepeatPassword(repeatPassword);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log('Email:', email);
		console.log('Password:', password);
		console.log('Repeat Password:', repeatPassword);
	};

	const handleBlur = () => {
		if (
			emailError ||
			passwordError ||
			repeatPasswordError ||
			!email ||
			!password ||
			!repeatPassword
		) {
			setFormValid(false);
		} else {
			setFormValid(true);
			registerButtonRef.current.focus(); // переместить фокус на кнопку "Зарегистрироваться"
		}
	};

	return (
		<div className="App">
			<form onSubmit={handleSubmit}>
				<label>Email:</label>
				<input
					type="email"
					value={email}
					onChange={(e) => validateEmail(e.target.value)}
					onBlur={() => handleBlur()}
				/>
				{emailError && <div className="error">{emailError}</div>}
				<label>Пароль:</label>
				<input
					type="password"
					value={password}
					onChange={(e) => validatePassword(e.target.value)}
					onBlur={() => handleBlur()}
				/>
				{passwordError && <div className="error">{passwordError}</div>}
				<label>Повторите пароль:</label>
				<input
					type="password"
					value={repeatPassword}
					onChange={(e) => validateRepeatPassword(e.target.value)}
					onBlur={() => handleBlur()}
				/>
				{repeatPasswordError && (
					<div className="error">{repeatPasswordError}</div>
				)}
				<button type="submit" disabled={!formValid} ref={registerButtonRef}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
}

export default App;
