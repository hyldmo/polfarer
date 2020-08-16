import * as functions from 'firebase-functions'
import { CATEGORIES_FULL, FUNCTIONS_REGION } from '../../common'
import { Client } from 'pg'
import SQL from 'sql-template-strings'
import { getCategories, getVolumes } from './filterUtils'
import { ParsedQuery } from './types'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const config = (key: string) => process.env.NODE_ENV == 'production'
	? functions.config().polfarer[key]
	: process.env[key]

export const wines = functions.region(FUNCTIONS_REGION).https.onRequest(async (req, res) => {
	res.set('Access-Control-Allow-Origin', '*')
	const client = new Client({
		host: config('pg_host'),
		database: config('pg_database'),
		user: config('pg_user'),
		password: config('pg_password'),
		port: 5432,
		ssl: true
	})

	try {
		await client.connect()

		const query = req.query as ParsedQuery

		const volumes = getVolumes((query.volumes || '').split(','))

		const price = (query.price || ',').split(',')
		const priceMin = parseInt(price[0], 10) || 0
		const priceMax = parseInt(price[1], 10) || 99999999

		const queryCategories = query.categories?.split(',')
			.map(getCategories)
			.reduce((acc, val) => acc.concat(val), [])
		const categories = (queryCategories || CATEGORIES_FULL).join('|')

		console.info(req.url, volumes, `${priceMin} - ${priceMax}kr`, categories)

		const sql = SQL`
			SELECT * FROM wines
			WHERE volum
				BETWEEN ${volumes.min}
				AND ${volumes.max}
			AND pris
				BETWEEN ${priceMin}
				AND ${priceMax}
			AND varetype = ANY(string_to_array(${categories}, '|'))
			AND score IS NOT NULL
			ORDER BY score DESC
			LIMIT(${query.limit || 99})
		`

		const result = await client.query(sql)
		res.json({
			count: result.rowCount,
			data: result.rows
		})
	} catch (e) {
		console.error(e)
		res.status(500).json({
			error: e
		})
	} finally {
		client.end()
	}
})
