import { Action, MetaAction } from 'actions'
import { Polvin } from 'types'
import data from '../../static/produkter.json'

const CAT_WHITELIST = ['Rødvin','Hvitvin','Perlende vin, rosé','Rosévin','Champagne, brut','Champagne, sec','Musserende vin, rosé','Champagne, rosé','Musserende vin','Perlende vin, rød','Porter & stout','Perlende vin, hvit','Klosterstil','Spesial','Saison farmhouse ale','Barley wine','Sterkvin','Fruktvin','Champagne']

const initialState = (data as Polvin[])
	.filter(({ Varetype }) => CAT_WHITELIST.includes(Varetype))
	.slice(0, 10)

function wine (state: Polvin, action: MetaAction): Polvin {
	if (action.meta != state.Varenavn)
		return state;
	switch (action.type) {
		case 'RATINGS_FETCHED':
			return {
				...state,
				meta: action.payload
			}
		default:
			return state
	}
}

export default function (state = initialState, action: Action): Polvin[] {
	switch (action.type) {
		case 'RATINGS_FETCHED':
			return state.map(w => wine(w, action))
		default:
			return state
	}
}
