import React from 'react';
import './navbar.css';
import { ThemeButton } from '../index';

const Navbar = () => {
	const onLoginClick = () => {

	};

	const onSubmissionsClick = () => {

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
