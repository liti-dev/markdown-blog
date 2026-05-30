<script lang="ts">
	import * as config from '$lib/config'
</script>

<footer>
	<div class="footer-content">
		<div class="contact">
			<a href="mailto:tia.nkm03@gmail.com">tia.nkm03@gmail.com</a>
			<a href="https://github.com/liti-dev" target="_blank">GitHub</a>
			<a href="https://www.linkedin.com/in/thuyet-ng-03/" target="_blank">LinkedIn</a>
			<a href="https://bsky.app/profile/tia-nguyen.bsky.social" target="_blank">Bluesky</a>
		</div>
		<p>{config.title} &copy {new Date().getFullYear()}</p>
	</div>
</footer>

<style>
	footer {
		padding-block: var(--space-6);
		border-top: 1px solid var(--border);
	}

	.footer-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		align-items: center;
		text-align: center;
	}

	.footer-content p {
		color: var(--text-2);
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.contact {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-4);
		align-items: center;
		justify-content: center;
	}

	.contact a {
		color: var(--text-2);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		text-decoration: none;
		border-bottom: none;
	}

	.contact a:hover {
		color: var(--brand);
	}
</style>
