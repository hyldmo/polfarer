import { Action, MetaAction } from 'actions'
import { Wine } from 'common'

const initialState = [] as Wine[] // (data as Polvin[]).filter(({ Varetype }) => CAT_WHITELIST.includes(Varetype))

function wine (state: Wine, action: MetaAction): Wine {
	if (action.meta != state.varenavn)
		return state
	switch (action.type) {
	case 'FETCH_RATINGS':
	case 'RATINGS_FETCH_FAILED':
		return {
			...state,
			meta: null
		}
	case 'RATINGS_FETCHED':
		return {
			...state,
			meta: action.payload
		}
	default:
		return state
	}
}

export default function (state = initialState, action: Action): Wine[] {
	switch (action.type) {
	case 'WINES_FETCH_OK':
		return action.payload

	case 'FETCH_RATINGS':
	case 'RATINGS_FETCH_FAILED':
	case 'RATINGS_FETCHED':
		return state.map(w => wine(w, action))
	default:
		return state
	}
}
