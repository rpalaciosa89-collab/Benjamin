/**
 * 👤 EduGenius User System — Gestión de perfiles y progreso
 * 
 * Uso: <script src="../assets/user-system.js"></script>
 * 
 * Características:
 * - Hasta 4 perfiles de niño (gratis)
 * - Progreso independiente por perfil y por juego
 * - Modo invitado (sin guardar)
 * - Preparado para membresías (Fase 3)
 * - localStorage, migrable a API en Fase 3
 */

const UserSystem = (() => {
  const STORAGE_KEY = 'edgybenji_users';
  const ACTIVE_KEY = 'edgybenji_active_user';
  const MAX_PROFILES = 4;

  // Avatares disponibles para niños
  const AVATARS = ['🐶', '🦊', '🐼', '🦁', '🐨', '🐸', '🦋', '🦄'];

  // ==========================================
  //  PERFILES
  // ==========================================
  function _loadAll() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) { return []; }
  }

  function _saveAll(profiles) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
    } catch (e) { /* storage lleno */ }
  }

  function _generateId() {
    return 'u' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  function getProfiles() {
    return _loadAll();
  }

  function getProfile(id) {
    return _loadAll().find(p => p.id === id) || null;
  }

  function createProfile(nombre, avatar) {
    const profiles = _loadAll();
    if (profiles.length >= MAX_PROFILES) {
      return { error: `Máximo ${MAX_PROFILES} perfiles (versión gratuita)` };
    }
    if (!nombre || nombre.trim().length === 0) {
      return { error: 'El nombre no puede estar vacío' };
    }
    if (nombre.trim().length > 12) {
      return { error: 'El nombre es muy largo (máx. 12 letras)' };
    }
    if (!AVATARS.includes(avatar)) {
      avatar = AVATARS[0];
    }

    const perfil = {
      id: _generateId(),
      nombre: nombre.trim(),
      avatar: avatar,
      fechaCreacion: Date.now(),
      progreso: {},
      membresia: 'free',
    };

    profiles.push(perfil);
    _saveAll(profiles);
    setActiveUser(perfil.id);
    return { perfil };
  }

  function deleteProfile(id) {
    const profiles = _loadAll().filter(p => p.id !== id);
    _saveAll(profiles);
    // Si era el activo, limpiar
    if (getActiveUserId() === id) {
      clearActiveUser();
    }
  }

  function updateProfile(id, data) {
    const profiles = _loadAll();
    const idx = profiles.findIndex(p => p.id === id);
    if (idx === -1) return false;
    profiles[idx] = { ...profiles[idx], ...data };
    _saveAll(profiles);
    return true;
  }

  // ==========================================
  //  USUARIO ACTIVO
  // ==========================================
  function setActiveUser(id) {
    try {
      localStorage.setItem(ACTIVE_KEY, id);
    } catch (e) {}
  }

  function getActiveUserId() {
    try {
      return localStorage.getItem(ACTIVE_KEY) || null;
    } catch (e) { return null; }
  }

  function getActiveProfile() {
    const id = getActiveUserId();
    if (!id) return null;
    return getProfile(id);
  }

  function clearActiveUser() {
    try {
      localStorage.removeItem(ACTIVE_KEY);
    } catch (e) {}
  }

  function isGuest() {
    return getActiveUserId() === null;
  }

  // ==========================================
  //  PROGRESO POR JUEGO
  // ==========================================
  function getProgress(gameId) {
    const id = getActiveUserId();
    if (!id) return {}; // invitado
    const profile = getProfile(id);
    if (!profile) return {};
    return profile.progreso[gameId] || {};
  }

  function saveProgress(gameId, data) {
    const id = getActiveUserId();
    if (!id) return false; // invitado — no guardar

    const profiles = _loadAll();
    const profile = profiles.find(p => p.id === id);
    if (!profile) return false;

    if (!profile.progreso) profile.progreso = {};
    profile.progreso[gameId] = {
      ...profile.progreso[gameId],
      ...data,
      ultimaSesion: Date.now(),
    };
    _saveAll(profiles);
    return true;
  }

  // ==========================================
  //  UI — Componentes reutilizables
  // ==========================================
  function renderProfileBadge(containerOrId) {
    const container = typeof containerOrId === 'string'
      ? document.getElementById(containerOrId)
      : containerOrId;
    if (!container) return;

    const profile = getActiveProfile();
    if (profile) {
      container.innerHTML = `
        <span style="font-size:24px;line-height:1;">${profile.avatar}</span>
        <span style="font-size:14px;font-weight:700;color:#374151;margin-left:6px;">${profile.nombre}</span>
      `;
      container.style.cssText = `
        display: flex;
        align-items: center;
        gap: 2px;
        padding: 4px 10px;
        background: #f3f4f6;
        border-radius: 50px;
        cursor: pointer;
        font-family: 'Baloo 2', cursive, sans-serif;
        max-width: 140px;
        overflow: hidden;
        white-space: nowrap;
      `;
      container.title = 'Toca para cambiar de perfil';
      container.addEventListener('click', () => {
        window.location.href = '../index.html';
      });
    } else {
      container.innerHTML = '<span style="font-size:14px;color:#9ca3af;">👤 Invitado</span>';
      container.style.cssText = `
        display: flex;
        align-items: center;
        padding: 4px 10px;
        font-family: 'Baloo 2', cursive, sans-serif;
        cursor: pointer;
      `;
      container.title = 'Toca para crear un perfil';
      container.addEventListener('click', () => {
        window.location.href = '../index.html';
      });
    }
  }

  // ==========================================
  //  API PÚBLICA
  // ==========================================
  return {
    AVATARS,
    MAX_PROFILES,
    getProfiles,
    getProfile,
    createProfile,
    deleteProfile,
    updateProfile,
    setActiveUser,
    getActiveUserId,
    getActiveProfile,
    clearActiveUser,
    isGuest,
    getProgress,
    saveProgress,
    renderProfileBadge,
  };
})();
