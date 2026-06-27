// motivational-voices.js — Voces animadas de apoyo para niños
// Usa SpeechSynthesis para frases motivacionales en español
// + sonido "Yippee!" (MP3) para celebraciones
// Para todos los juegos de edgybenji.app

const MotiVoice = (() => {
  let _enabled = true;
  let _voice = null;
  let _volume = 0.8;
  let _rate = 1.1;
  let _pitch = 1.4; // más agudo = más animado
  
  // Sonido Yippee! clásico
  const yippeeAudio = new Audio('../assets/yippee.mp3');
  yippeeAudio.volume = 0.6;

  // Frases por categoría
  const FRASES = {
    // 🎉 Victoria / éxito
    win: [
      '¡Yupiii!',
      '¡Perfecto!',
      '¡Eres un genio!',
      '¡Muy bien!',
      '¡Excelente!',
      '¡Bravo!',
      '¡Eso es!',
      '¡Lo lograste!',
      '¡Qué bien lo haces!',
      '¡Increíble!',
    ],
    // 💪 Ánimo / motivación
    encourage: [
      '¡Vamos, tú puedes!',
      '¡Sigue así!',
      '¡No te rindas!',
      '¡Tú eres el mejor!',
      '¡Vas muy bien!',
      '¡Adelante!',
      '¡Con todo!',
      '¡Eres imparable!',
    ],
    // 😅 Casi / intentar de nuevo
    almost: [
      '¡Casi! Intenta de nuevo',
      '¡Uy, por poquito!',
      '¡No pasa nada! Otra vez',
      '¡Tú puedes! Una vez más',
      '¡Esa no era! Sigue intentando',
    ],
    // ⭐ Subir de nivel
    levelUp: [
      '¡Nuevo nivel!',
      '¡Vas subiendo!',
      '¡Cada vez mejor!',
      '¡Eres un campeón!',
      '¡A por el siguiente!',
    ],
    // 👋 Bienvenida / inicio
    welcome: [
      '¡A jugar!',
      '¡Empecemos!',
      '¡Vamos a divertirnos!',
      '¡Tú puedes con todo!',
    ],
  };

  // Buscar la mejor voz en español
  function findBestVoice() {
    const voices = speechSynthesis.getVoices();
    // Preferir voces nativas alegres
    const prefs = ['Paulina', 'Mónica', 'Sandy', 'Flo'];
    for (const pref of prefs) {
      const v = voices.find(v => v.name.includes(pref) && v.lang.startsWith('es'));
      if (v) return v;
    }
    // Cualquier voz en español
    return voices.find(v => v.lang.startsWith('es')) || voices[0];
  }

  function getVoice() {
    if (!_voice) _voice = findBestVoice();
    if (!_voice || !speechSynthesis.getVoices().includes(_voice)) {
      _voice = findBestVoice();
    }
    return _voice;
  }

  function speak(text, rate, pitch) {
    if (!_enabled) return;
    try {
      speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = 'es-MX';
      msg.voice = getVoice();
      msg.rate = rate || _rate;
      msg.pitch = pitch || _pitch;
      msg.volume = _volume;
      speechSynthesis.speak(msg);
    } catch(e) { /* TTS no disponible */ }
  }

  function randomPhrase(category) {
    const list = FRASES[category] || FRASES.encourage;
    return list[Math.floor(Math.random() * list.length)];
  }

  return {
    init() {
      // Precargar voces
      speechSynthesis.getVoices();
      speechSynthesis.onvoiceschanged = () => { _voice = null; };
    },

    setEnabled(v) { _enabled = !!v; },

    // --- API principal ---

    /** Celebración: sonido yippee + frase aleatoria de victoria */
    celebrate() {
      try { yippeeAudio.currentTime = 0; yippeeAudio.play().catch(() => {}); } catch(e) {}
      setTimeout(() => speak(randomPhrase('win'), 1.0, 1.5), 300);
    },

    /** Ánimo durante el juego */
    cheer() {
      speak(randomPhrase('encourage'), 1.1, 1.3);
    },

    /** Cuando casi acierta */
    almost() {
      speak(randomPhrase('almost'), 0.95, 1.2);
    },

    /** Al subir de nivel */
    levelUp() {
      setTimeout(() => speak(randomPhrase('levelUp'), 1.0, 1.4), 500);
    },

    /** Bienvenida al empezar */
    welcome() {
      setTimeout(() => speak(randomPhrase('welcome'), 0.9, 1.3), 800);
    },

    /** Frase personalizada */
    say(text, rate, pitch) {
      speak(text, rate, pitch);
    },

    /** Solo el sonido yippee (sin voz) */
    yippee() {
      try { yippeeAudio.currentTime = 0; yippeeAudio.play().catch(() => {}); } catch(e) {}
    },

    /** Silenciar voces (no afecta yippee) */
    mute() { _enabled = false; },
    unmute() { _enabled = true; },
  };
})();
