import { useContext } from 'react';
import { ThemeContext } from '../../contexts';

const ThemeButton = () => {
	const {isDark, toggleFunction} = useContext(ThemeContext);

	return (
		<button className='theme-button' onClick={toggleFunction}>
			 toggle theme to {isDark? 'Dark' : 'Light'}
		</button>
	);
};

export default ThemeButton;
