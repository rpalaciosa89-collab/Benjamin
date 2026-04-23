---
name: audio-fx-generator
description: >
  Genera efectos de sonido para juegos infantiles usando la Web Audio API (sin archivos
  externos). Activa este skill cuando el usuario mencione: "sonidos", "efectos de sonido",
  "música", "que suene", "audio", "feedback auditivo", "sonido al acertar", "sonido al
  fallar", "fanfarria", "celebración con sonido". También activa este skill proactivamente
  al finalizar cualquier juego educativo — todos los juegos infantiles se benefician de
  audio. El audio hace que el feedback sea inmediato y satisfactorio para el niño.
---

# Audio FX Generator

Genera todos los efectos de sonido necesarios para un juego infantil usando la Web
Audio API nativa del navegador — sin archivos externos, sin dependencias.

---

## Arquitectura del Sistema de Audio

```javascript
// ============================
// SISTEMA DE AUDIO (Web Audio API)
// ============================

const Audio = (() => {
  let ctx = null;

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  }

  // Función base para crear un tono
  function tono(frecuencia, duracion, tipo = 'sine', volumen = 0.3, inicio = 0) {
    try {
      const c = getCtx();
      const osc = c.createOscillator();
      const gain = c.createGain();
      
      osc.connect(gain);
      gain.connect(c.destination);
      
      osc.type = tipo;
      osc.frequency.setValueAtTime(frecuencia, c.currentTime + inicio);
      
      gain.gain.setValueAtTime(0, c.currentTime + inicio);
      gain.gain.linearRampToValueAtTime(volumen, c.currentTime + inicio + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + inicio + duracion);
      
      osc.start(c.currentTime + inicio);
      osc.stop(c.currentTime + inicio + duracion);
    } catch (e) { /* Audio no disponible */ }
  }

  // Función base para ruido
  function ruido(duracion, volumen = 0.15, inicio = 0) {
    try {
      const c = getCtx();
      const bufferSize = c.sampleRate * duracion;
      const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      
      const source = c.createBufferSource();
      source.buffer = buffer;
      
      const gain = c.createGain();
      gain.gain.setValueAtTime(volumen, c.currentTime + inicio);
      gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + inicio + duracion);
      
      source.connect(gain);
      gain.connect(c.destination);
      source.start(c.currentTime + inicio);
    } catch (e) { /* Audio no disponible */ }
  }

  return {
    
    // ============================
    // VOLTEAR TARJETA
    // ============================
    voltear() {
      tono(440, 0.08, 'sine', 0.15);
    },

    // ============================
    // PAR CORRECTO / ACIERTO
    // ============================
    acierto() {
      tono(523, 0.1, 'sine', 0.3, 0.00);   // C5
      tono(659, 0.1, 'sine', 0.3, 0.10);   // E5
      tono(784, 0.2, 'sine', 0.3, 0.20);   // G5
    },

    // ============================
    // ERROR / PAR INCORRECTO
    // ============================
    error() {
      tono(300, 0.08, 'sine', 0.2, 0.00);
      tono(200, 0.15, 'sine', 0.2, 0.08);
    },

    // ============================
    // PERDER UNA VIDA
    // ============================
    perderVida() {
      tono(440, 0.1, 'sawtooth', 0.2, 0.00);
      tono(350, 0.1, 'sawtooth', 0.2, 0.10);
      tono(250, 0.3, 'sawtooth', 0.2, 0.20);
    },

    // ============================
    // VICTORIA DE NIVEL (fanfarria corta)
    // ============================
    victoria() {
      // Fanfarria ascendente
      const notas = [
        { f: 523, t: 0.00 }, // C5
        { f: 659, t: 0.12 }, // E5
        { f: 784, t: 0.24 }, // G5
        { f: 1047, t: 0.36 }, // C6
      ];
      notas.forEach(n => tono(n.f, 0.2, 'square', 0.25, n.t));
      // Acorde final
      setTimeout(() => {
        tono(523, 0.5, 'sine', 0.2);
        tono(659, 0.5, 'sine', 0.2);
        tono(784, 0.5, 'sine', 0.2);
      }, 500);
    },

    // ============================
    // VICTORIA ÉPICA (nivel 5+)
    // ============================
    victoriaEpica() {
      const notas = [
        { f: 523, t: 0.00 }, { f: 659, t: 0.10 }, { f: 784, t: 0.20 },
        { f: 1047, t: 0.30 }, { f: 1319, t: 0.40 }, { f: 1047, t: 0.55 },
        { f: 1319, t: 0.65 }, { f: 1568, t: 0.75 },
      ];
      notas.forEach(n => tono(n.f, 0.15, 'square', 0.2, n.t));
      setTimeout(() => {
        [523, 659, 784, 1047].forEach(f => tono(f, 1.0, 'sine', 0.15));
      }, 1000);
    },

    // ============================
    // GAME OVER
    // ============================
    gameOver() {
      tono(392, 0.2, 'sine', 0.3, 0.0);  // G4
      tono(349, 0.2, 'sine', 0.3, 0.2);  // F4
      tono(330, 0.2, 'sine', 0.3, 0.4);  // E4
      tono(262, 0.6, 'sine', 0.3, 0.6);  // C4
    },

    // ============================
    // CLIC / TAP UI
    // ============================
    clic() {
      tono(800, 0.05, 'sine', 0.1);
    },

    // ============================
    // COUNTDOWN (3...2...1)
    // ============================
    countdown() {
      tono(440, 0.1, 'sine', 0.2, 0.0);  // 3
      tono(440, 0.1, 'sine', 0.2, 1.0);  // 2
      tono(440, 0.1, 'sine', 0.2, 2.0);  // 1
      tono(880, 0.3, 'sine', 0.3, 3.0);  // ¡Ya!
    },

    // ============================
    // MÚSICA DE FONDO (loop simple)
    // ============================
    iniciarMusicaFondo() {
      if (this._musicaActiva) return;
      this._musicaActiva = true;
      this._tocarLoop();
    },

    _tocarLoop() {
      if (!this._musicaActiva) return;
      // Melodía simple y calmante
      const melodia = [
        { f: 523, t: 0.0 }, { f: 659, t: 0.5 }, { f: 784, t: 1.0 },
        { f: 659, t: 1.5 }, { f: 523, t: 2.0 }, { f: 440, t: 2.5 },
        { f: 523, t: 3.0 },
      ];
      melodia.forEach(n => tono(n.f, 0.4, 'sine', 0.05, n.t));
      this._loopTimeout = setTimeout(() => this._tocarLoop(), 3500);
    },

    detenerMusicaFondo() {
      this._musicaActiva = false;
      clearTimeout(this._loopTimeout);
    },

    // Activar contexto de audio (requerido en móvil tras gesto del usuario)
    activar() {
      try { getCtx().resume(); } catch(e) {}
    }
  };
})();

// Uso:
// Audio.activar();        // En el primer click del usuario
// Audio.voltear();        // Al voltear tarjeta
// Audio.acierto();        // Al encontrar un par
// Audio.error();          // Al fallar
// Audio.perderVida();     // Al perder corazón
// Audio.victoria();       // Al ganar nivel
// Audio.victoriaEpica();  // Al ganar nivel 5+
// Audio.gameOver();       // Al perder todas las vidas
// Audio.clic();           // Feedback de botones UI
```

