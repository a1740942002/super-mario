export enum State {
  Mario = 'Mario',
  SuperMario = 'SuperMario',
  FireMario = 'FireMario',
  CapeMario = 'CapeMario'
}

export enum Power {
  Feather,
  Flower,
  Mushroom
}

export class Player {
  state: State

  constructor() {
    this.state = State.Mario
  }

  collect(power: Power) {
    switch (power) {
      case Power.Feather:
        this.state = State.CapeMario
        break
      case Power.Flower:
        this.state = State.FireMario
        break
      case Power.Mushroom:
        if (this.state === State.Mario) {
          this.state = State.SuperMario
        }
        break
    }
  }
}
