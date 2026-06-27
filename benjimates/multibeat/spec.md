# 🎵 MultiBeat — Tablas de Multiplicar con Ritmo · Spec v1.0

> **Juego**: Tablas de multiplicar con ritmo musical y patrones visuales
> **Nombre**: MultiBeat = Multiplicación + Beat (ritmo en inglés)
> **Carpeta**: `benjimates/multibeat/`

---

## 1. Visión

Aprender las tablas de multiplicar mediante **ritmo musical**. El niño escucha la tabla cantada, la repite, y luego responde preguntas al ritmo de la música. Sin presión, con alegría. Como un karaoke matemático.

---

## 2. Mecánica

### 2.1 Modos de Juego

| Modo | Descripción |
|------|-------------|
| 🎧 **Escucha** | La tabla se canta con ritmo. El niño escucha y ve los números aparecer. |
| 🎤 **Repite** | El niño toca los números al ritmo. Como seguir la letra de una canción. |
| ❓ **Pregunta** | "3 × 7 = ?". Toca la respuesta antes de que termine el compás. |
| ⚡ **Veloz** | Preguntas cada vez más rápidas. ¡A ver hasta dónde llegas! |

### 2.2 Ritmo Musical

Cada tabla tiene un **tempo base** (BPM) y un **patrón rítmico**:

```
Tabla del 2:   🥁 2×1=2  🥁 2×2=4  🥁 2×3=6 ...
               ♪   ♩     ♪   ♩     ♪   ♩
```

| Tabla | BPM | Género musical |
|:-----:|:---:|----------------|
| 2 | 90 | Pop alegre |
| 3 | 95 | Reggaeton infantil |
| 4 | 85 | Rock suave |
| 5 | 100 | Samba |
| 6 | 90 | Hip-hop |
| 7 | 95 | Cumbia |
| 8 | 85 | Electrónica |
| 9 | 100 | Funk |
| 10 | 90 | Marcha |

### 2.3 Visual

Cada número aparece como un **bloque de color** que crece con el resultado:
- Resultados pequeños → bloques pequeños
- Resultados grandes → bloques grandes
- Patrones visuales: la tabla del 5 forma una escalera, la del 9 forma una pirámide

---

## 3. Progresión

| Nivel | Tabla(s) | Modo | Velocidad |
|:-----:|----------|------|:---------:|
| 1 | 2 | Escucha | Lento |
| 2 | 2, 3 | Repite | Lento |
| 3 | 4, 5 | Pregunta | Medio |
| 4 | 6, 7 | Pregunta | Medio |
| 5 | 8, 9 | Veloz | Rápido |
| 6 | 10 | Veloz | Rápido |
| 7 | Mezcla (2-5) | Veloz | Muy rápido |
| 8 | Mezcla (6-10) | Veloz | Experto |

---

## 4. UI

```
┌──────────────────────────────┐
│ ☰  Tabla del 3  ⭐ 45  👤  │
├──────────────────────────────┤
│                              │
│    🎵 3 × 1 = 3  🟩         │
│    🎵 3 × 2 = 6  🟩🟩       │
│    🎵 3 × 3 = 9  🟩🟩🟩     │  ← Bloques visuales
│    🎵 3 × 4 = ?  ⬜⬜⬜⬜   │  ← Pregunta actual
│                              │
│    [3] [6] [9] [12]          │  ← Opciones (botones grandes)
│                              │
│    ████████░░░░ 60%          │  ← Progreso
│                              │
│    🎧 Escucha | 🎤 Repite    │  ← Selector de modo
└──────────────────────────────┘
```

---

## 5. Audio

- **Voz cantada**: TTS con pitch variable para simular canto
- **Ritmo de fondo**: Web Audio API — patrón de percusión simple (kick, snare, hi-hat)
- **Acierto**: `AudioFX.success()` + campanita japonesa
- **Error**: sonido suave, sin castigo
- **Música**: tracks alegres del MusicPlayer

---

## 6. Motor de Ritmo

```javascript
class RhythmEngine {
  constructor(bpm) {
    this.bpm = bpm;
    this.beatDuration = 60000 / bpm; // ms por beat
  }
  
  // Reproducir patrón rítmico
  playPattern(table, onBeat) {
    // table: número de la tabla (2-10)
    // onBeat: callback con (i, result) en cada beat
    for (let i = 1; i <= 10; i++) {
      const delay = (i - 1) * this.beatDuration * 2; // 2 beats por multiplicación
      setTimeout(() => {
        this.playClick(); // sonido de metrónomo
        onBeat(i, table * i);
      }, delay);
    }
  }
}
```

---

## 7. Stack

- HTML5 + CSS3 + vanilla JS (single file)
- Web Audio API (ritmo + efectos)
- TTS (voces)
- Google Fonts: Baloo 2
- Assets compartidos: `audio-fx.js`, `motivational-voices.js`, `music-player.js`, `user-system.js`