---

## Tabla de Frecuencias de Referencia

| Nota | Frecuencia |
|------|-----------|
| C4 (Do4) | 262 Hz |
| D4 (Re4) | 294 Hz |
| E4 (Mi4) | 330 Hz |
| F4 (Fa4) | 349 Hz |
| G4 (Sol4) | 392 Hz |
| A4 (La4) | 440 Hz |
| B4 (Si4) | 494 Hz |
| C5 (Do5) | 523 Hz |
| E5 (Mi5) | 659 Hz |
| G5 (Sol5) | 784 Hz |
| C6 (Do6) | 1047 Hz |

---

## Notas de Implementación

1. **Activación mobile**: iOS y Android requieren que el AudioContext se active dentro de un evento de usuario. Agrega `Audio.activar()` en el primer botón que el usuario toca.

2. **Degradación graceful**: Todos los métodos tienen `try/catch`. Si el audio falla, el juego sigue funcionando sin errores.

3. **Volumen**: El volumen base es 0.15–0.3 para no asustar a los niños. No uses valores superiores a 0.5.

4. **Tipos de onda**:
   - `sine` → suave, musical, ideal para melodías y aciertos
   - `square` → videojuego retro, ideal para efectos
   - `sawtooth` → más áspero, ideal para errores/fallos
   - `triangle` → similar a sine pero más apagado

5. **Duración**: Mantén los sonidos cortos (< 500ms) salvo fanfarrias de victoria.
