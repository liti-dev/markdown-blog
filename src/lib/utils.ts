type DateStyle = Intl.DateTimeFormatOptions['dateStyle']

export function formatDate(date: string, dateStyle: DateStyle = 'medium', locales = 'en') {
	// Safari is mad about dashes in the date
	const dateToFormat = new Date(date.replaceAll('-', '/'))
	const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle })
	return dateFormatter.format(dateToFormat)
}

// RFC 2822 date formatting utility for RSS feeds
export function formatRFC2822Date(date: string | Date): string {
	const dateObj = typeof date === 'string' ? new Date(date.replaceAll('-', '/')) : date
	return dateObj.toUTCString()
}

// XML escaping utility for safe RSS content generation
export function escapeXML(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
}
