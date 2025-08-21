---
title: What I've learned building VSCarbon
description: How building a VS Code extension taught me software development cycle, design pattern, and even pitching (the list goes on)
date: '2025-08-21'
categories:
  - sustainability
  - green-software
  - vscode
  - learning
published: true
status: sprout
---

Learning by building is exciting in the way that I figure things out as I go, feeling like I'm on a quest as each level requires new skills.

## Full development cycle

## Design pattern

- Adapter. When interest arises, there's a need to extend VSCarbon to EU countries. It means I have to integrate other APIs (e.g., Electricity Maps, Carbon Aware Computing), creating a new strutural challenge. Luckily, someone recommended adapter pattern. Instead of rewriting core logic for each provider, I can abstract data layer (this feels deja vu because a CTO mentioned abstraction as a way to deal with business diversity in a job interview).
- I was worried it's gonna be heavy for a VS Code extension because it sounds like big enterprise-y layers, but in my case, it looks less like design pattern boilerplate and more like a simple translation function per API.

Anw, I can define a common interface like this

```ts
type CarbonData = {
	timestamp: string
	region: string
	carbonIntensity: number // gCO2/kWh
	generationMix?: Record<string, number> // sadly some APIs don't provide energy mix
}
```

Adapters here are functions that normalise responses. I can add more providers later without changing much UI/logic. So, it's a cleaner way to avoid if (provider === "UK") else if ("EU") everywhere

```ts
// National Grid adapter for UK users
export async function fetchUKCarbonData(): Promise<CarbonData[]> {
	const res = await fetch('https://api.carbonintensity.org.uk/regional')
	const json = await res.json()

	return json.data.map((region: any) => ({
		timestamp: region.from,
		region: region.shortname,
		carbonIntensity: region.intensity.actual,
		generationMix: region.generationmix.reduce(
			(acc: any, g: any) => ({ ...acc, [g.fuel]: g.perc }),
			{}
		)
	}))
}

// Otherwise Electricity Maps adapter for EU/global users
export async function fetchEUCarbonData(countryCode: string): Promise<CarbonData> {
	const res = await fetch(
		`https://api.electricitymap.org/v3/carbon-intensity/latest?zone=${countryCode}`,
		{ headers: { 'auth-token': process.env.ELECTRICITYMAP_TOKEN! } }
	)
	const json = await res.json()

	return {
		timestamp: json.datetime,
		region: json.zone,
		carbonIntensity: json.carbonIntensity,
		generationMix: json.productionMix
	}
}
```

## Privacy

Instead of detecting user location (which may be inaccurate due to devs using VPN), I let users input their regional postcode (more private and practical as well)

## Performance, SEO

## Writing

## Promoting

and I'm grateful that VSCarbon is receiving interest and support beyond the UK.
