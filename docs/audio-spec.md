# Especificación de Cambios: Sistema de Audio Unificado

> **Versión**: 1.0 · **Fecha**: 2026-06-26  
> **Archivos a modificar**: 6 · **Archivos a crear**: 1

---

## Resumen

| Qué | Cómo | Tamaño |
|-----|------|:------:|
| Crear `assets/audio-fx.js` | Módulo IIFE con Web Audio API | ~5 KB |
| Modificar 4 juegos | Añadir `<script src>` + reemplazar `successSound` | +1 línea c/u |
| Eliminar dependencia MP3 | Quitar `new Audio('floraphonic-...mp3')` | −1 línea c/u |

---

## SPEC 1: `assets/audio-fx.js` (NUEVO)

### Ubicación
```
/Users/raymondpalacios/Benjamin/assets/audio-fx.js
```

### Estructura

```javascript
// assets/audio-fx.js — Efectos de sonido sintetizados (Web Audio API)
// Sin archivos externos, sin licencias. Para todos los juegos de edgybenji.app.

const AudioFX = (() => {
  let ctx = null;
  let _enabled = true;
  let _masterVolume = 0.3;

  function ctx() { /* lazy init AudioContext */ }
  function tone(freq, dur, type, vol, delay) { /* sintesis base */ }
  function noise(dur, vol, delay) { /* ruido blanco */ }

  return {
    // === Control ===
    init() { /* AudioContext.resume() - llamar en primer click */ },
    setEnabled(v) { _enabled = v; },
    setMasterVolume(v) { _masterVolume = v; },

    // === UI (3 sonidos) ===
    tap()      { tone(800, 0.04, 'sine', 0.10); },
    back()     { tone(600, 0.06, 'sine', 0.10, 0); tone(400, 0.08, 'sine', 0.10, 0.06); },
    pop()      { tone(600, 0.05, 'sine', 0.12); },

    // === Genéricos (7 sonidos) ===
    success()  { tone(523,0.1,'sine',0.3,0); tone(659,0.1,'sine',0.3,0.1); tone(784,0.2,'sine',0.3,0.2); },
    error()    { tone(300,0.08,'sine',0.15,0); tone(200,0.15,'sine',0.15,0.08); },
    star()     { tone(1200, 0.08, 'triangle', 0.25); },
    levelUp()  { tone(523,0.1,'square',0.2,0); tone(659,0.1,'square',0.2,0.12); tone(784,0.1,'square',0.2,0.24); tone(1047,0.2,'square',0.25,0.36); },
    gameOver() { tone(392,0.2,'sine',0.3,0); tone(349,0.2,'sine',0.3,0.2); tone(330,0.2,'sine',0.3,0.4); tone(262,0.6,'sine',0.3,0.6); },

    // === Color Fun (3 sonidos) ===
    flip()     { tone(440, 0.08, 'sine', 0.15); },
    match()    { tone(587,0.1,'sine',0.3,0); tone(740,0.1,'sine',0.3,0.1); tone(880,0.2,'sine',0.3,0.2); },
    mismatch() { tone(300,0.08,'square',0.15,0); tone(200,0.15,'square',0.15,0.08); },

    // === Aritmi (3 sonidos) ===
    correct()  { tone(523,0.1,'square',0.25,0); tone(659,0.1,'square',0.25,0.1); tone(784,0.15,'square',0.3,0.2); },
    wrong()    { tone(250,0.12,'sawtooth',0.12,0); tone(200,0.2,'sawtooth',0.12,0.12); },
    thinking() { tone(440,0.05,'sine',0.1,0); tone(440,0.05,'sine',0.1,0.6); tone(440,0.05,'sine',0.1,1.2); },

    // === Benji al Rescate (3 sonidos) ===
    rotate()   { tone(600, 0.06, 'square', 0.10); },
    connect()  { tone(660,0.06,'sine',0.15,0); tone(880,0.08,'sine',0.15,0.08); },
    complete() { AudioFX.levelUp(); },  // alias

    // === MagicABC (2 sonidos NUEVOS) ===
    traceStart() { tone(500, 0.05, 'sine', 0.12); },
    traceTick()  { tone(700, 0.03, 'sine', 0.08); },
  };
})();
```

