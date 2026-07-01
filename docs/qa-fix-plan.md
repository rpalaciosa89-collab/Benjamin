# 🔧 Plan de Corrección QA — edgybenji.app v38 → v39+

> **Metodología**: Spec-Driven Development + Incremental Loop  
> **Principio**: Cada incremento es atómico, testeable, y no rompe nada  
> **Agentes**: kids-ux-design, game-progression-system, specification-engineer

---

## 📋 Incrementos Planificados

### 🔴 Incremento 1 — Touch Targets y Avatares (P1)

| Archivo | Cambio | Issue QA |
|---------|--------|:--------:|
| `magic-abc/index.html` | `.debug-lvl-btn`: min-height 36px, font-size 13px | #1 |
| `index.html` | `.avatar-option`: width/height 56px explícito | #2 |

**Validación**: Abrir MagicABC → N1-N7 botones ≥36px. Abrir Hub → crear perfil → avatares con tamaño correcto.

---

### 🟡 Incremento 2 — Footers Faltantes (P2)

| Archivo | Cambio | Issue QA |
|---------|--------|:--------:|
| `benji-al-rescate/index.html` | Añadir `<footer>` con dedicatoria | #4 |
| `color-fun/index.html` | Añadir `<footer>` con dedicatoria | #4 |
| `aritmi/index.html` | Añadir `<footer>` con dedicatoria | #4 |
| `benjimates/benjiban/index.html` | Añadir `<footer>` con dedicatoria | #4 |

**Footer estándar**:
```html
<footer style="text-align:center;padding:8px 16px 16px;color:#94a3b8;font-size:12px;font-weight:500;flex-shrink:0">
    Hecho con ❤️ para Benjamín · edgybenji.app
</footer>
```

**Validación**: Abrir cada juego → footer visible al final.

---

### 🟡 Incremento 3 — Scroll Hub + SW Precache (P2)

| Archivo | Cambio | Issue QA |
|---------|--------|:--------:|
| `index.html` | Reducir hero margin-bottom 50→30px, gap cards 24→16px | #3 |
| `sw.js` | Añadir `./benjimates/index.html` a PRECACHE | #10 |

**Validación**: Hub sin scroll en desktop 1024px. SW precachea benjimates.

---

### 🟢 Incremento 4 — Accesibilidad (P3)

| Archivo | Cambio | Issue QA |
|---------|--------|:--------:|
| Todos los HTML | `@media (prefers-reduced-motion: reduce) { *,*::before,*::after { animation: none !important } }` | #7 |
| `magic-abc/index.html` | `canvas`: añadir `aria-label="Área de trazado de letras"` | #12 |
| `benjimates/benjiban/index.html` | `canvas`: añadir `aria-label="Ábaco interactivo"` | #12 |

**Validación**: Activar "Reduce motion" en SO → animaciones se detienen.

---

## 🔄 Loop de Implementación

```
Para cada incremento:
  1. Leer especificación actual del archivo
  2. Aplicar cambio mínimo necesario
  3. Verificar sintaxis (node -e)
  4. Commit atómico con mensaje descriptivo
  5. Deploy + SW bump
  6. Testear en navegador (abrir página, verificar fix)
  7. Si falla → rollback y re-planificar
  8. Si pasa → siguiente incremento
```

---

## 📊 Estado Actual vs Objetivo

| Métrica | v38 | v39+ |
|---------|:---:|:----:|
| Botones ≥44px touch | 90% | 100% |
| Footers consistentes | 2/7 | 7/7 |
| Hub sin scroll desktop | ❌ | ✅ |
| SW precache completo | 13 archivos | 14 |
| reduced-motion respetado | 0 juegos | 7 juegos |
| aria-labels en canvas | 0 | 2 |
