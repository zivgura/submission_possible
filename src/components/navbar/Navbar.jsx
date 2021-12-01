import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ThemeButton } from '../index';
import { AppContext } from '../../contexts';
import { dbService } from '../../services';
import './navbar.css';

const Navbar = () => {
	const history = useHistory();
	const {state, setState} = useContext(AppContext);

	const onLoginClick = () => {
		history.push('/login');
	};

	const onLogoutClick = () => {
		setState(null);
		history.push('/login');
	}

	const onSubmissionsClick = async () => {
		const {data} = await dbService.getSubmissions(state.email);

		setState({
			...state,
			data,
			currentRecordId: null
		});

		history.push('/submissions');
	};

	return (
		<div className='navbar'>
			<div className='navbar-left'>
				{
					state?.email
						?
						(
							<button onClick={onLogoutClick}>
								Logout
							</button>
						)
						:
						(
							<button onClick={onLoginClick}>
								Login
							</button>
						)
				}

				<button onClick={onSubmissionsClick}>
					My Submissions
				</button>
			</div>

			<div className='navbar-right'>
				<ThemeButton/>
			</div>
		</div>
	);
};

export default Navbar;
