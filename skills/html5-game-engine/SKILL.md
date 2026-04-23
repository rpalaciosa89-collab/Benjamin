---
name: html5-game-engine
description: >
  Genera el código HTML5 completo y funcional de juegos educativos infantiles en un
  solo archivo. Activa este skill cuando el usuario pida producir, generar o escribir
  el código de un juego: "escribe el código", "genera el juego", "crea el HTML",
  "quiero el archivo", "dame el juego completo", "implementa el juego". También
  activa este skill automáticamente al final de cualquier flujo de diseño de juego
  cuando ya tienes el GDD, sistema de progresión y diseño UX definidos. Es la skill
  que produce el output final — siempre debe ejecutarse última en el pipeline.
---

# HTML5 Game Engine

Produce el archivo HTML5 single-file completo, funcional y listo para usar.
Es la skill de síntesis: toma el diseño de las otras skills y lo convierte en código.

---

## Estructura del Archivo

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>[Nombre del Juego]</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="[Google Fonts URL]" rel="stylesheet">
  <style>
    /* ============================
       1. Variables CSS (kids-ux-design)
       2. Reset y base
       3. HUD (vidas, nivel, copas)
       4. Pantalla de inicio
       5. Grid de tarjetas / área de juego
       6. Tarjetas / elementos de juego
       7. Overlays (victoria, game over)
       8. Animaciones
       9. Responsive
    ============================ */
  </style>
</head>
<body>

  <!-- ============================
       PANTALLA DE INICIO
  ============================ -->
  <div id="pantalla-inicio" class="pantalla activa">
    ...
  </div>

  <!-- ============================
       PANTALLA DE JUEGO
  ============================ -->
  <div id="pantalla-juego" class="pantalla">
    <div class="hud">
      <div id="vidas" class="hud-vidas"></div>
      <div id="nivel-txt" class="hud-nivel">Nivel 1</div>
      <div id="copas" class="hud-copas"></div>
    </div>
    <div id="area-juego"></div>
  </div>

  <!-- ============================
       OVERLAY VICTORIA
  ============================ -->
  <div id="overlay-victoria" class="overlay">
    <div class="modal-card" id="modal-victoria"></div>
  </div>

  <!-- ============================
       OVERLAY GAME OVER
  ============================ -->
  <div id="overlay-gameover" class="overlay">
    <div class="modal-card" id="modal-gameover"></div>
  </div>

  <script>
  // ============================
  // 1. CONFIGURACIÓN
  // ============================

  // ============================
  // 2. ESTADO DEL JUEGO
  // ============================

  // ============================
  // 3. SISTEMA DE VIDAS
  // ============================

  // ============================
  // 4. SISTEMA DE COPAS
  // ============================

  // ============================
  // 5. LÓGICA DEL JUEGO
  // ============================

  // ============================
  // 6. GENERACIÓN DE NIVEL
  // ============================

  // ============================
  // 7. RENDER / UI
  // ============================

  // ============================
  // 8. AUDIO (Web Audio API)
  // ============================

  // ============================
  // 9. EFECTOS (confetti, etc.)
  // ============================

  // ============================
  // 10. INICIALIZACIÓN
  // ============================
  </script>
</body>
</html>
```

---

## Plantillas por Tipo de Juego

### Plantilla A — Memoria (Parejas)

**Generación de tablero:**
```javascript
function generarTablero(nivel) {
  const config = CONFIG_NIVELES[Math.min(nivel - 1, CONFIG_NIVELES.length - 1)];
  const pool = [...EMOJIS_POOL];
  
  // Seleccionar emojis aleatorios
  const seleccionados = pool
    .sort(() => Math.random() - 0.5)
    .slice(0, config.pares);
  
  // Duplicar y mezclar
  const tarjetas = [...seleccionados, ...seleccionados]
    .sort(() => Math.random() - 0.5)
    .map((emoji, i) => ({ id: i, emoji, volteada: false, encontrada: false }));
  
  return { tarjetas, config };
}
```

**Render de tarjetas:**
```javascript
function renderTablero(tarjetas, config) {
  const area = document.getElementById('area-juego');
  area.innerHTML = '';
  
  const grid = document.createElement('div');
  grid.className = 'grid-tarjetas';
  grid.dataset.pares = config.pares;
  
  tarjetas.forEach((t, i) => {
    const div = document.createElement('div');
    div.className = 'tarjeta' + (t.volteada ? ' volteada' : '') + (t.encontrada ? ' encontrada' : '');
    div.innerHTML = `
      <div class="tarjeta-inner">
        <div class="tarjeta-atras">❓</div>
        <div class="tarjeta-frente">${t.emoji}</div>
      </div>
    `;
    if (!t.encontrada) div.addEventListener('click', () => clickTarjeta(i));
    grid.appendChild(div);
  });
  
  area.appendChild(grid);
}
```

**Lógica de click:**
```javascript
function clickTarjeta(indice) {
  const estado = gameState;
  if (estado.bloqueado) return;
  if (estado.tarjetas[indice].volteada) return;
  if (estado.tarjetas[indice].encontrada) return;
  if (estado.seleccionadas.length >= 2) return;

  estado.tarjetas[indice].volteada = true;
  estado.seleccionadas.push(indice);
  renderTablero(estado.tarjetas, estado.config);
  reproducirSonido('voltear');

  if (estado.seleccionadas.length === 2) {
    estado.bloqueado = true;
    verificarPar();
  }
}

