import { SQLStatement } from 'sql-template-strings'

export function sqlToString (sql: SQLStatement) {
	const statement = sql.text.replace(/\s+/g, ' ')
	return sql.values.reduce((a, b, i) => a.replace(`$${i + 1}`, b), statement)
}
