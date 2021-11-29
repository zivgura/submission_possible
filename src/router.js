import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Login, Register, SubmissionsTable, SubmissionForm, BindSubmission } from './components';


const Router = () => (
	<Switch>
		<Route exact path='/'>
			<Redirect to='/login'/>
		</Route>
		<Route exact path='/login' component={Login}/>
		<Route exact path='/register' component={Register}/>
		<Route exact path='/submissions' component={SubmissionsTable}/>
		<Route exact path='/submission' component={SubmissionForm}/>
		<Route exact path='/bind' component={BindSubmission}/>
	</Switch>
);

export default Router;
