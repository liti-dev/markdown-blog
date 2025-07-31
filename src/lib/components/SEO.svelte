<script lang="ts">
	import { url, title as siteTitle, author } from '$lib/config'

	interface Props {
		title: string
		description: string
		type?: 'website' | 'article'
		slug?: string
		publishedTime?: string
		tags?: string[]
		image?: string
	}

	let {
		title,
		description,
		type = 'website',
		slug = '',
		publishedTime,
		tags = [],
		image
	}: Props = $props()

	const fullUrl = slug ? `${url}/${slug}` : url
	const fullTitle = slug ? title : `${title} | ${siteTitle}`
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={fullUrl} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={type} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={fullUrl} />
	<meta property="og:site_name" content={siteTitle} />
	{#if image}
		<meta property="og:image" content={image} />
	{/if}
	{#if type === 'article' && publishedTime}
		<meta property="article:published_time" content={publishedTime} />
		<meta property="article:author" content={author} />
		{#each tags as tag}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}

	<!-- Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	{#if image}
		<meta name="twitter:image" content={image} />
	{/if}

	<!-- Structured Data -->
	{#if type === 'article'}
		{@html `<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "BlogPosting",
			"headline": "${title}",
			"description": "${description}",
			"author": {
				"@type": "Person",
				"name": "${author}"
			},
			"datePublished": "${publishedTime}",
			"dateModified": "${publishedTime}",
			"url": "${fullUrl}",
			"mainEntityOfPage": {
				"@type": "WebPage",
				"@id": "${fullUrl}"
			},
			"publisher": {
				"@type": "Person",
				"name": "${author}"
			},
			"keywords": "${tags.join(', ')}"
		}
		</script>`}
	{:else}
		{@html `<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Blog",
			"name": "${siteTitle}",
			"description": "${description}",
			"url": "${fullUrl}",
			"author": {
				"@type": "Person",
				"name": "${author}"
			},
			"publisher": {
				"@type": "Person",
				"name": "${author}"
			}
		}
		</script>`}
	{/if}
</svelte:head>
