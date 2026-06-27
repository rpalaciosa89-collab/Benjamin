# Color Fun! — Spec

> **Versión**: 1.0 · **Juego**: Memoria de colores · **Agent**: Gameplay Engineer

## Visión

Juego de memoria donde el niño voltea cartas para encontrar pares de colores iguales. Diseñado para enseñar reconocimiento de colores, memoria visual y concentración.

## Mecánica

- Grid de cartas boca abajo (2×2 a 4×4 según nivel)
- Tocar una carta la voltea mostrando su color
- Encontrar 2 cartas del mismo color = par correcto
- Si no coinciden, se vuelven a voltear tras 1s
- Niveles con más pares y menos intentos

## Progresión

| Nivel | Pares | Grid | Intentos |
|-------|:-----:|:----:|:--------:|
| 1 | 2 | 2×2 | 4 |
| 2 | 3 | 3×2 | 5 |
| 3 | 4 | 4×2 | 6 |
| 4 | 6 | 4×3 | 8 |
| 5 | 8 | 4×4 | 10 |

## UI

- Header: menú ☰, nivel, pares encontrados, intentos restantes
- Grid de cartas centrado
- Modal de victoria con confeti
- Perfil del niño, selector de música

## Audio

- Música de fondo: MusicPlayer (playlist de 12 canciones)
- Efectos: `assets/audio-fx.js`
  - `flip`: voltear carta
  - `match`: par correcto
  - `mismatch`: par incorrecto
  - `levelUp`: completar nivel
  - `tap`: botones UI

## Persistencia

- Progreso guardado en UserSystem (localStorage)
- GAME_ID: `colorfun`

## Stack

- HTML5 + CSS3 + vanilla JS (single file)
- Web Audio API (efectos)
- Google Fonts: Baloo 2
- `assets/music-player.js`, `assets/user-system.js`, `assets/audio-fx.js`
