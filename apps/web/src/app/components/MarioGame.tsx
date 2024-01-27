'use client'

import React, { useEffect, useRef } from 'react'
import kaboom from 'kaboom'

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
    loadSprite('bean', '/sprites/bean.png')
    loadSprite('coin', '/sprites/coin.png')
    loadSprite('spike', '/sprites/spike.png')
    loadSprite('grass', '/sprites/grass.png')
    loadSprite('ghosty', '/sprites/ghosty.png')
    loadSound('score', '/sounds/score.mp3')
    setGravity(2400)

    const SPEED = 480
    const level = addLevel(
      [
        // Design the level layout with symbols
        '@  ^ $$',
        '=========='
      ],
      {
        // The size of each grid
        tileWidth: 64,
        tileHeight: 64,
        // The position of the top left block
        pos: vec2(100, 300),
        // Define what each symbol means (in components)
        tiles: {
          '@': () => [sprite('bean'), area(), body(), anchor('bot'), 'player'],
          '=': () => [
            sprite('grass'),
            area(),
            body({ isStatic: true }),
            anchor('bot')
          ],
          $: () => [sprite('coin'), area(), anchor('bot'), 'coin'],
          '^': () => [sprite('spike'), area(), anchor('bot'), 'danger']
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

    // Back to the original position if hit a "danger" item
    player.onCollide('danger', () => {
      player.pos = level.tile2Pos(0, 0)
    })

    // Eat the coin!
    player.onCollide('coin', (coin: any) => {
      destroy(coin)
      play('score')
    })

    return () => {
      k.debug.paused = true
    }
  }, [])

  return <canvas ref={gameRef} />
}
