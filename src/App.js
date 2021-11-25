import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './components';
import Router from './router';
import { AppProvider } from './providers';
import './App.css';

const App = () => (
	<AppProvider>
		<BrowserRouter>
			<div className='App'>
				<div className='header'>
					<Navbar/>
				</div>
				<div className='content'>
					<Router/>
				</div>
			</div>
		</BrowserRouter>
	</AppProvider>
);

export default App;
