
import _firebase from 'firebase/app'
import { FIREBASE_CONFIG } from '../../../../common/constants'

if (_firebase.apps.length < 1) {
	_firebase.initializeApp(FIREBASE_CONFIG)
}

export default _firebase
