import { ArrayElement, Filters } from '../../common'

type QueryParams = {
	limit?: number
	direction?: string
}

export type ParsedQuery =  QueryParams & {
    [P in keyof Filters]: ArrayElement<NonNullable<Filters[P]>>
}
