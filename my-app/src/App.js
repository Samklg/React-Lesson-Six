import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required().min(6),
	confirmPassword: yup
		.string()
		.required()
		.oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
});

function App() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<label>
				Email:
				<input type="text" {...register('email')} />
				{errors.email && <div>{errors.email.message}</div>}
			</label>
			<label>
				Пароль:
				<input type="password" {...register('password')} />
				{errors.password && <div>{errors.password.message}</div>}
			</label>
			<label>
				Повторите пароль:
				<input type="password" {...register('confirmPassword')} />
				{errors.confirmPassword && <div>{errors.confirmPassword.message}</div>}
			</label>
			<button
				type="submit"
				disabled={!!(errors.email || errors.password || errors.confirmPassword)}
			>
				Зарегистрироваться
			</button>
		</form>
	);
}

export default App;
