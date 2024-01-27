export enum State {
  Mario = 'Mario',
  CapeMario = 'CapeMario',
  SuperMario = 'SuperMario',
  FireMario = 'FireMario'
}

export enum Event {
  MushroomCollect = 'mushroom.collect',
  FeatherCollect = 'feather.collect',
  FlowerCollect = 'flower.collect'
}

export type Events =
  | { type: Event.MushroomCollect }
  | { type: Event.FeatherCollect }
  | { type: Event.FlowerCollect }
