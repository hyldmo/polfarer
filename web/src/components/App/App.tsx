import { About, Home, NotFound } from 'components/Routes'
import React from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch } from 'react-router'
import Footer from './Footer'

import './App.less'

const App: React.StatelessComponent = () => (
	<>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/about" component={About} />
			<Route component={NotFound}/>
		</Switch>
		<Footer />
	</>
)

export default hot(module)(App)
