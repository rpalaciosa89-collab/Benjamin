---
name: game-progression-system
description: >
  Diseña y codifica sistemas de progresión, niveles, dificultad, recompensas y 
  economía de juego para juegos infantiles. Activa este skill cuando el usuario 
  mencione: niveles, dificultad, copas, trofeos, estrellas, vidas, puntos, racha, 
  recompensas, "que suba de nivel", "que sea más difícil", "premiar al niño",
  "sistema de logros", "guardar progreso". También úsalo para balancear la curva
  de dificultad cuando el juego ya existe pero se siente muy fácil o muy difícil.
---

# Game Progression System

Diseña y genera el código del sistema de progresión completo: niveles, dificultad
adaptativa, recompensas, vidas y persistencia de progreso.

---

## 1. Curva de Dificultad

### Principio: "Easy to learn, hard to master"
La dificultad debe subir siguiendo una curva suave, no escalones bruscos.

```
Percepción de dificultad
  │                                        ★ Nivel máximo
  │                              ╱─────────
  │                         ╱───╱
  │                    ╱───╱
  │               ╱───╱
  │          ╱───╱
  │     ╱───╱
  │ ───╱  ← Zona de comodidad (primeros 2 niveles)
  └─────────────────────────────────────── Tiempo
```

### Variables de dificultad por tipo de juego

#### Juegos de Memoria
| Variable | Nivel 1 | Nivel 3 | Nivel 5 | Nivel 7+ |
|----------|---------|---------|---------|---------|
| Pares | 2 | 4 | 8 | 10 |
| Tiempo de vista previa (ms) | 4000 | 3000 | 2000 | 1500 |
| Tiempo para voltear fallidos (ms) | 1200 | 1000 | 800 | 600 |

#### Quiz / Matemáticas
| Variable | Nivel 1 | Nivel 3 | Nivel 5 | Nivel 7+ |
|----------|---------|---------|---------|---------|
| Tiempo por pregunta (s) | Sin límite | 20 | 12 | 8 |
| Opciones de respuesta | 2 | 3 | 4 | 4 |
| Rango numérico | 1–5 | 1–10 | 1–20 | 1–100 |

#### Arcade / Reacción
| Variable | Nivel 1 | Nivel 3 | Nivel 5 | Nivel 7+ |
|----------|---------|---------|---------|---------|
| Velocidad objetos | 1x | 1.5x | 2x | 3x |
| Objetos simultáneos | 1 | 2 | 3 | 5 |
| Tiempo de reacción requerido (ms) | 2000 | 1500 | 1000 | 700 |

---

## 2. Sistema de Vidas

```javascript
class SistemaVidas {
  constructor(vidasIniciales = 5) {
    this.total = vidasIniciales;
    this.actuales = vidasIniciales;
  }

  perderVida(onAnimacion, onGameOver) {
    if (this.actuales <= 0) return;
    this.actuales--;
    onAnimacion(this.actuales);          // Animar el corazón que se pierde
    if (this.actuales === 0) {
      setTimeout(onGameOver, 800);       // Esperar animación antes de Game Over
    }
    return this.actuales;
  }

  renderizar(contenedor) {
    contenedor.innerHTML = '';
    for (let i = 0; i < this.total; i++) {
      const corazon = document.createElement('span');
      corazon.className = 'vida' + (i >= this.actuales ? ' vida--perdida' : '');
      corazon.textContent = i < this.actuales ? '❤️' : '🖤';
      contenedor.appendChild(corazon);
    }
  }

  // Llama esto al renderizar la vida perdida
  animarPerdida(indice) {
    const corazones = document.querySelectorAll('.vida');
    const corazon = corazones[indice];
    if (corazon) {
      corazon.classList.add('vida--shake');
      setTimeout(() => corazon.classList.remove('vida--shake'), 600);
    }
  }
}
```

CSS para vidas:
```css
.vida { font-size: 2rem; transition: all 0.3s; display: inline-block; }
.vida--perdida { filter: grayscale(1); opacity: 0.4; transform: scale(0.8); }
.vida--shake {
  animation: shakeLoss 0.5s ease;
}
@keyframes shakeLoss {
  0%,100% { transform: scale(1); }
  20% { transform: scale(1.4) rotate(-10deg); }
  40% { transform: scale(0.8) rotate(10deg); }
  60% { transform: scale(1.2) rotate(-5deg); }
  80% { transform: scale(0.9) rotate(5deg); }
}
```

---

## 3. Sistema de Copas y Trofeos