### Notas de implementación
- `AudioFX.init()` DEBE llamarse en el primer evento `click`/`touchstart` del usuario (iOS/Android requieren gesto para AudioContext)
- Todos los métodos tienen `try/catch` — si el audio falla, el juego sigue
- Volumen base 0.10–0.30 para no asustar niños
- `_enabled` permite silenciar efectos sin afectar música de fondo

---

## SPEC 2: `color-fun/index.html`

### Cambio A — Añadir script (línea ~335, después de `music-player.js`)

```diff
 <script src="../assets/music-player.js"></script>
+<script src="../assets/audio-fx.js"></script>
```

### Cambio B — Eliminar `successSound` MP3 (línea 338)

```diff
-    const successSound = new Audio('floraphonic-woman-excited-cheers-and-phrases-says-yippee-2-186752.mp3');
```

### Cambio C — Inicializar AudioFX (línea ~362, junto a MusicPlayer.init)

```diff
         MusicPlayer.init('music-btn');
+        AudioFX.init();
```

### Cambio D — Reemplazar sonido de éxito (líneas 532-533)

```diff
-            successSound.currentTime = 0;
-            successSound.play().catch(e => console.log("Audio play failed", e));
+            AudioFX.match();
```

### Cambio E — Añadir sonido de voltear tarjeta

En la función que voltea la tarjeta (buscar `flipCard` o `card.classList.add('flipped')`), añadir:
```javascript
AudioFX.flip();
```

### Cambio F — Añadir sonido de error (par incorrecto)

En la función que maneja par incorrecto, añadir:
```javascript
AudioFX.mismatch();
```

### Cambio G — Añadir sonido de subir nivel

En la función que muestra el modal de victoria, añadir:
```javascript
AudioFX.levelUp();
```

### Cambio H — Añadir `tap` en botones

En event listeners de botones (siguiente nivel, reiniciar, etc.), añadir:
```javascript
AudioFX.tap();
```

---

## SPEC 3: `aritmi/index.html`

### Cambio A — Añadir script (línea ~377)

```diff
 <script src="../assets/music-player.js"></script>
+<script src="../assets/audio-fx.js"></script>
```

### Cambio B — Eliminar `successSound` MP3 (línea 381)

```diff
-    const successSound = new Audio('../color-fun/floraphonic-woman-excited-cheers-and-phrases-says-yippee-2-186752.mp3');
```

### Cambio C — Inicializar AudioFX (línea ~423)

```diff
         MusicPlayer.init('music-btn');
+        AudioFX.init();
```

### Cambio D — Reemplazar sonido de éxito + ducking (líneas 508-521)

```diff
-            try { const a = MusicPlayer.getAudio(); if (a && !a.paused) a.volume = 0.2; } catch(e) {}
-            successSound.currentTime = 0;
-            successSound.play().then(() => {
-                setTimeout(() => {
-                    speakText(`${currentProblem.a} más ${currentProblem.b} es ${currentProblem.result}`);
-                }, 100);
-            }).catch(e => console.log("Audio play failed", e));
-            setTimeout(() => {
-                try { const a = MusicPlayer.getAudio(); if (a) a.volume = 1.0; } catch(e) {}
-                showWinModal();
-            }, 2000);
+            AudioFX.correct();
+            setTimeout(() => {
+                speakText(`${currentProblem.a} más ${currentProblem.b} es ${currentProblem.result}`);
+            }, 100);
+            setTimeout(() => showWinModal(), 2000);
```

### Cambio E — Añadir sonido de respuesta incorrecta

En la función que maneja respuesta incorrecta, añadir:
```javascript
AudioFX.wrong();
```

### Cambio F — Añadir sonido de subir nivel

En la función que muestra el modal de victoria, añadir:
```javascript
AudioFX.levelUp();
```

### Cambio G — Añadir `tap` en botones

En event listeners de botones de respuesta, añadir:
```javascript
AudioFX.tap();
```

---

## SPEC 4: `benji-al-rescate/index.html`

### Cambio A — Añadir script (línea ~330)

```diff
 <script src="../assets/music-player.js"></script>
+<script src="../assets/audio-fx.js"></script>
```

### Cambio B — Eliminar `successSound` MP3 (línea 333)

```diff
-    const successSound = new Audio('../color-fun/floraphonic-woman-excited-cheers-and-phrases-says-yippee-2-186752.mp3');
```

### Cambio C — Inicializar AudioFX (línea ~358)

