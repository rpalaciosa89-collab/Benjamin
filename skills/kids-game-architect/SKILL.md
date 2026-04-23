---
name: kids-game-architect
description: >
  Diseña la arquitectura completa de juegos educativos infantiles desde cero.
  Úsalo cuando el usuario quiera crear un juego nuevo para niños: define la mecánica
  central, el loop de juego, el tipo de contenido educativo, la estructura de datos
  y los estados del juego. Activa este skill ante palabras como "nuevo juego",
  "crear juego", "juego de memoria", "juego educativo", "juego para niños",
  "quiero un juego que enseñe", "diseña un juego". También úsalo cuando el usuario
  describa una idea de juego sin estructura técnica todavía.
---

# Kids Game Architect

Diseña la arquitectura completa de un juego educativo infantil antes de escribir
una línea de código. Produce un Game Design Document (GDD) ligero y el esqueleto
de datos que guiará al resto de skills.

---

## Paso 1 — Clasificación del juego

Identifica a cuál de estas familias pertenece el juego solicitado:

| Familia | Mecánica central | Ejemplos |
|---------|-----------------|----------|
| **Memoria** | Voltear y emparejar | Memory, Simon Says |
| **Matching** | Arrastrar A → B | Letras con imágenes, sumas |
| **Secuencia** | Reproducir un patrón | Simon, melodías |
| **Quiz** | Elegir respuesta correcta | Trivia, matemáticas |
| **Construcción** | Ensamblar partes | Puzzles, rompecabezas |
| **Arcade** | Reacción + tiempo | Atrapar objetos, evitar obstáculos |
| **Narrativo** | Tomar decisiones | Cuentos interactivos |

---

## Paso 2 — Game Design Document (GDD Ligero)

Produce este documento para cada juego nuevo:

```markdown
## GDD: [Nombre del Juego]

### Concepto en una línea
[Qué hace el niño + qué aprende]

### Jugador objetivo
- Edad: [rango]
- Habilidad previa: [ninguna / básica / intermedia]
- Dispositivo primario: [desktop / tablet / móvil]

### Loop de juego
1. [Acción del niño]
2. [Respuesta del sistema]
3. [Consecuencia positiva o negativa]
4. [Condición de avance]

### Contenido educativo
- Habilidad objetivo: [ej: reconocer letras, sumar hasta 10]
- Pool de contenido: [lista de emojis / palabras / números que se usan]
- Cómo se selecciona: [aleatorio / por nivel / por tema]

### Estados del juego
- INICIO: pantalla de bienvenida
- MEMORIZAR: (si aplica) mostrar contenido antes de ocultar
- JUGANDO: el loop activo
- VICTORIA_NIVEL: celebración + avance
- GAME_OVER: fin de vidas
- REINICIO: reset completo

### Estructura de datos principal
[Objeto JS con el estado del juego]
```

---

## Paso 3 — Estructura de Datos Recomendada

### Para juegos de Memoria
```javascript
const gameState = {
  nivel: 1,
  vidas: 5,
  copas: [],                    // ['bronce', 'plata', 'oro', ...]
  tarjetas: [],                 // Array de objetos tarjeta
  seleccionadas: [],            // Índices de las 2 tarjetas volteadas
  paresEncontrados: 0,
  bloqueado: false,             // Evita clicks durante animación
  fase: 'INICIO',               // INICIO | MEMORIZAR | JUGANDO | VICTORIA | GAME_OVER
  config: {
    mostrarTiempo: 3000,        // ms que se muestran las tarjetas al inicio
    demora: 1000,               // ms antes de voltear tarjetas fallidas
  }
};

// Estructura de tarjeta
const tarjeta = {
  id: 0,
  emoji: '🐶',
  parejaId: 1,                  // id de la tarjeta con el mismo emoji
  volteada: false,
  encontrada: false,
};
```

### Para juegos de Quiz/Matemáticas
```javascript
const gameState = {
  nivel: 1,
  vidas: 5,
  puntaje: 0,
  racha: 0,                     // respuestas correctas consecutivas
  preguntaActual: null,
  opciones: [],
  historial: [],                // {pregunta, respuesta, correcto, tiempo}
  fase: 'JUGANDO',
};
```

### Para juegos de Matching (arrastrar)
```javascript
const gameState = {
  nivel: 1,
  vidas: 5,
  pares: [],                    // [{izquierda: '2+2', derecha: '4'}, ...]
  conexiones: [],               // pares ya conectados
  arrastrandoDesde: null,
  fase: 'JUGANDO',
};
```

---

## Paso 4 — Pool de Contenido por Categoría

Selecciona el pool correcto según el tema del juego:

### Animales (30 emojis)
```
🐶🐱🐭🐹🐰🦊🐻🐼🐨🐯🦁🐮🐷🐸🐙🦋🐝🐠🦀🐢
🦎🐍🦉🦚🦜🐓🦆🦅🦘🐘
```

### Frutas y Comida (25 emojis)
```
🍎🍊🍋🍇🍓🍒🍑🥭🍍🥝🍅🥑🍆🌽🥕🍔🍕🌮🍰🎂
🍩🍪🧁🍦🍭
```

### Objetos del Hogar (20 emojis)
```
🏠🚗🚂✈️⚽🎈🎁🎉🎀🔑📚✏️🎨🎵🎸🌈⭐🌙🌞❄️
```

### Números y Operaciones
```javascript
// Nivel 1-2: Sumas hasta 5
// Nivel 3-4: Sumas hasta 10
// Nivel 5-6: Restas simples
// Nivel 7+:  Multiplicación tabla del 2
function generarPregunta(nivel) {
  if (nivel <= 2) return suma(1, 5);
  if (nivel <= 4) return suma(1, 10);
  if (nivel <= 6) return resta(1, 10);
  return multiplicacion(2);
}
```

### Letras y Sílabas
```javascript
const SILABAS = ['ma','me','mi','mo','mu','pa','pe','pi','po','pu',
                 'sa','se','si','so','su','la','le','li','lo','lu'];
const PALABRAS_SIMPLES = ['mamá','papá','sol','mar','pan','luz','oso',
                          'pez','gato','casa','mano','boca','ojos'];
```

---

## Paso 5 — Configuración de Niveles Base

Usa esta configuración como punto de partida (ajusta según el tipo de juego):

```javascript
const CONFIG_NIVELES = [
  { nivel:1, pares:2,  tiempoMostrar:4000, vidas:5, emoji:'🥉' },
  { nivel:2, pares:3,  tiempoMostrar:3500, vidas:5, emoji:'🥉' },
  { nivel:3, pares:4,  tiempoMostrar:3000, vidas:5, emoji:'🥈' },
  { nivel:4, pares:6,  tiempoMostrar:2500, vidas:5, emoji:'🥈' },
  { nivel:5, pares:8,  tiempoMostrar:2000, vidas:5, emoji:'🥇' },
  { nivel:6, pares:10, tiempoMostrar:1500, vidas:5, emoji:'🏆' },
];
// Nivel 7+: misma config que nivel 6 pero nuevo set de emojis aleatorio
```

---

## Salida esperada de esta skill

Al terminar, produce:
1. GDD Ligero completo (markdown)
2. Estructura de datos JS del gameState
3. Lista de estados del juego
4. Pool de contenido seleccionado
5. Config de niveles
6. → Pasa a `game-progression-system` para refinar la curva de dificultad
7. → Pasa a `kids-ux-design` para el diseño visual
8. → Pasa a `html5-game-engine` para generar el código
