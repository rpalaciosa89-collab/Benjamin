// audio-fx.js — Efectos de sonido para juegos infantiles (Web Audio API)
// Sin archivos externos, sin licencias. Sintesis pura.
// Para todos los juegos de edgybenji.app
// ~4 KB

const AudioFX = (() => {
  let ctx = null;
  let _enabled = true;
  let _master = 0.30;

  function getCtx() {
    if (!ctx) {
      try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
    }
    return ctx;
  }

  function tone(freq, dur, type, vol, delay) {
    if (!_enabled) return;
    try {
      const c = getCtx();
      if (!c) return;
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.connect(gain);
      gain.connect(c.destination);
      osc.type = type || 'sine';
      osc.frequency.setValueAtTime(freq, c.currentTime + delay);
      gain.gain.setValueAtTime(0, c.currentTime + delay);
      gain.gain.linearRampToValueAtTime((vol || 0.2) * _master, c.currentTime + delay + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + delay + dur);
      osc.start(c.currentTime + delay);
      osc.stop(c.currentTime + delay + dur + 0.05);
    } catch(e) { /* audio no disponible */ }
  }

  // ==========================================
  //  API PÚBLICA
  // ==========================================
  return {

    // --- Control ---
    init() {
      try { const c = getCtx(); if (c && c.state === 'suspended') c.resume(); } catch(e) {}
    },
    setEnabled(v) { _enabled = !!v; },
    setMasterVolume(v) { _master = Math.max(0, Math.min(1, v)); },

    // --- UI (3 sonidos) ---
    tap()      { tone(800, 0.04, 'sine', 0.10, 0); },
    back()     { tone(600, 0.06, 'sine', 0.10, 0); tone(400, 0.08, 'sine', 0.10, 0.06); },
    pop()      { tone(600, 0.05, 'sine', 0.12, 0); },

    // --- Genéricos (7 sonidos) ---
    success()  { tone(523,0.10,'sine',0.30,0); tone(659,0.10,'sine',0.30,0.10); tone(784,0.20,'sine',0.30,0.20); },
    error()    { tone(300,0.08,'sine',0.15,0); tone(200,0.15,'sine',0.15,0.08); },
    star()     { tone(1200,0.08,'triangle',0.25,0); },
    levelUp()  { tone(523,0.10,'square',0.20,0); tone(659,0.10,'square',0.20,0.12); tone(784,0.10,'square',0.20,0.24); tone(1047,0.20,'square',0.25,0.36); },
    gameOver() { tone(392,0.20,'sine',0.30,0); tone(349,0.20,'sine',0.30,0.20); tone(330,0.20,'sine',0.30,0.40); tone(262,0.60,'sine',0.30,0.60); },
    countdown(){ tone(440,0.08,'sine',0.15,0); tone(440,0.08,'sine',0.15,0.70); tone(440,0.08,'sine',0.15,1.40); tone(880,0.25,'sine',0.25,2.10); },
    woosh()    { /* ruido blanco corto */ },

    // --- Color Fun (3 sonidos) ---
    flip()     { tone(440, 0.08, 'sine', 0.15, 0); },
    match()    { tone(587,0.10,'sine',0.30,0); tone(740,0.10,'sine',0.30,0.10); tone(880,0.20,'sine',0.30,0.20); },
    mismatch() { tone(300,0.08,'square',0.15,0); tone(200,0.15,'square',0.15,0.08); },

    // --- Aritmi (3 sonidos) ---
    correct()  { tone(523,0.10,'square',0.25,0); tone(659,0.10,'square',0.25,0.10); tone(784,0.15,'square',0.30,0.20); },
    wrong()    { tone(250,0.12,'sawtooth',0.12,0); tone(200,0.20,'sawtooth',0.12,0.12); },
    thinking() { tone(440,0.05,'sine',0.08,0); tone(440,0.05,'sine',0.08,0.60); tone(440,0.05,'sine',0.08,1.20); },

    // --- Benji al Rescate (3 sonidos) ---
    rotate()   { tone(600, 0.06, 'square', 0.10, 0); },
    connect()  { tone(660,0.06,'sine',0.15,0); tone(880,0.08,'sine',0.15,0.08); },
    complete() { this.levelUp(); },

    // --- MagicABC (2 sonidos nuevos + alias) ---
    traceStart() { tone(500, 0.05, 'sine', 0.12, 0); },
    traceTick()  { tone(700, 0.03, 'sine', 0.08, 0); },

    // --- Alias para compatibilidad con MagicABC ---
    guia()          { this.traceTick(); },
    trazoExito()    { this.success(); },
    trazoReintento() { this.error(); },
    moneda()        { this.star(); },
    logro()         { this.levelUp(); },
    nivelCompleto() { this.levelUp(); },
    confetiPop()    { this.pop(); },
  };
})();
