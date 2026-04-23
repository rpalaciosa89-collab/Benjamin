---
name: kids-ux-design
description: >
  Diseña la interfaz visual, paleta de colores, tipografía, animaciones y experiencia
  de usuario para juegos y apps infantiles. Activa este skill cuando el usuario pida:
  "que se vea bonito", "colores para niños", "animaciones", "diseño infantil",
  "pantalla de inicio", "que sea divertido visualmente", "estilo de juego",
  "que parezca un juego real", "UI para niños", "responsive para tablet",
  o cuando necesites mejorar la apariencia de un juego ya existente. También úsalo
  proactivamente antes de escribir el CSS de cualquier juego educativo.
---

# Kids UX Design

Produce el sistema de diseño completo — colores, tipografía, componentes, animaciones
y layout — para interfaces infantiles de alta calidad.

---

## 1. Sistema de Color

### Paletas predefinidas (elige según el tema del juego)

#### 🌈 Rainbow (uso general / memoria)
```css
:root {
  --color-bg-1: #667eea;
  --color-bg-2: #764ba2;
  --color-primario: #FF6B6B;
  --color-secundario: #4ECDC4;
  --color-acento: #FFE66D;
  --color-exito: #6BCB77;
  --color-error: #FF6B6B;
  --color-neutro: #F8F9FA;
  --color-texto: #2D3436;
  --color-texto-claro: #FFFFFF;
  --color-sombra: rgba(0,0,0,0.15);
}
```

#### 🌊 Ocean (matemáticas / ciencia)
```css
:root {
  --color-bg-1: #0099F7;
  --color-bg-2: #F11712;  /* forzar a azul profundo */
  --color-bg-1: #1a6bad;
  --color-bg-2: #0d4f8b;
  --color-primario: #00B4D8;
  --color-secundario: #90E0EF;
  --color-acento: #FFD166;
  --color-exito: #06D6A0;
  --color-error: #EF476F;
}
```

#### 🌿 Nature (animales / naturaleza)
```css
:root {
  --color-bg-1: #56ab2f;
  --color-bg-2: #a8e063;
  --color-primario: #FF9E00;
  --color-secundario: #58CC02;
  --color-acento: #FF4B2B;
  --color-exito: #58CC02;
  --color-error: #FF4B2B;
}
```

#### 🎠 Candy (juegos de letras / creatividad)
```css
:root {
  --color-bg-1: #f953c6;
  --color-bg-2: #b91d73;
  --color-primario: #FF61D2;
  --color-secundario: #FE9090;
  --color-acento: #72EDF2;
  --color-exito: #5EE7D0;
  --color-error: #FF6B6B;
}
```

---

## 2. Tipografía

### Fuentes recomendadas (Google Fonts)
```html
<!-- Opción A: Baloo 2 (la más legible para niños pequeños) -->
<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;800&display=swap" rel="stylesheet">

<!-- Opción B: Fredoka One (más divertida, solo una weight) -->
<link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet">

<!-- Opción C: Nunito (más neutra, buena para texto largo) -->
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap" rel="stylesheet">
```

### Escala tipográfica
```css
:root {
  --font-principal: 'Baloo 2', cursive;
  --text-xs:   0.75rem;   /* Etiquetas pequeñas */
  --text-sm:   1rem;      /* Texto secundario */
  --text-base: 1.25rem;   /* Texto normal */
  --text-lg:   1.75rem;   /* Títulos de sección */
  --text-xl:   2.5rem;    /* Título del juego */
  --text-emoji: 2.5rem;   /* Emojis en tarjetas */
  --text-emoji-lg: 3.5rem; /* Emojis grandes (copa, trofeo) */
}
```

---

## 3. Componentes Base

### Tarjeta de Juego (Memory Card)
```css
.tarjeta {
  width: min(120px, 22vw);
  height: min(120px, 22vw);
  cursor: pointer;
  perspective: 600px;
  border-radius: 16px;
}

.tarjeta-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 16px;
}

.tarjeta.volteada .tarjeta-inner,
.tarjeta.encontrada .tarjeta-inner {
  transform: rotateY(180deg);
}

.tarjeta-frente,
.tarjeta-atras {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-emoji);
  box-shadow: 0 4px 15px var(--color-sombra);
}

.tarjeta-atras {
  background: linear-gradient(135deg, var(--color-primario), var(--color-secundario));
  border: 3px solid rgba(255,255,255,0.4);
}

.tarjeta-frente {
  background: white;
  transform: rotateY(180deg);
  border: 3px solid var(--color-acento);
}

.tarjeta.encontrada .tarjeta-frente {
  background: linear-gradient(135deg, #d4edda, #c3e6cb);
  border-color: var(--color-exito);
  animation: encontradaPulse 0.5s ease;
}

@keyframes encontradaPulse {
  0%,100% { transform: rotateY(180deg) scale(1); }
  50%      { transform: rotateY(180deg) scale(1.1); }
}
```

