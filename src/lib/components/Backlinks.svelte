<script lang="ts">
	interface Props {
		backlinks: Array<{ slug: string; title: string; description: string }>
	}

	let { backlinks }: Props = $props()
</script>

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

<style>
	.backlinks {
		margin-top: var(--space-8);
		padding-top: var(--space-6);
	}

	.backlinks hr {
		border: none;
		border-top: 1px solid var(--border);
		margin-bottom: var(--space-5);
	}

	.backlinks h2 {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		margin-bottom: var(--space-4);
		color: var(--text-2);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.backlinks-list {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.backlink-item {
		padding: 0;
	}

	.backlink-title {
		color: var(--brand);
		text-decoration: none;
		border-bottom: 1px solid transparent;
		transition: border-color 0.2s ease;
	}

	.backlink-title:hover {
		border-bottom-color: currentColor;
	}

	.backlink-title::before {
		content: '← ';
		color: var(--text-2);
	}
</style>
