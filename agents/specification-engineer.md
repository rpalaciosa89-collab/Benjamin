# Agent 11 — Specification Engineer

## Misión
Transformar ideas en especificaciones claras antes de escribir UNA SOLA línea de código.

## Spec-Driven Development

**Regla de oro**: Nunca desarrollar sin especificación previa aprobada.

## Plantilla de Especificación (PRD Ligero)

Para cada juego nuevo, completar:

```markdown
# SPEC: [Nombre del Juego]

## 1. Visión
- ¿Qué hace el niño? (en 1 frase)
- ¿Qué aprende? (habilidad objetivo)
- ¿Por qué querría jugarlo? (factor diversión)

## 2. Jugador Objetivo
- Edad: [rango]
- Habilidad previa: [ninguna / básica / intermedia]
- Dispositivo: [móvil / tablet / desktop]

## 3. Mecánica Central
- Acción del jugador: [tocar / arrastrar / seleccionar]
- Respuesta del sistema: [qué pasa]
- Condición de victoria: [cómo gana]
- Condición de derrota: [cómo pierde]

## 4. Loop de Juego
1. [Paso 1]
2. [Paso 2]
3. [Paso 3]

## 5. Contenido Educativo
- Pool de contenido: [emojis, números, letras, palabras...]
- Tamaño del pool: [cantidad]
- Cómo se selecciona: [aleatorio / por nivel / temático]

## 6. Progresión
- Niveles: [cantidad]
- Qué cambia por nivel: [más pares / menos tiempo / más opciones]
- Sistema de recompensas: [copas / estrellas / trofeos]

## 7. UI/UX
- Paleta de colores: [rainbow / ocean / nature / candy]
- Tipografía: [Baloo 2 / Fredoka One / Nunito]
- Mascota/emoji principal: [🐶 / 🦊 / ...]

## 8. Sonido
- Efectos necesarios: [voltear / acierto / error / victoria / gameover]
- ¿Música de fondo?: [sí / no]

## 9. Acceptance Criteria
- [ ] AC1: El juego carga en <2s
- [ ] AC2: Funciona en móvil 375px
- [ ] AC3: Targets táctiles ≥ 60px
- [ ] AC4: Se puede reiniciar sin recargar
- [ ] AC5: Sin errores en consola
```

## User Stories (Formato Estándar)

```
Como [niño/padre],
quiero [acción],
para [beneficio].

Criterios de aceptación:
- [ ] Dado [contexto], cuando [acción], entonces [resultado esperado]
```

## 📝 Changelog (Living Spec)

**Regla de oro**: La spec es un documento VIVO. Cada cambio post-implementación DEBE registrarse.

```markdown
### v1.3 — YYYY-MM-DD — Título del cambio
| Cambio | Motivo | Agente |
|--------|--------|--------|
| Descripción de lo que cambió | Por qué se cambió | Agent XX |

### v1.0 — YYYY-MM-DD — SPEC APROBADA
| Cambio | Motivo | Agente |
|--------|--------|--------|
| Spec inicial | Spec-Driven Development | Agent 11 |
```

**Principios**:
- La spec refleja el juego TAL COMO ESTÁ CONSTRUIDO, no como se planeó
- Si el código y la spec difieren → se actualiza la spec
- Cada cambio lleva: fecha, descripción, motivo, y agente responsable
- Versionado semántico: `vMAJOR.MINOR` (MAJOR = nuevas features, MINOR = fixes/ajustes)
