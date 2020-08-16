import { ArrayElement, Product, Score, Vintage, VivinoWine, Wine, WineMeta } from 'common'

export function getScore (baseStats: VivinoWine['statistics'], vintage?: Vintage): Score {
	if (vintage && vintage.statistics && vintage.statistics.status !== 'BelowThreshold') {
		return {
			score: vintage.statistics?.ratings_average,
			ratingsCount: vintage.statistics?.ratings_count || 0
		}
	} else if (baseStats.status !== 'BelowThreshold'){
		return  {
			score: baseStats.ratings_average || baseStats.unified_average_ratings || 0,
			ratingsCount: baseStats.ratings_count || 0
		}
	} else {
		return {
			score: null,
			ratingsCount: 0
		}
	}
}

export function mapMeta (wine: Product, result: VivinoWine): WineMeta {
	const vintage = getVintage(wine.argang, result)
	const score = getScore(result.statistics, vintage)
	delete result.vintages
	delete result._highlightResult
	delete result.statistics
	delete vintage.statistics
	return {
		...result,
		vintage,
		...score,
		fresh: true
	}
}

export function getVintage (year: Wine['argang'], wine: VivinoWine): Vintage {
	const result = wine.vintages.find(vintage => vintage.year == (year || 'U.V.'))
	return  result || wine.vintages[0]
}

export const PRICE_TAGS = ['<100', '100-150', '150-250', '>=250']

export function getPriceTag (price: number): ArrayElement<typeof PRICE_TAGS> {
	if (price < 100)
		return '<100'
	else if (price <= 150)
		return '100-149'
	else if (price <= 250)
		return '150-249'
	else
		return '>=250'
}
