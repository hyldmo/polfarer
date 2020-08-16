import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'
import filters from './filters'
import version from './version'
import wines from './wines'

const reducers = (history: History) => combineReducers({
	filters,
	router: connectRouter(history),
	version,
	wines
})

export type State = ReturnType<ReturnType<typeof reducers>>

export default reducers