function verificarPar() {
  const [i1, i2] = gameState.seleccionadas;
  const t1 = gameState.tarjetas[i1];
  const t2 = gameState.tarjetas[i2];

  if (t1.emoji === t2.emoji) {
    // Par correcto
    t1.encontrada = t2.encontrada = true;
    gameState.paresEncontrados++;
    gameState.seleccionadas = [];
    gameState.bloqueado = false;
    renderTablero(gameState.tarjetas, gameState.config);
    reproducirSonido('acierto');

    if (gameState.paresEncontrados === gameState.config.pares) {
      setTimeout(victoriaDeNivel, 500);
    }
  } else {
    // Par incorrecto → perder vida
    reproducirSonido('error');
    sistemaCopas; // acceder al sistema global
    
    setTimeout(() => {
      gameState.tarjetas[i1].volteada = false;
      gameState.tarjetas[i2].volteada = false;
      gameState.seleccionadas = [];
      gameState.bloqueado = false;
      renderTablero(gameState.tarjetas, gameState.config);
      perderVida();
    }, gameState.config.demora);
  }
}
```

**Fase de memorización:**
```javascript
function iniciarNivel(nivel) {
  const { tarjetas, config } = generarTablero(nivel);
  gameState.tarjetas = tarjetas.map(t => ({ ...t, volteada: true })); // Mostrar todo
  gameState.config = config;
  gameState.paresEncontrados = 0;
  gameState.seleccionadas = [];
  gameState.bloqueado = true;
  renderTablero(gameState.tarjetas, config);
  actualizarHUD();
  
  // Ocultar tras tiempo de memorización
  setTimeout(() => {
    gameState.tarjetas.forEach(t => { t.volteada = false; });
    gameState.bloqueado = false;
    renderTablero(gameState.tarjetas, config);
  }, config.mostrarTiempo);
}
```

---

### Plantilla B — Quiz Matemático

```javascript
function generarPreguntaMatematica(nivel) {
  let a, b, operacion, respuestaCorrecta;
  
  if (nivel <= 2) {
    a = aleatorio(1, 5); b = aleatorio(1, 5 - a);
    operacion = '+'; respuestaCorrecta = a + b;
  } else if (nivel <= 4) {
    a = aleatorio(1, 10); b = aleatorio(1, 10 - a);
    operacion = '+'; respuestaCorrecta = a + b;
  } else if (nivel <= 6) {
    a = aleatorio(5, 15); b = aleatorio(1, a);
    operacion = '-'; respuestaCorrecta = a - b;
  } else {
    a = aleatorio(2, 9); b = aleatorio(2, 10);
    operacion = '×'; respuestaCorrecta = a * b;
  }
  
  // Generar opciones falsas
  const opciones = generarOpciones(respuestaCorrecta, 4);
  return { pregunta: `${a} ${operacion} ${b}`, opciones, respuestaCorrecta };
}

function generarOpciones(correcta, cantidad) {
  const set = new Set([correcta]);
  while (set.size < cantidad) {
    const falsa = correcta + (Math.random() > 0.5 ? 1 : -1) * aleatorio(1, 5);
    if (falsa > 0) set.add(falsa);
  }
  return [...set].sort(() => Math.random() - 0.5);
}
```

---

### Plantilla C — Matching (Arrastrar y soltar)

```javascript
function iniciarMatching(nivel) {
  const pares = PARES_MATCHING[nivel - 1] || PARES_MATCHING.at(-1);
  const seleccionados = pares.sort(() => Math.random() - 0.5).slice(0, 4 + nivel);
  
  renderColumnaIzquierda(seleccionados.map(p => p.izquierda));
  renderColumnaDerecha(seleccionados.map(p => p.derecha).sort(() => Math.random() - 0.5));
  iniciarDragAndDrop();
}

// Ejemplo de pares para letras
const PARES_MATCHING = {
  letras: [
    { izquierda: 'A', derecha: '🍎' },   // A de Apple/Avión
    { izquierda: 'B', derecha: '🐝' },
    { izquierda: 'C', derecha: '🐈' },
  ],
  sumas: [
    { izquierda: '2 + 2', derecha: '4' },
    { izquierda: '3 + 1', derecha: '4' },
  ]
};
```

---

## Función de Ayuda: Shuffle

```javascript
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

---

## Checklist antes de entregar el código

- [ ] El juego inicia sin errores en consola
- [ ] El botón de jugar funciona
- [ ] Los niveles avanzan correctamente
- [ ] Las vidas se pierden y muestran Game Over
- [ ] El Game Over permite reiniciar
- [ ] Las copas se acumulan visualmente
- [ ] El confetti se lanza al ganar un nivel
- [ ] El juego es responsivo en 375px
- [ ] Los emojis son aleatorios entre partidas
- [ ] Los sonidos funcionan (o degradan gracefully sin error)

---

## Reglas de Calidad del Código

1. **Sin dependencias externas de JS** — todo Vanilla JS
2. **Sin `innerHTML` en loops de animación** — usar clases CSS en su lugar  
3. **Separar datos de lógica** — `CONFIG_NIVELES` y `EMOJIS_POOL` al principio
4. **Comentarios por sección** — el código debe ser mantenible
5. **`try/catch` en localStorage** — puede fallar en modo privado
6. **`user-scalable=no`** en viewport — evitar zoom accidental en móvil
7. **`pointer-events: none`** en tarjetas encontradas — evitar doble click
