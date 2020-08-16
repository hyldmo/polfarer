import React, { useState } from 'react'
import { WineList } from 'components/Wine'
import { Filters } from 'components/Filters'
import Navbar from 'components/App/Navbar'

import './Home.less'

const Home: React.StatelessComponent = () => {
	const [open, setOpen] = useState(false)
	return (
		<>
			<Navbar onClick={e => (e.target as HTMLElement).classList?.contains('filter-btn') && setOpen(!open)} />
			<Filters open={open} />
			<main className="home">
				<WineList />
			</main>
		</>
	)
}

export default Home
