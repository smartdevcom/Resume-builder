import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import Heading from '../Heading';
import { WorkHistory } from '../WorkHistory';
import { Skills } from '../Skills';
import { Summary } from '../Summary';
import { Finalize } from '../Finalize';
import { Edu } from '../Edu';

export default function App() {
	return (
		<Switch>
			<Route exact path='/' component={Heading} />
			<Route exact path='/heading' component={Heading} />
			<Route exact path='/work-history' component={WorkHistory} />
			<Route exact path='/education' component={Edu} />
			<Route exact path='/skills' component={Skills} />
			<Route exact path='/summary' component={Summary} />
			<Route exact path='/finalize' component={Finalize} />
		</Switch>
	);
}
