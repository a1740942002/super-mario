import { useMachine } from '@xstate/react'
import { Event as MarioEvent, marioMachine } from '@super-mario/core'

export function useMarioMachine() {
  const [state, send] = useMachine(marioMachine)

  const marioEvents: MarioEvent[] = Object.values(MarioEvent)

  const getEventDisplayName = (event: MarioEvent) => {
    switch (event) {
      case MarioEvent.MushroomCollect:
        return 'Mushroom'
      case MarioEvent.FlowerCollect:
        return 'Flower'
      case MarioEvent.FeatherCollect:
        return 'Feather'
    }
  }

  return {
    state,
    send,
    marioEvents,
    getEventDisplayName
  }
}
