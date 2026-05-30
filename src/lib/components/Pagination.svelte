<script lang="ts">
	interface Props {
		items: any[]
		itemsPerPage?: number
		currentPage?: number
	}

	let { items, itemsPerPage = 10, currentPage = $bindable(1) }: Props = $props()

	// Calculate pagination
	let totalPages = $derived(Math.ceil(items.length / itemsPerPage))
	let startIndex = $derived((currentPage - 1) * itemsPerPage)
	let endIndex = $derived(startIndex + itemsPerPage)
	let paginatedItems = $derived(items.slice(startIndex, endIndex))
	let hasNextPage = $derived(currentPage < totalPages)
	let hasPrevPage = $derived(currentPage > 1)

	function goToPage(page: number) {
		currentPage = page
		// Scroll to top when changing pages
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	export { paginatedItems }
</script>

{#if totalPages > 1}
	<nav class="pagination" aria-label="Blog pagination">
		<div class="pagination-controls">
			{#if hasPrevPage}
				<button
					onclick={() => goToPage(currentPage - 1)}
					class="pagination-btn prev"
					aria-label="Previous page"
				>
					← Previous
				</button>
			{/if}

			<!-- Page numbers -->
			<div class="page-numbers">
				{#each Array.from({ length: totalPages }, (_, i) => i + 1) as pageNum}
					{#if pageNum === currentPage}
						<span class="page-number current" aria-current="page">{pageNum}</span>
					{:else if Math.abs(pageNum - currentPage) <= 2 || pageNum === 1 || pageNum === totalPages}
						<button onclick={() => goToPage(pageNum)} class="page-number">{pageNum}</button>
					{:else if Math.abs(pageNum - currentPage) === 3}
						<span class="page-ellipsis">…</span>
					{/if}
				{/each}
			</div>

			{#if hasNextPage}
				<button
					onclick={() => goToPage(currentPage + 1)}
					class="pagination-btn next"
					aria-label="Next page"
				>
					Next →
				</button>
			{/if}
		</div>
	</nav>
{/if}

<style>
	.pagination {
		margin-top: var(--space-8);
		padding: var(--space-5);
		margin-inline: auto;

		.pagination-controls {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: var(--space-2);
			flex-wrap: wrap;
		}

		.pagination-btn {
			padding: var(--space-2) var(--space-4);
			background: transparent;
			border: 1px solid var(--border);
			border-radius: 0;
			box-shadow: none;
			color: var(--text-1);
			font-family: var(--font-mono);
			font-size: var(--text-sm);
			cursor: pointer;
			transition:
				border-color 0.2s ease,
				color 0.2s ease;

			&:hover {
				border-color: var(--brand);
				color: var(--brand);
				background: transparent;
				transform: none;
			}

			&.prev,
			&.next {
				font-weight: 500;
			}
		}

		.page-numbers {
			display: flex;
			align-items: center;
			gap: var(--space-1);
		}

		.page-number {
			padding: var(--space-2);
			min-width: var(--space-7);
			text-align: center;
			color: var(--text-2);
			border: 1px solid transparent;
			background: transparent;
			border-radius: 0;
			box-shadow: none;
			font-family: var(--font-mono);
			font-size: var(--text-sm);
			cursor: pointer;
			transition:
				border-color 0.2s ease,
				color 0.2s ease;

			&:hover {
				border-color: var(--border);
				color: var(--text-1);
				background: transparent;
			}

			&.current {
				border-color: var(--brand);
				color: var(--brand);
				background: transparent;
				font-weight: 600;
				cursor: default;
			}
		}

		.page-ellipsis {
			padding: var(--space-2);
			color: var(--text-2);
			font-family: var(--font-mono);
			font-size: var(--text-sm);
		}

		@media (max-width: 480px) {
			.pagination-controls {
				flex-direction: column;
				gap: var(--space-3);
			}

			.page-numbers {
				order: -1;
			}
		}
	}
</style>
