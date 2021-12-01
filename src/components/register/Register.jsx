import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { dbService, toastService } from '../../services';
import { dbUtils } from '../../utils';
import { emailRegex } from '../../constants';
import './register.css';

const Register = () => {
		const history = useHistory();
		const email = useRef();
		const password = useRef();

		const onSuccess = () => {
			history.push('/login');
		};

		const onSubmit = () => {
			const tryRegister = async () => {
				if (emailRegex.test(email.current.value)) {
					try {
						const response = await dbService.tryRegister(email.current.value, password.current.value);
						dbUtils.handleResponseFromServer(response, onSuccess);
					} catch (error) {
						toastService.onError('Failed to register \n Please try again');
					}
				}
				else {
					toastService.onError('Email address is invalid \n Please try again');
				}
			};

			tryRegister();
		};

		return (
			<div className="register">
				<div className="register-container">
					<h3>
						Register
					</h3>

					<div className="form-field">
						<input placeholder="Email address" type="email" ref={email}/>
					</div>

					<div className="form-field">
						<input placeholder="Password" type="password" ref={password}/>
					</div>

					<div className="register-actions">
						<button className="register-button" onClick={onSubmit}>
							Register
						</button>
					</div>
				</div>
			</div>
		);
	}
;

export default Register;
