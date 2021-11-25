import { useState } from 'react';
import { ThemeContext } from '../contexts';

const ThemeProvider = ({children}) => {
	const [toggle, setToggle] = useState(false);

	const toggleFunction = () => {
		setToggle(!toggle);
	};

	const themes = {
		light: {
			foreground: '#000000',
			background: '#eeeeee'
		},
		dark: {
			foreground: '#ffffff',
			background: '#222222'
		}
	};

	return (
		<ThemeContext.Provider value={{toggle, toggleFunction}}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;
