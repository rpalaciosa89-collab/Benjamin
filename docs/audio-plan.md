# 🎵 Plan de Audio Integral — edgybenji.app

> **Fecha**: 2026-06-26  
> **Versión**: 1.0  
> **Objetivo**: Unificar el audio de los 4 juegos con un sistema de efectos de sonido compartido (Web Audio API), música de fondo (playlist), y reacciones auditivas que mejoren la experiencia de juego infantil.

---

## 📊 Auditoría Actual

| Juego | ¿Efectos? | ¿Música? | ¿Web Audio? | Calidad |
|-------|:---------:|:--------:|:-----------:|:-------:|
| **MagicABC** | 7 sonidos | ✅ MusicPlayer | ✅ Web Audio | ⭐⭐⭐⭐ |
| **Aritmi** | 1 sonido (MP3) | ✅ MusicPlayer | ❌ | ⭐⭐ |
| **Color Fun** | 1 sonido (MP3) | ✅ MusicPlayer | ❌ | ⭐⭐ |
| **Benji al Rescate** | 1 sonido (MP3) | ✅ MusicPlayer | ❌ | ⭐⭐ |

**Problemas detectados**:
- Solo MagicABC usa Web Audio API para efectos sintetizados
- Aritmi, Color Fun, y Benji comparten 1 solo MP3 de éxito ("Yippee!")
- No hay sonidos de: click UI, error, victoria, game over, transición de nivel, cuenta regresiva
- La música de fondo no tiene "ducking" (bajar volumen durante sonidos importantes)

---

## 🏗️ Arquitectura Propuesta

### 1. Módulo compartido: `assets/audio-fx.js`

Un solo archivo que todos los juegos cargan. Usa exclusivamente **Web Audio API** (sin archivos MP3 externos para efectos). Síntesis de sonido pura.

```javascript
// assets/audio-fx.js — Efectos de sonido compartidos para todos los juegos
// Web Audio API pura, sin dependencias externas
// ~5 KB minificado
```

### 2. Catálogo de Sonidos

#### A. Sonidos UI (Universal — todos los juegos)

| ID | Nombre | Cuándo suena | Tipo | Frecuencias |
|----|--------|-------------|------|-------------|
| `tap` | Tap / Click | Al tocar cualquier botón | `sine` suave | 800 Hz, 0.05s |
| `back` | Volver / Cerrar | Al cerrar modal o volver atrás | `sine` descendente | 600→400 Hz |
| `hover` | Hover (desktop) | Al pasar sobre botones interactivos | `sine` muy suave | 1000 Hz, 0.03s |

#### B. Sonidos de Juego (Genéricos)

| ID | Nombre | Cuándo suena | Tipo | Patrón |
|----|--------|-------------|------|--------|
| `success` | ¡Éxito! | Acertar, completar, ganar | `sine` ascendente | C5→E5→G5 |
| `error` | Error suave | Fallar, incorrecto | `sine` descendente | 300→200 Hz |
| `star` | Estrella / Moneda | Ganar puntos, monedas, estrellas | `triangle` brillante | 1200 Hz |
| `levelUp` | ¡Subir de nivel! | Al completar un nivel | `square` fanfarria | C5→E5→G5→C6 |
| `gameOver` | Fin del juego | Perder todas las vidas | `sine` triste | G4→F4→E4→C4 |
| `countdown` | Cuenta regresiva | 3...2...1... ¡Ya! | `sine` ticks | 440×3 + 880 |
| `pop` | Pop / Aparecer | Cartas volteadas, modales, confeti | `sine` corto | 600 Hz |
| `woosh` | Transición | Cambio de pantalla/nivel | Ruido blanco filtrado | 0.15s |

#### C. Sonidos Específicos por Juego

| Juego | ID | Cuándo | Patrón |
|-------|----|--------|--------|
| **Color Fun** | `flip` | Voltear tarjeta | 440 Hz, 0.08s |
| | `match` | Encontrar par | C5→E5 (más brillante que success) |
| | `mismatch` | Par incorrecto | 300→200 Hz (más grave que error) |
| **Aritmi** | `correct` | Respuesta correcta | Fanfarria corta ascendente |
| | `wrong` | Respuesta incorrecta | "Buzzer" suave (para no desmotivar) |
| | `thinking` | Tic-tac mientras piensa | 3 ticks suaves |
| **Benji** | `rotate` | Girar pieza del camino | Click metálico (square 600 Hz) |
| | `connect` | Conectar 2 piezas | Pop + brillo |
| | `complete` | Camino completo (Benji llega) | Fanfarria + woosh |
| **MagicABC** | `traceStart` | Empezar a trazar | Pop suave |
| | `traceTick` | Cada ~5 puntos trazados | Click rítmico |
| | `strokeDone` | Completar 1 trazo | Arpegio ascendente |
| | `letterDone` | Letra/palabra completa | Fanfarria completa |

---

### 3. Integración con Música de Fondo

```
Cuando suena un efecto importante:
  1. Bajar volumen de música a 20% (ducking)
  2. Reproducir efecto
  3. Subir volumen de música a 100% gradualmente (1s)
```

Ya implementado parcialmente en Aritmi. Generalizar a `music-player.js`.

---

### 4. Plan de Implementación

