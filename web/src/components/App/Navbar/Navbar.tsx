import React from 'react'

import './navbar.less'

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const Navbar: React.StatelessComponent<Props> = (props) => (
	<>
		<header {...props}>
			<div className="nav">
				<h1>Polfarer</h1>
				<p>Vivino-ratings på Vinmonopolets vareutvalg</p>
			</div>
			<button className="filter-btn">Filtre</button>
		</header>
		<div className="nav__bg"></div>
	</>
)
export default Navbar
