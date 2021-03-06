import React, { useContext, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppContext from '../../contexts';
import { dbService, toastService } from '../../services';
import './login.css';
import { dbUtils } from '../../utils';


const Login = () => {
	const history = useHistory();
	const {state, setState} = useContext(AppContext);
	const email = useRef();
	const password = useRef();

	const onSuccess = () => {
		history.push('/login');
	};

	const onSubmit = () => {
		const tryLogin = async () => {
			try {
				const response = await dbService.tryLogin(email.current.value, password.current.value);
				const isExists = dbUtils.handleResponseFromServer(response, onSuccess);

				if (isExists) {
					const {data: submissions} = await dbService.getSubmissions(email.current.value);
					const data = submissions?.map(submission =>
						dbService.prepareSubmissionsForTable(submission)
					) || []
						.sort(({id: id1}, {id: id2}) => id1 - id2);

					setState({
						...state,
						data,
						email: email.current.value,
						currentPage: 'Submissions'
					});

					history.push('/submissions');
				}
			} catch (error) {
				toastService.onError('Failed to log in \n Please try again');
			}
		};

		tryLogin();
	};

	return (
		<div className="login">
			<div className="login-container">
				<h3>
					Log In
				</h3>

				<div className="form-field">
					<input placeholder="Email" type="email" ref={email}/>
				</div>

				<div className="form-field">
					<input placeholder="Password" type="password" ref={password}/>
				</div>

				<div className="login-actions">
					<button className="login-button" onClick={onSubmit}>
						Login
					</button>

					<div className="register-link">
						<Link to="/register">
							Not register yet? click here
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
