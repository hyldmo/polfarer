import React, { useState } from 'react'
import * as wineResponse from '../../../static/result.json'
import { ArrayElement, Product } from 'types'
import data from '../../../static/produkter.json'
const CAT_WHITELIST = ['Rødvin','Hvitvin','Perlende vin, rosé','Rosévin','Champagne, brut','Champagne, sec','Musserende vin, rosé','Champagne, rosé','Musserende vin','Perlende vin, rød','Porter & stout','Perlende vin, hvit','Klosterstil','Spesial','Saison farmhouse ale','Barley wine','Sterkvin','Fruktvin','Champagne']

type Wines = typeof wineResponse['hits']
type Wine = ArrayElement<Wines>
type Vintage = ArrayElement<Wine['vintages']>
type Polvin = Product & { meta?: Wine }

const products = (data as Polvin[])
	.filter(({ Varetype }) => CAT_WHITELIST.includes(Varetype))
	.slice(0, 10)

const headers = new Headers({
	'x-algolia-application-id': '9TAKGWJUXL',
	'x-algolia-api-key': '60c11b2f1068885161d95ca068d3a6ae'
})

async function search (query: string) {
	const params = {params:`query=${query}&hitsPerPage=6`}
	return fetch('https://9takgwjuxl-dsn.algolia.net/1/indexes/WINES_prod/query', {
		method: 'POST',
		headers,
		body: JSON.stringify(params)
	})
}

function calculateRatings (vintages: Vintage[]) {
	const stats = vintages
		.map(vintage => vintage.statistics)
		.reduce(
			(a, b) => ({
				count: a.count + b.ratings_count,
				score: a.score + b.ratings_average *  b.ratings_count
			}),
			{ count: 0, score: 0 }
		)
	return {
		count: stats.count,
		score: Math.round((stats.score / stats.count) * 10) / 10
	}
}

const Home: React.StatelessComponent = () => {
	const [wines, setWines] = useState<Wine[]>([])

	const setWine = (query: string, hit: Wine) => {
		setWines(products.map(wine => wine.Varenavn == query
			? { ...wine, meta: hit }
			: wine
		))
	}

	const getWines = async (query: string) => {
		const response = await search(query)
		if (response.ok) {
			const result = await response.json() as typeof wineResponse
			setWine(query, result.hits[0])
		}
	}

	return (
		<div>
			<h1>Kategorier</h1>
			<input type="text" onChange={e => getWines(e.target.value)}/>
			<ul>
				{wines.map(wine => (
					<li key={wine.id}>
						<img src={wine.image.variations.bottle_small} height="50"/>
						<span>{wine.name}</span>
						<em> ({calculateRatings(wine.vintages).score} stars</em>
						<span> - </span>
						<em>{calculateRatings(wine.vintages).count} Reviews)</em>
					</li>
				))}
				{products
					.filter(({ Varetype }) => CAT_WHITELIST.includes(Varetype))
					.slice(0, 10)
					.map(product => (
						<li key={product.Varenavn}>
							<span>{product.Varenavn}</span>
							<span> — </span>
							<em>{product.Varetype}</em>
							<span> - </span>
							<em>({0} Reviews)</em>
						</li>
					))
				}
			</ul>
		</div>
	)
}

export default Home
