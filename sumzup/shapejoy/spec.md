# 🔷 ShapeJoy — Geometría Infantil · Spec v1.0

> **Juego**: Reconocer y dibujar formas geométricas básicas
> **Nombre**: ShapeJoy = Formas + Alegría (shape + joy)
> **Carpeta**: `sumzup/shapejoy/`

---

## 1. Visión

Los niños aprenden geometría básica **tocando y trazando formas**: círculo, cuadrado, triángulo, rectángulo, óvalo, estrella, corazón. El juego crece con ellos: primero reconocen, luego trazan, después crean.

---

## 2. Mecánica

### 2.1 Modos de Juego

| Modo | Descripción | Edad |
|------|-------------|:---:|
| 👀 **Mira** | La forma aparece con su nombre. El niño la observa. | 4+ |
| 👆 **Toca** | "¿Dónde está el triángulo?" Entre varias formas. | 4+ |
| ✏️ **Traza** | El niño traza la forma con el dedo (similar a MagicABC). | 5+ |
| 🧩 **Compón** | Forma figuras complejas juntando formas simples. | 6+ |
| 🎨 **Crea** | Dibujo libre con formas geométricas. | 6+ |

### 2.2 Figuras

| Fase | Figuras |
|:----:|---------|
| 1 | 🔵 Círculo, 🔺 Triángulo, 🟥 Cuadrado |
| 2 | 🔷 Rectángulo, 🔶 Rombo, ⬭ Óvalo |
| 3 | ⭐ Estrella, ❤️ Corazón, 🛑 Hexágono |
| 4 | 🌙 Media luna, ✚ Cruz, 🏠 Casa (composición) |

---

## 3. Progresión

| Nivel | Figuras | Modo | Dificultad |
|:-----:|---------|------|:----------:|
| 1 | Círculo, Cuadrado | Mira + Toca | Reconocer |
| 2 | + Triángulo | Toca + Traza | Trazar simple |
| 3 | + Rectángulo, Óvalo | Traza | Trazar medio |
| 4 | + Rombo, Estrella | Traza + Compón | Trazar complejo |
| 5 | + Corazón, Hexágono | Compón + Crea | Crear libre |
| 6 | Todas | Crea | Dibujo libre |

---

## 4. UI

```
┌──────────────────────────────┐
│ ☰  Figuras Nivel 2  ⭐ 30 👤│
├──────────────────────────────┤
│                              │
│    "Traza el triángulo"      │  ← Instrucción (voz)
│                              │
│   ┌──────────────────────┐   │
│   │                      │   │
│   │       🔺🔺🔺          │   │  ← Canvas de trazado
│   │      🔺   🔺         │   │     (como MagicABC)
│   │     🔺     🔺        │   │
│   │    🔺🔺🔺🔺🔺🔺       │   │
│   │                      │   │
│   └──────────────────────┘   │
│                              │
│   ██████████░░░░ 70%         │
│   [🔄] [✨ Pista]            │
└──────────────────────────────┘
```

---

## 5. Audio

- **Nombre de la figura**: TTS ("Círculo", "Cuadrado")
- **Trazo correcto**: campanita + "¡Muy bien!"
- **Trazo incorrecto**: "¡Sigue la línea punteada!"
- **Música**: tracks alegres y suaves

---

## 6. Stack

- HTML5 + CSS3 + vanilla JS (single file)
- Canvas para trazado (reusa lógica de MagicABC)
- TTS para nombres de figuras
- Assets compartidos

---

## 7. Trazado de Figuras (similar a MagicABC)

```javascript
const FIGURAS = {
  triangulo: [
    [{x:100,y:30},{x:30,y:200},{x:170,y:200},{x:100,y:30}]
  ],
  cuadrado: [
    [{x:30,y:30},{x:170,y:30},{x:170,y:200},{x:30,y:200},{x:30,y:30}]
  ],
  circulo: [
    // puntos para un círculo
  ],
  // ...
};
```

Reusa el sistema de `currentStrokes`, `renderPath`, validación por segmentos de MagicABC.
