import { Filters, Product, Wine, WineMeta } from 'common'
import { makeActionCreator } from 'utils'

export default {
	fetchWines: makeActionCreator('WINES_FETCH'),
	fetchWinesOk: makeActionCreator<'WINES_FETCH_OK', Wine[]>('WINES_FETCH_OK'),
	fetchRatings: makeActionCreator<'FETCH_RATINGS', Product, Product['varenavn']>('FETCH_RATINGS'),
	ratingsFetched: makeActionCreator<'RATINGS_FETCHED', WineMeta, Product['varenavn']>('RATINGS_FETCHED'),
	ratingsFetchFailed: makeActionCreator<'RATINGS_FETCH_FAILED', {}, Product['varenavn']>('RATINGS_FETCH_FAILED'),

	updateFilters: makeActionCreator<'UPDATE_FILTERS', Filters>('UPDATE_FILTERS')
}
