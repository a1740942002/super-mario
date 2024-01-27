import { createActor, createMachine } from 'xstate'
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
      }
    },
    [State.FireMario]: {
      on: {
        [Event.FeatherCollect]: {
          target: State.CapeMario
        }
      }
    }
  },
  types: {
    events: {} as Events
  }
})

// Create an actor that you can send events to.
// Note: the actor is not started yet!
export const marioActor = createActor(marioMachine)

marioActor.start() // logs 'Inactive'
