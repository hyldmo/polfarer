/* eslint-disable @typescript-eslint/camelcase */
import fs from 'fs-extra'
import path from 'path'
import mysql from 'mysql2/promise'
import SQL from 'sql-template-strings'
import {Meta, Wine, Winery } from '../wine'
import url from 'url'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const basePath = path.resolve(url.fileURLToPath(import.meta.url), '../../../static/')
const conn = mysql.createPool({
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT as any
})

type Backup = {
	entities: {
		wines: Record<string, Wine>
		winery: Record<string, Winery & Winery['statistics']>
		meta: Record<string, Meta>
	}
}

async function parse () {
	const file = await fs.readFile(path.join(basePath, 'normalized.json'))
	const data: Backup = JSON.parse(file.toString())
	const wines = data.entities.wines

	let ctr = 0
	const wineryQueries = Object.values(data.entities.winery).map(async (winery) =>
		conn.query(SQL`REPLACE INTO wineries (
			id,
			name,
			website,
			ratings_average,
			ratings_count,
			wines_count
		)
		VALUES (
			${winery.id},
			${winery.name},
			${winery.website},
			${winery.ratings_average},
			${winery.ratings_count},
			${winery.wines_count}
		)`)
	)
	await Promise.all(wineryQueries)
	console.log(`${wineryQueries.length} wineries added.`)

	const metaQueries = Object.values(data.entities.meta).map(async (meta) =>
		conn.query(SQL`REPLACE INTO wine_meta (
			id,
			winery,
			ratingsCount,
			score
		)
		VALUES (
			${meta.id},
			${meta.winery},
			${meta.ratingsCount},
			${meta.score}
		)`)
	)

	await Promise.all(metaQueries)
	console.log(`${metaQueries.length} vivino ratings added.`)

	for (const wine of Object.values(wines)) {
		const query = SQL`REPLACE INTO wines (
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
			id,
			meta
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
			${wine.meta}
		);`
		try {
			await conn.query(query)
			ctr++
			console.log(ctr, wine.Varenavn, `${wine.meta?.score} (${wine.meta?.ratingsCount})`)
		} catch (e) {
			console.error(e)
			throw e
		}
	}
}

parse()
