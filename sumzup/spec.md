# SumzUp® — Aritmética Modelo Japonés · Spec v1.0

> **Tipo**: Sub-Hub de juegos matemáticos  
> **Método**: Enseñanza japonesa (Soroban, Anzan, ritmo, visualización)  
> **Audiencia**: 4-10 años  
> **Stack**: HTML5 vanilla, misma arquitectura que edgybenji.app  
> **Carpeta**: `sumzup/`

---

## 1. Visión

SumzUp® agrupa **5 juegos de matemáticas** inspirados en el modelo educativo japonés: ábaco, cálculo mental, tablas con ritmo, geometría visual y medición práctica. Todos comparten un diseño luminoso, colorido y alegre.

**Frase**: *"Tus dedos piensan más rápido que una calculadora."*

---

## 2. Organización

```
edgybenji.app/
├── index.html                     Hub principal (5 cartas)
│
├── sumzup/
│   ├── index.html                 🏠 Sub-Hub SumzUp (5 mini-juegos)
│   ├── spec.md                    Este archivo
│   │
│   ├── soroban/
│   │   ├── index.html             🧮 Juego: Ábaco japonés
│   │   └── spec.md
│   │
│   ├── tablas/
│   │   ├── index.html             🎵 Juego: Tablas de multiplicar con ritmo
│   │   └── spec.md
│   │
│   ├── flash/
│   │   ├── index.html             ⚡ Juego: Cálculo mental Anzan
│   │   └── spec.md
│   │
│   ├── figuras/
│   │   ├── index.html             🔷 Juego: Geometría infantil
│   │   └── spec.md
│   │
│   └── medidas/
│       ├── index.html             📏 Juego: Medidas cotidianas
│       └── spec.md
```

---

## 3. Los 5 Juegos

| # | Juego | Ícono | Qué enseña | Edad |
|---|-------|:-----:|-----------|:---:|
| 1 | **Soroban** | 🧮 | Ábaco japonés: representar números, sumar, restar | 4-10 |
| 2 | **Tablas** | 🎵 | Multiplicación con ritmo musical y patrones visuales | 6-10 |
| 3 | **Flash** | ⚡ | Cálculo mental rápido (Anzan sin ábaco físico) | 7-10 |
| 4 | **Figuras** | 🔷 | Reconocer y dibujar formas geométricas básicas | 4-7 |
| 5 | **Medidas** | 📏 | Longitud, peso, tiempo con objetos cotidianos | 5-8 |

---

## 4. Paleta Corporativa SumzUp®

**Luminosa, alegre, estilo japonés moderno**:

| Color | Hex | Uso |
|-------|-----|-----|
| 🔴 Rojo Torii | `#ef4444` | Acentos, botones CTA |
| 🟠 Naranja Kitsune | `#f97316` | Destacados, badges |
| 🟡 Dorado Soroban | `#fbbf24` | Cuentas del ábaco, estrellas |
| 🟢 Verde Matcha | `#22c55e` | Éxitos, progreso completado |
| 🔵 Azul Tsunami | `#3b82f6` | Fondos de juegos |
| 🟣 Púrpura Sakura | `#a855f7` | Header, títulos |
| 🩷 Rosa Momo | `#f472b6` | Cartas del sub-hub |
| ⬜ Blanco Nube | `#f8fafc` | Fondos de contenido |
| ⬛ Carbón Zen | `#1e293b` | Texto principal |

**Fondo del sub-hub**: gradiente suave `#fef3c7` → `#fce7f3` (dorado a sakura)

---

## 5. Sub-Hub (sumzup/index.html) — Diseño

```
┌──────────────────────────────────┐
│  🧮 SumzUp®                      │  Hero
│  Aritmética Modelo Japonés       │
│  ¡Tus dedos piensan!             │
├──────────────────────────────────┤
│  ┌────────┐  ┌────────┐         │
│  │  🧮    │  │  🎵    │         │  5 cartas en
│  │ Soroban│  │ Tablas │         │  grid responsive
│  │ Ábaco  │  │ Ritmo  │         │  (móvil: vertical)
│  └────────┘  └────────┘         │
│  ┌────────┐  ┌────────┐         │
│  │  ⚡    │  │  🔷    │         │
│  │ Flash  │  │Figuras │         │
│  │ Mental │  │Formas  │         │
│  └────────┘  └────────┘         │
│  ┌──────────────┐               │
│  │     📏       │               │
│  │   Medidas    │               │
│  │  Cotidianas  │               │
│  └──────────────┘               │
├──────────────────────────────────┤
│  ← Volver a Edgy Benji           │  Footer
└──────────────────────────────────┘
```

Comparte header, footer, MusicPlayer, UserSystem con el resto de la app.

---

## 6. Recursos Compartidos

Todos los juegos SumzUp usan:
- `assets/audio-fx.js` — efectos Web Audio
- `assets/motivational-voices.js` — voces TTS + SFX
- `assets/music-player.js` — playlist de 12 canciones
- `assets/user-system.js` — perfiles y progreso
- Google Fonts: Baloo 2
- Paleta SumzUp (CSS variables compartidas)

---

## 7. Plan de Implementación

| Fase | Juego | Prioridad | Tiempo est. |
|:----:|-------|:---------:|:-----------:|
| 1 | Sub-Hub SumzUp | 🔴 P1 | 1h |
| 2 | Soroban (ábaco) | 🔴 P1 | 8h |
| 3 | Tablas (ritmo) | 🟡 P2 | 4h |
| 4 | Flash (Anzan) | 🟡 P2 | 3h |
| 5 | Figuras (geo) | 🟢 P3 | 3h |
| 6 | Medidas | 🟢 P3 | 3h |
| **Total** | | | **~22h** |

---

*Spec creado con `kids-game-architect` + `kids-ux-design` + `specification-engineer` skills.*
