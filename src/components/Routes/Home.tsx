import React from 'react'
import { State } from 'types'
import { useSelector, useDispatch } from 'react-redux'
import { calculateRatings } from 'sagas/wines'
import { Actions } from 'actions'


const Home: React.StatelessComponent = () => {
	const wines = useSelector((s: State) => s.wines)
	const dispatch = useDispatch()

	return (
		<div>
			<h1>Kategorier</h1>
			<input type="text" />
			<ul>
				{wines.map(({ Varenavn, Argang, meta }) => {
					if (meta === undefined)
						dispatch(Actions.fetchRatings(Varenavn, Varenavn))

					return (
						<li key={Varenavn}>
							<img src={meta?.image.variations.bottle_small} height="50"/>
							<span>{Varenavn}</span>
							{meta && (
								<>
									<em>{calculateRatings(meta.vintages).score} stars</em>
									<span> - </span>
									<em>{calculateRatings(meta.vintages).count} Reviews)</em>
								</>
							)}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default Home
