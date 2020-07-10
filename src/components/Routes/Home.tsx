import React, { useState } from 'react'
import { ArrayElement, Product, Vintage } from 'types'
import data from '../../../static/produkter.json'


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

	setWines()

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
