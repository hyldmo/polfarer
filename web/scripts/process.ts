/* eslint-disable @typescript-eslint/no-var-requires */

const { readFile, writeJSON } = require('fs-extra')
const path = require('path')
import { getPriceTag } from '../src/utils/wineUtils'
import { Wine } from '../src/types'
import { CAT_WHITELIST } from '../'

const basePath = path.join(__dirname, '../static/')

type Backup = {
	__collections__: {
		wines: Record<string, Wine & { firebaseTags: string[] }>
		config: {
			meta:  Record<string, string[]>
		}
	}
}

function getPairings (wine: Wine) {
	return Object.entries(wine)
		.filter(([key, value]) => key.toLowerCase().includes('passertil') && value)
		.map(entry => entry[1] as string)
}

function getGrapes (grapes: string) {
	return grapes
		.split(', ')
		.map(grape => grape
			.split(' ')
			.slice(0, -1)
			.join(' ')
		)
}

async function parse () {
	const file = await readFile(path.join(basePath, 'backup.json'))
	const data: Backup = JSON.parse(file.toString())
	const wines = data.__collections__.wines

	const meta = {}
	const newFile: Backup = { __collections__: { wines: {}, config: { meta } } }
	const records = newFile.__collections__.wines
	Object.values(wines)
		.filter(wine => CAT_WHITELIST.includes(wine.Varetype))
		.forEach(wine => {
			const key = wine.Varenavn.replace(/[$#[\]/.]/g, '')
			delete (wine as any).__collections__
			records[key] = {
				...wine,
				firebaseTags: [
					getPriceTag(wine.Pris),
					getPairings(wine),
					`${wine.Volum * 100} cl`,
					wine.Varetype,
					wine.Distrikt,
					getGrapes(wine.Rastoff)
				].flat()
			}
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
	Object.assign(meta, {
		grapes: Array.from(grapes),
		pairings: Array.from(pairings),
		wineTypes: Array.from(wineTypes),
		districts: Array.from(districts)
	})

	await writeJSON(path.join(basePath, 'backup-parsed.json'), newFile, { spaces: '\t' })
}

parse()
