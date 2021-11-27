import React, { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../contexts';
import './login.css';

const Login = () => {
	const history = useHistory();
	const {state, setState} = useContext(AppContext);
	const email = useRef();
	const password = useRef();

	const onSubmit = () => {
		const data = [
			{
				id: 'Hello',
				status: 'World',
				actions: ['EDIT', 'BIND']
			},
			{
				id: 'react-table',
				status: 'rocks',
			},
			{
				id: 'whatever',
				status: 'you want',
			},
		];

		setState({
			...state,
			data
		});

		history.push('/submissions');
	};

	return (
		<div className='login'>
			<div className='login-field'>
				Email:
				<input placeholder='Enter email address' type='email' ref={email}/>
			</div>

			<div className='login-field'>
				<label>
					Password:
					<input placeholder='Enter password' type='password' ref={password}/>
				</label>
			</div>

			<button className='login-button' onClick={onSubmit}>
				Login
			</button>
		</div>
	);
};

export default Login;
