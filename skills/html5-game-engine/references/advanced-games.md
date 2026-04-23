# Catálogo de Juegos Avanzados — Antigravity

Referencia de arquitecturas para juegos más complejos. Usa este documento
cuando el usuario quiera crear juegos más allá de la memoria básica.

---

## 🎯 Juegos de Nivel Intermedio

### 1. Suma Rápida (6–9 años)
**Mecánica**: Se muestra una operación. El niño toca la respuesta correcta entre 4 opciones. Hay límite de tiempo por pregunta.
**Skills**: `kids-game-architect` → `game-progression-system` → `html5-game-engine` → `audio-fx-generator`
**Complejidad estimada**: Media
**Prompt clave**: "Juego de matemáticas con operaciones aleatorias, 4 opciones, timer visible y niveles de dificultad"

### 2. Sopa de Letras Animada (7–10 años)
**Mecánica**: Grid de letras. El niño arrastra para seleccionar palabras ocultas horizontales/verticales.
**Skills**: `kids-game-architect` → `kids-ux-design` → `html5-game-engine`
**Complejidad estimada**: Alta
**Prompt clave**: "Sopa de letras táctil con palabras temáticas, palabras resaltadas al encontrarlas y sistema de pistas"

### 3. Simon Says Musical (5–8 años)
**Mecánica**: 4 botones de colores emiten secuencias de sonido+color. El niño repite la secuencia en orden.
**Skills**: `kids-game-architect` → `audio-fx-generator` → `html5-game-engine`
**Complejidad estimada**: Media
**Prompt clave**: "Juego Simon Says con 4 colores, sonido único por color, secuencia que crece con cada ronda"

### 4. Clasificador de Animales (5–7 años)
**Mecánica**: Aparecen animales. El niño los arrastra a la categoría correcta (mar/tierra/aire).
**Skills**: `kids-game-architect` → `kids-ux-design` → `html5-game-engine`
**Complejidad estimada**: Media
**Prompt clave**: "Juego de clasificación drag-and-drop con categorías visuales, feedback animado y progresión"

---

## 🏆 Juegos de Nivel Avanzado

### 5. Multiplicaciones Épicas (8–12 años)
**Mecánica**: Quiz de tablas de multiplicar con sistema de racha, multiplicador de puntos y modo contrarreloj.
**Skills**: Todos los skills
**Nuevos elementos**: Sistema de racha, multiplicador de puntos, leaderboard local (localStorage)
**Complejidad estimada**: Alta

```javascript
// Sistema de racha
const sistemaRacha = {
  actual: 0,
  record: 0,
  multiplicador: [1, 1, 1.5, 2, 3, 5], // x puntos según racha
  
  acertar() {
    this.actual++;
    this.record = Math.max(this.record, this.actual);
    return this.multiplicadorActual;
  },
  
  fallar() { this.actual = 0; },
  
  get multiplicadorActual() {
    return this.multiplicador[Math.min(this.actual, this.multiplicador.length - 1)];
  }
};
```

### 6. Cuento Interactivo (6–10 años)
**Mecánica**: Historia ilustrada con emojis que avanza según decisiones del niño. Cada elección lleva a un camino diferente.
**Skills**: `kids-game-architect` → `kids-ux-design` → `html5-game-engine`
**Nuevos elementos**: Árbol de decisiones, múltiples finales, colección de finales desbloqueados

```javascript
// Estructura de nodo narrativo
const HISTORIA = {
  id: 'inicio',
  texto: '¡Un dragón aparece! ¿Qué haces?',
  imagen: '🐉',
  opciones: [
    { texto: 'Huir', emoji: '🏃', siguiente: 'huir' },
    { texto: 'Hablar', emoji: '💬', siguiente: 'hablar' },
    { texto: 'Luchar', emoji: ⚔️', siguiente: 'luchar' },
  ]
};
```

### 7. Constructor de Palabras (6–9 años)
**Mecánica**: Letras desordenadas que el niño ordena arrastrando para formar la palabra indicada. Con pistas visuales.
**Skills**: Todos los skills
**Complejidad estimada**: Alta

