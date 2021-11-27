import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ThemeButton } from '../index';
import { AppContext } from '../../contexts';
import './navbar.css';

const Navbar = () => {
	const history = useHistory();
	const {state, setState} = useContext(AppContext);


	const onLoginClick = () => {
		history.push('/login');
	};

	const onSubmissionsClick = () => {
		history.push('/submissions');
	};

	return (
		<div className='navbar'>
			<div className='navbar-left'>
				<button onClick={onLoginClick}>
					Login
				</button>

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
