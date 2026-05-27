<svelte:head>
	<title>About</title>
	<meta name="description" content="About me" />
</svelte:head>

<div class="text-column">
	<p>
		Welcome to my digital garden! This is where I share thoughts about life, learning, and tech. 🌻
	</p>

	<p>
		I'm Thuyet (Tia) Nguyen, a teacher-turned-fullstack engineer with a passion for animal welfare
		and sustainability.
	</p>

	<p>
		I'm on the journey of making green software accessible, helping people and the planet at scale.
		I've worked for purpose-driven companies such as DiverseTalent.ai, Article1, Diginex ESG
		builder.
	</p>

	<p>
		My teaching and consulting background helps me craft intuitive and user-centric apps and
		communicate technical concepts with clarity, enabling effective collaboration with teammates and
		non-tech stakeholders.
	</p>

	<p>When not coding, I'm speaking at tech events:</p>
	<ul>
		<li>Northern Ireland Developers Conference 2025</li>
		<li>Vienna Women Techmakers 2025</li>
		<li>Huddle Hive Hackathon 2024</li>
		<li>Belfast Green Software meetup 2023</li>
		<li>Northern Ireland Developers Conference 2023</li>
	</ul>
</div>

<style>
	.text-column {
		max-inline-size: 60vw;
		margin-inline: auto;
	}

	ul {
		margin: var(--space-4) 0;
	}

	li {
		list-style: '› ';
		margin: 0 var(--space-4);
		padding: var(--space-2);
	}

	p {
		margin-bottom: var(--space-5);
		line-height: var(--leading-relaxed);
	}
</style>
