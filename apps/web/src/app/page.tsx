'use client'

import { Event as MarioEvent, useMarioMachine } from '@super-mario/react'
import Image from 'next/image'

export default function Page() {
  const { state, send, marioEvents, getEventDisplayName } = useMarioMachine()
  const handleCollect = (event: MarioEvent) => {
    send({ type: event })
  }

  return (
    <main>
      <ul className="flex space-x-[8px]">
        {marioEvents.map((event) => (
          <li key={event}>
            <button onClick={() => handleCollect(event)}>
              {getEventDisplayName(event)}
            </button>
          </li>
        ))}
      </ul>
      <div>
        <p>{state.value as string}</p>
      </div>
    </main>
  )
}
