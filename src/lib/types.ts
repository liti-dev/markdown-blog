export type Categories = 
	| 'vscode'
	| 'green-software'
	| 'learning'
	| 'reading-code'
	| 'performance'
	| 'sustainability'
	| 'svelte'

export type Post = {
	title: string
	slug: string
	description: string
	date: string
	categories: Categories[]
	published: boolean
}
