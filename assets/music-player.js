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
    { 
      id: 'happykids', 
      name: '😊 Kids Happy', 
      src: '../assets/kids-happy-loop.mp3',
      emoji: '😊'
    },
    { 
      id: 'fungame', 
      name: '🎮 Fun Game', 
      src: '../assets/kids-fun-game.mp3',
      emoji: '🎮'
    },
    { 
      id: 'calmpiano', 
      name: '🎹 Calm Piano', 
      src: '../assets/kids-calm-piano.mp3',
      emoji: '🎹'
    },
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
      <div class="music-panel-item music-panel-mute" data-action="mute">🔇 Silenciar</div>
      <div class="music-panel-list"></div>
    `;
    _panelEl.style.cssText = `
      position: absolute;
      background: #ffffff;
      border-radius: 16px;
      padding: 8px;
      z-index: 9999;
      min-width: 200px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.2);
      display: none;
      font-family: 'Baloo 2', cursive, sans-serif;
      border: 1px solid #e5e7eb;
    `;

    // Botón de silenciar
    const muteBtn = _panelEl.querySelector('.music-panel-mute');
    muteBtn.style.cssText = `
      display: block;
      width: 100%;
      padding: 10px 14px;
      margin-bottom: 4px;
      border: none;
      border-radius: 12px;
      background: #fef2f2;
      color: #ef4444;
      font-family: 'Baloo 2', cursive, sans-serif;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      text-align: left;
      transition: all 0.15s ease;
    `;
    muteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      pause();
      _hidePanel();
    });

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
        margin-bottom: 4px;
        border: none;
        border-radius: 12px;
        background: #f3f4f6;
        color: #374151;
        font-family: 'Baloo 2', cursive, sans-serif;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        text-align: left;
        transition: all 0.15s ease;
      `;
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        switchTrack(track.id);
        _hidePanel();
      });
      
      item.addEventListener('mouseenter', () => {
        if (track.id !== _currentTrackId || !_isPlaying) {
          item.style.background = '#e5e7eb';
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
      if (item.dataset.trackId === _currentTrackId && _isPlaying) {
        item.style.background = '#ede9fe';
        item.style.color = '#7c3aed';
        item.style.fontWeight = '800';
      } else {
        item.style.background = '#f3f4f6';
        item.style.color = '#374151';
        item.style.fontWeight = '600';
      }
    });
  }

  function _positionPanel() {
    if (!_panelEl || !_btnEl) return;
    const btnRect = _btnEl.getBoundingClientRect();
    const panelWidth = 200;
    
    // Posicionar debajo del botón, alineado a la derecha
    let top = btnRect.bottom + 6;
    let left = btnRect.right - panelWidth;
    
    // Si se sale por la izquierda, alinear a la izquierda del botón
    if (left < 8) left = btnRect.left;
    
    // Si se sale por la derecha, ajustar
    if (left + panelWidth > window.innerWidth - 8) {
      left = window.innerWidth - panelWidth - 8;
    }
    
    // Si se sale por abajo, mostrar arriba del botón
    if (top + 200 > window.innerHeight - 8) {
      top = btnRect.top - 210;
    }
    
    _panelEl.style.top = top + 'px';
    _panelEl.style.left = left + 'px';
  }

  function _showPanel() {
    if (!_panelEl) _createPanel();
    _updatePanelUI();
    _positionPanel();
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

    // Encontrar el botón
    _btnEl = document.getElementById(buttonElementId);
    if (!_btnEl) {
      console.warn('MusicPlayer: no se encontró el botón con id:', buttonElementId);
      return;
    }

    // Reemplazar para limpiar event listeners previos
    const newBtn = _btnEl.cloneNode(true);
    _btnEl.parentNode.replaceChild(newBtn, _btnEl);
    _btnEl = newBtn;

    // NO forzar CSS — respetar el estilo del juego
    _updateButtonUI();

    // Click = abrir/cerrar selector de canciones
    _btnEl.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      _togglePanel();
    });

    // Auto-reproducir si estaba sonando antes
    if (state.wasPlaying) {
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

    // Reposicionar panel al hacer scroll o resize
    window.addEventListener('scroll', () => {
      if (_panelVisible) _positionPanel();
    }, { passive: true });
    window.addEventListener('resize', () => {
      if (_panelVisible) _positionPanel();
    }, { passive: true });
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
