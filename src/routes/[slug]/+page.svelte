<script lang="ts">
	import { formatDate } from '$lib/utils'
	import Backlinks from '$lib/components/Backlinks.svelte'
	import SEO from '$lib/components/SEO.svelte'

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

<article>
	<hgroup>
		<h1>{data.meta.title}</h1>
		<p>Published at {formatDate(data.meta.date)}</p>
	</hgroup>

	<div class="tags">
		{#each data.meta.categories as category, index}
			<a href={`/category/${category}`}
				><span class="tag-{(index % 4) + 1}">&num;{category}</span></a
			>
		{/each}
	</div>

	<div class="prose">
		<data.content />
	</div>

	<Backlinks currentSlug={data.meta.slug} />
</article>

<style>
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

			> * {
				padding: var(--size-2) 0;
				border-radius: var(--radius-round);
			}
		}
	}
</style>
