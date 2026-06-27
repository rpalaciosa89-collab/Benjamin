# SumzUp® — Soroban Math Lessons · Spec v1.0

> **Juego**: Ábaco japonés (Soroban) interactivo para niños  
> **Audiencia**: 4-10 años  
> **Stack**: HTML5 + Canvas + Web Audio + TTS + Touch  
> **Carpeta**: `soroban/`

---

## 1. Visión

Enseñar aritmética visual usando el ábaco japonés (Soroban). El niño **mueve cuentas** con los dedos para representar números y resolver operaciones. Desarrolla cálculo mental (Anzan), concentración, y comprensión profunda de los números.

**Frase**: *"Tus dedos piensan más rápido que una calculadora."*

---

## 2. Cómo funciona el Soroban

```
┌──────────────────────────────────────┐
│  ●  ← cuenta superior (valor 5)      │  barra de cálculo
│  │  ← barra divisoria (reckoning bar) │  ─────────────
│  ●  ← cuenta inferior (valor 1)      │
│  ●                                  │
│  ●                                  │
│  ●                                  │
└──────────────────────────────────────┘
   ↑ Una columna = un dígito (0-9)
```

| Dígito | Cuenta superior (5) | Cuentas inferiores (1) |
|:------:|:-------------------:|:----------------------:|
| 0 | Arriba (apagada) | Abajo (apagadas) |
| 1 | Arriba | 1 arriba |
| 2 | Arriba | 2 arriba |
| 3 | Arriba | 3 arriba |
| 4 | Arriba | 4 arriba |
| 5 | **Abajo (activada)** | Abajo (reset) |
| 6 | Abajo | 1 arriba |
| 7 | Abajo | 2 arriba |
| 8 | Abajo | 3 arriba |
| 9 | Abajo | 4 arriba |

**Reglas de movimiento**:
- Cuenta de 5: se activa **bajándola** hacia la barra
- Cuentas de 1: se activan **subiéndolas** hacia la barra
- Para pasar de 4→5: bajar la de 5 y bajar las 4 de 1 (complemento a 5)
- Para pasar de 5→9: subir cuentas de 1 una a una

---

## 3. Mecánica del Juego

### 3.1 Ábaco virtual (Canvas)

```javascript
// Renderizado en Canvas 2D
// Columnas: 3 para nivel 1-3, 5 para nivel 4-6, 7 para nivel 7+
// Cada columna: 1 cuenta superior + 4 inferiores + barra divisoria
// Touch: drag vertical de cuentas individuales
// Animación: las cuentas se deslizan suavemente (spring easing)
```

**Interacción táctil**:
- Tocar y arrastrar una cuenta hacia arriba/abajo
- La cuenta hace "click" al llegar a su posición (sonido de madera)
- Feedback visual: resalta la cuenta movida
- La barra muestra el valor numérico actual debajo de cada columna

### 3.2 Modos de Juego

| Modo | Descripción | Edad |
|------|-------------|:---:|
| **Aprende** | Mueve cuentas libremente. Ve el número que formas. | 4+ |
| **Representa** | "Forma el número 7". El niño mueve cuentas. | 5+ |
| **Suma** | "3 + 4 = ?". Usa el ábaco para sumar. | 6+ |
| **Resta** | "8 - 3 = ?". Usa el ábaco para restar. | 6+ |
| **Velocidad** | Contrarreloj: representa números cada vez más rápido. | 7+ |
| **Anzan** | "Visualiza 5 + 3". Sin ábaco, solo mental. | 8+ |

### 3.3 Progresión

| Nivel | Columnas | Modo | Rango | Tiempo |
|:-----:|:--------:|------|:-----:|:------:|
| 1 | 1 | Aprende | 0-9 | Libre |
| 2 | 1 | Representa | 0-9 | Libre |
| 3 | 2 | Representa | 0-99 | Libre |
| 4 | 2 | Suma | Resultado < 100 | Libre |
| 5 | 3 | Suma + Resta | < 1000 | Libre |
| 6 | 3 | Velocidad | < 1000 | 10s c/u |
| 7 | 5 | Suma/Resta | < 10000 | 8s c/u |
| 8 | 5 | Anzan (mental) | < 1000 | 15s c/u |

---

## 4. UI / Diseño

```
┌──────────────────────────────┐
│ ☰  Nivel 3  ⭐ 45  👤  🔇  │  Header
├──────────────────────────────┤
│                              │
│   ┌──────────────────────┐   │
│   │  ●     ●     ●       │   │  Ábaco (Canvas)
│   │  ───── ───── ─────   │   │  3 columnas
│   │  ●  ●  ●  ●  ●  ●   │   │
│   │  ●  ●  ●     ●  ●   │   │
│   │     ●  ●     ●  ●   │   │
│   │     ●  ●     ●      │   │
│   │  4  2  7             │   │  Valores
│   └──────────────────────┘   │
│                              │
│   "Forma el número 427"      │  Instrucción (TTS)
│                              │
│   [🟢      Progreso      ]  │  Barra de progreso
│                              │
│   [✨ Pista]  [🔄 Reset]     │  Botones
└──────────────────────────────┘
```

**Paleta de colores**:
- Fondo: madera clara `#d4a574`
- Marco ábaco: madera oscura `#8b4513`
- Cuenta superior: `#fbbf24` (ámbar/dorado)
- Cuentas inferiores: `#60a5fa` (azul cielo)
- Barra divisoria: `#78350f` (marrón oscuro)
- Texto: `#1e293b`

---

## 5. Audio

### 5.1 Voces (TTS educativo - directo, sin cola)
- "Forma el número 7"
- "3 más 4. ¿Cuánto es?"
- "¡Correcto! 3 más 4 es igual a 7"
- "Mueve la cuenta de arriba hacia abajo"

