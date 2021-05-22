import normalizr from 'normalizr'
import path from 'path'
import fs from 'fs-extra'
import url from 'url'
import { Wine } from './wine'

const basePath = path.resolve(url.fileURLToPath(import.meta.url), '../../static/')

const winery = new normalizr.schema.Entity('winery')
const region = new normalizr.schema.Entity('region')

const meta = new normalizr.schema.Entity('meta', { winery, region })

const wine = new normalizr.schema.Entity(
	'wines',
	{ meta },
	{ idAttribute: 'HovedGTIN' }
)

async function run () {
	const ogData = await fs.readJSON(path.join(basePath, 'backup-parsed.json'))
	const sourceData = {
		wines: Object.entries<Wine>(ogData.__collections__.wines).map(([, entry]) => ({
			...entry,
			meta: entry.meta ? {
				...entry.meta,
				winery: entry.meta.winery ? {
					...entry.meta.winery,
					statistics: undefined,
					...entry.meta.winery.statistics
				} : entry.meta.winery
			} : entry.meta
		}))
	}
	console.log(`Parsing ${sourceData.wines.length} wines`)

	const normalizedData = normalizr.normalize(sourceData, { wines: [wine] })
	await fs.writeJSON(path.join(basePath, 'normalized.json'), normalizedData, { spaces: '\t' })
	console.log('---------- DONE -------------')
}

run()
