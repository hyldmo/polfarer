
// No typings for joi-browser so have to use @types/joi's
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const Joi: joi = require('joi-browser')
import { AnySchema, Root as joi } from 'joi'
import { Activity } from 'common'

type Schema<T> = {
	[K in keyof T]: AnySchema
}

export function wineSlug (key: string) {
	return key.replace(/[$#[\]/.]/g, '')
}

export const activitySchema: Schema<Omit<Activity, 'startDate'>> = {
	name: Joi.string().required(),
	max: Joi.number().required(),
	intervalsPerSession: Joi.number().required(),
	sessionsPerWeek: Joi.number().required()
}
