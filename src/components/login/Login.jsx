import React, { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../contexts';
import './login.css';

const Login = () => {
	const history = useHistory();
	const {setState} = useContext(AppContext);
	const email = useRef();
	const password = useRef();

	const onSubmit = () => {
		const data = [
			{
				id: 'Hello',
				status: 'World',
				actions: ['BIND']
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

		setState({data});
		history.push('/submissions');
	};

	return (
		<div className='login'>
			<div className='login-field'>
				Email:
				<input placeholder='Enter Email Address' type='email' ref={email}/>
			</div>

			<label>
				Password:
				<input placeholder='Enter Password' type='password' ref={password}/>
			</label>

			<button className='login-button' onClick={onSubmit}>
				Login
			</button>
		</div>
	);
};

export default Login;