### 5.2 Efectos (Web Audio API + SFX)
- `click`: cuenta al moverse (tono madera: 200Hz triangle, 0.05s)
- `slide`: cuenta deslizándose (tono suave continuo)
- `snap`: cuenta encaja en posición (800Hz sine, 0.03s)
- `reset`: todas las cuentas bajan (barrido descendente)
- `success`: acierto (usa `AudioFX.success()`)
- `levelUp`: completar nivel (usa `AudioFX.levelUp()`)

### 5.3 Música
- Música japonesa suave de fondo (koto/shamisen) - buscar en Mixkit
- O usar `MusicPlayer` con tracks calmantes (🎹 Calm Piano)

---

## 6. Motor del Ábaco (JavaScript)

```javascript
// Estado de una columna
class SorobanColumn {
  constructor() {
    this.upperBead = 0;    // 0=arriba(apagado), 1=abajo(activado=+5)
    this.lowerBeads = 0;   // 0-4 cuentas activadas
  }
  
  get value() {
    return this.upperBead * 5 + this.lowerBeads;
  }
  
  set value(v) {
    // v: 0-9
    this.upperBead = v >= 5 ? 1 : 0;
    this.lowerBeads = v % 5;
  }
  
  // Mover una cuenta específica (para animación)
  moveBead(type, index, direction) {
    // type: 'upper' | 'lower'
    // index: 0-3 para lower
    // direction: 'up' | 'down' → activar/desactivar
  }
}

// Estado del ábaco completo
class Soroban {
  constructor(columns) {
    this.columns = Array.from({length: columns}, () => new SorobanColumn());
  }
  
  get value() {
    return parseInt(this.columns.map(c => c.value).join(''));
  }
  
  set value(n) {
    const digits = String(n).padStart(this.columns.length, '0').split('').map(Number);
    digits.forEach((d, i) => this.columns[i].value = d);
  }
  
  // Validar si la representación actual es correcta
  check(targetNumber) {
    return this.value === targetNumber;
  }
}
```

---

## 7. Operaciones Matemáticas

### 7.1 Suma en el Soroban

Algoritmo paso a paso (ej: 3 + 4):
1. Representar 3: subir 3 cuentas inferiores
2. Sumar 4: 
   - No hay suficientes cuentas inferiores (solo queda 1 libre)
   - Complemento a 5: 4 = 5 - 1
   - Bajar la cuenta superior (+5) y bajar 1 cuenta inferior (-1)
   - Resultado: cuenta superior activa + 2 inferiores = 7 ✓

**Reglas de suma**:
| Sumar | Si hay espacio | Si no hay espacio |
|:-----:|----------------|-------------------|
| +1 | Subir 1 inferior | +5, bajar 4 inferiores |
| +2 | Subir 2 inferiores | +5, bajar 3 inferiores |
| +3 | Subir 3 inferiores | +5, bajar 2 inferiores |
| +4 | Subir 4 inferiores | +5, bajar 1 inferior |
| +5 | Bajar cuenta superior | — |
| +6..+9 | Combinación de +5 y +1..+4 | Llevar a siguiente columna |

### 7.2 Resta en el Soroban

Similar pero inverso. Complemento a 5 y complemento a 10 para restar.

---

## 8. Sistema de Recompensas

| Logro | Condición |
|-------|-----------|
| 🌱 Primer contacto | Completar Nivel 1 |
| 🎯 Precisión | 5 respuestas correctas seguidas |
| ⚡ Rayo | Resolver en < 3 segundos |
| 🧠 Anzan Novato | Completar primer nivel Anzan |
| 🏆 Maestro Soroban | Completar todos los niveles |

---

## 9. Accesibilidad para Niños

- **Botones grandes**: mínimo 54px touch target
- **Contraste alto**: cuentas brillantes sobre fondo madera
- **Sin texto pequeño**: instrucciones por voz (TTS)
- **Gestos simples**: solo arrastrar arriba/abajo
- **Sin scroll**: todo en una pantalla (similar a MagicABC)
- **Sin castigos**: error → "¡Casi! Intenta de nuevo" con voz amable
- **Refuerzo positivo**: cada acierto → SFX + partículas + voz

---

## 10. Archivos

```
soroban/
├── index.html        (~40 KB)  Juego completo (HTML+CSS+JS inline)
├── spec.md           Este archivo
└── (usa assets compartidos: audio-fx.js, motivational-voices.js, music-player.js, user-system.js)
```

---

## 11. Plan de Implementación

| Fase | Tarea | Est. |
|:----:|-------|:----:|
| 1 | Motor Soroban (Canvas, beads, física touch) | 2h |
| 2 | UI completa (header, progreso, botones) | 1h |
| 3 | Modo Aprende + Representa (niveles 1-3) | 1h |
| 4 | Modo Suma + Resta (niveles 4-6) | 1.5h |
| 5 | Modo Velocidad + Anzan (niveles 7-8) | 1h |
| 6 | Audio, voces, recompensas | 1h |
| 7 | Integración con UserSystem, MusicPlayer | 30min |
| **Total** | | **~8h** |

---

## 12. Validación

- [ ] Las cuentas se mueven con touch suave
- [ ] Cada columna representa correctamente 0-9
- [ ] La suma/resta usa el algoritmo del Soroban real
- [ ] Las voces TTS guían al niño en cada paso
- [ ] Los niveles progresan en dificultad adecuadamente
- [ ] Funciona en iOS Safari y Chrome Android
- [ ] El progreso se guarda en UserSystem
- [ ] Probado con Benjamín (4 años) y mamá

---

*Spec creado con `kids-game-architect` + `kids-ux-design` + `game-progression-system` skills.*
