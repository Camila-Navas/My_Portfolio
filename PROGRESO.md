# Progreso del Portafolio - Maria Camila Vesga Navas

> Ultima actualizacion: **29 de abril de 2026**
> Estado: **Estructura completa. Fases 1, 2 y 3 visuales aplicadas. Infraestructura tecnica lista (form de contacto + tests + CI + stats GitHub + heatmap de contribuciones). Pendiente: reemplazar contenido placeholder por datos reales y configurar GITHUB_TOKEN para activar el heatmap.**

---

## Indice

1. [Contexto del proyecto](#1-contexto-del-proyecto)
2. [Identidad personal](#2-identidad-personal)
3. [Estado del trabajo realizado](#3-estado-del-trabajo-realizado)
4. [Pendientes de contenido (datos reales)](#4-pendientes-de-contenido-datos-reales)
5. [Catalogo de mejoras visuales propuestas](#5-catalogo-de-mejoras-visuales-propuestas)
6. [Catalogo de mejoras tecnicas y funcionales](#6-catalogo-de-mejoras-tecnicas-y-funcionales)
7. [Como continuar la proxima sesion](#7-como-continuar-la-proxima-sesion)
8. [Comandos utiles](#8-comandos-utiles)

---

## 1. Contexto del proyecto

**Stack actual:**
- Next.js 16.1.1 (App Router) + React 19.2.3 + TypeScript 5
- Tailwind CSS 4 + tw-animate-css
- Framer Motion 12 (animaciones)
- Radix UI + lucide-react (UI primitives e iconos)
- TanStack Query 5, next-themes, sonner
- shadcn/ui style components en `components/ui`
- Resend (envio de emails desde el form de contacto)
- Vitest + Testing Library + jsdom (tests)
- GitHub Actions (CI: lint + test + build)

**Estructura de rutas:**
- `src/app/(general)/page.tsx`: Home con secciones Hero -> About -> Skills -> GitHub -> Projects -> Experience -> Contact
- `src/app/proyectos/[slug]/`: detalle dinamico de proyectos
- `src/app/experience/[slug]/`: detalle dinamico de experiencias y certificados
- `src/app/api/contact/`: endpoint del formulario
- `src/app/api/github-stats/`: endpoint de estadisticas de GitHub

**Datos centralizados** en `src/config/` (los componentes son presentacionales y consumen estos datos, no editar componentes para cambiar texto).

---

## 2. Identidad personal

| Campo | Valor |
|---|---|
| Nombre completo | Maria Camila Vesga Navas |
| Rol | Tecnologa en Analisis y Desarrollo de Software |
| Descripcion | Software Developer / QA Analyst / IT Support / Automatizacion de Pruebas / Resolucion de Incidencias |
| GitHub | https://github.com/13camilaaaaa |
| LinkedIn | https://www.linkedin.com/in/camila-navas13 |
| Email | camilanavas13@gmail.com |
| Experiencia actual | Auxiliar de Sistemas en ODIR Certificaciones S.A.S (Julio 2025 - Actualidad) |
| Educacion | SENA - Tecnologa en Analisis y Desarrollo de Software (2024 - 2026) |

---

## 3. Estado del trabajo realizado

### 3.1 Contenido de `src/config/`

| Archivo | Estado | Detalles |
|---|---|---|
| `hero-data.ts` | REAL | Nombre, rol, descripcion, GitHub, LinkedIn, email reales. Foto en `public/fotoPerfilHojaVida.png` (placeholder, ver 4.1). |
| `contact-data.ts` | REAL | LinkedIn, GitHub y email reales. |
| `experience-data.ts` (WORK id 1) | REAL | ODIR Auxiliar de Sistemas - Julio 2025 / Actualidad. Description y skills razonables. |
| `experience-data.ts` (WORK id 2) | PLACEHOLDER | "Desarrolladora Full Stack (Portafolio)". |
| `experience-data.ts` (EDUCATION id 1) | REAL | SENA Tecnologa ADSI 2024-2026. |
| `experience-data.ts` (EDUCATION ids 2-5) | PLACEHOLDER | 4 certificados (Soporte Tecnico, QA Testing, Automatizacion, JS Moderno). |
| `about-data.ts` | SEMI-REAL | Timeline con SENA y ODIR reales. Stats genericos (Software Dev / QA Analyst / IT Support / Full Stack). |
| `skills-data.ts` | PLACEHOLDER | 6 categorias razonables (Frontend, Backend, QA, IT Support, BD, Tools). |
| `projects-data.ts` | PLACEHOLDER | 5 proyectos con GitHub apuntando a `13camilaaaaa` y demos vacios. |
| `experience-certificado-data.ts` | PLACEHOLDER | Detalles de los 5 certificados con slugs alineados al EDUCATION. |

### 3.2 Branding y archivos de marca

| Item | Estado |
|---|---|
| `package.json` | `name: "hoja-vida-camila"` |
| Header / Footer | Logo `DevCamila` |
| `src/app/layout.tsx` | `title: "Maria Camila Vesga Navas | Software Developer & QA Analyst"` |
| `src/app/icon.svg` | Favicon SVG con monograma "C" sobre fondo negro |
| `src/app/opengraph-image.tsx` | Imagen OG dinamica 1200x630 generada con `next/og` |
| `public/cv-camila.pdf` | Existe pero su contenido es placeholder (ver 4.1) |
| `public/fotoPerfilHojaVida.png` | Existe pero es placeholder (ver 4.1) |

### 3.3 Copy del Contact

`src/components/contact/ContactSection.tsx`. Texto alineado a los tres perfiles reales: Software Developer, QA Analyst, IT Support. Genero femenino, propuesta de valor con desarrollo + aseguramiento de calidad + resolucion de incidencias.

### 3.4 OpenGraph, favicon y metadata SEO

- `src/app/icon.svg`: favicon SVG con monograma "C".
- `src/app/opengraph-image.tsx`: imagen OG dinamica 1200x630 con nombre, rol, descripcion y branding.
- `src/app/layout.tsx`: metadata completa con `metadataBase`, `openGraph`, `twitter` (summary_large_image), `keywords`, `authors`, `robots`, `alternates.canonical`. `lang="es"`. Fuentes cargadas via `next/font/google` (Geist Sans, Geist Mono, Instrument Serif).
- Pendiente: cuando se despliegue, reemplazar `SITE_URL` placeholder en `layout.tsx` por el dominio real.
- Pendiente opcional: si no hay cuenta de Twitter/X, eliminar `creator: "@13camilaaaaa"` del bloque `twitter`.

### 3.5 Formulario de contacto real

- `src/app/api/contact/route.ts`: API Route con honeypot anti-spam y envio via Resend (3000 emails gratis al mes).
- `src/components/contact/ContactForm.tsx`: form cliente con loading state, contador de caracteres, toasts (sonner), honeypot oculto, validacion HTML nativa y nota de privacidad.
- `src/components/contact/ContactSection.tsx`: form como accion primaria, separador "o tambien", luego copy email y redes sociales.
- `package.json`: dependencia `resend ^4.0.0`.
- `.env.example` con `RESEND_API_KEY`, `CONTACT_EMAIL_TO`, `CONTACT_EMAIL_FROM` (mas `GITHUB_TOKEN` opcional).
- Pendientes para activar en produccion:
  1. Crear cuenta en https://resend.com.
  2. Generar API Key y crear `.env.local`.
  3. Configurar las variables en Vercel antes del deploy.
  4. Mientras no este la API Key, el form muestra toast "Servicio de correo no configurado" sin romper nada.

### 3.6 Tests + CI con GitHub Actions

Coherente con el perfil de QA Analyst.

- `vitest.config.ts` y `vitest.setup.ts` configurados con jsdom, alias `@` y `@/src`.
- Validacion del API contact extraida a `src/lib/contact-validation.ts` (puro, testeable).
- Tests creados (mas de 60 assertions en total):
  - `src/lib/contact-validation.test.ts`: honeypot, nombres (vacio, min, max, no-string, trim), email (formatos validos e invalidos parametrizados con `it.each`), mensajes (boundaries), regex aislada.
  - `lib/utils.test.ts`: helper `cn()` (combinacion, falsy, conditionals, merge Tailwind).
  - `src/components/contact/ContactForm.test.tsx`: render, honeypot oculto, contador de caracteres, mock de fetch y verificacion de POST.
  - `src/app/api/github-stats/route.test.ts`: 14 tests de `buildStats` con `vi.useFakeTimers` para validar el calculo de aniversario.
- Scripts agregados: `test`, `test:watch`, `test:coverage`.
- DevDeps: `vitest`, `@vitejs/plugin-react`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`.
- `.github/workflows/ci.yml`: lint + test + build en cada push a `main` y en cada PR (Node 20).
- Pendiente: correr `npm install` para que las deps queden instaladas, luego `npm run test`.

### 3.7 Stats dinamicos de GitHub

- `src/app/api/github-stats/route.ts`: endpoint que consume las APIs publicas `users/{login}` y `users/{login}/repos`, descarta forks, devuelve stats calculadas con cache `revalidate: 3600` (1h).
- Datos expuestos: total repos publicos, seguidores, stars y forks acumulados, anos en GitHub, top 5 lenguajes con porcentaje, repo mas reciente y repo destacado.
- Logica pura extraida a `buildStats(user, repos)` para que sea testeable sin mockear `fetch`.
- `src/components/section/GitHubStats.tsx`: cliente con loading skeleton, error fallback, formateo es-CO y fechas relativas en espanol.
- `src/components/section/GitHubSection.tsx`: wrapper con badge "Actividad en vivo".
- `.env.example`: variable opcional `GITHUB_TOKEN` (sube rate limit de 60/h a 5000/h).

### 3.8 Mejoras visuales - Fase 1

Cinco mejoras visuales aplicadas para una primera impresion impactante.

**V44 - Paleta cyan-teal en OKLCH**
- `src/app/globals.css`: `:root` y `.dark` reescritos en OKLCH con base cyan-teal (`#0891b2` light / `#22d3ee` dark). Accent magenta-pink suave para contraste sutil. Background con tinte frio.
- Variables `--primary`, `--primary-rgb`, `--accent`, `--accent-rgb` agregadas.
- Componentes con clases `cyan-*` coherentes con la paleta global.

**V08 - Scroll progress bar**
- `src/components/section/ScrollProgress.tsx`: usa `useScroll` + `useSpring` de Framer Motion. Barra de 3px fija arriba con gradiente `from-primary via-accent to-primary` y shadow glow. Origen left, scaleX animado.
- Integrado en `src/app/(general)/layout.tsx`.

**V01 - Tipografia display**
- `src/app/layout.tsx`: Geist Sans, Geist Mono e **Instrument Serif** via `next/font/google` con variables CSS y `display: swap`.
- `src/app/globals.css`: utility `.font-display` con `var(--font-instrument-serif)`, peso 400, italic disponible, letter-spacing -0.02em.
- `src/components/section/Hero.tsx`: H1 con tipografia mixta (eyebrow uppercase + nombre en italic display con bg-clip-text gradient + rol en peso medium). `clamp(2.5rem, 7vw, 5.25rem)` (typography fluid).
- `src/components/section/Skills.tsx`: titulo "Arsenal **Tecnologico**" con la palabra clave en italic display.

**V02 - Gradient mesh animado en Hero**
- `src/app/globals.css`: clase `.gradient-mesh` con 2 blobs `radial-gradient` blureados en bucle infinito (animations `mesh-drift-a 18s` y `mesh-drift-b 22s` con `alternate`). Usa los colores del tema.
- Soporte `prefers-reduced-motion: reduce`.
- `src/components/section/Hero.tsx`: grid pattern con `mask-image` radial para fade en los bordes. Gradient mesh debajo + halo central tematico encima.

**V18 - Glow border en cards de Skills**
- `src/app/globals.css`: utility `.glow-border` con pseudo-elemento `::before` que crea un borde de 1.5px hecho con `conic-gradient` que rota usando la propiedad CSS `@property --glow-angle` (CSS Houdini). Solo se activa en `:hover` o `:focus-within`.
- `src/components/section/Skills.tsx`: las cards tienen `glow-border rounded-2xl` en su wrapper externo. Se combina con tilt 3D + spotlight.

**Detalles adicionales aplicados:**
- `::selection` con color tematico (`rgba(--primary-rgb) 0.25`).
- Badge "Disponible" del Hero con `.dot-pulse` (dos ondas concentricas pulsantes).
- Hero copy con jerarquia clara y `clamp()` para typography fluid responsive.

### 3.9 Mejoras visuales - Fase 2

Cinco mejoras de "efecto wow tecnico". Demuestran dominio de patrones modernos de React, animaciones interactivas, layouts asimetricos y arquitectura de componentes reutilizables.

**V22 - Number counters animados**
- `src/components/section/NumberCounter.tsx`: componente reutilizable con `useInView` + `requestAnimationFrame` + ease-out cubic. Respeta `prefers-reduced-motion`. Acepta `value`, `duration`, `prefix`, `suffix`, `className`.
- Aplicado en `GitHubStats` (publicRepos, totalStars, followers, yearsOnGithub) y en `About` (anos de formacion, hitos clave, areas tecnicas).
- Uso de `tabular-nums` para que los digitos no salten al cambiar.

**V09 - Custom cursor minimal**
- `src/components/section/CustomCursor.tsx`: dot interno pequeno con spring rapido + ring externo grande con spring lento. El ring se expande sobre `a, button, [role="button"], input, textarea, select, [data-cursor="hover"]`.
- Solo se monta en desktop con `pointer: fine`. Respeta `prefers-reduced-motion: reduce`.
- `globals.css`: regla `body.custom-cursor-active *` con `cursor: none !important` solo cuando JS esta activo.
- Integrado en `src/app/(general)/layout.tsx`.

**V17 - Bento grid asimetrico en Skills**
- `src/components/section/Skills.tsx`: grid `md:grid-cols-4 md:auto-rows-[180px]` con asignacion explicita por id de categoria.
- **QA Testing** (vertical principal de Camila) ocupa una card de `col-span-2 row-span-2` con tipografia display italic, padding mayor, icono mas grande y tags mas anchos.
- Frontend, Backend y Tools en cards `col-span-2`. IT Support y BD en cards `col-span-1`.
- En mobile colapsa a 1 columna automaticamente.
- La card destacada (`featured`) tiene gradient sutil + halo radial decorativo de fondo.

**V19 - Spotlight cards en Projects**
- `src/components/projects/ProjectCard.tsx`: agregado `useMotionValue` + `useMotionTemplate` para tracking del cursor por card. Pseudoelemento con `radial-gradient` que aparece solo en hover.
- Todas las cards de proyectos tienen `glow-border` ademas del spotlight. Tres efectos compuestos: glow border + spotlight radial + tilt y subida en hover.

**V32 - Sticky scroll en About**
- `src/components/section/About.tsx`: la columna derecha es `lg:sticky lg:top-28`. Mientras se scrollea el timeline + terminal a la izquierda, la columna derecha permanece visible.
- Nueva card highlight con `glow-border` arriba de las stats: badge "En Formacion Activa", `NumberCounter` gigante de "anos" calculados desde `FORMATION_START_YEAR = 2024`, descripcion contextual, dos sub-stats con NumberCounter (Hitos clave, Areas tecnicas).
- Las 4 stat cards rediseñadas con glow-border heredado.

### 3.10 Mejoras visuales - Fase 3 (29 de abril de 2026)

Las 7 mejoras de Fase 3 quedaron aplicadas, en orden de menor a mayor esfuerzo. Todas respetan `prefers-reduced-motion: reduce` y degradan gracilmente.

**V03 - Typewriter en el rol del Hero**
- `src/components/section/Typewriter.tsx`: componente reutilizable con tres fases (typing -> pausa -> deleting). Usa `useState` con inicializador lazy para detectar `prefers-reduced-motion` sin caer en `set-state-in-effect`. En reduced-motion muestra solo el primer rol estatico.
- `src/config/hero-data.ts`: nuevo array `roles: ["Software Developer", "QA Analyst", "IT Support", "Automatización de Pruebas"]`.
- `src/components/section/Hero.tsx`: el `<span>` del rol ahora consume `<Typewriter words={HERO_CONTENT.roles}>` con cursor pulsante en color primary.

**V10 - Smooth scroll con Lenis**
- Dependencia: `lenis` agregada (`npm install lenis`).
- `src/components/section/SmoothScroll.tsx`: provider cliente que inicializa Lenis con `duration: 1.1`, `easing` exponencial y `requestAnimationFrame`. Salta la inicializacion si el usuario tiene reduced-motion. Cleanup completo en unmount.
- `src/app/(general)/layout.tsx`: `<SmoothScroll />` montado al inicio del fragment.
- `src/app/globals.css`: bloque `===== V10: Lenis smooth scroll =====` con las clases recomendadas (`html.lenis`, `.lenis.lenis-smooth`, `.lenis.lenis-stopped`, `[data-lenis-prevent]`).

**V14 - View Transitions API entre Home y /proyectos/[slug]**
- `src/app/globals.css`: `@view-transition { navigation: auto; }` activa cross-document transitions en navegadores compatibles (Chrome 126+). Custom de duraciones (`::view-transition-old(root)`, `::view-transition-new(root)`, `::view-transition-group(*)` a 320-420ms con cubic-bezier suave). Se anula a `0.001ms` con `prefers-reduced-motion`.
- `src/components/projects/ProjectCard.tsx`: el `<Link>` de la imagen tiene `style={{ viewTransitionName: 'project-image-${slug}' }}` y el `<h3>` del titulo tiene `project-title-${slug}`.
- `src/components/project-detail/ProjectHero.tsx`: la interface `project` ahora incluye `slug`, y los mismos `view-transition-name` se aplican al `<motion.h1>` (titulo) y al div de la imagen principal. Asi el titulo y la imagen "morfean" entre el card y el detalle.
- En navegadores sin soporte, no rompe nada (CSS estandar ignorado).

**V31 - Filtros animados en Projects**
- `src/components/projects/Projects.tsx`: ahora es stateful. Extrae las categorias unicas de `PROJECTS` con `useMemo`, agrega "Todos" al inicio. Estado `active` con `useState`.
- Pill animado entre filtros con `motion.span` + `layoutId="projects-filter-pill"` (spring stiffness 380, damping 32).
- Grid filtrado envuelto en `<motion.div layout>` + `<AnimatePresence mode="popLayout">`. Cada `ProjectCard` envuelto en un `motion.div` con animaciones de entrada/salida (`opacity`, `y`, `scale`).
- Mensaje "No hay proyectos en esta categoria todavia" cuando el filtro queda vacio.
- Accesibilidad: `role="tablist"` + `role="tab"` + `aria-selected`.

**V42 - Grid pattern interactivo (cells iluminadas con cursor)**
- `src/components/section/InteractiveGrid.tsx`: componente cliente con dos capas de grid superpuestas. La base es gris suave; la capa "highlight" usa `rgba(var(--primary-rgb), 0.55)` y se enmascara con `radial-gradient(circle ${glowRadius}px at var(--ig-mx) var(--ig-my))` para iluminar solo donde esta el cursor.
- Las CSS vars `--ig-mx`, `--ig-my`, `--ig-opacity` se actualizan via `requestAnimationFrame` desde un listener `pointermove` en `window` (no en el div, porque el div tiene `pointer-events: none` para no bloquear clics).
- Skip total en `prefers-reduced-motion` o `pointer: coarse` (mobile).
- `src/components/section/Hero.tsx`: reemplaza la capa de grid estatica por `<InteractiveGrid cellSize={28} glowRadius={220} />`.

**V24 - Contribution heatmap de GitHub**
- `src/app/api/github-contributions/route.ts`: endpoint nuevo que consume la API GraphQL de GitHub con la query `contributionsCollection.contributionCalendar`. Cache `revalidate: 3600`. Devuelve respuesta con tipo `GitHubContributionsResponse` (totalContributions, weeks con dias `{ date, count, level }`, rangeStart/rangeEnd).
- Si no hay `GITHUB_TOKEN` devuelve `503` con mensaje claro "GITHUB_TOKEN no configurado".
- Funcion `levelFor(count)` mapea contribuciones a niveles 0-4 (estilo GitHub clasico).
- `src/components/section/GitHubHeatmap.tsx`: componente cliente que renderiza el calendario tipo GitHub. Etiquetas de meses (Ene-Dic) y dias (Lun, Mie, Vie) en espanol. Tooltip `title` con fecha completa formateada en `es-CO`. Leyenda "Menos / Mas" con los 5 niveles. Loading skeleton + manejo de error con mensaje legible.
- `src/components/section/GitHubSection.tsx`: ahora envuelve `GitHubStats` y `GitHubHeatmap` en un `space-y-8`.
- **Para activar:** generar token en https://github.com/settings/tokens (scope `read:user`) y agregar `GITHUB_TOKEN=ghp_...` a `.env.local` y a Vercel.

**V30 - Stack view tipo Apple en Projects**
- `src/components/projects/ProjectsStack.tsx`: componente nuevo. Solo se muestra en `lg:block` (desktop) y aplica a los primeros 3 proyectos como showcase cinematico antes del grid filtrado.
- Cada `<StackCard>` usa `position: sticky` con `top: 96 + index * 28px` y un `marginBottom: 18vh` para crear el efecto de cards que se apilan al scrollear.
- Animaciones con `useScroll({ target, offset: ["start end", "end start"] })` + `useTransform`: cards anteriores reducen `scale` a `0.94` y `opacity` a `0.65` cuando se las "monta" la siguiente. La ultima card mantiene scale/opacity 1.
- Layout 2 columnas: imagen a la izquierda con badge de categoria flotante, contenido a la derecha (numero "01 / 03", titulo display italic, descripcion, tags, link "Ver proyecto").
- `src/components/projects/Projects.tsx`: `<ProjectsStack projects={PROJECTS.slice(0, 3)} />` ubicado entre el header y los filtros.

**Detalles tecnicos transversales:**
- `src/app/api/github-stats/route.ts` y `src/app/api/github-contributions/route.ts`: la export `revalidate` se cambio a literal `3600` (Next.js 16 ya no acepta referencia a const, error "Invalid segment configuration export").
- `next.config.ts` no requirio cambios; View Transitions usa CSS nativo.
- `npm run build`: 8 rutas generadas, build limpio.
- `npm test`: 55/55 tests pasan.
- `npm run lint`: 0 errores nuevos en archivos creados (algunos errores preexistentes en `NumberCounter.tsx`, `CustomCursor.tsx`, `ExperienceHero.tsx`, `ExperienceSidebar.tsx`, `ProjectChallenges.tsx`, `ProjectSidebar.tsx` no se tocaron porque no son parte de Fase 3).

---

## 4. Pendientes de contenido (datos reales)

### 4.1 Criticos

1. **CV en PDF**: el archivo `public/cv-camila.pdf` existe como placeholder. Reemplazar el binario por el CV real (mantener mismo nombre).
2. **Foto de perfil**: el Hero usa `public/fotoPerfilHojaVida.png` (placeholder). Reemplazar el binario por la foto real (mantener nombre o cambiar la ruta en `src/config/hero-data.ts`).
3. **SITE_URL** en `src/app/layout.tsx`: cuando despliegues, reemplazar el placeholder por el dominio real.
4. **GITHUB_TOKEN para el heatmap (V24)**: generar token en https://github.com/settings/tokens (scope `read:user`), agregarlo a `.env.local` y a las variables de entorno de Vercel. Sin token, el heatmap muestra "GITHUB_TOKEN no configurado" pero no rompe la pagina.
5. **Resend API Key**: pendiente de la activacion del formulario de contacto en produccion (ver 3.5).

### 4.2 Skills (`src/config/skills-data.ts`)

Validar las tecnologias reales que dominas. Las actuales son una propuesta razonable basada en tu perfil declarado.

### 4.3 Projects (`src/config/projects-data.ts`)

Reemplazar los 5 proyectos placeholder por proyectos reales con: slug, titulo, descripciones, tecnologias, features, imagenes (en `/public/`), links GitHub y demo, infraestructura.

### 4.4 Certificados

Reemplazar los items 2-5 de `EDUCATION` y los items correspondientes en `experience-certificado-data.ts` cuando los obtengas. Imagenes placeholder en `/public/`: `certificado_Next_js.jpg`, `certificado_React.jpg`, `javaScript.jpg`, `testing.jpg`.

### 4.5 About (`src/config/about-data.ts`)

- Hito 3 del timeline: refinar cuando definas con claridad tu enfoque actual.
- Stats: validar si los 4 valores reflejan la propuesta de valor que quieres comunicar.

### 4.6 Funciones reales en ODIR

Description y skills del cargo actual son razonables pero genericas. Confirmar funciones especificas para darle mas impacto.

### 4.7 Experience id 2 (Proyectos Personales)

Decidir si permanece, se elimina, o se reemplaza por otra experiencia real.

---

## 5. Catalogo de mejoras visuales propuestas

> Objetivo: que el portafolio impacte en los primeros 3 segundos, demuestre dominio de CSS avanzado, animaciones, micro-interacciones y arquitectura de componentes.

### 5.1 Hero

| # | Propuesta | Tecnologia | Esfuerzo | Impacto |
|---|---|---|---|---|
| V01 | Tipografia display | `next/font/google` + clamp() | Bajo | Alto | **APLICADA** |
| V02 | Animated gradient mesh | CSS puro | Bajo | Alto | **APLICADA** |
| V03 | Typewriter effect en el rol | useState + setInterval | Bajo | Medio | **APLICADA** |
| V04 | Foto con anillo orbital | SVG + CSS animation | Medio | Alto |
| V05 | Marquee infinito de tecnologias | CSS keyframes + mask | Bajo | Medio |
| V06 | Scroll hint animado | Framer Motion | Bajo | Bajo |
| V07 | Badge "Disponible" pulsante | Tailwind + keyframes | Bajo | Bajo | **APLICADA** |

### 5.2 Layout y navegacion global

| # | Propuesta | Tecnologia | Esfuerzo | Impacto |
|---|---|---|---|---|
| V08 | Scroll progress bar | Framer Motion `useScroll` | Bajo | Medio | **APLICADA** |
| V09 | Custom cursor minimal | mouse events + transform | Medio | Alto | **APLICADA** |
| V10 | Smooth scroll con Lenis | `lenis` | Bajo | Alto | **APLICADA** |
| V11 | Section indicators laterales | IntersectionObserver | Medio | Medio |
| V12 | Mode toggle morph | SVG + CSS transitions | Bajo | Medio |
| V13 | Header dinamico al scroll | useScroll + transform | Bajo | Medio |
| V14 | Page transitions con View Transitions API | View Transitions API | Medio | Alto | **APLICADA** |
| V15 | Custom selection color | CSS pseudo | Trivial | Bajo | **APLICADA** |
| V16 | Custom scrollbar estilizada | `::-webkit-scrollbar` | Trivial | Bajo |

### 5.3 Skills

| # | Propuesta | Tecnologia | Esfuerzo | Impacto |
|---|---|---|---|---|
| V17 | Bento grid asimetrico | CSS Grid + areas | Medio | Muy Alto | **APLICADA** |
| V18 | Glow border on hover | conic-gradient + @property | Medio | Muy Alto | **APLICADA** |
| V19 | Spotlight cards | mouse events + CSS variables | Medio | Alto | **APLICADA** |
| V20 | Iconos con stroke animado | lucide-react + Framer Motion | Bajo | Medio |
| V21 | Tags de skills con tilt 3D | transform-style + perspective | Medio | Medio |

### 5.4 GitHub Stats

| # | Propuesta | Tecnologia | Esfuerzo | Impacto |
|---|---|---|---|---|
| V22 | Number counters animados | Framer Motion `useInView` | Bajo | Alto | **APLICADA** |
| V23 | Donut chart para top languages | SVG + CSS | Medio | Alto |
| V24 | Contribution heatmap | GitHub GraphQL API | Alto | Muy Alto | **APLICADA (requiere GITHUB_TOKEN)** |
| V25 | Shimmer effect en loading | gradient + animation | Bajo | Bajo |

### 5.5 Projects

| # | Propuesta | Tecnologia | Esfuerzo | Impacto |
|---|---|---|---|---|
| V26 | Cards con tilt 3D | mouse events + transform | Medio | Alto |
| V27 | Spotlight cards | mouse events + CSS vars | Medio | Alto | **APLICADA via V19** |
| V28 | Imagen con parallax + zoom on hover | transform + transition | Bajo | Medio |
| V29 | Tags flotantes con stagger | Framer Motion variants | Bajo | Medio |
| V30 | Stack view tipo Apple | Framer Motion `useScroll` | Alto | Muy Alto | **APLICADA (showcase de los primeros 3 proyectos en desktop)** |
| V31 | Filtros por categoria/tech | Framer Motion `layout` | Medio | Alto | **APLICADA (filtros por categoria con pill animado)** |

### 5.6 About

| # | Propuesta | Tecnologia | Esfuerzo | Impacto |
|---|---|---|---|---|
| V32 | Sticky scroll narrative | position sticky + IntersectionObserver | Alto | Muy Alto | **APLICADA** |
| V33 | Timeline con SVG path drawing | SVG `pathLength` + `useScroll` | Medio | Alto |
| V34 | Stats con number counters | Framer Motion | Bajo | Medio | **APLICADA via V22** |

### 5.7 Experience

| # | Propuesta | Tecnologia | Esfuerzo | Impacto |
|---|---|---|---|---|
| V35 | Timeline vertical con conexiones animadas | SVG + `useInView` | Medio | Alto |
| V36 | Cards con border-glow on hover | conic-gradient + animation | Medio | Medio |

### 5.8 Contact

| # | Propuesta | Tecnologia | Esfuerzo | Impacto |
|---|---|---|---|---|
| V37 | Floating labels | CSS `:placeholder-shown` | Bajo | Medio |
| V38 | Focus rings con gradiente | `box-shadow` con multiple layers | Trivial | Bajo |
| V39 | Boton con liquid hover | clip-path + CSS animation | Medio | Medio |
| V40 | Confetti minimal al enviar exitoso | `canvas-confetti` | Trivial | Medio |

### 5.9 Footer y micro-detalles

| # | Propuesta | Tecnologia | Esfuerzo | Impacto |
|---|---|---|---|---|
| V41 | Onda SVG animada en el Footer | SVG `<path>` con animation | Bajo | Medio |
| V42 | Grid pattern interactivo (cells iluminadas con cursor) | CSS variables + mouse events | Alto | Alto | **APLICADA** |
| V43 | Copyright con ano dinamico | static | Trivial | Bajo |

### 5.10 Sistema y theming

| # | Propuesta | Tecnologia | Esfuerzo | Impacto |
|---|---|---|---|---|
| V44 | Paleta diferenciada (cyan-teal en OKLCH) | CSS custom properties | Medio | Muy Alto | **APLICADA** |
| V45 | Typography fluid con `clamp()` | clamp() | Bajo | Medio | **APLICADA** |
| V46 | Variable fonts con peso animado al hover | font-variation-settings | Bajo | Medio |
| V47 | Container queries (`@container`) | CSS @container | Medio | Medio |
| V48 | Mode "system" con transicion suave | `view-transition-name` | Bajo | Medio |

### 5.11 Fase 3 - COMPLETADA (29 de abril de 2026)

Las 7 mejoras propuestas para Fase 3 quedaron aplicadas:

1. V03 - Typewriter en el rol del Hero **APLICADA**
2. V10 - Smooth scroll con Lenis **APLICADA**
3. V14 - View Transitions API **APLICADA**
4. V31 - Filtros animados en Projects **APLICADA**
5. V42 - Grid pattern interactivo **APLICADA**
6. V24 - Contribution heatmap **APLICADA (requiere GITHUB_TOKEN para activarse en runtime)**
7. V30 - Stack view tipo Apple **APLICADA (showcase de los primeros 3 proyectos en desktop)**

Ver detalle completo en seccion `3.10 Mejoras visuales - Fase 3`.

### 5.12 Posibles Fase 4 (visuales que quedan en el catalogo)

| Prioridad sugerida | # | Razon |
|---|---|---|
| 1 | V46 - Variable fonts con peso animado al hover | Detalle elegante con muy bajo costo |
| 2 | V20 - Iconos con stroke animado | Refuerza el detalle de las cards |
| 3 | V21 - Tags de skills con tilt 3D | Coherente con spotlight ya aplicado |
| 4 | V23 - Donut chart para top languages | Refuerza el bloque GitHub junto al heatmap |
| 5 | V42-extra (V41 onda en footer, V40 confetti) | Pulido final |

> Estos son "nice-to-have". El portafolio ya cumple objetivo de impacto en los primeros 3 segundos. Priorizar Bloque A (contenido real) y Bloque C (SEO/Analytics) sobre Fase 4.

---

## 6. Catalogo de mejoras tecnicas y funcionales

### 6.1 SEO y descubribilidad

- T01 `sitemap.xml` y `robots.txt` con `app/sitemap.ts` y `app/robots.ts`.
- T02 JSON-LD structured data (`Person` schema) embebido en `layout.tsx`.
- T03 Pagina `/cv` que redirige al PDF y permite trackear descargas.

### 6.2 Funcionalidad nueva

- T04 Boton flotante de WhatsApp.
- T05 Seccion "Now": que estas aprendiendo este mes.
- T06 Buscador global Cmd+K.
- T07 Pagina 404 personalizada.
- T08 Seccion de testimonios.
- T09 Bloque "Recursos / Mi setup".
- T10 Video pitch de 60s.
- T11 Filtros y busqueda en Projects.

### 6.3 Internacionalizacion y analytics

- T12 Bilingue ES/EN con `next-intl`.
- T13 Vercel Analytics o Plausible.
- T14 Web Vitals dashboard con `useReportWebVitals`.

### 6.4 Calidad y DX

- T15 Husky + lint-staged.
- T16 Prettier integrado con ESLint.
- T17 Storybook o Ladle para componentes UI.
- T18 Playwright para tests E2E.
- T19 Coverage threshold en Vitest.
- T20 Renovate o Dependabot.

### 6.5 Performance

- T21 Auditoria Lighthouse (target 95+ en todos los ejes).
- T22 `next/image` para todas las imagenes con blur placeholder.
- T23 Loading states / Skeletons en paginas de detalle.
- T24 Preconnect / dns-prefetch para api.github.com.
- T25 Bundle analyzer.

### 6.6 Contenido estrategico

- T26 Idiomas que hablas en el Hero o About.
- T27 Disponibilidad real (presencial / remoto / horario).
- T28 "Por que contratarme?" con 3-4 razones concretas.
- T29 Disclaimer de etica AI.

---

## 7. Como continuar la proxima sesion

> **Estado al 29 de abril de 2026:** Fases 1, 2 y 3 visuales completadas. El portafolio ya tiene la presentacion final que queriamos. Los siguientes pasos son contenido real y pulido tecnico.

1. Leer este archivo (`PROGRESO.md`) para retomar contexto completo.
2. Verificar tambien la memoria persistente en `~/.claude/projects/.../memory/MEMORY.md` (snapshot al 2026-04-29).
3. Recordatorios al retomar:
   - `npm install` ya esta corrido con `lenis` agregado. Si se clona limpio o cambia `package.json`, volver a correrlo.
   - El heatmap (V24) requiere `GITHUB_TOKEN` para mostrar datos reales. Mientras tanto muestra mensaje claro.
   - View Transitions (V14) solo se ven en Chromium 126+. En Firefox/Safari aun no soportado, el sitio funciona normal.
4. Preguntar a Camila por orden de prioridad sugerido:
   - **Bloque A (recomendado primero) - Contenido real**:
     - Foto de perfil real en `public/fotoPerfilHojaVida.png`.
     - CV real en `public/cv-camila.pdf`.
     - Proyectos reales en `src/config/projects-data.ts` (reemplazar 5 placeholders).
     - Certificados reales en `experience-data.ts` y `experience-certificado-data.ts` (items 2-5).
     - Validar Skills en `skills-data.ts`.
   - **Bloque B - Configuracion produccion**:
     - Generar `GITHUB_TOKEN` y agregar a `.env.local` y Vercel.
     - Generar API Key en Resend, agregar a `.env.local` y Vercel.
     - Definir `SITE_URL` real en `src/app/layout.tsx` cuando se despliegue.
   - **Bloque C - Mejoras tecnicas (post-deploy)**:
     - SEO: sitemap.xml, robots.txt, JSON-LD Person schema.
     - Analytics: Vercel Analytics o Plausible.
     - i18n: bilingue ES/EN con `next-intl`.
     - Auditoria Lighthouse 95+ (target en todos los ejes).
     - Husky + lint-staged + Prettier integrado.
   - **Bloque D - Fase 4 visual (opcional)**:
     - V46 Variable fonts hover, V20 stroke animado, V21 tilt 3D en tags, V23 donut chart para top languages.
5. Errores de lint preexistentes (NO de Fase 3) que conviene arreglar en algun momento:
   - `src/components/section/NumberCounter.tsx:30`: `set-state-in-effect`.
   - `src/components/section/CustomCursor.tsx:16`: `set-state-in-effect`.
   - `src/components/experience-detail/ExperienceHero.tsx:61`: `Cannot create components during render`.
   - `src/components/experience-detail/ExperienceSidebar.tsx:67`: comillas no escapadas.
   - `src/components/project-detail/ProjectChallenges.tsx:33`: comillas no escapadas.
   - `src/components/project-detail/ProjectSidebar.tsx:18`: `Unexpected any`.
   - Warnings de imports no usados en `Experience.tsx` y `Skills.tsx`.

---

## 8. Comandos utiles

```bash
# Instalar dependencias (primera vez o tras cambios en package.json)
npm install

# Levantar dev server
npm run dev

# Correr tests
npm run test           # una vez
npm run test:watch     # watch mode
npm run test:coverage  # con cobertura

# Lint
npm run lint

# Build de produccion
npm run build
```

### Variables de entorno

Crear `.env.local` (no se commitea) con base en `.env.example`:

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL_TO=camilanavas13@gmail.com
CONTACT_EMAIL_FROM=Portafolio <onboarding@resend.dev>
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
```

> **Importante (al 2026-04-29):** `GITHUB_TOKEN` paso de "opcional" a "requerido" si se quiere mostrar el heatmap de contribuciones (V24). Sin token, el endpoint `/api/github-contributions` devuelve `503` y el componente muestra un mensaje claro.

### Archivos clave creados en Fase 3

```
src/
  app/
    api/github-contributions/route.ts   # NUEVO endpoint GraphQL heatmap
  components/
    section/
      Typewriter.tsx                    # NUEVO V03
      SmoothScroll.tsx                  # NUEVO V10
      InteractiveGrid.tsx               # NUEVO V42
      GitHubHeatmap.tsx                 # NUEVO V24
    projects/
      ProjectsStack.tsx                 # NUEVO V30
```

Modificados en Fase 3:

```
src/app/(general)/layout.tsx           # +<SmoothScroll />
src/app/globals.css                    # +bloques V10 (Lenis) y V14 (View Transitions)
src/app/api/github-stats/route.ts      # revalidate literal 3600
src/components/section/Hero.tsx        # +Typewriter +InteractiveGrid
src/components/section/GitHubSection.tsx  # +GitHubHeatmap
src/components/projects/Projects.tsx   # filtros con motion + ProjectsStack
src/components/projects/ProjectCard.tsx   # view-transition-name por slug
src/components/project-detail/ProjectHero.tsx  # view-transition-name por slug
src/config/hero-data.ts                # +array roles
package.json / package-lock.json       # +lenis
```

---

## Cambios pendientes documentados

- `SITE_URL` placeholder en `src/app/layout.tsx` (cambiar al desplegar).
- Si no hay cuenta de Twitter/X: eliminar `creator: "@13camilaaaaa"` del bloque `twitter` en `layout.tsx`.
- `cv-camila.pdf` y `fotoPerfilHojaVida.png` en `/public/` deben reemplazarse por los archivos reales.
- `GITHUB_TOKEN` requerido para activar V24 (heatmap). Sin token, endpoint devuelve 503 con mensaje claro.
- Errores de lint preexistentes documentados en seccion 7 (no son parte de Fase 3, conviene arreglarlos en una pasada de pulido).

---

## Bitacora de sesiones

- **2026-04-28**: Aplicadas Fases 1 y 2 visuales + infraestructura tecnica (form, tests, CI, GitHub stats).
- **2026-04-29**: Aplicada Fase 3 visual completa (V03, V10, V14, V31, V42, V24, V30). Build limpio, 55/55 tests pasando. Pendientes movidos a "contenido real" (Bloque A) y "produccion" (Bloque B).
