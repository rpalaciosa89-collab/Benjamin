# Aritmi — Spec

> **Versión**: 1.0 · **Juego**: Sumas con emojis · **Agent**: Gameplay Engineer

## Visión

Juego de matemáticas donde el niño suma objetos representados por emojis. Diseñado para enseñar aritmética básica de forma visual y divertida.

## Mecánica

- Se muestra una suma con emojis (ej: 🚗 + 🚗 = ?)
- 3-4 opciones de respuesta
- Respuesta correcta → celebración, siguiente problema
- Respuesta incorrecta → intentar de nuevo
- Niveles con números más grandes

## Progresión

| Nivel | Rango numérico | Opciones | Tiempo |
|-------|:-------------:|:--------:|:------:|
| 1 | 1–5 | 3 | Sin límite |
| 2 | 1–5 | 3 | Sin límite |
| 3 | 1–10 | 4 | Sin límite |
| 4 | 1–10 | 4 | Sin límite |
| 5 | 1–15 | 4 | Sin límite |
| 6 | 1–20 | 4 | Sin límite |
| 7 | 1–30 | 4 | Sin límite |
| 8 | 1–50 | 4 | Sin límite |

## UI

- Header: menú ☰, nivel, puntos
- Área de problema con emojis visuales
- Botones de respuesta (3-4 opciones)
- Modal de victoria con confeti
- TTS: pronunciación del resultado
- Perfil del niño, selector de música

## Audio

- Música de fondo: MusicPlayer (playlist de 12 canciones)
- TTS: SpeechSynthesis API ("dos más tres es cinco")
- Efectos: `assets/audio-fx.js`
  - `correct`: respuesta correcta
  - `wrong`: respuesta incorrecta
  - `thinking`: tic-tac mientras piensa
  - `levelUp`: completar nivel
  - `tap`: botones UI

## Persistencia

- Progreso guardado en UserSystem (localStorage)
- GAME_ID: `aritmi`

## Stack

- HTML5 + CSS3 + vanilla JS (single file)
- Web Audio API + SpeechSynthesis API
- Google Fonts: Baloo 2
- `assets/music-player.js`, `assets/user-system.js`, `assets/audio-fx.js`
