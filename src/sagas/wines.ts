import { Actions } from 'actions'
import { call, put, takeEvery  } from 'redux-saga/effects'
import { Vintage } from 'types'
import * as wineResponse from '../../static/result.json'



const UrlParams = new URLSearchParams({
	'x-algolia-agent': 'Algolia%20for%20JavaScript%20(3.33.0)%3B%20Browser%20(lite)',
	'x-algolia-application-id': '9TAKGWJUXL',
	'x-algolia-api-key': '60c11b2f1068885161d95ca068d3a6ae'
})

async function search (query: string) {
	const params = {params:`query=${query}&hitsPerPage=1`}
	return fetch(`https://9takgwjuxl-dsn.algolia.net/1/indexes/WINES_prod/query?${UrlParams}`, {
		"headers": {
		  "accept": "application/json",
		  "accept-language": "en-US,en;q=0.9,nb-NO;q=0.8,nb;q=0.7,da;q=0.6,no;q=0.5",
		  "content-type": "application/json",
		  "sec-fetch-dest": "empty",
		  "sec-fetch-mode": "cors",
		  "sec-fetch-site": "cross-site"
		},
		"referrer": "https://www.vivino.com/",
		"referrerPolicy": "origin-when-cross-origin",
		body: JSON.stringify(params),
		"method": "POST",
		"mode": "cors",
		"credentials": "omit"
	});
}

export function calculateRatings (vintages: Vintage[]) {
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



export default function* () {
	yield takeEvery('FETCH_RATINGS', fetchRatings)
}

function* fetchRatings (action: ReturnType<typeof Actions.fetchRatings>) { // TODO: Find better way of getting a specific actions type
	try {
		const response = yield call(search, action.payload)
		if (response.ok) {
			const result: typeof wineResponse = yield call(response.json)
			yield put(Actions.ratingsFetched(result.hits[0], action.payload))
		}
	} catch (e) {
		yield put(Actions.ratingsFetchFailed(e, action.payload))
	}

}
