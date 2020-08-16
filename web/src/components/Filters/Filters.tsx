import React, { useRef } from 'react'
import { State } from 'reducers'
import { useDispatch, useSelector } from 'react-redux'
import { Actions } from 'actions'
import { CATEGORIES, FILTERS_ORDERBY, FILTERS_VOLUME } from 'utils'
import cn from 'classnames'

import './Filters.less'

function getFormData (e: React.FormEvent, form: React.RefObject<HTMLFormElement>) {
	e.preventDefault()
	e.stopPropagation()
	if (form.current) {
		const data = new FormData(form.current)
		// .keys() not present in typings
		const payload: Record<string, any> = {}
		for (const key of (data as any as Map<string, string>).keys()) {
			payload[key] = data.getAll(key)
		}
		console.log(payload)
		return payload
	} else {
		return {}
	}
}

type Props = {
	open: boolean
}

export const Filters: React.StatelessComponent<Props> = ({ open }) => {
	const dispatch = useDispatch()
	const filters = useSelector((s: State) => s.filters)
	const formEl = useRef<HTMLFormElement>(null)

	const buttonEl = useRef<HTMLButtonElement>(null)
	const handleChange = () => buttonEl.current?.click()

	return (
		<form className={cn('filters', { open })} ref={formEl} onSubmit={e => dispatch(Actions.updateFilters(getFormData(e, formEl)))} >
			<h2>Filtre</h2>
			<fieldset className="orderby">
				<h3>Sorter etter</h3>
				{FILTERS_ORDERBY.map(order => (
					<label key={order}>
						<input type="radio" name="orderBy" value={order} checked={filters.orderBy?.includes(order) || false} onChange={handleChange} />
						<span>{order}</span>
					</label>
				))}
			</fieldset>
			<fieldset className="limit">
				<h3>Pris</h3>
				<input type="number" name="price" min={0} placeholder="Fra" value={filters.price?.[0] || ''} onChange={handleChange}/>
				<span className="hyphen" />
				<input type="number" name="price" min={0} placeholder="Til" value={filters.price?.[1] || ''} onChange={handleChange}/>
			</fieldset>
			<fieldset className="categories">
				<h3>Vin</h3>
				{CATEGORIES.map(category => (
					<label key={category}>
						<input type="checkbox" name="categories" value={category} checked={filters.categories?.includes(category) || false} onChange={handleChange} />
						<span>{category}</span>
					</label>
				))}
			</fieldset>
			<fieldset className="volume">
				<h3>Volum</h3>
				{FILTERS_VOLUME.map(volume => (
					<label key={volume}>
						<input type="checkbox" name="volumes" value={volume} checked={filters.volumes?.includes(volume) || false} onChange={handleChange} />
						<span>{volume}</span>
					</label>
				))}
			</fieldset>
			<button type="submit" ref={buttonEl} hidden />
		</form>
	)
}
