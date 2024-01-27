import { createMachine } from 'xstate'
import { State, Event, Events } from './types'

export const marioMachine = createMachine(
  {
    id: 'Mario Machine',
    initial: State.Mario,
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
  },
  {
    actions: {},
    actors: {},
    guards: {},
    delays: {}
  }
)
