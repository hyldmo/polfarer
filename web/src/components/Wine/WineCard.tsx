import React from 'react'
import { Wine } from 'common'
import './WineCard.less'

type Props = {
	wine: Wine
}

export const WineCard: React.StatelessComponent<Props> = (props) => {
	const { varenavn, argang, vareurl, land, distrikt, varetype, volum, literpris, pris, varenummer, score, ratings, meta, ...rest } = props.wine
	return (
		<li className="product-item">
			<div className="product-item__image-container">
				<div className="product-item__image">
					<img src={meta?.image.variations.bottle_small || `https://bilder.vinmonopolet.no/cache/300x300-0/${varenummer}-1.jpg`} />
				</div>
			</div>
			<div className="product-item__info-container" aria-hidden="true">
				<div className="product__category-name">{varetype}</div>
				{meta?.winery?.website ? (
					<>
						<a className="product__name" href={meta.winery.website} target="_blank" rel="noopener noreferrer">{meta?.winery.name}</a><br/>
						<a className="product__name" href={vareurl} target="_blank" rel="noopener noreferrer">{(meta?.name && `${meta?.name} ${argang}`) || varenavn}</a>
					</>
				) : (
					<a className="product__name" target="_blank" rel="noopener noreferrer" href={vareurl}>{varenavn}</a>
				)}
				<div className="product__district">{land} - {distrikt}</div>
			</div>
			<a className="product-tools" href={meta ? `https://www.vivino.com/${meta.seo_name}/w/${meta.id}?year=${argang}` : undefined} target="_blank" rel="noopener noreferrer">
				<div className="product-tool product__mylist js-mylist">
					{ratings > 0 ? score : 'Ingen reviews'} &#11088;
				</div>
			</a>
			<div className="product-item__bottom-container">
				<div className="product-item__price-panel" aria-hidden="true">
					<span className="product__price">{pris.toFixed(2)},-</span>
					<span className="product__volume-and-cost_per_unit">
						<span className="product__amount">{rest.alkohol}% alk.</span>
						<span className="product__amount">{volum * 100} cL</span>
						<span className="product__cost_per_unit">Kr. {Math.ceil(literpris)} pr. liter</span>
					</span>
				</div>
			</div>
		</li>
	)
}
