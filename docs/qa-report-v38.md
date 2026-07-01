# 🔍 Informe QA — edgybenji.app · v38

> **Fecha**: 2026-06-27 · **Tester**: Multi-Agent (DeepSeek + skills)  
> **Juegos testeados**: 7 (Hub, BenjiMates, Benjiban, Benji al Rescate, Color Fun, Aritmi, MagicABC)

---

## ✅ Lo que funciona bien

| Aspecto | Estado |
|---------|:------:|
| Carga de todos los juegos | ✅ 0 errores JS |
| Fuente Baloo 2 consistente | ✅ 6/7 juegos |
| Música de fondo | ✅ MusicPlayer cargado |
| Perfiles de usuario | ✅ UserSystem en todos |
| Audio FX (Web Audio) | ✅ AudioFX.init() |
| SFX (paths dinámicos) | ✅ document.currentScript |
| Sub-hub BenjiMates | ✅ 5 cartas, paleta corporativa |
| Footer con dedicatoria | ✅ 5/7 juegos |

---

## 🔴 Issues Encontrados

### #1 — MagicABC: Botones de nivel demasiado pequeños (touch)

| Botón | Tamaño | Mínimo recomendado |
|-------|:------:|:------------------:|
| N1-N7 (debug) | **26-30px alto** | 44px (Apple HIG) |

**Impacto**: Difícil de tocar en móvil. Los niños con dedos pequeños también fallan.

**Fix**: Aumentar `padding` y `min-height` de `.debug-lvl-btn` a mínimo 36px.

---

### #2 — Hub: Chips de avatar con tamaño 0×0

Los chips de perfil (🐶🐼🦊🦁🐨) en la pantalla de selección de avatar tienen `0×0` dimensiones calculadas. Aunque se ven visualmente, el navegador no les asigna tamaño de caja.

**Impacto**: Pueden fallar en algunos navegadores o lectores de accesibilidad.

**Fix**: Añadir `width: 56px; height: 56px;` explícito a `.avatar-option`.

---

### #3 — Hub: Scroll vertical en desktop

`scrollHeight: 1309px > viewport: 811px`. La página del Hub requiere scroll incluso en pantallas de 1017px.

**Impacto**: El footer con la dedicatoria no se ve sin hacer scroll.

**Fix**: Reducir `margin-bottom` del hero (50px → 30px), reducir `gap` de cards (24px → 16px), reducir `padding-bottom` (60px → 40px).

---

### #4 — Consistencia: Faltan footers

| Juego | ¿Footer? |
|-------|:--------:|
| Hub | ✅ "Hecho con ❤️..." |
| BenjiMates | ✅ "Hecho con 🧮 y ❤️..." |
| Benji al Rescate | ❌ Sin footer |
| Color Fun | ❌ Sin footer |
| Aritmi | ❌ Sin footer |
| MagicABC | ❌ Sin footer |
| Benjiban | ❌ Sin footer |

**Impacto**: Inconsistencia visual. La dedicatoria a Benjamín solo aparece en 2 de 7 páginas.

**Fix**: Añadir footer estándar a todos los juegos.

---

### #5 — Consistencia: Fuentes secundarias

Hub y BenjiMates usan 3 font-families. Color Fun y Aritmi solo 2. Los juegos más recientes (Benjiban) heredan correctamente Baloo 2 pero tienen elementos con fallback fonts.

**Impacto**: Ligera inconsistencia tipográfica entre juegos.

**Fix**: Normalizar — todos deberían heredar solo Baloo 2.

---

### #6 — Fluidez: MagicABC tiene el CSS/JS más pesado

`magic-abc/index.html` = **~50 KB**, 1335 líneas. Es 2× más grande que cualquier otro juego.

**Impacto**: Tiempo de parseo más lento en móviles lentos.

**Fix (🔮 futuro)**: Extraer CSS a archivo separado o minificar.

---

### #7 — Fluidez: Animaciones sin `prefers-reduced-motion`

Ningún juego respeta `@media (prefers-reduced-motion: reduce)`. Las animaciones (bounce, pulse, drift) corren siempre.

**Impacto**: Usuarios con sensibilidad al movimiento no pueden desactivarlas.

**Fix**: Añadir media query en todos los juegos.

---

## 🟡 Oportunidades de Mejora (no bloqueantes)

| # | Oportunidad | Juego(s) |
|---|------------|----------|
| 8 | Meta description ausente en Benjiban | Benjiban |
| 9 | No hay `loading="lazy"` en iframes/imágenes | Todos |
| 10 | SW precache no incluye `benjimates/index.html` | SW |
| 11 | Los modales de victoria no tienen `role="dialog"` | Todos |
| 12 | Los canvas no tienen `aria-label` | MagicABC, Benjiban |

---

## 📊 Resumen

| Categoría | Issues |
|-----------|:------:|
| 🔴 Touch/Accesibilidad | 2 |
| 🟡 Consistencia visual | 3 |
| 🟢 Fluidez/Optimización | 2 |
| 🔵 Oportunidades | 5 |
| **Total** | **12** |

---

## 🎯 Prioridad de Ejecución

| Prioridad | Issue | Tiempo est. |
|:---------:|-------|:----------:|
| 🔴 P1 | #1 Botones nivel MagicABC | 5 min |
| 🔴 P1 | #2 Chips avatar Hub | 5 min |
| 🟡 P2 | #3 Scroll Hub en desktop | 10 min |
| 🟡 P2 | #4 Footers faltantes | 15 min |
| 🟡 P2 | #10 SW precache benjimates | 2 min |
| 🟢 P3 | #5-7, #8-12 | 20 min |

---

*Informe generado con todos los agentes y skills activos.*
