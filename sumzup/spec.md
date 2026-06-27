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

## 2. Naming — Combinaciones Bilingües Divertidas

Cada juego tiene un nombre que mezcla **inglés + español + Benji** para ser intuitivo y memorable:

| Juego | Nombre | Origen | Significado |
|-------|--------|--------|-------------|
| 🧮 Ábaco | **Benjiban** | Benji + Soro**ban** | "El ábaco de Benji" (suena japonés) |
| 🎵 Tablas | **MultiBeat** | Multiplicación + Beat | "Ritmo de multiplicar" |
| ⚡ Cálculo | **BrainDash** | Brain + Dash | "Carrera del cerebro" |
| 🔷 Formas | **ShapeJoy** | Shape + Joy | "Alegría de las formas" |
| 📏 Medidas | **MeasureUp** | Measure + Up | "Mide y mejora" |

**Criterios**: 2-3 sílabas · Funciona en inglés y español · Los niños lo pronuncian fácil · Sugiere el contenido.

---

## 3. Organización

```
edgybenji.app/
├── index.html                     Hub principal (5 cartas)
│
├── sumzup/
│   ├── index.html                 🏠 Sub-Hub SumzUp (5 mini-juegos)
│   ├── spec.md                    Este archivo
│   │
│   ├── benjiban/
│   │   ├── index.html             🧮 Benjiban — Ábaco japonés
│   │   └── spec.md
│   │
│   ├── multibeat/
│   │   ├── index.html             🎵 MultiBeat — Tablas con ritmo
│   │   └── spec.md
│   │
│   ├── braindash/
│   │   ├── index.html             ⚡ BrainDash — Cálculo mental Anzan
│   │   └── spec.md
│   │
│   ├── shapejoy/
│   │   ├── index.html             🔷 ShapeJoy — Geometría infantil
│   │   └── spec.md
│   │
│   └── measureup/
│       ├── index.html             📏 MeasureUp — Medidas cotidianas
│       └── spec.md
```

---

## 4. Los 5 Juegos

| # | Juego | Ícono | Qué enseña | Edad |
|---|-------|:-----:|-----------|:---:|
| 1 | **Benjiban** | 🧮 | Ábaco japonés: representar números, sumar, restar | 4-10 |
| 2 | **MultiBeat** | 🎵 | Multiplicación con ritmo musical y patrones visuales | 6-10 |
| 3 | **BrainDash** | ⚡ | Cálculo mental rápido (Anzan sin ábaco físico) | 7-10 |
| 4 | **ShapeJoy** | 🔷 | Reconocer y dibujar formas geométricas básicas | 4-7 |
| 5 | **MeasureUp** | 📏 | Longitud, peso, tiempo con objetos cotidianos | 5-8 |

---

## 5. Paleta Corporativa SumzUp®

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

## 6. Sub-Hub (sumzup/index.html) — Diseño

```
┌──────────────────────────────────┐
│  🧮 SumzUp®                      │  Hero
│  Aritmética Modelo Japonés       │
│  ¡Tus dedos piensan!             │
├──────────────────────────────────┤
│  ┌────────┐  ┌────────┐         │
│  │  🧮    │  │  🎵    │         │  5 cartas en
│  │Benjiban│  │MultiBeat│        │  grid responsive
│  │ Ábaco  │  │ Ritmo  │         │  (móvil: vertical)
│  └────────┘  └────────┘         │
│  ┌────────┐  ┌────────┐         │
│  │  ⚡    │  │  🔷    │         │
│  │BrainDash│ │ShapeJoy│         │
│  │ Mental │  │ Formas │         │
│  └────────┘  └────────┘         │
│  ┌──────────────┐               │
│  │     📏       │               │
│  │  MeasureUp   │               │
│  │  Cotidianas  │               │
│  └──────────────┘               │
├──────────────────────────────────┤
│  ← Volver a Edgy Benji           │  Footer
└──────────────────────────────────┘
```

Comparte header, footer, MusicPlayer, UserSystem con el resto de la app.

---

## 7. Recursos Compartidos

Todos los juegos SumzUp usan:
- `assets/audio-fx.js` — efectos Web Audio
- `assets/motivational-voices.js` — voces TTS + SFX
- `assets/music-player.js` — playlist de 12 canciones
- `assets/user-system.js` — perfiles y progreso
- Google Fonts: Baloo 2
- Paleta SumzUp (CSS variables compartidas)

---

## 8. Plan de Implementación

| Fase | Juego | Prioridad | Tiempo est. |
|:----:|-------|:---------:|:-----------:|
| 1 | Sub-Hub SumzUp | 🔴 P1 | 1h |
| 2 | Benjiban (ábaco) | 🔴 P1 | 8h |
| 3 | MultiBeat (ritmo) | 🟡 P2 | 4h |
| 4 | BrainDash (Anzan) | 🟡 P2 | 3h |
| 5 | ShapeJoy (geo) | 🟢 P3 | 3h |
| 6 | MeasureUp | 🟢 P3 | 3h |
| **Total** | | | **~22h** |

---

*Spec creado con `kids-game-architect` + `kids-ux-design` + `specification-engineer` skills.*
