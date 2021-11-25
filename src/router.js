import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Login, Submissions } from './components';

const Router = () => (
	<Switch>
		<Route exact path='/'>
			<Redirect to='/login'/>
		</Route>
		<Route path='/login' component={Login} />
		<Route path='/submissions' component={Submissions} />
	</Switch>
);

export default Router;
