import { useState } from 'react';
import { AppContext } from '../contexts';

const AppProvider = ({children}) => {
	const [state, setState] = useState({});

	return (
		<AppContext.Provider value={{state, setState}}>
			{children}
		</AppContext.Provider>
	);

};

export default AppProvider;