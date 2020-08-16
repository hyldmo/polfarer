export type Filters = {
	orderBy?: string[]
	price?: string[]
	volumes?: VolumeConstraint[]
	categories?: string[]
}

export enum VolumeConstraint {
	BELOW_75 = 'Under 75 cl',
	CL_75 = '75 cl',
	CL_100 = '100 cl',
	ABOVE_100 = 'Over 100 cl'
}
