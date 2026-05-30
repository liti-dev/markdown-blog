---
title: 'Svelte State Management Pattern: using Context API or Classes + Hooks'
date: 2025-11-14
summary: ''
published: false
status: sprout
---

While preparing for the new job, I wanted to solidify my understanding of Svelte
5's features, particularly the state management. For state sharing across
components, Context API (or createContext) is what I'd go for. The reason is I
prefer simplicity, native pattern, and less boilerplate.

However, the company's project is using a class-based state + hooks pattern,
which may requires writing more code and steeper learning curve.

Example:

```ts
// PokemonTrainerState.svelte.ts
// State class with pure domain logic
export class PokemonTrainerState {
  // parts of the machine
  #phase = $state<Phase>('idle');
  #elapsed = $state(0);
  #running = $state(false);
  #pokemon = $state<Array<{ id: string; name: string }>>([]);

  // buttons (methods, public API)
  startTraining() { ... }
  pauseTraining() { ... }
  step(deltaMs: number) { ... }

  constructor(private options: () => TrainerOptions) {
    // no effects here — class stays pure
  }

  // displays (getters)
  get currentPhase() { return this.#phase; }
}

```

```ts
// useTrainer.svelte.ts
// Hook as orchestrator to use the state class in Svelte components (merge options, create or reuse state, etc)
export function useTrainer(
  options: () => Partial<TrainerOptions> = () => ({})
): TrainerPublic {
  const opts = $derived.by(() => ({
    ...trainerDefaults,
    ...(options?.() || {})
  }))

  const existing = hasContext(TRAINER_KEY)
    ? getContext<TrainerPublic>(TRAINER_KEY)
    : undefined
  const created = !(existing && opts.inherit)

  const state =
    existing && opts.inherit ? existing : new PokemonTrainerState(() => opts)

  if (!existing || !opts.inherit) {
    setContext(TRAINER_KEY, state)
  }
  $effect(() => {
    // orchestrate frame updates, event listeners, subscriptions
  })
  return state
}
```

```ts
// UI component
let { title = 'Trainer', logging = false, autoRun = false } = $props()

// call hook with getter — hook merges defaults and returns instance
const trainer: TrainerPublic = useTrainer(() => ({ logging, autoRun }))

<div>
    <strong>Phase:</strong> {trainer.currentPhase()}
    <strong>Progress:</strong> {Math.round(trainer.progress() * 100)}%
    <strong>Pokemons:</strong> {trainer.pokemonCount()}
  </div>

  <button onclick={() => trainer.startTraining()}>Start</button>
  <button onclick={() => trainer.pauseTraining()}>Pause</button>

```

Why this pattern?

I reckon their choice depends on business requirements. The project may involve
complex 3D scene state (this is also the pattern employed by Threlte) with
multiple susbsystems (physics, rendering)

In short, Class + Hook advantages:

- Complex state logic (e.g. camera transforms, objects, physics all in one class
  with private fields)
- Multi-state composition (high reusability): one hook can manage camera state +
  scene state + physics state together
- Centralised orchestration: `$effect` in hook orchestrates frame updates, event
  listeners, subscriptions
- Performance optimisation: private state + controlled mutations avoid
  unintended rerenders

The question is whether should we go hybrid (createContext for UI/dashboard and
Class+ Hook for real-time visualisation and Threlte)?