### 8. Geografía Divertida (9–12 años)
**Mecánica**: Mapa SVG interactivo. El niño toca el país/ciudad correcto según una pista. Niveles por continente.
**Skills**: Todos los skills + SVG avanzado
**Complejidad estimada**: Muy alta
**Nota**: Requiere assets SVG de mapas (se puede generar con D3 simplificado)

---

## 🔧 Componentes Reutilizables

### Timer Visible
```javascript
class Timer {
  constructor(segundos, onTick, onExpira) {
    this.total = segundos;
    this.restante = segundos;
    this.onTick = onTick;
    this.onExpira = onExpira;
    this._interval = null;
  }

  iniciar() {
    this._interval = setInterval(() => {
      this.restante--;
      this.onTick(this.restante, this.total);
      if (this.restante <= 0) {
        clearInterval(this._interval);
        this.onExpira();
      }
    }, 1000);
  }

  detener() { clearInterval(this._interval); }
  reiniciar() { this.detener(); this.restante = this.total; }

  // CSS del timer visual
  static css() {
    return `
      .timer-bar {
        height: 12px;
        background: #eee;
        border-radius: 6px;
        overflow: hidden;
        width: 100%;
      }
      .timer-fill {
        height: 100%;
        background: linear-gradient(90deg, #4ECDC4, #FFE66D, #FF6B6B);
        border-radius: 6px;
        transition: width 1s linear;
      }
      .timer-fill.urgente { background: #FF6B6B; animation: pulsar 0.5s infinite; }
    `;
  }
}
```

### Leaderboard Local
```javascript
const Leaderboard = {
  obtener(juego) {
    try {
      return JSON.parse(localStorage.getItem(`lb_${juego}`)) || [];
    } catch { return []; }
  },

  agregar(juego, nombre, puntos) {
    const lb = this.obtener(juego);
    lb.push({ nombre, puntos, fecha: Date.now() });
    lb.sort((a, b) => b.puntos - a.puntos);
    const top10 = lb.slice(0, 10);
    localStorage.setItem(`lb_${juego}`, JSON.stringify(top10));
    return top10;
  },

  renderizar(juego, contenedor) {
    const lb = this.obtener(juego);
    contenedor.innerHTML = lb.length === 0
      ? '<p>¡Sé el primero en el ranking!</p>'
      : lb.map((e, i) => `
          <div class="lb-fila">
            <span class="lb-pos">${['🥇','🥈','🥉'][i] || (i+1)+'º'}</span>
            <span class="lb-nombre">${e.nombre}</span>
            <span class="lb-pts">${e.puntos} pts</span>
          </div>
        `).join('');
  }
};
```

### Selector de Nombre/Avatar (para modo multijugador local)
```javascript
function mostrarSelectorJugador(onConfirm) {
  const avatares = ['🦊','🐼','🦁','🐨','🐸','🦋','🐙','🦄'];
  // Genera modal con teclado simple y selección de avatar
  // → Al confirmar llama onConfirm({ nombre, avatar })
}
```

---

## Roadmap de Capacidades

| Capacidad | Status | Skill requerida |
|-----------|--------|----------------|
| Juegos single-player HTML5 | ✅ Listo | `html5-game-engine` |
| Sistema de vidas + copas | ✅ Listo | `game-progression-system` |
| Audio Web API | ✅ Listo | `audio-fx-generator` |
| Persistencia localStorage | ✅ Listo | `game-progression-system` |
| Drag & Drop táctil | 🔄 Incluido en html5-game-engine | — |
| Leaderboard local | ✅ Disponible arriba | — |
| Timer visual | ✅ Disponible arriba | — |
| Modo 2 jugadores (misma pantalla) | 🔄 Posible con extensión | — |
| Integración con Phaser.js | 🟡 Para juegos arcade avanzados | A crear |
| Backend / multijugador online | 🔴 Requiere servidor | Fuera de scope |
