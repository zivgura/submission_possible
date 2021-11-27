import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Login, SubmissionsTable, SubmissionForm, BindSubmission } from './components';

const Router = () => (
	<Switch>
		<Route exact path='/'>
			<Redirect to='/login'/>
		</Route>
		<Route path='/login' component={Login} />
		<Route exact path='/submissions' component={SubmissionsTable} />
		<Route exact path='/submission' component={SubmissionForm} />
		<Route exact path='/bind' component={BindSubmission} />
	</Switch>
);

export default Router;
