---
title: What I've learned building VSCarbon
description:
  How building a VS Code extension taught me software development cycle, design
  pattern, and even pitching (the list goes on)
date: '2025-08-21'
categories:
  - sustainability
  - green-software
  - vscode
  - learning
published: true
status: sprout
---

Learning by building is exciting in the way that I figure things out as I go,
feeling like I'm on a quest as each level requires new skills.

## Full development cycle

## Design pattern

- Adapter. When interest arises, there's a need to extend VSCarbon to EU
  countries. It means I have to integrate other APIs (e.g., Electricity Maps,
  Carbon Aware Computing), creating a new strutural challenge. Luckily, someone
  recommended adapter pattern. Instead of rewriting core logic for each
  provider, I can abstract data layer (this feels deja vu because a CTO
  mentioned abstraction as a way to deal with business diversity in a job
  interview).
- I was worried it's gonna be heavy for a VS Code extension because it sounds
  like big enterprise-y layers, but in my case, it looks less like design
  pattern boilerplate and more like a simple translation function per API.

Anw, I can define a common interface like this

```ts
type CarbonData = {
  timestamp: string
  region: string
  carbonIntensity: number // gCO2/kWh
  generationMix?: Record<string, number> // sadly some APIs don't provide energy mix
}
```

Adapters here are functions that normalise responses. I can add more providers
later without changing much UI/logic. So, it's a cleaner way to avoid if
(provider === "UK") else if ("EU") everywhere

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
export async function fetchEUCarbonData(
  countryCode: string
): Promise<CarbonData> {
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

## Transforming and normalising data

My tool integrates data from two distinct APIs - the UK's National Grid Carbon
Intensity API and the Electricity Maps API. Each provides carbon intensity data
but with different structures, requiring transformation and normalisation to
present a unified interface.

**UK National Grid API** returns nested regional data:

```json
{
  "data": [
    {
      "shortname": "England",
      "data": [
        {
          "intensity": {
            "forecast": 245,
            "index": "moderate"
          },
          "generationmix": [
            { "fuel": "gas", "perc": 40.2 },
            { "fuel": "wind", "perc": 25.1 }
          ]
        }
      ]
    }
  ]
}
```

**Electricity Maps API** uses a flatter structure:

```json
{
  "zone": "GB",
  "carbonIntensity": 245,
  "datetime": "2024-01-15T10:00:00.000Z",
  "powerConsumptionBreakdown": {
    "gas": 15420,
    "wind": 9630,
    "solar": 2100
  }
}
```

### 1. Unified Data Schema

So I defined a common interface `CarbonData` that both adapters transform to

```typescript
interface CarbonData {
  intensity: number // gCO₂/kWh
  index?: CarbonIntensityIndex
  region: string
  timestamp: Date
  mix?: GenerationMix[]
  source: DataSource
}
```

### 2. Adapter Pattern Implementation

Each API gets its own adapter with transformation logic:

**UK Adapter**

```typescript
const transformNationalGridResponse = (
  response: NationalGridResponse
): CarbonData => {
  const regionalData = response.data[0]
  const intensityData = regionalData.data[0]

  return {
    intensity: intensityData.intensity.forecast,
    index: intensityData.intensity.index as CarbonIntensityIndex,
    region: regionalData.shortname || 'England',
    timestamp: new Date(),
    mix: intensityData.generationmix?.map((item) => ({
      fuel: item.fuel,
      perc: item.perc
    })),
    source: 'national-grid'
  }
}
```

**EU Adapter**

```typescript
// Transform power consumption to percentages
const calculatePercentages = (powerBreakdown: Record<string, number>) => {
  const totalConsumption = Object.values(powerBreakdown)
    .filter((value) => value > 0)
    .reduce((sum, value) => sum + value, 0)

  const percentages: Record<string, number> = {}
  for (const [fuelType, value] of Object.entries(powerBreakdown)) {
    if (value > 0) {
      percentages[fuelType] = (value / totalConsumption) * 100
    }
  }
  return percentages
}

// Map Electricity Maps API  fuel types to our standard
const fuelTypeMapping = {
  nuclear: 'nuclear',
  wind: 'wind',
  solar: 'solar',
  gas: 'gas',
  coal: 'coal',
  'hydro discharge': 'hydro',
  biomass: 'biomass'
}
```

```typescript
const groupedByFuel: Record<string, number> = {}
for (const [fuelType, percentage] of Object.entries(percentages)) {
  const mappedFuel = fuelTypeMapping[fuelType.toLowerCase()] || 'other'
  groupedByFuel[mappedFuel] = (groupedByFuel[mappedFuel] || 0) + percentage
}
```

## Privacy

Instead of detecting user location (which may be inaccurate due to devs using
VPN), I let users input their regional postcode (more private and practical as
well)

## Performance, SEO

## Writing

## Promoting

and I'm grateful that VSCarbon is receiving interest and support beyond the UK.
