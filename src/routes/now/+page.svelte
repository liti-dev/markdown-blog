<script lang="ts">
	import SEO from '$lib/components/SEO.svelte'

	let lastUpdated = 'May 2026'
</script>

<SEO title="Now - What I've been up to" description="What I'm focusing on in my life" />

<div class="layout-container">
	<main class="main-content">
		<header class="page-header">
			<h1>What I've been up to</h1>
			<p class="subtitle">Last updated: {lastUpdated}</p>
		</header>

		<div class="prose">
			<p class="intro">
				This is my "now" page - inspired by <a
					href="https://nownownow.com/about"
					target="_blank"
					rel="noopener">Derek Sivers</a
				>. It's a snapshot of what I'm focusing on at this point in my life.
			</p>

			<div class="focus-areas">
				<section class="focus-item">
					<h2>May 2026</h2>
					<ul>
						<li>
							Built a <a href="/esp32-oled-ai-pet">tamagotchi-style pet</a> with ESP32 and an OLED display
							that reacts to my AI agent's state. Physical computing feels like the right counterweight
							to all the abstraction.
						</li>
						<li>
							Gaining more knowledge of physical AI. The intersection of embedded systems, sensors,
							and intelligence. Not just software talking to software anymore.
						</li>
						<li>
							Promoted to Software Engineer. Owning a few projects now, which means more
							responsibility but also more room to shape things.
						</li>
						<li>
							The conflict between sustainability and growth hasn't resolved. I don't think it will.
							But I'm learning to hold both without pretending one wins.
						</li>
						<li>
							Analog is back. Hardware is back. People are tired of pure-screen experiences. I'm
							noticing this everywhere: in tech, in culture, in what I want to build.
						</li>
					</ul>
					<h2>October 2025</h2>
					<ul>
						<li>Tech talk about green sofware for Women Coding Community</li>
						<li>
							Playing with Threlte for a <a
								href="https://threlte-fullmoon.vercel.app/"
								rel="noopener">fullmoon project (models are from Sketchfab)</a
							>
						</li>
						<li>Exploring cool projects like Soil benchmark, Qualia, etc.</li>
					</ul>
					<h2>September 2025</h2>
					<ul>
						<li>Putting myself out there (tech talks, expanding network)</li>
						<li>
							Exploring <a href="https://data.gov.sg/" rel="noopener">open data portal</a> and wishing
							Vietnam could do something similar (actually they're in the process)
						</li>
						<li>
							Starting ReCeiptly - an receipt scanner app that reveals insights into shopping habits
							and tracks carbon footprint.
						</li>
						<li>
							<a href="https://github.com/namesakefyi/namesake" rel="noopener">Namesake</a> is an aesthetic
							and cool app that helps people in the U.S. navigate the legal name and gender marker change
							process
						</li>
						<li>Attended Green IO</li>
					</ul>
					<h2>August 2025</h2>
					<ul>
						<li>
							If July's theme is sustainability, August started off with <a
								href="https://medium.com/@averyhastings_98108/if-youre-reading-this-you-re-probably-a-cyborg-ca16848aa39"
								rel="noopener">cybernetic organism</a
							>
							. It talks about our close relationships with patterns of information over material experience
							(e.g. we check the weather report instead of going outside to feel the temperature). Then
							my friend sent me a post about
							<a
								href="https://www.linkedin.com/posts/shilpasaul_authenticity-analogueengagement-marketing-activity-7356575608509763584-w8Tt?utm_source=share&utm_medium=member_desktop&rcm=ACoAADBVtyoBSkuMadCueYDfZbQ7Odiw_vW9uBE"
								rel="noopener">analogue engagement</a
							>. Balancing between nature/material world and digital world is something I'm trying
							to do.
						</li>
						<li>
							I'm well aware of the importance of backend knowledge, but these days I've been
							learning more visual stuffs (e.g., data viz, Three.js).
						</li>
						<li>
							I started integrating AI into coding. One thing I'm confident is that I'm currently
							better at debugging than my AI buddy.
						</li>
					</ul>
					<h2>July 2025</h2>
					<ul>
						<li>
							Published my article on Branch and joined their virtual launch party (well, I should
							start celebrating whenever I launch something) - a circle moment on my greeen software
							journey.
						</li>
						<li>
							Published this digital garden. I haven't bought a proper domain for it yet, thinking
							if Tia or my real name Thuyet suits better.
						</li>
					</ul>
				</section>
			</div>
		</div>
	</main>
</div>

<style>
	.layout-container {
		max-inline-size: 60vw;
		margin-inline: auto;
	}

	.main-content {
		min-width: 0;
	}

	.page-header {
		margin-bottom: var(--space-7);
		text-align: center;

		h1 {
			font-family: 'Silkscreen', monospace;
			font-size: var(--text-2xl);
			margin-bottom: var(--space-3);
			color: var(--text-1);
		}

		.subtitle {
			color: var(--text-2);
			font-style: italic;
			margin: 0;
		}
	}

	.intro {
		border: 1px solid var(--border);
		padding: var(--space-5);
		margin-bottom: var(--space-7);
		border-left: 3px solid var(--brand);
	}

	.focus-areas {
		display: grid;
		gap: var(--space-7);
		margin-bottom: var(--space-7);
	}

	.focus-item {
		border: 1px solid var(--border);
		padding: var(--space-5);

		h2 {
			margin-top: var(--space-7);
			margin-bottom: var(--space-4);
			color: var(--text-1);
			font-family: var(--font-mono);
			font-size: var(--text-lg);

			&:first-child {
				margin-top: 0;
			}
		}

		ul {
			margin: 0;
			list-style-type: '– ';
			padding-left: var(--space-5);
		}

		li {
			margin-block: var(--space-2);
			padding-inline-start: var(--space-2);
			color: var(--text-1);
		}
	}
</style>
