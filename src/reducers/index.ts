import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'
import version from './version'
import wines from './wines'

const reducers = (history: History) => combineReducers({
	router: connectRouter(history),
	version,
	wines
})

export default reducers
