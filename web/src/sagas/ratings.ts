import { Action, Actions } from 'actions'
import { call, put, takeEvery } from 'redux-saga/effects'
import { Wine } from 'common'
import { firestore, mapMeta, search, SearchResult } from 'utils'

export default function* () {
	// const channel = yield actionChannel('FETCH_RATINGS')
	// while (true) {
	// 	const action = yield take(channel)
	// 	yield call(fetchRatings, action)
	// }
	yield takeEvery('FETCH_RATINGS', fetchRatings)
}

// TODO: Find better way of getting a specific actions type
function* fetchRatings (action: Action<'FETCH_RATINGS'>) {
	const id = action.meta

	const cacheData = yield call(firestore.get, id)
	if (cacheData?.Varenavn == id) { // TODO: Use date
		yield put(Actions.ratingsFetched(cacheData.meta, id))
	} else {
		try {
			const resp: SearchResult = yield call(search, action.payload.varenavn)
			if (resp.err !== null)
				yield put(Actions.ratingsFetchFailed(resp.err, id))
			else {
				const meta = mapMeta(action.payload, resp.data.hits[0])
				yield call(saveRating, { ...action.payload, meta })
				yield put(Actions.ratingsFetched(meta, id))
			}
		} catch (e) {
			console.error('Err', e)
			yield put(Actions.ratingsFetchFailed(e ,id))
		}
	}
}

export async function saveRating (wine: Wine) {
	const data = { ...wine }
	if (data.meta?.fresh) {
		await firestore.set(data.varenavn, data)
	}
}
