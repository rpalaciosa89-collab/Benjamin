/**
 * 🎵 Edgy Benji Music Player — Compartido entre todos los juegos
 * 
 * Uso: Agregar <script src="../assets/music-player.js"></script> antes del </body>
 * 
 * Características:
 * - Playlist de canciones seleccionable
 * - Persistencia en localStorage (canción elegida + estado play/pause)
 * - UI de selector de canciones integrable en cualquier juego
 * - Compatible con todos los juegos existentes
 */

const MusicPlayer = (() => {
  // ==========================================
  //  PLAYLIST  (agrega más canciones aquí)
  // ==========================================
  const PLAYLIST = [
    { 
      id: 'alegre', 
      name: '🎵 Música Alegre', 
      src: '../assets/bg_music.mp3',
      emoji: '🎵'
    },
    { 
      id: 'beatit', 
      name: '🕺 Beat It', 
      src: '../assets/Beat_It.mp3',
      emoji: '🎸'
    },
    { 
      id: 'billiejean', 
      name: '🕺 Billie Jean', 
      src: '../assets/Billie_Jean.mp3',
      emoji: '🪩'
    },
    // Para agregar más canciones:
    // { id: 'otra', name: '🎸 Rock Divertido', src: '../assets/rock-song.mp3', emoji: '🎸' },
  ];

  // ==========================================
  //  ESTADO INTERNO
  // ==========================================
  let _audio = null;
  let _currentTrackId = null;
  let _isPlaying = false;
  let _panelVisible = false;
  let _panelEl = null;
  let _btnEl = null;
  let _initialized = false;

  // ==========================================
  //  PERSISTENCIA (localStorage)
  // ==========================================
  function _saveState() {
    try {
      localStorage.setItem('edgybenji_music_track', _currentTrackId || 'alegre');
      localStorage.setItem('edgybenji_music_playing', _isPlaying ? '1' : '0');
    } catch (e) { /* storage no disponible */ }
  }

  function _loadState() {
    try {
      const track = localStorage.getItem('edgybenji_music_track');
      const playing = localStorage.getItem('edgybenji_music_playing');
      return {
        trackId: track || 'alegre',
        wasPlaying: playing === '1',
      };
    } catch (e) {
      return { trackId: 'alegre', wasPlaying: false };
    }
  }

  function _getTrack(id) {
    return PLAYLIST.find(t => t.id === id) || PLAYLIST[0];
  }

  // ==========================================
  //  REPRODUCCIÓN
  // ==========================================
  function _createAudio(src) {
    if (_audio) {
      _audio.pause();
      _audio.src = '';
      _audio.load();
      _audio = null;
    }
    _audio = new Audio(src);
    _audio.loop = true;
    _audio.volume = 1.0;
    
    // Intentar reproducir (puede fallar si no hay interacción previa)
    const playPromise = _audio.play();
    if (playPromise) {
      playPromise.then(() => {
        _isPlaying = true;
        _updateButtonUI();
      }).catch(() => {
        _isPlaying = false;
        _updateButtonUI();
      });
    }
  }

  function play() {
    if (!_audio) {
      const track = _getTrack(_currentTrackId);
      _createAudio(track.src);
    } else {
      const playPromise = _audio.play();
      if (playPromise) {
        playPromise.then(() => {
          _isPlaying = true;
          _updateButtonUI();
          _saveState();
        }).catch(() => {});
      }
    }
  }

  function pause() {
    if (_audio) {
      _audio.pause();
    }
    _isPlaying = false;
    _updateButtonUI();
    _saveState();
  }

  function toggle() {
    if (_isPlaying) {
      pause();
    } else {
      // Necesitamos interacción del usuario para audio
      play();
    }
  }

  function switchTrack(trackId) {
    if (trackId === _currentTrackId) return;
    _currentTrackId = trackId;
    const track = _getTrack(trackId);
    _createAudio(track.src);
    _isPlaying = true;
    _updateButtonUI();
    _updatePanelUI();
    _saveState();
  }

  function setVolume(vol) {
    if (_audio) {
      _audio.volume = Math.max(0, Math.min(1, vol));
    }
  }

  function getAudio() {
    return _audio;
  }

  // ==========================================
  //  UI — BOTÓN
  // ==========================================
  function _updateButtonUI() {
    if (!_btnEl) return;
    const track = _getTrack(_currentTrackId);
    _btnEl.innerHTML = _isPlaying ? `${track.emoji}` : '🔇';
    _btnEl.title = _isPlaying 
      ? `${track.name} — Pausar / Cambiar canción` 
      : 'Música apagada — Toca para encender';
  }

  // ==========================================
  //  UI — PANEL SELECTOR
  // ==========================================
  function _createPanel() {
    if (_panelEl) return;
    
    _panelEl = document.createElement('div');
    _panelEl.className = 'music-panel';
    _panelEl.innerHTML = `
      <div class="music-panel-header">🎵 Elige la música</div>
      <div class="music-panel-list"></div>
    `;
    _panelEl.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 16px;
      background: rgba(30,10,60,0.95);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 20px;
      padding: 16px;
      z-index: 9999;
      min-width: 220px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.5);
      display: none;
      font-family: 'Baloo 2', cursive, sans-serif;
    `;

    const header = _panelEl.querySelector('.music-panel-header');
    header.style.cssText = `
      color: #fff;
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 12px;
      text-align: center;
    `;

    const list = _panelEl.querySelector('.music-panel-list');
    PLAYLIST.forEach(track => {
      const item = document.createElement('button');
      item.className = 'music-panel-item';
      item.dataset.trackId = track.id;
      item.innerHTML = `${track.emoji} ${track.name}`;
      item.style.cssText = `
        display: block;
        width: 100%;
        padding: 10px 14px;
        margin-bottom: 6px;
        border: 2px solid rgba(255,255,255,0.15);
        border-radius: 14px;
        background: rgba(255,255,255,0.08);
        color: #fff;
        font-family: 'Baloo 2', cursive, sans-serif;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        text-align: left;
        transition: all 0.2s ease;
      `;
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        switchTrack(track.id);
        _hidePanel();
      });
      
      item.addEventListener('mouseenter', () => {
        if (track.id !== _currentTrackId) {
          item.style.background = 'rgba(255,255,255,0.18)';
          item.style.borderColor = 'rgba(255,255,255,0.4)';
        }
      });
      item.addEventListener('mouseleave', () => {
        _updatePanelUI();
      });
      
      list.appendChild(item);
    });

    document.body.appendChild(_panelEl);

    // Cerrar panel al tocar fuera
    document.addEventListener('click', (e) => {
      if (_panelVisible && _panelEl && !_panelEl.contains(e.target) && e.target !== _btnEl) {
        _hidePanel();
      }
    });
  }

  function _updatePanelUI() {
    if (!_panelEl) return;
    const items = _panelEl.querySelectorAll('.music-panel-item');
    items.forEach(item => {
      if (item.dataset.trackId === _currentTrackId) {
        item.style.background = 'rgba(124,58,237,0.5)';
        item.style.borderColor = '#a78bfa';
        item.style.fontWeight = '800';
      } else {
        item.style.background = 'rgba(255,255,255,0.08)';
        item.style.borderColor = 'rgba(255,255,255,0.15)';
        item.style.fontWeight = '600';
      }
    });
  }

  function _showPanel() {
    if (!_panelEl) _createPanel();
    _updatePanelUI();
    _panelEl.style.display = 'block';
    _panelVisible = true;
  }

  function _hidePanel() {
    if (_panelEl) {
      _panelEl.style.display = 'none';
    }
    _panelVisible = false;
  }

  function _togglePanel() {
    if (_panelVisible) {
      _hidePanel();
    } else {
      _showPanel();
    }
  }

  // ==========================================
  //  INICIALIZACIÓN
  // ==========================================
  function init(buttonElementId) {
    if (_initialized) return;
    _initialized = true;

    // Cargar preferencia guardada
    const state = _loadState();
    _currentTrackId = state.trackId;

    // Encontrar o crear el botón
    _btnEl = document.getElementById(buttonElementId);
    if (!_btnEl) {
      console.warn('MusicPlayer: no se encontró el botón con id:', buttonElementId);
      return;
    }

    // Reemplazar comportamiento del botón existente
    const newBtn = _btnEl.cloneNode(true);
    _btnEl.parentNode.replaceChild(newBtn, _btnEl);
    _btnEl = newBtn;

    _updateButtonUI();

    // Click = toggle play/pause
    _btnEl.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle();
    });

    // Doble click o long press = abrir selector de canciones
    let longPressTimer;
    _btnEl.addEventListener('touchstart', (e) => {
      longPressTimer = setTimeout(() => {
        e.preventDefault();
        _togglePanel();
      }, 500);
    });
    _btnEl.addEventListener('touchend', () => {
      clearTimeout(longPressTimer);
    });
    _btnEl.addEventListener('touchmove', () => {
      clearTimeout(longPressTimer);
    });

    // Click derecho o doble click en desktop
    _btnEl.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      _togglePanel();
    });
    _btnEl.addEventListener('dblclick', (e) => {
      e.preventDefault();
      e.stopPropagation();
      _togglePanel();
    });

    // Auto-reproducir si estaba sonando antes
    if (state.wasPlaying) {
      // Intentamos en la primera interacción del usuario
      const startOnInteraction = () => {
        const track = _getTrack(_currentTrackId);
        _createAudio(track.src);
        _isPlaying = true;
        _updateButtonUI();
        document.removeEventListener('click', startOnInteraction);
        document.removeEventListener('touchstart', startOnInteraction);
      };
      document.addEventListener('click', startOnInteraction, { once: true });
      document.addEventListener('touchstart', startOnInteraction, { once: true });
    }

    // CSS para el botón (por si el juego no lo tiene)
    _btnEl.style.cssText = `
      position: fixed;
      top: 16px;
      right: 16px;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(255,255,255,0.15);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 2px solid rgba(255,255,255,0.25);
      font-size: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 9998;
      transition: all 0.2s ease;
      user-select: none;
      -webkit-user-select: none;
      -webkit-tap-highlight-color: transparent;
    `;
  }

  // ==========================================
  //  API PÚBLICA
  // ==========================================
  return {
    init,
    play,
    pause,
    toggle,
    switchTrack,
    setVolume,
    getAudio,
    get isPlaying() { return _isPlaying; },
    get currentTrack() { return _getTrack(_currentTrackId); },
    PLAYLIST,
  };
})();