```javascript
const COPAS = [
  { nivel: 1, icon: '🥉', nombre: 'Copa Bronce',    color: '#cd7f32', mensaje: '¡Bien hecho!' },
  { nivel: 2, icon: '🥉', nombre: 'Copa Bronce II',  color: '#cd7f32', mensaje: '¡Sigue así!' },
  { nivel: 3, icon: '🥈', nombre: 'Copa Plata',      color: '#c0c0c0', mensaje: '¡Eres genial!' },
  { nivel: 4, icon: '🥈', nombre: 'Copa Plata II',   color: '#c0c0c0', mensaje: '¡Qué listo/a!' },
  { nivel: 5, icon: '🥇', nombre: 'Copa Oro',        color: '#ffd700', mensaje: '¡Increíble!' },
  { nivel: 6, icon: '🥇', nombre: 'Copa Oro II',     color: '#ffd700', mensaje: '¡Campeón/a!' },
  { nivel: 7, icon: '💎', nombre: 'Trofeo Diamante', color: '#b9f2ff', mensaje: '¡Eres una estrella!' },
  { nivel: 8, icon: '🏆', nombre: 'Trofeo Legendario', color: '#ff6b6b', mensaje: '¡LEYENDA!' },
];

class SistemaCopas {
  constructor() {
    this.ganadas = this.cargar();
  }

  ganar(nivel) {
    const copa = COPAS[Math.min(nivel - 1, COPAS.length - 1)];
    if (!this.ganadas.find(c => c.nivel === nivel)) {
      this.ganadas.push({ ...copa, nivel, fecha: Date.now() });
      this.guardar();
    }
    return copa;
  }

  guardar() {
    localStorage.setItem('copas_juego', JSON.stringify(this.ganadas));
  }

  cargar() {
    try {
      return JSON.parse(localStorage.getItem('copas_juego')) || [];
    } catch { return []; }
  }

  renderizarPanel(contenedor) {
    contenedor.innerHTML = this.ganadas
      .map(c => `<span class="copa" title="${c.nombre}" style="--copa-color:${c.color}">${c.icon}</span>`)
      .join('');
  }
}
```

---

## 4. Persistencia de Progreso

```javascript
const Progreso = {
  guardar(estado) {
    const datos = {
      nivel: estado.nivel,
      vidas: estado.vidas,
      copas: estado.copas,
      fechaGuardado: Date.now(),
    };
    localStorage.setItem('progreso_juego', JSON.stringify(datos));
  },

  cargar() {
    try {
      const datos = JSON.parse(localStorage.getItem('progreso_juego'));
      if (!datos) return null;
      // Expirar progreso guardado hace más de 24h (opcional)
      if (Date.now() - datos.fechaGuardado > 86400000) {
        this.borrar();
        return null;
      }
      return datos;
    } catch { return null; }
  },

  borrar() {
    localStorage.removeItem('progreso_juego');
  }
};
```

---

## 5. Dificultad Adaptativa (Avanzado)

Para juegos más sofisticados, ajusta la dificultad según el rendimiento:

```javascript
class DificultadAdaptativa {
  constructor() {
    this.historialAciertos = [];   // true/false últimos 10 intentos
    this.ventana = 10;
  }

  registrar(acerto) {
    this.historialAciertos.push(acerto);
    if (this.historialAciertos.length > this.ventana) {
      this.historialAciertos.shift();
    }
  }

  get tasaAcierto() {
    if (this.historialAciertos.length === 0) return 0.5;
    return this.historialAciertos.filter(Boolean).length / this.historialAciertos.length;
  }

  get multiplicadorDificultad() {
    const tasa = this.tasaAcierto;
    if (tasa > 0.85) return 1.2;   // Demasiado fácil → acelerar
    if (tasa < 0.40) return 0.8;   // Demasiado difícil → desacelerar
    return 1.0;                     // Zona óptima
  }

  // Usa esto para ajustar tiempos, velocidades, etc.
  ajustar(valorBase) {
    return Math.round(valorBase * this.multiplicadorDificultad);
  }
}
```

---

## 6. Pantalla de Victoria de Nivel

```javascript
function mostrarVictoria(nivel, copa, onSiguiente) {
  const overlay = document.getElementById('overlay-victoria');
  overlay.innerHTML = `
    <div class="victoria-card">
      <div class="copa-animada">${copa.icon}</div>
      <h2>${copa.nombre}</h2>
      <p class="mensaje-victoria">${copa.mensaje}</p>
      <p class="nivel-completado">¡Nivel ${nivel} completado!</p>
      <button class="btn-siguiente" onclick="onSiguienteNivel()">
        ¡Siguiente nivel! →
      </button>
    </div>
  `;
  overlay.classList.add('visible');
  lanzarConfetti();   // → Ver audio-fx-generator para confetti
}
```

---

## Salida esperada

Al terminar produce:
1. Tabla de configuración de niveles completa para el juego
2. Código JS de `SistemaVidas`, `SistemaCopas`, `Progreso`
3. CSS de animaciones de vidas
4. Función `mostrarVictoria()`
5. → Integrar en `html5-game-engine`
