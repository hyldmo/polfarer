import { TrackerState } from 'reducers/tracker'
import { Wine, Product } from 'types'
import { makeActionCreator } from 'utils'

export default {
	fetchRatings: makeActionCreator<'FETCH_RATINGS', Product['Varenavn']>('FETCH_RATINGS'),
	ratingsFetched: makeActionCreator<'RATINGS_FETCHED', Wine, Product['Varenavn']>('RATINGS_FETCHED')
}
