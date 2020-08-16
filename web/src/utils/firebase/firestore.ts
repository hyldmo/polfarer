import firebase from './firebase'
import 'firebase/firestore'
import { Result } from 'common'
import { wineSlug } from 'utils/validate'

const db = firebase.firestore()

firebase.firestore().enablePersistence().catch(console.warn)

const COLLECTION_KEY = 'wines'

export async function set (id: string, data: {}, options: firebase.firestore.SetOptions = {}): Promise<boolean> {
	try {
		await db.collection(COLLECTION_KEY).doc(wineSlug(id)).set(data, options)
		console.log('Document written with ID: ', id)
		return true
	} catch (error) {
		console.error('Error adding document: ', error)
		return false
	}
}

export async function get<T extends firebase.firestore.DocumentData = firebase.firestore.DocumentData> (id: string): Promise<T | null> {
	try {
		const doc = await db.collection(COLLECTION_KEY).doc(wineSlug(id)).get()
		return await doc.data() as T
	} catch (error) {
		return error
	}
}

export async function query<T extends firebase.firestore.DocumentData = firebase.firestore.DocumentData> (
	predicate: (coll: firebase.firestore.CollectionReference<T>) => firebase.firestore.Query<T>
): Promise<Result<T[]>> {
	try {
		const result = await predicate(db.collection(COLLECTION_KEY) as firebase.firestore.CollectionReference<T>).get()
		const data = await result.docs.map(doc => doc.data())
		return { err: null, data }
	} catch (err) {
		console.error(err)
		return { err, data: null }
	}
}

export async function getAll () {
	try {
		const result = await db.collection(COLLECTION_KEY).get()
		return await result.docs.map(doc => doc.data())
	} catch (error) {
		return error
	}
}

export function collection () {
	return db.collection(COLLECTION_KEY)
}
