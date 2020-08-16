import { call, put, select, takeLatest } from 'redux-saga/effects'
import { API_URL, sleep } from 'utils'
import { Filters, Result, Wine } from 'common'
import { Action, Actions } from 'actions'
import { State } from 'reducers'

export default function* () {
	yield takeLatest('WINES_FETCH', getWines)
	yield takeLatest('UPDATE_FILTERS', updateFilters)
}

function* getWines () {
	const filters = yield select((s: State) => s.filters)
	yield call(updateFilters, Actions.updateFilters(filters))
}

function getOrderParams (orderBy: Filters['orderBy']): [string, 'desc' | 'asc'] {
	switch (orderBy?.[0].toLowerCase()) {
	case 'pris':
		return ['Pris', 'asc']

	case 'score':
	default:
		return ['meta.score', 'desc']
	}
}

function* updateFilters (action: Action<'UPDATE_FILTERS'>) {
	yield call(sleep, 500)
	const [orderBy, direction] = getOrderParams(action.payload.orderBy)
	const params = new URLSearchParams({
		...action.payload,
		orderBy,
		direction
	} as any)

	try {
		const req: Response = yield call(fetch, `${API_URL}/wines?${params.toString()}`)
		const result: Result<Wine[]> = yield req.json()
		if (!result.err)
			yield put(Actions.fetchWinesOk(result.data))
		else
			console.error(result.err)
	} catch (e) {
		console.error(e)
	}

}
