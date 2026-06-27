// motivational-voices.js — Voces animadas + SFX energeticos para niños
// SFX descargados de Mixkit (licencia libre, sin atribucion requerida)
// TTS con cola para evitar solapamiento
// Para todos los juegos de edgybenji.app

const MotiVoice = (() => {
  let _enabled = true;
  let _voice = null;
  let _speaking = false;
  let _queue = [];

  // ===== SFX ENERGETICOS (Mixkit - libres de derechos) =====
  const sfx = {
    yippee:  new Audio('../assets/yippee.mp3'),
    cheer1:  new Audio('../assets/sfx-cheer-1.mp3'),
    cheer2:  new Audio('../assets/sfx-cheer-2.mp3'),
    cheer3:  new Audio('../assets/sfx-cheer-3.mp3'),
    kidsYay: new Audio('../assets/sfx-kids-yay.mp3'),
    crowd:   new Audio('../assets/sfx-crowd-cheer.mp3'),
    wow:     new Audio('../assets/sfx-wow.mp3'),
    cartoon: new Audio('../assets/sfx-cartoon-cheer.mp3'),
  };
  Object.values(sfx).forEach(a => { a.volume = 0.55; a.preload = 'auto'; });

  function playSFX(name) {
    try {
      const a = sfx[name];
      if (!a) return;
      a.currentTime = 0;
      a.play().catch(() => {});
    } catch(e) {}
  }

  // ===== COLA TTS (evita solapamiento - SIN cancel) =====
  function processQueue() {
    if (_speaking || _queue.length === 0) return;
    _speaking = true;
    const { text, rate, pitch, onEnd } = _queue.shift();
    try {
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = 'es-MX';
      msg.voice = getVoice();
      msg.rate = rate || 1.1;
      msg.pitch = pitch || 1.4;
      msg.volume = 0.8;
      msg.onend = () => { _speaking = false; if (onEnd) onEnd(); setTimeout(processQueue, 80); };
      msg.onerror = () => { _speaking = false; setTimeout(processQueue, 80); };
      speechSynthesis.speak(msg);
    } catch(e) { _speaking = false; setTimeout(processQueue, 80); }
  }

  function speak(text, rate, pitch, onEnd) {
    if (!_enabled) return;
    _queue.push({ text, rate, pitch, onEnd });
    processQueue();
  }

  // Cancelar todo y limpiar cola (para emergencias)
  function flush() {
    _queue = [];
    _speaking = false;
    try { speechSynthesis.cancel(); } catch(e) {}
  }

  // ===== VOZ ESPAÑOL =====
  function findBestVoice() {
    const voices = speechSynthesis.getVoices();
    const prefs = ['Paulina', 'Mónica', 'Sandy', 'Flo'];
    for (const pref of prefs) {
      const v = voices.find(v => v.name.includes(pref) && v.lang.startsWith('es'));
      if (v) return v;
    }
    return voices.find(v => v.lang.startsWith('es')) || voices[0];
  }

  function getVoice() {
    if (!_voice || !speechSynthesis.getVoices().includes(_voice)) {
      _voice = findBestVoice();
    }
    return _voice;
  }

  // ===== FRASES =====
  const FRASES = {
    win: [
      '¡Yupiii!', '¡Perfecto!', '¡Eres un genio!', '¡Muy bien!',
      '¡Excelente!', '¡Bravo!', '¡Eso es!', '¡Lo lograste!',
    ],
    encourage: [
      '¡Vamos, tú puedes!', '¡Sigue así!', '¡No te rindas!',
      '¡Tú eres el mejor!', '¡Vas muy bien!', '¡Adelante!',
    ],
    almost: [
      '¡Casi! Intenta de nuevo', '¡Uy, por poquito!',
      '¡No pasa nada! Otra vez', '¡Tú puedes! Una vez más',
    ],
    levelUp: [
      '¡Nuevo nivel!', '¡Vas subiendo!', '¡Cada vez mejor!',
      '¡Eres un campeón!', '¡A por el siguiente!',
    ],
  };

  function randomPhrase(category) {
    const list = FRASES[category] || FRASES.encourage;
    return list[Math.floor(Math.random() * list.length)];
  }

  function randomSFX() {
    const names = ['cheer1','cheer2','cheer3','kidsYay','wow','cartoon'];
    return names[Math.floor(Math.random() * names.length)];
  }

  return {
    init() {
      speechSynthesis.getVoices();
      speechSynthesis.onvoiceschanged = () => { _voice = null; };
    },
    setEnabled(v) { _enabled = !!v; },

    // --- 🎉 CELEBRACION (yippee + SFX aleatorio + voz) ---
    celebrate() {
      playSFX('yippee');
      setTimeout(() => playSFX(randomSFX()), 400);
      setTimeout(() => speak(randomPhrase('win'), 1.0, 1.5), 200);
    },

    // --- 🏆 GRAN CELEBRACION (crowd + yippee + cartoon) ---
    bigCelebrate() {
      playSFX('yippee');
      setTimeout(() => playSFX('crowd'), 300);
      setTimeout(() => playSFX(randomSFX()), 700);
      setTimeout(() => speak(randomPhrase('win'), 1.0, 1.5), 400);
    },

    // --- 💪 ANIMO (solo voz, sin SFX) ---
    cheer() {
      speak(randomPhrase('encourage'), 1.1, 1.3);
    },

    // --- 😅 CASI (solo voz) ---
    almost() {
      speak(randomPhrase('almost'), 0.95, 1.2);
    },

    // --- ⭐ SUBIR NIVEL (SFX + voz) ---
    levelUp() {
      playSFX(randomSFX());
      setTimeout(() => speak(randomPhrase('levelUp'), 1.0, 1.4), 200);
    },

    // --- 👋 BIENVENIDA ---
    welcome() {
      setTimeout(() => speak('¡A jugar!', 0.9, 1.3), 800);
    },

    // --- Solo SFX (sin voz) ---
    yippee() { playSFX('yippee'); },
    playRandomCheer() { playSFX(randomSFX()); },

    // --- Frase personalizada ---
    say(text, rate, pitch) { speak(text, rate, pitch); },

    mute() { _enabled = false; },
    unmute() { _enabled = true; },
    flush() { flush(); },  // cancelar todo y limpiar cola
  };
})();
