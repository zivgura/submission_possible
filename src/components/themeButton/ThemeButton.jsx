import { useContext } from 'react';
import { ThemeContext } from '../../contexts';

const ThemeButton = () => {
	const {toggle, toggleFunction} = useContext(ThemeContext);

	return (
		<button className='theme-button' onClick={toggleFunction}>
			 toggle theme to {toggle? 'Light' : 'Dark'}
		</button>
	);
};

export default ThemeButton;
