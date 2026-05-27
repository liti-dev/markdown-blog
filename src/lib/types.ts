export type Categories = 
	| 'vscode'
	| 'green-software'
	| 'learning'
	| 'reading-code'
	| 'performance'
	| 'sustainability'
	| 'svelte'
	| 'security'
	| 'software'
	| 'career'
	| 'robotics'
	| 'local-first'

export type Post = {
	title: string
	slug: string
	description: string
	date: string
	categories: Categories[]
	published: boolean
	status: string
}
