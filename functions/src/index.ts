import * as functions from 'firebase-functions'
import { CATEGORIES_FULL, FUNCTIONS_REGION, Wine } from '../../common'
import { Connection, createConnection } from 'mysql2/promise'
import SQL from 'sql-template-strings'
import { getCategories, getVolumes } from './filterUtils'
import { ParsedQuery } from './types'
import { sqlToString } from './utils'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const config = (key: string) => process.env.NODE_ENV == 'production'
	? functions.config().polfarer[key]
	: process.env[key]

export const wines = functions.region(FUNCTIONS_REGION).https.onRequest(async (req, res) => {
	res.set('Access-Control-Allow-Origin', '*')

	let conn: Connection | null = null
	try {
		conn = await createConnection({
			host: config('db_host'),
			database: config('db_database'),
			user: config('db_user'),
			password: config('db_password'),
			port: 3306
		})

		const query = req.query as ParsedQuery

		const volumes = getVolumes((query.volumes || '').split(','))

		const price = (query.price || ',').split(',')
		const priceMin = parseInt(price[0], 10) || 0
		const priceMax = parseInt(price[1], 10) || 99999999

		const queryCategories = query.categories?.split(',')
			.map(getCategories)
			.reduce((acc, val) => acc.concat(val), [])
		const categories = (queryCategories || CATEGORIES_FULL).join('|')

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
				ORDER BY
		`
		if (query.orderBy?.toLowerCase().match(/[a-z]+/)) {
			sql.append(query.orderBy.toLocaleLowerCase())
			sql.append(query.direction?.toUpperCase() == 'ASC'  ? ' ASC' : ' DESC')
		}
		else {
			sql.append(SQL`score DESC`)
		}
		sql.append(SQL` LIMIT(${Math.min(query.limit || 50, 50)})`)

		console.info(sqlToString(sql))

		const [results, fields] = await conn.query(sql)
		res.json({
			data: results,
			meta: fields
		})
	} catch (e) {
		console.error(e)
		res.status(500).json({
			error: e
		})
	} finally {
		conn?.end()
	}
})
