import { createMachine } from 'xstate'
import { State, Event, Events } from './types'

const initialState = State.Mario

export const marioMachine = createMachine({
  id: 'Mario Machine',
  initial: initialState,
  states: {
    Mario: {
      on: {
        [Event.FeatherCollect]: {
          target: State.CapeMario
        },
        [Event.MushroomCollect]: {
          target: State.SuperMario
        },
        [Event.FlowerCollect]: {
          target: State.FireMario
        }
      }
    },
    [State.CapeMario]: {
      on: {
        [Event.FlowerCollect]: {
          target: State.FireMario
        }
      },
      after: {
        5000: {
          target: initialState
        }
      }
    },
    [State.SuperMario]: {
      on: {
        [Event.FeatherCollect]: {
          target: State.CapeMario
        },
        [Event.FlowerCollect]: {
          target: State.FireMario
        }
      },
      after: {
        5000: {
          target: initialState
        }
      }
    },
    [State.FireMario]: {
      on: {
        [Event.FeatherCollect]: {
          target: State.CapeMario
        }
      },
      after: {
        5000: {
          target: initialState
        }
      }
    }
  },
  types: {
    events: {} as Events
  }
})
