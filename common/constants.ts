import { VolumeConstraint } from '../common'

export const __DEV__ = process.env.NODE_ENV != 'production'

export const FUNCTIONS_REGION = 'europe-west1'
export const FB_PROJECT_ID = process.env.FIREBASE_projectId

export const API_URL = __DEV__
	? `http://localhost:5001/${FB_PROJECT_ID}/${FUNCTIONS_REGION}`
	: `https://${FUNCTIONS_REGION}-${FB_PROJECT_ID}.cloudfunctions.net`

export const CATEGORIES_FULL = [
	'Rødvin','Hvitvin','Perlende vin, rosé','Rosévin','Champagne, brut',
	'Champagne, sec','Musserende vin, rosé','Champagne, rosé','Musserende vin',
	'Perlende vin, rød','Perlende vin, hvit','Sterkvin','Fruktvin','Champagne'
]
export const CATEGORIES = [
	'Rødvin','Hvitvin', 'Rosé', 'Champagne', 'Musserende vin', 'Perlende vin', 'Fruktvin'
]

export const FILTERS_ORDERBY = ['Pris', 'Score']
export const FILTERS_VOLUME = [
	VolumeConstraint.BELOW_75,
	VolumeConstraint.CL_75,
	VolumeConstraint.CL_100,
	VolumeConstraint.ABOVE_100
]

export const FIREBASE_CONFIG = {
	apiKey: process.env.FIREBASE_apiKey,
	authDomain: process.env.FIREBASE_authDomain,
	databaseURL: process.env.FIREBASE_databaseURL,
	projectId: process.env.FIREBASE_projectId,
	storageBucket: process.env.FIREBASE_storageBucket,
	messagingSenderId: process.env.FIREBASE_messagingSenderId,
	appId: process.env.FIREBASE_appId,
	measurementId: process.env.FIREBASE_measurementId
}
