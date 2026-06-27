# 📏 MeasureUp — Medidas Cotidianas · Spec v1.0

> **Juego**: Aprender medidas con objetos de la vida diaria
> **Nombre**: MeasureUp = Medir + Mejorar (frase común en inglés)
> **Carpeta**: `benjimates/measureup/`

---

## 1. Visión

Los niños aprenden conceptos de medición usando **objetos familiares**: lápices, manzanas, pasos, vasos de agua. Sin reglas abstractas — todo es tangible y visual.

---

## 2. Mecánica

### 2.1 Tipos de Medida

| Tipo | Unidad visual | Ejemplo |
|------|:------------:|---------|
| 📏 **Longitud** | Lápices, pasos, bloques | "¿Cuántos lápices mide la mesa?" |
| ⚖️ **Peso** | Manzanas, peluches | "¿Qué pesa más, 3 manzanas o 1 sandía?" |
| 🕐 **Tiempo** | Canciones, parpadeos | "Lávate los dientes mientras suena esta canción" |
| 🥛 **Capacidad** | Vasos, botellas | "¿Cuántos vasos llenan esta jarra?" |

### 2.2 Modos de Juego

| Modo | Descripción |
|------|-------------|
| 🔍 **Compara** | "¿Cuál es más largo/pesado/rápido?" — 2 opciones |
| 📐 **Mide** | Arrastra unidades visuales para medir un objeto |
| ❓ **Estima** | "¿Cuántos pasos hay de la puerta a la mesa?" — luego comprueba |
| 🏆 **Desafío** | Preguntas mezcladas de todos los tipos |

---

## 3. Progresión

| Nivel | Tipo | Concepto | Dificultad |
|:-----:|------|----------|:----------:|
| 1 | Longitud | Más largo / más corto | Comparar 2 |
| 2 | Peso | Más pesado / más ligero | Comparar 2 |
| 3 | Longitud | Medir con unidades | Contar 1-5 |
| 4 | Capacidad | Más / menos líquido | Comparar 2 |
| 5 | Tiempo | Antes / después / rápido / lento | Conceptos |
| 6 | Mixto | Medir y estimar | Contar 1-10 |
| 7 | Mixto | Todas las magnitudes | Precisión |
| 8 | Todas | Desafío completo | Experto |

---

## 4. UI

```
┌──────────────────────────────┐
│ ☰  Medidas Nivel 3  ⭐ 15 👤│
├──────────────────────────────┤
│                              │
│   "¿Cuántos lápices mide     │
│    la mesa?"                 │  ← Pregunta
│                              │
│   ┌──────────────────────┐   │
│   │ 🖊️🖊️🖊️🖊️🖊️🖊️🖊️    │   │  ← Lápices arrastrables
│   └──────────────────────┘   │
│                              │
│   ┌──────────────────────┐   │
│   │ ████████████████████ │   │  ← Mesa a medir
│   └──────────────────────┘   │
│                              │
│   Has puesto: 🖊️🖊️🖊️🖊️    │  ← Contador
│   [✅ Comprobar]             │
└──────────────────────────────┘
```

---

## 5. Interacción Táctil

- **Arrastrar** lápices/manzanas/vasos desde la reserva hasta el objeto
- **Soltar** para colocarlos
- **Contar** automáticamente las unidades colocadas
- **Botón comprobar** para validar
- Animación de celebración al acertar

---

## 6. Audio

- **Voz**: "¿Cuántos lápices mide la mesa?"
- **Acierto**: "¡Exacto! Mide 5 lápices"
- **Error**: "Casi. Mide 5 lápices. ¡Cuenta otra vez!"
- Efectos al arrastrar/soltar objetos

---

## 7. Stack

- HTML5 + CSS3 + vanilla JS (single file)
- DOM drag & drop (o touch drag)
- SVG/emoji para objetos visuales
- Assets compartidos

---

## 8. Objetos Visuales (emojis)

```javascript
const UNIDADES = {
  lapiz: '🖊️',
  manzana: '🍎',
  paso: '👣',
  vaso: '🥛',
  bloque: '🧱',
  peluche: '🧸',
  reloj: '⏰',
  botella: '🍶',
};
```
