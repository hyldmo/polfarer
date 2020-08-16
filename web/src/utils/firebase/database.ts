// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from './firebase'
import 'firebase/database'

import { Result, Wine } from 'common'

const _db = firebase.database()

const COLLECTION_KEY = 'products'

export async function set (id: string, data: {}): Promise<boolean> {
	try {
		await _db.ref(`${COLLECTION_KEY}/${id}`).set(data)
		console.log('Document written with ID: ', id)
		return true
	} catch (error) {
		console.error('Error adding document: ', error)
		return false
	}
}

export async function get (id: string) {
	try {
		const doc = await _db.ref(`${COLLECTION_KEY}/${id}`).once('value')
		return await doc.val()
	} catch (error) {
		return error
	}
}

export async function getAll (): Promise<Result<Wine[]>> {
	try {
		const result = await _db.ref(COLLECTION_KEY).once('value')
		const wines: Wine[] = Object.values(result.val())
		return { err: null, data: wines }
	} catch (err) {
		return { err, data: null }
	}
}

export function db () {
	return _db
}