```diff
     MusicPlayer.init('music-btn');
+    AudioFX.init();
```

### Cambio D — Reemplazar sonido al ganar (líneas 403-404)

```diff
-            successSound.currentTime = 0;
-            successSound.play().catch(e => console.log("Audio play failed", e));
+            AudioFX.complete();
```

### Cambio E — Añadir sonido de girar pieza

En la función que gira una pieza del camino (`rotateTile` o similar), añadir:
```javascript
AudioFX.rotate();
```

### Cambio F — Añadir sonido de conectar

En la función que detecta conexión de 2 piezas, añadir:
```javascript
AudioFX.connect();
```

### Cambio G — Añadir `tap` en botones

En event listeners de botones (siguiente nivel, reiniciar), añadir:
```javascript
AudioFX.tap();
```

---

## SPEC 5: `magic-abc/index.html` (migración)

### Cambio A — Añadir script (línea ~340, después de `letter-paths.js`)

```diff
 <script src="letter-paths.js"></script>
+<script src="../assets/audio-fx.js"></script>
```

### Cambio B — Eliminar módulo AudioFX local (líneas 604-636)

```diff
-const AudioFX = (() => {
-    let ctx = null;
-    function getCtx() { ... }
-    function tone(freq, dur, type, vol, delay) { ... }
-    return {
-        guia() { ... },
-        trazoExito() { ... },
-        trazoReintento() { ... },
-        moneda() { ... },
-        logro() { ... },
-        nivelCompleto() { ... },
-        confetiPop() { ... }
-    };
-})();
```

### Cambio C — Reemplazar llamadas (Mapa de migración)

| Antes | Ahora |
|-------|-------|
| `AudioFX.guia()` | `AudioFX.traceTick()` |
| `AudioFX.trazoExito()` | `AudioFX.success()` |
| `AudioFX.trazoReintento()` | `AudioFX.error()` |
| `AudioFX.moneda()` | `AudioFX.star()` |
| `AudioFX.logro()` | `AudioFX.levelUp()` |
| `AudioFX.nivelCompleto()` | `AudioFX.levelUp()` |
| `AudioFX.confetiPop()` | `AudioFX.pop()` |

### Cambio D — Inicializar (en DOMContentLoaded)

```diff
     UserSystem.renderProfileBadge('profile-badge');
     MusicPlayer.init('music-btn');
+    AudioFX.init();
```

### Cambio E — Añadir `traceStart` al empezar trazo

En `handleStart`, después de `traceState.isDrawing = true`:
```javascript
AudioFX.traceStart();
```

---

## SPEC 6: `sw.js` — Actualizar precache

```diff
 const PRECACHE = [
   './',
   ...
   './assets/music-player.js',
   './assets/user-system.js',
+  './assets/audio-fx.js',
   './aritmi/index.html',
   ...
 ];
```

Y bumpear CACHE_NAME: `edgy-benji-v17` → `edgy-benji-v18`

---

## Plan de Ejecución

| Paso | Archivo | Acción | Est. tiempo |
|:----:|---------|--------|:----------:|
| 1 | `assets/audio-fx.js` | CREAR | 20 min |
| 2 | `color-fun/index.html` | 8 cambios | 10 min |
| 3 | `aritmi/index.html` | 7 cambios | 10 min |
| 4 | `benji-al-rescate/index.html` | 7 cambios | 10 min |
| 5 | `magic-abc/index.html` | 5 cambios + eliminar ~30 líneas | 15 min |
| 6 | `sw.js` | precache + bump v18 | 1 min |
| **Total** | | | **~65 min** |

---

## Validación Post-Implementación

- [ ] Cada juego carga sin errores de consola
- [ ] `AudioFX.init()` se llama en primer toque
- [ ] `AudioFX.tap()` suena al tocar botones
- [ ] Sonidos de éxito/error suenan en el momento correcto
- [ ] La música de fondo no interfiere con los efectos
- [ ] Probar en Chrome + Safari + Firefox
- [ ] Probar en iOS Safari (AudioContext requiere gesto)
- [ ] El MP3 `floraphonic-...mp3` ya no se referencia desde ningún HTML
- [ ] El archivo `floraphonic-...mp3` se puede eliminar de `color-fun/`

---

*Especificación generada con `audio-fx-generator` + `game-progression-system` skills.*
