type DateStyle = Intl.DateTimeFormatOptions['dateStyle']

export function formatDate(date: string, dateStyle: DateStyle = 'medium', locales = 'en') {
	// Safari is mad about dashes in the date
	const dateToFormat = new Date(date.replaceAll('-', '/'))
	const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle })
	return dateFormatter.format(dateToFormat)
}


export function getCategoryColor(category: string): string {
	const categoryColors: Record<string, string> = {
		// Sustainability 
		'sustainability': '#a7c957',      
		'green-software': '#386641',      
		  
		// Dev
		'vscode':'#ff8f94' ,                        
		'reading-code': '#f72585',
		'performance': '#ffb3c1',
		'security':'#ae0039',
		
		// Others
		'learning': '#8F00FF',
	}
	
	return categoryColors[category] || '#6b7280' // ⚫ 
}

// get text color based on background
export function getCategoryTextColor(category: string): string {
	const darkBackgrounds = ['#386641', '#bc4749', '#f72585', '#ae0039','#6a994e']
	const bgColor = getCategoryColor(category)
	
	return darkBackgrounds.includes(bgColor) ? '#ffffff' : '#000000'
}

export async function getBacklinks(targetSlug: string): Promise<Array<{ slug: string; title: string; description: string }>> {
	const backlinks: Array<{ slug: string; title: string; description: string }> = []
	
	// Use lazy loading instead of eager to avoid loading all files at once
	const rawModules = import.meta.glob('/src/posts/*.md', { query: '?raw', import: 'default' })
	const metadataModules = import.meta.glob('/src/posts/*.md')
	
	// Process files in smaller batches to avoid blocking
	const entries = Object.entries(rawModules)
	const batchSize = 5
	
	for (let i = 0; i < entries.length; i += batchSize) {
		const batch = entries.slice(i, i + batchSize)
		
		await Promise.all(batch.map(async ([path, loader]) => {
			const slug = path.split('/').pop()?.replace('.md', '')
			if (!slug || slug === targetSlug) return
			
			try {
				const [content, postModule] = await Promise.all([
					loader() as Promise<string>,
					metadataModules[path]() as Promise<{ metadata?: { title: string; description: string } }>
				])
				
				// Check if this post's content links to our target
				const linkPattern = new RegExp(`\\[([^\\]]+)\\]\\(\\/${targetSlug}\\)`, 'g')
				if (linkPattern.test(content) && postModule?.metadata) {
					backlinks.push({
						slug,
						title: postModule.metadata.title,
						description: postModule.metadata.description
					})
				}
			} catch (error) {
				// Skip files that fail to load
				console.warn(`Failed to process ${path}:`, error)
			}
		}))
	}
	
	return backlinks
}