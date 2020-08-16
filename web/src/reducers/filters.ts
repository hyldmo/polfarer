import { Action } from 'actions'
import { Filters, FILTERS_ORDERBY, FILTERS_VOLUME } from 'common'

const initialState: Filters = {
	orderBy: [FILTERS_ORDERBY[1]],
	price: [],
	volumes: [FILTERS_VOLUME[1]],
	categories: []
}

export default function (state = initialState, action: Action): Filters {
	switch (action.type) {
	case 'UPDATE_FILTERS':
		return action.payload

	default:
		return state
	}
}
