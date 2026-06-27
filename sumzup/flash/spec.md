# ⚡ Flash — Cálculo Mental Anzan · Spec v1.0

> **Juego**: Cálculo mental rápido sin ábaco físico (Anzan)  
> **Método**: Visualización del Soroban en la mente  
> **Audiencia**: 7-10 años (requiere haber practicado Soroban)  
> **Carpeta**: `sumzup/flash/`

---

## 1. Visión

El niño **visualiza el ábaco en su mente** y resuelve operaciones sin tocarlo. Es la culminación del método japonés: los dedos ya no se mueven, pero la mente calcula a velocidad de rayo. ⚡

---

## 2. Mecánica

### 2.1 Cómo funciona Anzan

1. El niño escucha (o ve) una serie de números: "5, más 3, menos 2, más 4..."
2. Visualiza mentalmente las cuentas del soroban moviéndose
3. Al final, da el resultado
4. Los números aparecen y desaparecen rápido — solo la mente los retiene

### 2.2 Modos de Juego

| Modo | Descripción | Dificultad |
|------|-------------|:----------:|
| 🐢 **Tortuga** | Números aparecen 3s cada uno | Fácil |
| 🐇 **Conejo** | Números aparecen 2s cada uno | Medio |
| 🦊 **Zorro** | Números aparecen 1s cada uno | Difícil |
| ⚡ **Rayo** | Solo se ESCUCHAN (sin ver) | Experto |

### 2.3 Formato de Problema

```
"5" → (pausa) → "+3" → (pausa) → "-2" → (pausa) → "+4" → "¿Resultado?"
                                                    → Niño responde: 10
```

---

## 3. Progresión

| Nivel | Operaciones | Cantidad números | Rango | Velocidad |
|:-----:|-------------|:----------------:|:-----:|:---------:|
| 1 | Solo suma | 2 | 0-9 | 🐢 3s |
| 2 | Solo suma | 3 | 0-9 | 🐢 3s |
| 3 | Suma y resta | 3 | 0-9 | 🐢 3s |
| 4 | Suma y resta | 4 | 0-9 | 🐇 2s |
| 5 | Suma y resta | 5 | 0-20 | 🐇 2s |
| 6 | Suma y resta | 6 | 0-50 | 🦊 1s |
| 7 | Suma y resta | 8 | 0-99 | 🦊 1s |
| 8 | Suma y resta | 10 | 0-99 | ⚡ Solo audio |

---

## 4. UI

```
┌──────────────────────────────┐
│ ☰  Flash Nivel 4  ⭐ 90  👤 │
├──────────────────────────────┤
│                              │
│                              │
│           ⚡ 7               │  ← Número actual (grande)
│                              │     Aparece y desaparece
│                              │
│                              │
│   📝 5 + 3 - 2 + 1           │  ← Historial de la serie
│                              │
│   ┌─────┐ ┌─────┐ ┌─────┐   │
│   │  8  │ │  9  │ │  10 │   │  ← Opciones
│   └─────┘ └─────┘ └─────┘   │
│                              │
│   ⏱️ 2.4s                     │  ← Temporizador
└──────────────────────────────┘
```

---

## 5. Audio

- **Voz del sensei**: TTS recitando los números (estilo profesor japonés)
- **Tono de atención**: antes de cada número (sutil)
- **Tono de respuesta**: el niño debe responder
- **Acierto**: campana japonesa + "¡Correcto!"
- **Error**: "La respuesta era 10. Visualiza el ábaco."
- **Música**: sin música durante el juego (solo concentración)

---

## 6. Motor Anzan

```javascript
class FlashEngine {
  constructor() {
    this.series = [];  // [{op: '+', num: 3}, ...]
    this.answer = 0;
  }
  
  generateProblem(count, maxNum) {
    this.series = [];
    let current = Math.floor(Math.random() * maxNum);
    this.series.push({ op: 'start', num: current });
    for (let i = 1; i < count; i++) {
      const op = Math.random() > 0.3 ? '+' : '-';
      const num = Math.floor(Math.random() * Math.min(current, maxNum)) + 1;
      if (op === '+') current += num; else current = Math.max(0, current - num);
      this.series.push({ op, num });
    }
    this.answer = current;
  }
  
  // Reproducir la serie con pausas
  async playSeries(speedMs, onNumber, onComplete) {
    for (const step of this.series) {
      onNumber(step);
      await new Promise(r => setTimeout(r, speedMs));
    }
    onComplete();
  }
}
```

---

## 7. Stack

- HTML5 + CSS3 + vanilla JS (single file)
- Sin Canvas (solo DOM + animaciones CSS)
- TTS (voces del sensei)
- Web Audio API (tonos de atención)
- Assets compartidos
