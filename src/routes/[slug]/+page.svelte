<script lang="ts">
	import { formatDate } from '$lib/utils'
	import Backlinks from '$lib/components/Backlinks.svelte'
	import SEO from '$lib/components/SEO.svelte'
	import Tag from '$lib/components/Tag.svelte'

	let { data } = $props()
</script>

<SEO
	title={data.meta.title}
	description={data.meta.description}
	type="article"
	slug={data.meta.slug}
	publishedTime={data.meta.date}
	tags={data.meta.categories}
/>

<nav class="back-nav">
	<a href="/">← 🌳 Back to garden </a>
</nav>

<article>
	<hgroup>
		<h1>{data.meta.status === 'tree' ? '' : '(Draft)'} {data.meta.title}</h1>
		<p>Published at {formatDate(data.meta.date)}</p>
	</hgroup>

	<div class="tags">
		{#each data.meta.categories as category}
			<Tag {category} href={`/category/${category}`} />
		{/each}
	</div>

	<div class="prose">
		<data.content />
	</div>

	<Backlinks backlinks={data.backlinks} />
</article>

<style>
	.back-nav {
		max-inline-size: 60vw;
		margin-inline: auto;
		margin-bottom: var(--space-5);

		a {
			color: var(--text-2);
			text-decoration: none;
			font-family: var(--font-mono);
			font-size: var(--text-sm);
			transition: color 0.2s ease;
			border-bottom: none;

			&:hover {
				color: var(--text-1);
			}
		}
	}

	article {
		max-inline-size: 60vw;
		margin-inline: auto;

		h1 {
			text-transform: capitalize;
			font-size: var(--text-2xl);
			font-weight: var(--weight-bold);
			line-height: var(--leading-tight);
			max-inline-size: none;
		}

		h1 + p {
			margin-top: var(--space-2);
			color: var(--text-2);
			font-family: var(--font-mono);
			font-size: var(--text-sm);
		}

		.tags {
			display: flex;
			gap: var(--space-3);
			margin-top: var(--space-5);
			flex-wrap: wrap;
		}
	}
</style>
