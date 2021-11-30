import React, { useContext, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AppContext } from '../../contexts';
import { dbService, toastService } from '../../services';
import './register.css';

const SUCCESS = 'success'
const FAILURE = 'failure'

const Register = () => {
	const history = useHistory();
	const email = useRef();
	const password = useRef();

	const onSubmit = () => {
		const tryRegister = async () => {
			try {
				const response = await dbService.tryRegister(email.current.value, password.current.value);

				switch (response.status) {
					case SUCCESS:
						toastService.onSuccess('You have been registered successfully');
						history.push('/login');
						break;
					case FAILURE:
						toastService.onError(`Failed to register in \n ${response.message}`);
						break;
					default:
						toastService.onError('Something went wrong \n Please try again');
				}
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