### Botón Primario
```css
.btn-primario {
  background: linear-gradient(135deg, var(--color-primario), var(--color-secundario));
  color: white;
  border: none;
  border-radius: 50px;
  padding: 0.8em 2em;
  font-family: var(--font-principal);
  font-size: var(--text-lg);
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 6px 20px var(--color-sombra),
              0 3px 0 rgba(0,0,0,0.2);
  transition: all 0.15s ease;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.btn-primario:hover  { transform: translateY(-2px); box-shadow: 0 8px 25px var(--color-sombra); }
.btn-primario:active { transform: translateY(2px);  box-shadow: 0 2px 8px var(--color-sombra); }
```

### HUD (vidas + nivel + copas)
```css
.hud {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background: rgba(255,255,255,0.25);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  margin-bottom: 1.5rem;
  border: 2px solid rgba(255,255,255,0.4);
}

.hud-vidas { font-size: 1.6rem; letter-spacing: 4px; }
.hud-nivel {
  font-family: var(--font-principal);
  font-size: var(--text-lg);
  font-weight: 800;
  color: white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}
.hud-copas { font-size: 1.4rem; letter-spacing: 2px; }
```

---

## 4. Animaciones

### Animación de entrada (elementos al aparecer)
```css
@keyframes entradaArriba {
  from { opacity: 0; transform: translateY(-30px) scale(0.9); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes entradaAbajo {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes zoomIn {
  from { opacity: 0; transform: scale(0.5); }
  to   { opacity: 1; transform: scale(1); }
}

.animar-entrada { animation: entradaArriba 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
```

### Título flotante
```css
@keyframes flotar {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-10px); }
}
.titulo-flotante { animation: flotar 3s ease-in-out infinite; }
```

### Partículas de confetti (CSS puro)
```css
@keyframes caer {
  0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}

.confetti-pieza {
  position: fixed;
  width: 10px;
  height: 10px;
  border-radius: 2px;
  animation: caer linear forwards;
}
```

```javascript
function lanzarConfetti(cantidad = 50) {
  const colores = ['#FF6B6B','#FFE66D','#4ECDC4','#6BCB77','#FF8FB1','#A8DAFF'];
  for (let i = 0; i < cantidad; i++) {
    const pieza = document.createElement('div');
    pieza.className = 'confetti-pieza';
    pieza.style.cssText = `
      left: ${Math.random() * 100}vw;
      background: ${colores[Math.floor(Math.random() * colores.length)]};
      animation-duration: ${1.5 + Math.random() * 2}s;
      animation-delay: ${Math.random() * 0.5}s;
      width: ${6 + Math.random() * 10}px;
      height: ${6 + Math.random() * 10}px;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
    `;
    document.body.appendChild(pieza);
    pieza.addEventListener('animationend', () => pieza.remove());
  }
}
```

---

## 5. Layout Responsivo

### Grid de tarjetas adaptativo
```css
.grid-tarjetas {
  display: grid;
  gap: clamp(8px, 2vw, 16px);
  justify-content: center;
  align-content: center;
  padding: 1rem;
}

/* Automático según cantidad de tarjetas */
.grid-tarjetas[data-pares="2"]  { grid-template-columns: repeat(2, 1fr); max-width: 320px; }
.grid-tarjetas[data-pares="3"]  { grid-template-columns: repeat(3, 1fr); max-width: 420px; }
.grid-tarjetas[data-pares="4"]  { grid-template-columns: repeat(4, 1fr); max-width: 540px; }
.grid-tarjetas[data-pares="6"]  { grid-template-columns: repeat(4, 1fr); max-width: 540px; }
.grid-tarjetas[data-pares="8"]  { grid-template-columns: repeat(4, 1fr); max-width: 540px; }
.grid-tarjetas[data-pares="10"] { grid-template-columns: repeat(5, 1fr); max-width: 660px; }

@media (max-width: 480px) {
  .grid-tarjetas[data-pares="8"],
  .grid-tarjetas[data-pares="10"] {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Estructura de página completa
```css
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--color-bg-1) 0%, var(--color-bg-2) 100%);
  font-family: var(--font-principal);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-x: hidden;
}

.pantalla {
  display: none;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  max-width: 700px;
  animation: entradaArriba 0.4s ease;
}

.pantalla.activa { display: flex; }
```

---

## 6. Overlay de Victoria y Game Over

```css
.overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.overlay.visible { display: flex; }

.modal-card {
  background: white;
  border-radius: 32px;
  padding: 2.5rem;
  text-align: center;
  max-width: 380px;
  width: 90%;
  animation: zoomIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

.copa-grande {
  font-size: 5rem;
  animation: flotar 2s ease-in-out infinite, zoomIn 0.5s ease;
  display: block;
  margin-bottom: 1rem;
}
```

---

## Salida esperada

1. Variables CSS completas (`:root { }`)
2. Link a Google Fonts correcto
3. CSS de todos los componentes necesarios
4. Funciones JS de animación (`lanzarConfetti`, etc.)
5. → Pasar a `html5-game-engine` para integrar todo
