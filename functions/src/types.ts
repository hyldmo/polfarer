import { ArrayElement, Filters } from '../../common'

export type ParsedQuery =  { limit?: number } & {
    [P in keyof Filters]: ArrayElement<NonNullable<Filters[P]>>
}
