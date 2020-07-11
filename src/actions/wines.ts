import { Wine, Product } from 'types'
import { makeActionCreator } from 'utils'

export default {
	fetchRatings: makeActionCreator<'FETCH_RATINGS', string, Product['Varenavn']>('FETCH_RATINGS'),
	ratingsFetched: makeActionCreator<'RATINGS_FETCHED', Wine, Product['Varenavn']>('RATINGS_FETCHED'),
	ratingsFetchFailed: makeActionCreator<'RATINGS_FETCH_FAILED', Wine, Product['Varenavn']>('RATINGS_FETCH_FAILED')
}
