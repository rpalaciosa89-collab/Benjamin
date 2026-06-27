# Benji al Rescate! — Spec

> **Versión**: 1.0 · **Juego**: Puzzle de caminos · **Agent**: Gameplay Engineer

## Visión

Juego de puzzle donde el niño gira piezas de camino para conectar a Benji 🐶 con su amigo 🐱. Diseñado para desarrollar pensamiento lógico, orientación espacial y resolución de problemas.

## Mecánica

- Grid de piezas de camino (3×3 a 4×4)
- Cada pieza tiene segmentos de camino en diferentes orientaciones
- Tocar una pieza la gira 90°
- El objetivo: crear un camino continuo desde Benji hasta su amigo
- Movimientos limitados por nivel

## Progresión

| Nivel | Grid | Piezas | Movimientos |
|-------|:----:|:------:|:-----------:|
| 1 | 3×3 | 3-4 | 8 |
| 2 | 3×3 | 4-5 | 10 |
| 3 | 3×3 | 5-6 | 12 |
| 4 | 4×3 | 6-7 | 15 |
| 5 | 4×4 | 8-9 | 18 |

## UI

- Header: menú ☰, nivel, movimientos restantes
- Grid de piezas con emojis 🐶 🐱
- Instrucción: "Toca los caminos para girarlos"
- Modal de victoria con animación
- Perfil del niño, selector de música

## Audio

- Música de fondo: MusicPlayer (playlist de 12 canciones)
- Efectos: `assets/audio-fx.js`
  - `rotate`: girar pieza
  - `connect`: conectar 2 piezas
  - `complete`: camino completo (Benji llega a su amigo)
  - `levelUp`: completar nivel
  - `tap`: botones UI

## Persistencia

- Progreso guardado en UserSystem (localStorage)
- GAME_ID: `benji`

## Stack

- HTML5 + CSS3 + vanilla JS (single file)
- SVG/CSS para piezas de camino (o Canvas)
- Web Audio API (efectos)
- Google Fonts: Baloo 2
- `assets/music-player.js`, `assets/user-system.js`, `assets/audio-fx.js`
