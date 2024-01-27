'use client'

import React, { useEffect, useRef } from 'react'
import kaboom from 'kaboom'
import { mario, superMario, capeMario, fireMario } from '../../lib/mario'

const initMario = mario
let currentMario = initMario

export function MarioGame() {
  const gameRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!gameRef.current) return

    const k = kaboom({
      global: false,
      canvas: gameRef.current
    })

    const {
      loadSprite,
      loadSound,
      setGravity,
      addLevel,
      vec2,
      sprite,
      area,
      body,
      anchor,
      onKeyDown,
      onKeyPress,
      destroy,
      play
    } = k

    // write all your kaboom code here
    // Load assets
    loadSprite(mario, '/sprites/mario.png')
    loadSprite(superMario, '/sprites/super-mario.png')
    loadSprite(capeMario, '/sprites/cape-mario.png')
    loadSprite(fireMario, '/sprites/fire-mario.png')
    loadSprite('grass', '/sprites/grass.png')
    loadSound('score', '/sounds/score.mp3')
    loadSprite('mushroom', '/sprites/mushroom.png')
    loadSprite('flower', '/sprites/flower.png')
    loadSprite('feather', '/sprites/feather.png')

    setGravity(2400)

    const SPEED = 480

    const level = addLevel(
      [
        // Design the level layout with symbols
        '# | @ #  ~ #',
        '============'
      ],
      {
        // The size of each grid
        tileWidth: 64,
        tileHeight: 64,
        // The position of the top left block
        pos: vec2(100, 300),
        // Define what each symbol means (in components)
        tiles: {
          '@': () => [
            // enum
            // State.Mario => 'Mario'
            // State.SuperMario => 'SuperMario'
            // State.CapeMario => 'CapeMario'
            // State.FireMario => 'FireMario'
            sprite(initMario),
            area(),
            body(),
            anchor('bot'),
            'player'
          ],
          '=': () => [
            sprite('grass'),
            area(),
            body({ isStatic: true }),
            anchor('bot')
          ],
          '#': () => [sprite('mushroom'), area(), anchor('bot'), 'mushroom'],
          '~': () => [sprite('feather'), area(), anchor('bot'), 'feather'],
          '|': () => [sprite('flower'), area(), anchor('bot'), 'flower']
        }
      }
    )

    // Get the player object from tag
    const player = level.get('player')[0]

    // Movements
    onKeyPress('space', () => {
      if (player.isGrounded()) {
        player.jump()
      }
    })

    onKeyDown('left', () => {
      player.move(-SPEED, 0)
    })

    onKeyDown('right', () => {
      player.move(SPEED, 0)
    })

    // Eat
    player.onCollide('flower', (flower: any) => {
      destroy(flower)
      play('score')

      /**
       * @code
       * Write code below here
       */
      let newMario = ''
      switch (currentMario) {
        case 'Mario':
        case 'SuperMario':
        case 'CapeMario':
        case 'FireMario':
        default:
          newMario = 'FireMario'
          break
      }
      player.use(sprite(newMario))
    })

    player.onCollide('mushroom', (mushroom: any) => {
      destroy(mushroom)
      play('score')

      /**
       * @code
       * Write code below here
       */
      let newMario = ''
      switch (currentMario) {
        case 'Mario':
        case 'SuperMario':
          newMario = 'SuperMario'
          break
        case 'CapeMario':
          newMario = 'CapeMario'
          break
        case 'FireMario':
          newMario = 'FireMario'
          break
        default:
          break
      }
      player.use(sprite(newMario))
    })

    player.onCollide('feather', (feather: any) => {
      destroy(feather)
      play('score')

      /**
       * @code
       * Write code below here
       */
      let newMario = ''
      switch (currentMario) {
        case 'Mario':
        case 'SuperMario':
        case 'CapeMario':
        case 'FireMario':
        default:
          newMario = 'CapeMario'
          break
      }
      player.use(sprite(newMario))
    })

    return () => {
      k.debug.paused = true
    }
  }, [])

  return <canvas ref={gameRef} />
}
