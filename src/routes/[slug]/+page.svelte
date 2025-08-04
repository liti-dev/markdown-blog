<script lang="ts">
	import { formatDate } from '$lib/utils'
	import Backlinks from '$lib/components/Backlinks.svelte'
	import SEO from '$lib/components/SEO.svelte'
	import { getCategoryColor, getCategoryTextColor } from '$lib/utils'

	let { data } = $props()
	// console.log('meta', data)
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
			<a href={`/category/${category}`}>
				<span
					class="tag"
					style="background-color: {getCategoryColor(category)}; color: {getCategoryTextColor(
						category
					)}"
				>
					&num;{category}
				</span>
			</a>
		{/each}
	</div>

	<div class="prose">
		<data.content />
	</div>

	<Backlinks currentSlug={data.meta.slug} />
</article>

<style>
	.back-nav {
		max-inline-size: var(--size-content-3);
		margin-inline: auto;
		margin-bottom: var(--size-5);

		a {
			color: var(--text-2);
			text-decoration: none;
			font-size: var(--font-size-3);
			transition: color 0.2s ease;

			&:hover {
				color: var(--text-1);
			}
		}
	}

	article {
		max-inline-size: var(--size-content-3);
		margin-inline: auto;

		h1 {
			text-transform: capitalize;
			font-size: var(--font-size-fluid-3);
		}

		h1 + p {
			margin-top: var(--size-2);
			color: var(--text-2);
		}

		.tags {
			display: flex;
			gap: var(--size-3);
			margin-top: var(--size-7);
			flex-wrap: wrap;

			a {
				text-decoration: none;
			}

			.tag {
				padding: var(--size-1) var(--size-2);
				border-radius: var(--radius-2);
				font-size: var(--font-size-1);
				transition: opacity 0.2s ease;
			}

			.tag:hover {
				opacity: 0.8;
			}
		}
	}
</style>
