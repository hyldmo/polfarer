import { CATEGORIES_FULL, VolumeConstraint } from '../../common'

function getVolume (vol: string) {
	switch (vol) {
	case 'Under 75 cl':
		return 0
	case '75 cl':
		return 0.75
	case '100 cl':
		return 1
	case 'Over 100 cl':
		return 99999999
	default:
		return parseInt(vol, 10) / 100
	}
}

export function getVolumes (vol: string[]) {

	if (vol.length == 1 && vol.includes(VolumeConstraint.BELOW_75))
		return { min: 0, max: 0.74999 }
	if (vol.length == 1 && vol.includes(VolumeConstraint.ABOVE_100))
		return { min: 1.0001, max: 999999 }

	const volumes = vol.map(getVolume)
	return {
		min: volumes[0] || 0,
		max: volumes[volumes.length - 1] || volumes[0] || 999999
	}
}

export function getCategories (category: string) {
	return CATEGORIES_FULL.filter(cat => cat.includes(category))
}
