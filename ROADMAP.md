# 🗺️ EduGenius AI Factory — Roadmap

> **Objetivo**: Convertir bebés y niños normales en genios mediante juegos educativos.

---

## FASE 1 — STATIC SITE (Actual) ✅

**Stack**: HTML5 vanilla, GitHub Pages, PWA, localStorage  
**Dominio**: `edgybenji.app`

### Completado
- [x] Hub central con 3 juegos (Aritmi, Benji al Rescate, Color Fun)
- [x] Sistema multi-agente (skills)
- [x] PWA + Service Worker (offline)
- [x] Favicon, robots.txt, 404
- [x] Music Player con selector de canciones
- [x] CI/CD con GitHub Actions

### En progreso
- [ ] Ampliar catálogo de juegos (Meta: 10 juegos)
- [ ] Dashboard de progreso para padres (localStorage)
- [ ] Sistema de logros unificado entre juegos

---

## FASE 2 — PWA + DATA (Próxima) 🔜

**Meta**: 10 juegos, progreso unificado, dashboard padres

### Juegos Planificados
| # | Juego | Tipo | Habilidad | Edad |
|---|-------|------|-----------|------|
| 4 | MemoAnimals | Memoria | Memoria visual | 3-5 |
| 5 | LetterQuest | Matching | Letras y fonética | 4-6 |
| 6 | NumberRace | Arcade | Conteo rápido | 5-7 |
| 7 | ShapeWorld | Puzzle | Geometría básica | 4-6 |
| 8 | SilabaTap | Quiz | Sílabas | 5-7 |
| 9 | ScienceFun | Quiz | Ciencia básica | 6-8 |
| 10 | LogicPath | Secuencia | Lógica | 6-8 |

### Features
- [ ] Progreso unificado (localStorage cross-game)
- [ ] Dashboard padres (localStorage-based)
- [ ] Dificultad adaptativa cliente (Agent 16)
- [ ] Telemetría básica (Agent 17)
- [ ] Perfiles de jugador (nombre + avatar)

---

## FASE 3 — FULL STACK (Futuro) 🔮

**Stack**: Next.js + React + TypeScript + NestJS + PostgreSQL + Redis  
**Cloud**: AWS/GCP

### Features
- [ ] Autenticación (login padres)
- [ ] Dashboard padres avanzado
- [ ] IA adaptativa server-side
- [ ] Multi-dispositivo (sincronización)
- [ ] Leaderboards y logros sociales
- [ ] Monetización (freemium → suscripción)
- [ ] Cumplimiento COPPA / GDPR-K
- [ ] Infraestructura cloud escalable
- [ ] Observabilidad completa (OpenTelemetry)

---

## Métricas de Éxito

| Fase | Métrica | Objetivo |
|------|---------|----------|
| 1 | Juegos publicados | 5-10 |
| 1 | Tiempo de sesión promedio | >5 min |
| 2 | Retención D7 | >40% |
| 2 | Juegos completados / sesión | >3 |
| 3 | Usuarios activos | >1,000 |
| 3 | MRR | >$1,000 |

---

## Diagrama de Fases

```
FASE 1 (AHORA)          FASE 2 (3-6 meses)       FASE 3 (6-12 meses)
─────────────────      ─────────────────────     ─────────────────────
Static HTML5           PWA + Datos               Full Stack
3 juegos               10 juegos                 Plataforma completa
localStorage           Progreso unificado        IA adaptativa
GitHub Pages           Dashboard padres          Multi-dispositivo
Vanilla JS             Dificultad adaptativa     Monetización
                       
Agentes activos:       Agentes activos:          Todos los 27 agentes
01,02,06,07,08,11,     +03,05,09,16,17           activos
15,20,21,22
```
