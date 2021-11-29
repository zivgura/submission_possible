import React, { useContext, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AppContext } from '../../contexts';
import { dbService, toastService } from '../../services';
import './login.css';

const Login = () => {
	const history = useHistory();
	const {state, setState} = useContext(AppContext);
	const email = useRef();
	const password = useRef();

	const onSubmit = () => {
		const tryLogin = async () => {
			try {
				const response = await dbService.tryLogin(email.current.value, password.current.value);
				const {data: submissions} = await dbService.getSubmissions(email.current.value);
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
		};

		tryLogin();
	};

	return (
		<div className='login'>
			<div className='form-field'>
				Email:
				<input placeholder='Enter email address' type='email' ref={email}/>
			</div>

			<div className='form-field'>
				Password:
				<input placeholder='Enter password' type='password' ref={password}/>
			</div>

			<div className='login-actions'>
				<button className='login-button' onClick={onSubmit}>
					Login
				</button>

				<div className='register-link'>
					<Link to='/register'>
						Not register yet? click here
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
