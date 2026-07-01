---
name: letter-path-audit
description: "Auditoría sistemática de paths de letras en MagicABC. Verifica que cada letra en letter-paths.js dibuje correctamente la letra que representa, comparando pares confusos (b/h, d/a, p/q, n/h, etc.) y validando dirección de trazos. USAR cuando: se detecte que una letra se ve como otra, al hacer QA del juego de trazado, al modificar generate-strokes.js."
user-invocable: true
---

# Auditoría de Paths de Letras (Letter Path Audit)

## Cuándo Usar Este Skill

- Al modificar `magic-abc/generate-strokes.js` o `magic-abc/letter-paths.js`
- Cuando se reporta que una letra "se ve como otra" en el canvas
- Antes de cada despliegue a producción (parte del checklist QA)
- Al agregar nuevas letras al sistema

## Anatomía de un Trazo

Cada letra en `generate-strokes.js` se define como un array de STROKES (trazos independientes).
Cada stroke es un array de puntos `{x, y}` en un espacio de dibujo de **200×250**:
- `y=20` → parte superior (ascendentes)
- `y=200` → línea base
- `y=225` → descendentes
- `x=35` → margen izquierdo
- `x=170` → margen derecho

```
y=20   ┌──────────────────────────────┐
       │  (zona de ascendentes)        │
y=100  │  (zona media)                 │
y=145  │  (altura de arco/hump)        │
y=200  │  ─── línea base ───          │
y=225  │  (zona de descendentes)       │
       └──────────────────────────────┘
       x=35                        x=170
```

## Reglas Caligráficas por Letra

### Pares Críticos (confunden al niño si son similares)

| Par | Diferencia Clave |
|-----|-----------------|
| **b vs h** | `b`: arco SUBE (y↓) y cierra en bowl. `h`: arco va DERECHA (y~constante), luego baja como joroba. |
| **d vs a** | `d`: círculo + palo derecho hacia ARRIBA. `a`: círculo + palo derecho hacia ABAJO. |
| **p vs q** | `p`: palo DESCIENDE + círculo arriba. `q`: círculo arriba + palo DESCIENDE. |
| **n vs h** | `n`: empieza en baseline, sube y baja. `h`: palo completo + arco desde media altura. |
| **u vs v** | `u`: curva en U. `v`: dos rectas en V. Sin puntos intermedios en `v`. |
| **g vs q** | `g`: círculo + cola curva. `q`: círculo + palo recto. |
| **m vs n** | `m`: 2 jorobas. `n`: 1 joroba. |

### Direcciones de Trazo Correctas

| Letra | Stroke 1 | Stroke 2 | Notas |
|-------|----------|----------|-------|
| **b** | \| vertical (y:20→225) | Bowl: empieza en media (y~142), SUBE (y~118), rodea y baja | El bowl SUBE primero |
| **h** | \| vertical (y:20→225) | Hump: empieza en media (y~145), va DERECHA (y~145→148), luego baja | El hump va → DERECHA, NO sube |
| **n** | Hump: baseline→arriba→derecha→baseline | (1 stroke) | Similar a 'h' stroke 2 pero empieza en baseline |
| **a** | Círculo antihorario | Palo derecho hacia ABAJO | |
| **d** | Círculo antihorario | Palo derecho hacia ARRIBA | Diferencia con 'a' |

## Procedimiento de Auditoría

### Paso 1: Extraer paths de pares confusos
```bash
node -e "
const fs=require('fs');
eval(fs.readFileSync('magic-abc/letter-paths.js','utf8'));
['b','h','d','a','p','q','n','u','v','g','m'].forEach(k => {
  console.log(k + ': ' + JSON.stringify(LETTER_PATHS[k]));
});
"
```

### Paso 2: Verificar visualmente cada stroke
Para cada stroke de cada letra, trazar mentalmente la secuencia de puntos y verificar:
- ¿El stroke 1 empieza y termina donde debe?
- ¿El stroke 2 empieza a la altura correcta?
- ¿La dirección inicial del stroke 2 distingue esta letra de sus pares confusos?

### Paso 3: Verificar distinción de pares
Para cada par confuso (ej: 'b' vs 'h'):
- Comparar los primeros 3 puntos del stroke 2
- Si ambos van en la misma dirección (ej: ambos SUBEN), hay ambigüedad
- La dirección inicial DEBE ser diferente para que un niño las distinga

### Paso 4: Corregir en generate-strokes.js
```javascript
// Ejemplo de 'h' CORRECTA:
'h': [
  [{x:35,y:20},{x:35,y:225}],       // | vertical
  [{x:35,y:145},{x:60,y:148},{x:90,y:145},{x:115,y:140},  // → DERECHA primero
   {x:135,y:148},{x:148,y:162},{x:152,y:180},               // luego curva ↓
   {x:145,y:198},{x:125,y:210},{x:98,y:215},{x:72,y:212},{x:50,y:205},{x:38,y:195}],
],

// Ejemplo de 'b' CORRECTA:
'b': [
  [{x:35,y:20},{x:35,y:225}],       // | vertical
  [{x:35,y:142},{x:68,y:118},{x:112,y:118},{x:148,y:138},  // ↑ SUBE primero
   {x:155,y:168},{x:148,y:198},{x:115,y:218},{x:68,y:215},{x:35,y:195}],
],
```

### Paso 5: Regenerar y verificar
```bash
node magic-abc/generate-strokes.js
```

## Checklist de QA Pre-Despliegue

- [ ] Las 59 letras tienen paths distintos entre sí
- [ ] Pares confusos (b/h, d/a, p/q, n/h, u/v, g/q, m/n) tienen direcciones iniciales visiblemente diferentes
- [ ] `generate-strokes.js` y `letter-paths.js` están sincronizados
- [ ] `node generate-strokes.js` corre sin errores
- [ ] Test visual en móvil: N3 "h" muestra hump, no bowl
