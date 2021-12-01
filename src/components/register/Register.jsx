import React, { useContext, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AppContext } from '../../contexts';
import { dbService, toastService } from '../../services';
import './register.css';
import { dbUtils } from '../../utils';

const Register = () => {
	const history = useHistory();
	const email = useRef();
	const password = useRef();

	const onSuccess = () => {
		history.push('/login');
	};

	const onSubmit = () => {
		const tryRegister = async () => {
			try {
				const response = await dbService.tryRegister(email.current.value, password.current.value);
				dbUtils.handleResponseFromServer(response, onSuccess);
			} catch (error) {
				toastService.onError('Failed to register \n Please try again');
			}
		};

		tryRegister();
	};

	return (
		<div className="register">
			<div className="form-field">
				Email:
				<input placeholder="Enter email address" type="email" ref={email}/>
			</div>

			<div className="form-field">
				Password:
				<input placeholder="Enter password" type="password" ref={password}/>
			</div>

			<div className="register-actions">
				<button className="register-button" onClick={onSubmit}>
					Register
				</button>
			</div>
		</div>
	);
};

export default Register;
