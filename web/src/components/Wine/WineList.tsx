import React from 'react'
import { State } from 'reducers'
import { useSelector } from 'react-redux'
import { WineCard } from './WineCard'

import './WineList.less'

export const WineList: React.StatelessComponent = () => {
	const wines = useSelector((s: State) => s.wines)

	return (
		<ul className="product-list row-max-3">
			{wines.map(wine => <WineCard key={wine.id} wine={wine} />)}
		</ul>
	)
}
