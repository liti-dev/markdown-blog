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
		<li>
			<a href="/contact">Contact</a>
		</li>
	</ul>

	<Toggle />
</nav>

<style>
	nav {
		padding-block: var(--size-7);

		@media (min-width: 768px) {
			display: flex;
			justify-content: space-between;
		}

		.links {
			margin-block: var(--size-7);

			@media (min-width: 768px) {
				display: flex;
				gap: var(--size-7);
				margin-block: 0;
			}
		}

		a {
			color: inherit;
			font-size: var(--size-5);
			/* text-decoration: none; */
			text-decoration: underline dashed var(--green-5) 3px;
			text-underline-offset: 5px;
			&:hover {
				color: var(--green-7);
			}
		}
	}
</style>