#### Fase 1: Módulo base `audio-fx.js` (primero)

- [ ] Crear `assets/audio-fx.js` con el catálogo completo de sonidos
- [ ] Probar en todos los navegadores (Chrome, Safari, Firefox)
- [ ] Asegurar compatibilidad móvil (AudioContext.resume en gesto de usuario)
- [ ] Tamaño objetivo: < 6 KB

#### Fase 2: Integrar en cada juego (uno por vez)

- [ ] **MagicABC**: Ya tiene AudioFX propio → migrar a `audio-fx.js` + añadir `traceStart`, `traceTick`
- [ ] **Color Fun**: Añadir `flip`, `match`, `mismatch`, `levelUp`, `tap`
- [ ] **Aritmi**: Añadir `correct`, `wrong`, `thinking`, `tap`
- [ ] **Benji al Rescate**: Añadir `rotate`, `connect`, `complete`, `tap`

#### Fase 3: Pulido

- [ ] Ducking de música en `music-player.js`
- [ ] Volumen maestro ajustable (control parental)
- [ ] Modo "solo música" / "solo efectos" / "todo" / "silencio"
- [ ] Probar con niños reales (Benjamín y mamá)

---

### 5. Sonidos por Juego — Matriz Completa

| Evento | MagicABC | Color Fun | Aritmi | Benji |
|--------|:--------:|:---------:|:------:|:-----:|
| **UI** |
| Tap botón | ✅ | ✅ | ✅ | ✅ |
| Cerrar modal | ✅ | ✅ | ✅ | ✅ |
| **Gameplay** |
| Acción principal | `traceStart` | `flip` | `correct` | `rotate` |
| Progreso | `traceTick` | — | `thinking` | `connect` |
| Éxito parcial | `strokeDone` | `match` | — | — |
| Éxito total | `letterDone` | `levelUp` | `levelUp` | `complete` |
| Error / fallo | `trazoReintento` | `mismatch` | `wrong` | — |
| **Progresión** |
| Subir nivel | `levelUp` | `levelUp` | `levelUp` | `levelUp` |
| Game Over | — | `gameOver` | `gameOver` | `gameOver` |
| **Cosmético** |
| Moneda/estrella | `star` | `star` | `star` | `star` |
| Confeti | `pop`×N | `pop`×N | `pop`×N | `pop`×N |

---

### 6. API del Módulo `audio-fx.js`

```javascript
// Carga: <script src="../assets/audio-fx.js"></script>

// Activación (requerido en móvil — llamar en primer click/toque)
AudioFX.init();

// Sonidos UI
AudioFX.tap();           // Click de botón
AudioFX.back();          // Cerrar/volver

// Sonidos de juego
AudioFX.success();       // Éxito genérico (acierto)
AudioFX.error();         // Error suave (fallo)
AudioFX.star();          // Moneda/estrella ganada
AudioFX.levelUp();       // Subir de nivel (fanfarria)
AudioFX.gameOver();      // Perder (secuencia triste)
AudioFX.countdown();     // 3...2...1...¡Ya!
AudioFX.pop();           // Pop (cartas, apariciones)
AudioFX.woosh();         // Transición entre pantallas

// Sonidos específicos
AudioFX.flip();          // Voltear carta (Color Fun)
AudioFX.match();         // Par correcto (Color Fun)
AudioFX.mismatch();      // Par incorrecto (Color Fun)
AudioFX.correct();       // Respuesta correcta (Aritmi)
AudioFX.wrong();         // Respuesta incorrecta (Aritmi)
AudioFX.rotate();        // Girar pieza (Benji)
AudioFX.connect();       // Conectar camino (Benji)
AudioFX.traceStart();    // Empezar trazo (MagicABC)
AudioFX.traceTick();     // Punto trazado (MagicABC)

// Control
AudioFX.setMasterVolume(0.5);  // 0.0 a 1.0
AudioFX.setEnabled(false);     // Silenciar efectos
```

---

### 7. Tamaño y Rendimiento

| Recurso | Tamaño | Nota |
|---------|--------|------|
| `audio-fx.js` | ~5 KB | Web Audio API, sin archivos |
| Música de fondo | ~15-30 MB total | 12 tracks MP3 (cache bajo demanda) |
| Efectos MP3 legacy | ~500 KB | "Yippee!" (a eliminar tras migrar) |

**Ventaja de Web Audio API**:
- 0 archivos adicionales = 0 descargas = 0 latencia
- Síntesis en tiempo real = sonidos únicos cada vez
- Sin problemas de licencias (no son grabaciones, son algoritmos)

---

### 8. Prioridad

| Prioridad | Tarea | Tiempo estimado |
|:---------:|-------|:--------------:|
| 🔴 P1 | Crear `assets/audio-fx.js` | 30 min |
| 🔴 P1 | Integrar en los 3 juegos sin efectos | 45 min |
| 🟡 P2 | Migrar MagicABC a `audio-fx.js` | 20 min |
| 🟡 P2 | Ducking de música | 15 min |
| 🟢 P3 | Control de volumen maestro | 15 min |
| 🟢 P3 | Eliminar MP3 legacy ("Yippee!") | 5 min |

---

*Documento generado con los skills: `audio-fx-generator`, `game-progression-system`, `kids-ux-design`*
