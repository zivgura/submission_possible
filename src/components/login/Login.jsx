import React, { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../contexts';
import dbService from '../../services/dbService';
import './login.css';
import toastService from '../../services/toastService';

const Login = () => {
	const history = useHistory();
	const {state, setState} = useContext(AppContext);
	const email = useRef();
	const password = useRef();

	const onSubmit = () => {
		const tryLogin = async () => {
			try {
				const response = await dbService.tryLogin(email.current.value, password.current.value);
				const submissionsResponse = await dbService.getSubmissions(email.current.value);
				const {data: submissions} = await submissionsResponse.json();
				const data = submissions.map(submission => dbService.prepareSubmissionsForTable(submission));

				setState({
					...state,
					data,
					email: email.current.value
				});

				history.push('/submissions');
			} catch (error) {
				toastService.onError('Failed to log in \n Please try again');
			}
		}

		tryLogin();
	};

	return (
		<div className='login'>
			<div className='login-field'>
				Email:
				<input placeholder='Enter email address' type='email' ref={email}/>
			</div>

			<div className='login-field'>
				Password:
				<input placeholder='Enter password' type='password' ref={password}/>
			</div>

			<div className='login-action'>
				<button className='login-button' onClick={onSubmit}>
					Login
				</button>
			</div>
		</div>
	);
};

export default Login;
