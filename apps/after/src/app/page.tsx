'use client'

import { useMarioMachine } from '@super-mario/react'
import { MarioGame } from './components/MarioGame'

export default function Page() {
  const { state } = useMarioMachine()

  return (
    <main className="h-full flex flex-col">
      <h1>目前狀態：{state.value as string}</h1>
      <MarioGame />
    </main>
  )
}
