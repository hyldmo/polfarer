import { Predicate } from '@redux-saga/types'
import { Action, Actions } from 'actions'
import { call, put, select, takeLatest  } from 'redux-saga/effects'
import { Selector, State, Vintage } from 'types'
import * as wineResponse from '../../static/result.json'
import { sleep } from 'utils'

const headers = new Headers({
	'x-algolia-application-id': '9TAKGWJUXL',
	'x-algolia-api-key': '60c11b2f1068885161d95ca068d3a6ae'
})

async function search (query: string) {
	const params = {params:`query=${query}&hitsPerPage=6`}
	return fetch('https://9takgwjuxl-dsn.algolia.net/1/indexes/WINES_prod/query', {
		method: 'POST',
		headers,
		body: JSON.stringify(params)
	})
}

function calculateRatings (vintages: Vintage[]) {
	const stats = vintages
		.map(vintage => vintage.statistics)
		.reduce(
			(a, b) => ({
				count: a.count + b.ratings_count,
				score: a.score + b.ratings_average *  b.ratings_count
			}),
			{ count: 0, score: 0 }
		)
	return {
		count: stats.count,
		score: Math.round((stats.score / stats.count) * 10) / 10
	}
}


const predicate: Predicate<Action> = (a: Action) => a.type.includes('ACTIVITY')

export default function* () {
	yield takeLatest('FETCH_RATINGS', fetchRatings)
}

function* fetchRatings (action: ReturnType<typeof Actions.fetchRatings>) { // TODO: Find better way of getting a specific actions type
	yield call(sleep, 100)
	const response = yield call(search, action.payload)
	if (response.ok) {
		const result: typeof wineResponse = yield call(response.json)
		yield put(Actions.ratingsFetched(result.hits[0], action.payload)
	}
}
