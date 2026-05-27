<script lang="ts">
	import * as config from '$lib/config'
	import Toggle from '$lib/components/Toggle.svelte'
</script>

<nav>
	<a href="/" class="title">
		<b>{config.title}</b>
	</a>

	<ul class="links">
		<li>
			<a href="/about">About</a>
		</li>
		<li>
			<a href="/now">Now</a>
		</li>
		<li>
			<a href="https://tia-nguyen-portfolio.vercel.app/" target="_blank">Portfolio</a>
		</li>
	</ul>

	<Toggle />
</nav>

<style>
	nav {
		padding-block: var(--space-6);
		border-bottom: 1px solid var(--border);

		@media (min-width: 768px) {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.links {
			margin-block: var(--space-4);

			@media (min-width: 768px) {
				display: flex;
				gap: var(--space-6);
				margin-block: 0;
			}
		}

		a {
			color: var(--text-2);
			font-family: var(--font-mono);
			font-size: var(--text-sm);
			text-transform: uppercase;
			letter-spacing: 0.05em;
			text-decoration: none;
			border-bottom: none;
			transition: color 0.2s ease;

			&:hover {
				color: var(--brand);
			}
		}

		.title {
			color: var(--text-1);
			font-size: var(--text-base);
		}
	}
</style>
