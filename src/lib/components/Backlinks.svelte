<script lang="ts">
	import { getBacklinks } from '$lib/utils'

	interface Props {
		currentSlug: string
	}

	let { currentSlug }: Props = $props()

	// Use a derived promise that reacts to currentSlug changes
	let backlinksPromise = $derived(getBacklinks(currentSlug))
</script>

{#await backlinksPromise}
	<div class="backlinks-loading">
		<p>Loading related posts...</p>
	</div>
{:then backlinks}
	{#if backlinks.length > 0}
		<section class="backlinks">
			<hr />
			<h2>Referenced by</h2>
			<ul class="backlinks-list">
				{#each backlinks as backlink}
					<li class="backlink-item">
						<a href="/{backlink.slug}" class="backlink-title">
							{backlink.title}
						</a>
					</li>
				{/each}
			</ul>
		</section>
	{/if}
{:catch error}
	<div class="backlinks-error">
		<p>Failed to load related posts</p>
	</div>
{/await}

<style>
	.backlinks {
		margin-top: var(--size-8);
		padding-top: var(--size-6);
	}

	.backlinks hr {
		border: none;
		border-top: 1px solid var(--border);
		margin-bottom: var(--size-6);
	}

	.backlinks h2 {
		font-size: var(--font-size-3);
		margin-bottom: var(--size-3);
		color: var(--text-1);
	}

	.backlinks-list {
		list-style: none;
		padding: 0;
		display: grid;
		gap: var(--size-4);
	}

	.backlink-item {
		padding: var(--size-3);
		background: var(--surface-2);
		border-radius: var(--radius-2);
		border: 1px solid var(--border);
		transition: background-color 0.2s ease;
	}

	.backlink-item:hover {
		background: var(--surface-3);
	}

	.backlink-title {
		font-weight: 600;
		color: var(--text-1);
		text-decoration: none;
		display: block;
		margin-bottom: var(--size-2);
	}

	.backlink-title:hover {
		color: var(--brand);
	}

	.backlinks-loading {
		margin-top: var(--size-6);
		color: var(--text-2);
		font-style: italic;
	}

	.backlinks-error {
		margin-top: var(--size-6);
		color: var(--text-2);
		font-style: italic;
	}
</style>
