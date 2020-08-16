/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */

const { readFile } = require('fs-extra')
import path from 'path'
import { Pool } from 'pg'
import SQL from 'sql-template-strings'
import { Wine } from '../src/types'
import { getGrapes, getPairings } from '../../src/utils'
import { CATEGORIES_FULL as CAT_WHITELIST } from '../../../common/constants'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const basePath = path.join(__dirname, '../../static/')
const pool = new Pool({
	host: process.env.PG_host,
	database: process.env.PG_database,
	user: process.env.PG_user,
	password: process.env.PG_password,
	port: 5432,
	ssl: true
})

type Backup = {
	__collections__: {
		wines: Record<string, Wine & { firebaseTags: string[] }>
		config: {
			meta:  Record<string, string[]>
		}
	}
}

async function parse () {
	const file = await readFile(path.join(basePath, 'backup.json'))
	const data: Backup = JSON.parse(file.toString())
	const wines = data.__collections__.wines

	const client = await pool.connect()
	let ctr = 0
	const queries =  Object.values(wines).map(async wine => {
		try {
			await client.query(SQL`INSERT INTO wines (
				datotid,
				varenummer,
				varenavn,
				volum,
				pris,
				literpris,
				varetype,
				produktutvalg,
				butikkategori,
				fylde,
				friskhet,
				garvestoffer,
				bitterhet,
				sodme,
				farge,
				lukt,
				smak,
				passertil01,
				passertil02,
				passertil03,
				land,
				distrikt,
				underdistrikt,
				argang,
				rastoff,
				metode,
				alkohol,
				sukker,
				syre,
				lagringsgrad,
				produsent,
				grossist,
				distributor,
				emballasjetype,
				korktype,
				vareurl,
				okologisk,
				biodynamisk,
				fairtrade,
				miljosmart_emballasje,
				gluten_lav_pa,
				kosher,
				hovedgtin,
				score,
				ratings
			)
			VALUES (
				${wine.Datotid},
				${wine.Varenummer},
				${wine.Varenavn},
				${wine.Volum},
				${wine.Pris},
				${wine.Literpris},
				${wine.Varetype},
				${wine.Produktutvalg},
				${wine.Butikkategori},
				${wine.Fylde},
				${wine.Friskhet},
				${wine.Garvestoffer},
				${wine.Bitterhet},
				${wine.Sodme},
				${wine.Farge},
				${wine.Lukt},
				${wine.Smak},
				${wine.Passertil01},
				${wine.Passertil02},
				${wine.Passertil03},
				${wine.Land},
				${wine.Distrikt},
				${wine.Underdistrikt},
				${wine.Argang},
				${wine.Rastoff},
				${wine.Metode},
				${wine.Alkohol},
				${wine.Sukker},
				${wine.Syre},
				${wine.Lagringsgrad},
				${wine.Produsent},
				${wine.Grossist},
				${wine.Distributor},
				${wine.Emballasjetype},
				${wine.Korktype},
				${wine.Vareurl},
				${wine.Okologisk},
				${wine.Biodynamisk},
				${wine.Fairtrade},
				${wine.Miljosmart_emballasje},
				${wine.Gluten_lav_pa},
				${wine.Kosher},
				${wine.HovedGTIN},
				${wine.meta?.score || null},
				${wine.meta?.ratingsCount || 0}
			);`
			)
			ctr++
			console.log(ctr, wine.Varenavn, `${wine.meta?.score} (${wine.meta?.ratingsCount})`)
		} catch (e) {
			console.error(e)
			throw e
		}
	}
	)
	await Promise.all(queries).catch(e => {
		console.error(e)
		process.exit(1)
	})

	const grapes = new Set<string>()
	const pairings = new Set<string>()
	const wineTypes = new Set<string>()
	const districts = new Set<string>()
	Object.values(wines)
		.filter(wine => CAT_WHITELIST.includes(wine.Varetype))
		.forEach(wine => {
			getGrapes(wine.Rastoff).forEach(entry => grapes.add(entry))
			getPairings(wine).forEach(entry => pairings.add(entry))
			wineTypes.add(wine.Varetype)
			districts.add(wine.Distrikt)
		})
	/*
	Object.assign(meta, {
		grapes: Array.from(grapes),
		pairings: Array.from(pairings),
		wineTypes: Array.from(wineTypes),
		districts: Array.from(districts)
	})
	*/
}

parse()
