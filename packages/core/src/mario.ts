import { createMachine } from 'xstate'
import { Status, Event } from './types'

export const marioMachine = createMachine(
  {
    id: 'Mario Machine',
    initial: Status.Mario,
    states: {
      Mario: {
        on: {
          [Event.FeatherCollect]: {
            target: Status.CapeMario
          },
          [Event.MushroomCollect]: {
            target: Status.SuperMario
          },
          [Event.FlowerCollect]: {
            target: Status.FireMario
          }
        }
      },
      [Status.CapeMario]: {
        on: {
          [Event.FlowerCollect]: {
            target: Status.FireMario
          }
        }
      },
      [Status.SuperMario]: {
        on: {
          [Event.FeatherCollect]: {
            target: Status.CapeMario
          },
          [Event.FlowerCollect]: {
            target: Status.FireMario
          }
        }
      },
      [Status.FireMario]: {
        on: {
          [Event.FeatherCollect]: {
            target: Status.CapeMario
          }
        }
      }
    },
    types: {
      events: {} as
        | { type: Event.MushroomCollect }
        | { type: Event.FeatherCollect }
        | { type: Event.FlowerCollect }
    }
  },
  {
    actions: {},
    actors: {},
    guards: {},
    delays: {}
  }
)
