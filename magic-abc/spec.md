# SPEC: MagicABC — Juego de Trazado Mágico de Letras

> **Agent 11 — Specification Engineer**  
> **Agente responsable**: Agent 06 (Game Designer) → Agent 07 (UX Children) → Agent 15 (Gameplay Engineer)  
> **Fecha**: 2026-06-25  
> **Versión**: 1.3 — ✅ LIVING SPEC (refleja el juego construido)

---

## 1. Visión

| Pregunta | Respuesta |
|----------|-----------|
| ¿Qué hace el niño? | Traza con el dedo sobre el contorno de una letra o palabra, siguiendo una guía punteada, para completar el trazado correctamente. |
| ¿Qué aprende? | Reconocimiento visual y auditivo de letras, escritura temprana, coordinación ojo-mano, motricidad fina, formación de palabras y lectura progresiva. |
| ¿Por qué querría jugarlo? | Se siente como un juego mágico con luces, estrellas y sonidos divertidos, sin parecer una tarea escolar. Cada acierto da recompensas (monedas, estrellas, confeti). |

---

## 2. Jugador Objetivo

| Atributo | Valor |
|----------|-------|
| **Edad** | 2–5 años (adaptable desde 2 años con ayuda) |
| **Habilidad previa** | Ninguna. Empieza desde reconocimiento de letras mayúsculas. |
| **Dispositivo primario** | Tablet y móvil táctil (pantalla ≥ 5"). Desktop con ratón como secundario. |

---

## 3. Mecánica Central

| Elemento | Descripción |
|----------|-------------|
| **Acción del jugador** | Tocar y arrastrar el dedo (o ratón) sobre la línea de puntos que forma la letra/palabra. |
| **Respuesta del sistema** | Al tocar la línea punteada, esta se ilumina con un color de acento (rosa pastel). Partículas de estrellas ✨ siguen el trazo. Una barra de progreso muestra el % completado del camino. Al levantar el dedo, se valida si el trazo cubrió ≥ 65% del camino. |
| **Condición de victoria** | Completar todas las letras/palabras del nivel actual. |
| **Condición de derrota** | No hay derrota tradicional. Si en un nivel superior no consigue superar en **15 intentos** consecutivos, se regresa al nivel anterior (degradación graceful). El juego siempre guía para reintentar. |

---

## 4. Loop de Juego

```
┌─────────────────────────────────────────────────┐
│  1. PRESENTACIÓN                                │
│     Letra/palabra grande + pronunciación (TTS)   │
│     + emoji (si es palabra)                     │
├─────────────────────────────────────────────────┤
│  2. GUÍA INICIAL                                │
│     Bolita ✨ luminosa recorre el camino         │
│     punteado durante 1.5s                       │
├─────────────────────────────────────────────────┤
│  3. TRAZADO                                     │
│     Niño sigue el camino con el dedo            │
│     Barra de progreso se actualiza              │
├─────────────────────────────────────────────────┤
│  4. VALIDACIÓN                                  │
│     Al levantar el dedo: ¿cubrió ≥ 65%?         │
├─────────────────────────────────────────────────┤
│  5a. ÉXITO                   5b. REINTENTO      │
│     Confeti + sonido +       Se borra el trazo  │
│     monedas + siguiente      Se muestra guía    │
│     letra                    de nuevo           │
├─────────────────────────────────────────────────┤
│  6. FIN DE NIVEL                                │
│     Logro desbloqueado + avance automático       │
└─────────────────────────────────────────────────┘
```

---

## 5. Contenido Educativo

### Pool de Letras (Niveles 1–2)
```
A B C D E F G H I J K L M N Ñ O P Q R S T U V W X Y Z
```
**Total**: 27 letras mayúsculas.  
**Selección**: Secuencial (A→Z) para garantizar progresión. En futuras versiones se puede añadir modo aleatorio.

### Pool de Palabras (Niveles 3–6)
| Nivel | Palabras | Emojis |
|-------|----------|--------|
| 3 | SOL, LUZ, PAN, MAR, PEZ, OSO, GATO, CASA, MANO, BOCA | ☀️💡🍞🌊🐟🐻🐱🏠✋👄 |
| 4 | MAMÁ, PAPÁ, NIÑO, NIÑA, BEBÉ, ABRAZO, BESITO, AMIGO, FELIZ, GRANDE | 👩👨👦👧👶🤗😘👫😊🌟 |
| 5 | NUBE, FLOR, ÁRBOL, LLUVIA, ESTRELLA, PLANETA, MONTAÑA, JARDÍN, RÍO, PLAYA | ☁️🌸🌳🌧️⭐🪐⛰️🌺🏞️🏖️ |
| 6 | COLEGIO, MAESTRA, PINTURA, MÚSICA, CUENTO, LÁPIZ, LIBRO, NÚMERO, LETRA, JUEGO | 🏫👩‍🏫🎨🎵📖✏️📚🔢🔤🎮 |

---

## 6. Progresión

| Nivel | Contenido | Letras/Palabras | ¿Guía automática? | Intentos máx. antes de degradar |
|-------|-----------|-----------------|-------------------|--------------------------------|
| 1 | Letras A–G (7) | 7 | ✅ Sí (1.5s) | N/A (nivel inicial) |
| 2 | Letras H–Z + Ñ (20) | 20 | ✅ Sí (1.2s) | 15 intentos → vuelve a N1 |
| 3 | Palabras 3 letras (10) | 10 | ✅ Sí (1.0s) | 15 intentos → vuelve a N2 |
| 4 | Palabras 4–5 letras (10) | 10 | Botón "Ayuda ✨" | 15 intentos → vuelve a N3 |
| 5 | Palabras temáticas (10) | 10 | Botón "Ayuda ✨" | 15 intentos → vuelve a N4 |
| 6 | Palabras compuestas (10) | 10 | Botón "Ayuda ✨" | 15 intentos → vuelve a N5 |

### Sistema de Recompensas

| Hito | Recompensa | Tipo |
|------|-----------|------|
| Completar una letra/palabra | +5 monedas ⭐ + confeti | Por trazo |
| Primera letra completada | Logro "✨ Primer trazo" | único |
| Completar nivel | Animación de nivel completado | Por nivel |
| Abecedario completo (27 letras) | Logro "🏆 Abecedario completo" | único |
| 50 monedas acumuladas | Logro "💰 Coleccionista" | único |
| 100 monedas acumuladas | Logro "🌟 Maestro de letras" | único |

**Monedas**: Se guardan en el progreso del perfil. **Fase 1**: solo decorativas (se acumulan y muestran). **Fase 2**: canjeables por paletas de colores, avatares o temas.

---

## 7. UI/UX — Versión Unisex

### Paleta de Colores

```css
:root {
  /* Fondo principal */
  --bg-1: #a8d8ea;       /* Azul cielo suave */
  --bg-2: #ffdab9;       /* Melocotón claro */
  
  /* Colores de UI */
  --amarillo:  #FFD166;  /* Botón "Siguiente" */
  --naranja:   #FFB347;  /* Destacar */
  --verde:     #06D6A0;  /* Botón "Guía" */
  --turquesa:  #118AB2;  /* Botón "Reiniciar" */
  --rosa:      #EF476F;  /* Acento en trazos y partículas */
  
  /* Área de trazado */
  --trazado-bg: #FFFEF9;  /* Blanco crema */
  
  /* Texto */
  --texto:      #2D3436;
  --texto-claro:#636e72;
}
```

### Tipografía

| Uso | Fuente |
|-----|--------|
| **Letras del juego** | `Arial Bold` (máxima claridad, sin descarga) |
| **Interfaz general** | `'Comic Sans MS', 'Chalkboard SE', cursive` (tono amigable) |
| **Fallback** | `sans-serif` |

### Botones

- Tamaño mínimo: 60px de altura
- Redondeados (border-radius: 50px)
- Sombra y efecto de presión (scale al tocar)
- Colores variados: Amarillo (Siguiente), Turquesa (Reiniciar), Verde menta (Guía)

### Mascota

✨ — Estrella mágica. Neutra, universal, asociada a magia y diversión.

### Feedback Visual

| Evento | Efecto |
|--------|--------|
| Trazo sobre línea | Línea se ilumina en rosa (#EF476F) + partículas ✨ |
| Trazo completo | Confeti multicolor + shake suave de la letra |
| Error / reintento | Trazo se desvanece con opacidad |
| Logro desbloqueado | Pop-up con animación de escala |

### Personalización Futura

Opcional: selector de 2–3 paletas (Arcoíris, Naturaleza, Mar) para padres.

---

## 8. Sonido

| Efecto | Descripción | Web Audio API |
|--------|-------------|---------------|
| `guia` | Tonito suave al moverse la bolita guía | `sine`, 600Hz, 0.05s |
| `trazo_activo` | Nota ascendente suave mientras se traza | `sine`, slide 400→800Hz |
| `trazo_exito` | Jingle de 3 notas ascendentes + campanita | `sine`, C5→E5→G5 |
| `trazo_reintento` | Nota descendente suave ("ups") | `sine`, 400→300Hz |
| `moneda` | "ding" de moneda | `triangle`, 1200Hz, 0.08s |
| `logro` | Fanfarria corta | `square`, C5→E5→G5→C6 |
| `nivel_completo` | Fanfarria épica | Similar a victoria en otros juegos |
| `confeti` | Pop-pop suave acompañando confeti | `sine` + ruido blanco |

---

## 9. Acceptance Criteria

- [ ] **AC1**: El juego carga en < 2s (dispositivos modernos)
- [ ] **AC2**: Funciona en móvil 375px de ancho (responsive)
- [ ] **AC3**: Targets táctiles ≥ 60px (botones y área de trazado)
- [ ] **AC4**: Se puede reiniciar sin recargar la página (botón Reiniciar)
- [ ] **AC5**: Sin errores en consola durante uso normal
- [ ] **AC6**: La fuente Arial Bold funciona sin descarga externa
- [ ] **AC7**: La barra de progreso refleja exactamente el avance del trazo
- [ ] **AC8**: El niño puede completar todas las letras y palabras de todos los niveles
- [ ] **AC9**: Progreso se guarda por perfil usando `UserSystem.saveProgress()`
- [ ] **AC10**: Funciona con ratón (desktop) y touch (móvil/tablet)
- [ ] **AC11**: La bolita guía desaparece al iniciar el trazo
- [ ] **AC12**: Modo sin derrota: el juego no penaliza, solo guía

---

## 10. User Stories

### Historia 1: Trazar letras mayúsculas
> **Como** niño de 3 años,  
> **quiero** trazar letras mayúsculas siguiendo una guía,  
> **para** aprender a reconocer y escribir las letras del abecedario.

- [ ] Dado que estoy en el nivel 1, cuando veo la letra "A", entonces aparece en grande y con un camino punteado.
- [ ] Dado que empiezo a trazar, cuando muevo el dedo sobre la línea, entonces se colorea de rosa y aparecen estrellas.
- [ ] Dado que completo ≥ 65% del camino, cuando levanto el dedo, entonces la letra se da por completada y suena un sonido de éxito.
- [ ] Dado que he completado todas las letras del nivel 1, entonces desbloqueo el nivel 2 automáticamente.

### Historia 2: Aprendizaje de palabras con emojis
> **Como** niño de 4 años,  
> **quiero** trazar palabras y ver un emoji relacionado,  
> **para** asociar la palabra escrita con su significado.

- [ ] Dado que estoy en el nivel 3, cuando veo la palabra "SOL", entonces aparece ☀️ junto a la palabra.
- [ ] Dado que completo la palabra, cuando se celebra el éxito, entonces el emoji se muestra más grande durante la animación.
- [ ] Dado que he completado todas las palabras del nivel 3, entonces paso al nivel 4.

### Historia 3: Guía interactiva para niños pequeños
> **Como** niño de 2–3 años,  
> **quiero** que una bolitita luminosa me muestre el camino antes de trazar,  
> **para** entender por dónde debo pasar el dedo.

- [ ] Dado que aparece una nueva letra, cuando pasan 1.5s, entonces la bolita ✨ recorre el camino punteado.
- [ ] Dado que la bolita se mueve, cuando llega al final, entonces se detiene y el niño puede empezar a trazar.
- [ ] Dado que el niño empieza a dibujar, cuando toca la pantalla, entonces la bolita desaparece automáticamente.

### Historia 4: Sistema de recompensas y logros
> **Como** niño,  
> **quiero** recibir monedas y ver animaciones de confeti cuando completo una letra,  
> **para** sentirme motivado a seguir practicando.

- [ ] Dado que completo una letra, cuando suena el jingle, entonces aparecen +5 monedas en el contador.
- [ ] Dado que completo mi primera letra, cuando se muestra el logro "✨ Primer trazo", entonces aparece un pop-up con animación.
- [ ] Dado que completo todo el abecedario (27 letras), cuando finaliza la Z, entonces aparece "🏆 Abecedario completo".

### Historia 5: Reinicio y persistencia del progreso
> **Como** padre,  
> **quiero** que el progreso de mi hijo se guarde automáticamente y pueda reiniciarse,  
> **para** que no pierda sus avances y pueda empezar de nuevo si lo desea.

- [ ] Dado que el niño completa una letra, cuando cierro y abro la página, entonces el progreso se mantiene (letras completadas, monedas, nivel actual).
- [ ] Dado que presiono el botón Reiniciar, cuando confirmo la acción, entonces el progreso se borra y vuelve al nivel 1.
- [ ] Dado que el progreso se guarda en localStorage (via `UserSystem.saveProgress`), cuando el navegador está en modo privado, entonces funciona sin errores.

---

## 11. Estructura de Datos

```javascript
// Progreso guardado por perfil (UserSystem.saveProgress('magicabc', {...}))
const magicABCProgress = {
  currentLevel: 1,            // Nivel actual (1–6)
  completedLetters: ['A'],    // Letras ya completadas en el nivel actual
  totalCoins: 0,              // Monedas acumuladas
  achievements: [],           // Logros desbloqueados: ['primer_trazo', ...]
  failedAttempts: 0,          // Intentos fallidos consecutivos (para degradación)
  lettersInLevel: ['A','B','C','D','E','F','G'], // Letras del nivel actual
  currentLetterIndex: 0,      // Índice de la letra actual
};

// Estado en memoria durante el juego
const traceState = {
  isDrawing: false,
  pathProgress: 0,            // 0–100% del camino completado
  guideActive: false,
  guidePosition: { x: 0, y: 0 },
};
```

---

## 12. Notas Técnicas

### Canvas vs DOM
Se usará `<canvas>` para el área de trazado (mejor rendimiento en trazado libre y partículas). El resto de la UI será DOM estándar.

### Touch Events
Se deben manejar `touchstart`, `touchmove`, `touchend` con `{ passive: false }` y `preventDefault()` para evitar scroll en móvil durante el trazado.

### TTS (Text-to-Speech)
Usar `SpeechSynthesis API` para pronunciar letras y palabras. Mismo patrón que `aritmi`.

### UserSystem Integration
```javascript
const GAME_ID = 'magicabc';
const progress = UserSystem.getProgress(GAME_ID);
// ... jugar ...
UserSystem.saveProgress(GAME_ID, { currentLevel, completedLetters, totalCoins, achievements });
```

---

## 📋 Decisiones Aprobadas (Agent 01 + 02)

| # | Tema | Decisión |
|---|------|----------|
| 1 | Palabras niveles 3–6 | ✅ Las 40 palabras propuestas, sin cambios |
| 2 | Monedas | Decorativas en Fase 1. Canjeables en Fase 2 |
| 3 | Degradación de nivel | **15 intentos** consecutivos (balance neurociencia + práctica) |
| 4 | Niveles 4–6 | Botón "Ayuda ✨" disponible (autonomía sin castigo) |

---

## 📝 Changelog (Living Spec)

> **Regla**: Todo cambio post-implementación se registra aquí.  
> La spec refleja el juego TAL COMO ESTÁ CONSTRUIDO, no como se planeó originalmente.

### v1.3 — 2026-06-25 — Estandarización de navegación

| Cambio | Motivo | Agente |
|--------|--------|--------|
| Agregado menú ☰ (dropdown) en header | Navegación cruzada entre los 4 juegos, igual que Aritmi/Benji/ColorFun | Agent 07 |
| Links en dropdown: Inicio, Benji al Rescate, Color Fun, Aritmi, MagicABC | Experiencia de usuario consistente | Agent 07 |

### v1.2 — 2026-06-25 — Fix: Path de la letra B

| Cambio | Motivo | Agente |
|--------|--------|--------|
| Corregido `LETTER_PATHS['B']`: ahora traza AMBAS jorobas (superior e inferior) | El path anterior solo trazaba la joroba inferior (×2), haciendo que la B se viera como "b" | Agent 21 (QA) |
| Path anterior: `(30,20)→↓→(130,230)→(130,130)→(30,130)→(150,130)→(150,230)→(30,230)` | Solo joroba inferior repetida | — |
| Path nuevo: `(30,20)→↓→(130,230)→(130,130)→(30,130)→(130,130)→(130,20)→(30,20)` | Joroba inferior → conector → joroba superior | Agent 15 |

### v1.1 — 2026-06-25 — Fix: Renderizado de mayúsculas

| Cambio | Motivo | Agente |
|--------|--------|--------|
| Agregado `text-transform: uppercase` en CSS de `.letter-display` | Protección contra renderizado en minúscula | Agent 21 (QA) |
| Agregado `.toUpperCase()` en JS para letras y palabras | Doble seguridad: CSS + JS | Agent 15 |
| Ambos aplican a letras individuales (`item.toUpperCase()`) y palabras (`item.word.toUpperCase()`) | Consistencia visual | Agent 15 |

### v1.0 — 2026-06-25 — SPEC APROBADA

| Cambio | Motivo | Agente |
|--------|--------|--------|
| Spec inicial completa | Spec-Driven Development | Agent 11 |
| 15 intentos para degradación (no 20) | Balance neurociencia + práctica (Agent 02) | Agent 01 |
| Botón "Ayuda ✨" en niveles 4-6 (no "sin guía") | Autonomía sin castigo | Agent 01 |
| Monedas decorativas en Fase 1 | Evitar frustración (no hay tienda aún) | Agent 01 |

---

**✅ SPEC VIVA — Refleja el juego construido en `magic-abc/index.html`**
