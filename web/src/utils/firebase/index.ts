import './firebase' // Firebase App (the core Firebase SDK) is always required and must be listed first

import * as database from './database'
import * as firestore from './firestore'

import 'firebase/analytics'

export {
	database,
	firestore
}
