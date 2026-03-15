# ESTRATEGIA — Landing Page Reclutamiento Ensayo Clínico NUSI-001
**Versión:** ARG 1.0 | **Fecha análisis:** Marzo 2026
**Proyecto:** Vacuna investigacional contra la gripe — Adultos 65+ — Argentina
**Patrocinador:** Nusilab Incorporated | **Plataforma:** Line Health
**Regulador:** ANMAT | **Registro:** RENIS IS00-666

---

## 1. Resumen estratégico del proyecto

### Qué se ofrece
Una oportunidad de participar en un ensayo clínico de Fase 3 que evalúa una vacuna investigacional contra la gripe en adultos sanos de 65 años o más. Los participantes reciben atención médica gratuita, apoyo para viajes y comidas, y contribuyen activamente al avance del conocimiento sobre la prevención de la influenza en adultos mayores.

### A quién
Adultos argentinos de 65 años o más, en buen estado general de salud, que no hayan recibido una vacuna antigripal en los últimos 6 meses, y que tengan disponibilidad para asistir a entre 2 y 4 visitas durante aproximadamente un año.

**Perfil psicográfico del usuario primario:**
- Adulto mayor activo, interesado en cuidar su salud.
- Probablemente accede desde smartphone con pantalla grande o tablet.
- No necesariamente familiarizado con ensayos clínicos.
- Puede tener desconfianza inicial ante vacunas "en investigación".
- Busca claridad, seguridad y no quiere sentirse presionado.
- Puede estar siendo referenciado desde una campaña de redes sociales (IG, FB) o Google Ads.

**Perfil secundario:** familiar o cuidador de la persona mayor que busca información en nombre de ella.

### Qué se quiere lograr
Maximizar la cantidad de leads calificados que completen el formulario de preselección de 2 pasos, para que los coordinadores de estudio puedan contactarlos y confirmar su participación en el ensayo NUSI-001.

### Cuál es la acción principal
Completar el cuestionario de preselección en línea ("Ver si puede calificar").

### Qué objeciones y fricciones hay que resolver
1. **"¿Es seguro participar en un ensayo con una vacuna no aprobada?"** → Explicar que el comparador es una vacuna ya aprobada, que el estudio está autorizado por ANMAT y aprobado por un Comité de Ética.
2. **"¿Necesito obra social o prepaga?"** → No. Aclararlo de forma prominente.
3. **"¿Qué me van a hacer?"** → Explicar el proceso con claridad y en pasos simples.
4. **"¿Puedo salirme si cambio de opinión?"** → Sí, en cualquier momento, sin consecuencias.
5. **"¿Tengo que pagar algo?"** → No. El transporte y las comidas están cubiertos.
6. **"¿Hay centros cerca de mi casa?"** → Mapa interactivo con 9 ubicaciones en 5 provincias.
7. **"¿Para qué le doy mis datos personales?"** → Consentimiento claro, aviso de privacidad transparente.
8. **"¿Quién es Line / Nusilab?"** → Contexto de autoridad institucional real (ANMAT, Comité de Ética).

---

## 2. Vacíos detectados y supuestos de trabajo

### Vacíos de información detectados

| Vacío | Impacto |
|---|---|
| Sin identidad visual (logo, paleta, tipografía) de Nusilab ni de Line Health | Requiere definir sistema visual completo desde cero |
| Sin activos fotográficos o visuales | Requiere definir criterio de producción/stock |
| Sin URL/dominio definido | No afecta la build, pero sí configuración de deploy |
| Sin backend definido para el formulario | Requiere decisión técnica sobre dónde van los leads |
| Sin proveedor de mapa definido | Google Maps Embed vs. Leaflet vs. Mapbox |
| Sin plataforma de analytics confirmada | Se asume GA4 + GTM según buenas prácticas estándar |
| Sin herramienta de email automation | Afecta el flujo post-envío del formulario |
| Sin CMS requerido o no | Se asume que no hay necesidad de CMS por ser una landing estática de campaña |
| Sin proceso de aprobación regulatoria para copy | Se asume que el copy del PDF está aprobado y es fijo |
| Sin información sobre el proceso de revisión de Comité de Ética para el sitio web | Se asume que el CE aprueba el contenido antes del lanzamiento |
| Sin testimonios de participantes | No se simularán; se reemplaza con mecanismos honestos de credibilidad |
| Sin definir si hay versión desktop-first preexistente | Se construye mobile-first desde cero |

### Supuestos de trabajo

- **El copy del PDF es el copy aprobado.** Los textos marcados con "no modificar" son intocables. El resto puede ser reformateado pero no alterado en su sentido.
- **No hay identidad visual establecida.** Se define un sistema visual propio, coherente con el contexto médico-institucional, sin parecer "hospital público" ni "pharma genérica".
- **El stack es estático / JAMstack.** La landing no necesita CMS. El formulario puede enviarse a un endpoint externo (Netlify Forms, Formspree, o API propia de Line Health).
- **Google Maps Embed** como solución de mapa por bajo costo de implementación y confiabilidad. Alternativa: Leaflet con datos hardcodeados si no hay API key disponible.
- **GA4 + GTM** para analytics. Los eventos específicos del PDF (cta_click, prescreen_step1_submit, prescreen_step2_submit, eligible_status) se implementan vía data layer.
- **No hay compensación económica directa**, pero sí beneficios tangibles (atención sin costo, apoyo de transporte y comidas). Esto debe comunicarse honestamente, no como "incentivo" sino como "apoyo logístico".
- **El público de 65+** puede incluir hijos o cuidadores actuando en su nombre; el lenguaje debe ser accesible para ambos perfiles sin infantilizar al adulto mayor.
- **No se usarán testimonios** al no contar con participantes reales verificables. La credibilidad se construye con señales institucionales reales.
- **Stack recomendado:** HTML/CSS/JS vanilla o Astro (sin framework JS pesado), dado que no hay interactividad compleja excepto el formulario multi-step y el mapa.

---

## 3. Diagnóstico de enfoque

### Qué tipo de landing conviene construir
Una **landing de reclutamiento médico de alta credibilidad**, orientada 100% a conversión por formulario, con enfoque informativo-confiable. No es una landing de producto ni de SaaS. Es una landing de **captación de participantes para un ensayo clínico regulado**.

Las decisiones de diseño deben subordinarse siempre a: claridad del mensaje, accesibilidad para adultos mayores, y generación de confianza institucional real.

### Qué enfoque visual y narrativo es más adecuado
- **Visual:** Limpio, espacioso, cálido pero profesional. Tipografía grande y legible. Color primario que transmita confianza médica sin ser clínico-frío. Fotografía real de personas mayores activas (no estereotipos de "abuela en cama").
- **Narrativo:** Directo, empático, sin tecnicismos innecesarios. El tono es el de un médico que explica con cuidado, no el de una empresa que vende. Cada párrafo debe reducir una objeción o construir confianza.

### Qué tipo de experiencia NO conviene hacer
- Landing con hero oscuro, glow, efectos de parallax agresivos o glassmorphism.
- Diseño con tipografía pequeña o de bajo contraste.
- Formulario en una sola página larga con todos los campos visibles.
- Mapa implementado como decoración visual sin interactividad real.
- Secciones de "métricas de impacto" inventadas o claims vacíos.
- Testimonios simulados o prueba social falsa.
- Navegación compleja con submenús o elementos móviles que confundan a usuarios 65+.

---

## 4. Dirección creativa — REVISIÓN V2 (Dark Premium)

> **Nota:** La dirección visual V1 fue descartada por resultar demasiado conservadora e institucionalmente genérica. Esta sección reemplaza completamente la dirección anterior.

### Diagnóstico de V1
1. Fondo blanco como superficie dominante — default de SaaS médico genérico
2. Un solo typeface (Inter) en toda la jerarquía — sin contraste tipográfico
3. Sistema de cards con borde convencional — patrón Figma Community
4. Alternancia blanco/gris claro — monotonía rítmica
5. Hero sin drama tipográfico ni tensión visual
6. Badges y pills convencionales — invisibles en contexto
7. Process steps con línea vertical + círculos — cliché de los últimos 8 años
8. Motion completamente predecible — fade-in sin personalidad
9. Accent (#76E5FC) sobre blanco — invisible, desperdiciado
10. Señales de autoridad (ANMAT, Fase 3) diluidas como texto secundario

### Concepto rector (V2)
**"Clinical Gravitas."**

No se trata de reclutar sujetos de prueba. Se trata de invitar a personas mayores a contribuir, desde su propia salud y su propia decisión, al avance de la medicina preventiva. La landing debe hacerlos sentir valorados, informados y en control.

El tono no es "participe en nuestro estudio". Es "así funciona, esto es lo que le ofrecemos, usted decide."

### Sensaciones que debe transmitir (V2)
- Rigor y seriedad institucional — sin frialdad hospitalaria
- Profundidad y contraste visual — la página tiene peso
- Claridad extrema mediante jerarquía, no mediante simpleza
- Control y autoridad editorial — como una publicación médica de referencia
- Calidez en el copy, seriedad en el diseño

### Personalidad de marca en la interfaz (V2)
- Dark editorial: fondos oscuros con tonalidad púrpura-negra, no gris genérico
- Tipografía dual: Fraunces en display + Inter en UI — contraste de carácter máximo
- Señales institucionales (ANMAT, Fase 3, RENIS) como elementos de diseño prominentes, no texto de soporte
- Cyan (#76E5FC) como el único color verdaderamente luminoso — el ojo va ahí primero
- Composición espaciosa pero con densidad tipográfica deliberada

### Tono del diseño (V2)
Oscuro, refinado, editorial. La seriedad del diseño comunica la seriedad del estudio antes de que el usuario lea una sola palabra.

### Tono del copy
Sin cambios. Directo, claro, usted formal. Lo que cambia es el entorno visual que lo sostiene.

### Tono del motion (V2)
Coreografiado y sutil. Hero con stagger de texto en carga. Scroll reveals con translate + opacity coordinados. CTA con glow hover en cyan. Sin parallax. Sin loops. Sin decoración que compita con el contenido.

---

## 5. Arquitectura recomendada

### Navegación fija (sticky, mobile)
Logo Nusilab/Line (izquierda) + Botón "Ver si puede calificar" (derecha, always-visible en mobile)
Menú hamburguesa en mobile → 6 ítems del documento

### Estructura de secciones (orden de scroll)

| # | Sección | Encabezado oficial | Rol estratégico | Obligatoria |
|---|---|---|---|---|
| 0 | Barra de nav sticky | — | Orientación + CTA persistente | Sí |
| 1 | Hero | — | Captar atención, propuesta de valor, CTA | Sí |
| 2 | Detalles del estudio | DETALLES DEL ESTUDIO | Informar + construir credibilidad | Sí |
| 3 | Criterios de elegibilidad | CRITERIOS DE ELEGIBILIDAD | Filtrar + reducir objeciones logísticas | Sí |
| 4 | Qué pasará | Qué pasará en este estudio | Reducir miedo + explicar proceso | Sí |
| 5 | Próximos pasos | ¿Qué puede hacer ahora? | Guiar hacia la acción | Sí |
| 6 | Dónde participar | Dónde Puede Participar | Reducir fricción geográfica | Sí |
| 7 | FAQs | Preguntas Frecuentes | Resolver objeciones finales + CTA | Sí |
| 8 | Footer | — | Legal, privacidad, contacto | Sí |

### Secciones opcionales (no están en el doc, no se añaden)
- Testimonios: no hay datos reales. **No se incluye.**
- "Sobre Nusilab": no especificado. **No se incluye salvo que se confirme.**
- Blog/recursos: fuera de alcance. **No se incluye.**

### Jerarquía mobile
1. Hero con título grande + CTA visible sin scroll
2. Señales de confianza inmediatas (ANMAT, Comité de Ética, no requiere cobertura)
3. Resumen del estudio en párrafos cortos con bold estratégico
4. Checklist de elegibilidad visual (tapeable/legible)
5. Proceso en pasos numerados
6. Mapa con lista de clínicas como fallback
7. FAQs en acordeón nativo (sin JS pesado)
8. CTA final antes del footer

---

## 6. Sistema visual

### Criterios tipográficos
- **Fuente principal:** Inter o IBM Plex Sans (disponibles en Google Fonts, sin costo, excelente legibilidad)
- **Escala mínima en body:** 17px en mobile, 18px en desktop
- **Escala headings:** H1 ≥ 32px mobile / ≥ 48px desktop; H2 ≥ 24px mobile; H3 ≥ 20px
- **Interlineado:** 1.6 para body text
- **Sin fuentes decorativas.** Sin serifs en contenido médico (salvo posible uso puntual en titulares para calidez).
- **Peso:** Regular para body, SemiBold/Bold para headings y énfasis, nunca Light en tamaños pequeños.

### Criterios cromáticos
- **Color primario:** Azul institucional cálido — #1D5FA6 (variante propuesta). Transmite confianza médica sin ser frío ni corporativo. Accesible sobre blanco (ratio > 4.5:1).
- **Color de acción (CTA):** Azul más saturado o verde oscuro para el botón primario — diferenciado del primario para máxima visibilidad. Propuesta: #1D7A5F (verde teal institucional) o #0F4C8A. A definir con identidad visual de Line Health.
- **Fondo:** Blanco (#FFFFFF) y gris muy claro (#F5F6F8) para alternancia de secciones. Sin fondos oscuros que comprometan legibilidad para adultos mayores.
- **Acento:** Un único color de acento para highlights clave — propuesta: #E8A02D (ámbar cálido) usado con extrema moderación.
- **Texto:** #1A1A1A para body (no negro puro, menos fatiga visual). #4A4A4A para texto secundario.

### Criterios de contraste
- Todo texto sobre fondo blanco o claro: mínimo WCAG AA (4.5:1 para texto normal, 3:1 para texto grande)
- Botón CTA: texto blanco sobre fondo primario — verificado con herramienta
- Estados de foco visibles: outline de 3px en color primario

### Composición
- Contenedor máximo: 760px para texto (legibilidad en desktop), 1200px para layout general
- Grid de 4 columnas en mobile (con márgenes generosos 20px), 12 columnas en desktop
- Secciones con padding vertical generoso (80px desktop, 56px mobile)
- Sin layouts asimétricos complejos. Claridad sobre sofisticación formal.

### Ritmo y densidad visual
- Denso no. Espacioso sí. El público de 65+ necesita "aire" entre bloques para procesar.
- Máximo 3-4 líneas por párrafo antes de un salto visual.
- Listas cortas con íconos simples (check, punto) — no ilustraciones complejas.
- Separadores de sección: alternancia de fondo blanco/gris claro, sin líneas decorativas.

### Recursos gráficos permitidos
- Fotografía de personas reales (adultos mayores activos, médicos, entornos de consulta)
- Íconos de línea simple y consistentes (Lucide o Heroicons)
- Mapa interactivo funcional
- Indicadores de progreso para el formulario (paso 1/2)
- Badges institucionales: ANMAT, Comité de Ética — como elementos visuales discretos pero presentes

### Recursos gráficos a evitar
- Stock photos de "médico genérico con estetoscopio en fondo azul"
- Ilustraciones vectoriales estilo SaaS
- Fondos degradados, blobs, glow, glassmorphism
- Animaciones de entrada con delay largo
- Íconos de colores variados (inconsistencia)
- Mockups flotantes de dispositivos
- Cualquier visual que parezca sacado de una plantilla de Figma gratuita

### Cómo evitar el look genérico
- Tipografía más grande de lo usual. La legibilidad ES el diseño aquí.
- Fotografía editorial de calidad, no de catálogo.
- Señales de autoridad como elementos de diseño (no como texto oculto): ANMAT badge, "Fase 3", "840 participantes", "Aprobado por Comité de Ética" como elementos visuales prominentes.
- CTA con microtext de apoyo: "Sin costo médico · Puede retirarse en cualquier momento"
- Formulario multi-step con barra de progreso y microcopys cuidados.

---

## 7. Sistema de motion

### Principio rector
El motion es funcional o no existe. El público objetivo tiene posibles limitaciones de procesamiento visual. Nada debe moverse de forma que distraiga o desoriente.

### Qué debe animarse y por qué
| Elemento | Tipo de motion | Propósito |
|---|---|---|
| Fade-in suave de secciones al entrar al viewport | Opacity 0→1, 300ms, ease-out | Orientación de scroll, no distracción |
| Transición entre Paso 1 y Paso 2 del formulario | Slide horizontal o fade, 250ms | Feedback claro de avance |
| Barra de progreso del formulario | Fill suave al avanzar | Reducir ansiedad, mostrar progreso |
| Acordeón de FAQs | Expand/collapse suave, 200ms | UX estándar, sin sorpresa |
| Scroll suave al hacer click en nav | Smooth scroll | Orientación |
| Hover en botón CTA | Subtle scale 1→1.02 + shadow | Feedback de interactividad |
| Estado de success / error en campos de formulario | Color + icono, 150ms | Feedback de validación |

### Qué debe evitarse
- Parallax en cualquier forma
- Animaciones que bloqueen la lectura de contenido
- Animaciones de entrada con delay >400ms
- Infinite loops de cualquier tipo
- Efectos de texto animado (typewriter, glitch, etc.)
- Transiciones complejas que puedan fallar en dispositivos lentos

### Respeto por prefers-reduced-motion
Obligatorio. Todas las animaciones deben desactivarse si el usuario tiene configurada esta preferencia en su sistema operativo.

---

## 8. Estrategia mobile-first

### Principio
El diseño se construye para un smartphone de 390px de ancho (iPhone 14 estándar) y luego se escala. Desktop no es la vista principal. La mayor parte del tráfico de campañas de FB/IG/Google llegará en mobile.

### Qué debe aparecer primero (above the fold, mobile)
1. Logo / identificación del estudio
2. Headline grande y legible
3. Subheadline explicativo (una línea)
4. Botón CTA completo, sin scroll
5. Tres badges de confianza en una línea debajo del CTA

### CTA en mobile
- Botón de ancho completo (100% del contenedor)
- Alto mínimo: 52px (área de toque WCAG)
- Tipografía 18px, bold
- Sticky en barra de nav superior

### Patrones mobile que convienen
- Acordeón para FAQs (toca para expandir)
- Lista de clínicas en tarjetas apiladas (con el mapa encima)
- Formulario de un campo visible a la vez en pantallas pequeñas
- Navegación hamburguesa con 6 ítems simples
- Scroll suave por anclas (no tabs, no offcanvas complejo)

### Patrones mobile que deben evitarse
- Tablas horizontales (la tabla de clínicas del PDF debe rediseñarse)
- Texto en columnas múltiples
- Hover states como única indicación de interactividad
- Modales que tapan el 100% de la pantalla sin escapatoria clara
- Inputs de texto muy pequeños con labels flotantes de tamaño mínimo

### Cómo garantizar que mobile no sea una versión recortada
- Toda la información del desktop está disponible en mobile, reorganizada verticalmente
- El mapa es tan funcional en mobile como en desktop (touch-enabled)
- El formulario está especialmente diseñado para touch: campos grandes, menú desplegable nativo, botones de opción tipo "tarjeta" en lugar de radio buttons pequeños

---

## 9. Estrategia de contenido y copy

### Propuesta de valor principal
"Contribuya al avance de una vacuna contra la gripe. Sin costo médico, con apoyo de transporte, en centros cercanos a usted."

### Headline propuesto para el hero
**"Ayude a mejorar la protección contra la gripe para las personas mayores"**
*Sub:* "Inscripción abierta para personas de 65 años o más en Argentina."

*(Alternativa A/B: "¿Tiene 65 años o más? Puede contribuir a una investigación médica importante.")*

### Mensajes clave (por sección)

**Hero:**
- Qué es (ensayo clínico de vacuna contra la gripe)
- Para quién (65+)
- Sin costo / sin obra social requerida
- Acción clara: ver si califica

**Detalles:**
- El estudio compara dos vacunas antigripales
- Autorizado por ANMAT
- Solo 2 a 4 visitas en 1 año
- Transporte y comidas cubiertos

**Elegibilidad:**
- Checklist positivo: "Puede participar si..."
- Reducir objeción de condiciones preexistentes estables
- CTA secundario

**Proceso:**
- Pasos numerados simples (4 pasos: formulario → visita → evaluación → participación)
- "Puede retirarse en cualquier momento sin consecuencias"

**Próximos pasos:**
- 5 acciones concretas y ordenadas
- Número de estudio para el médico (RENIS IS00-666)

**Dónde:**
- Mapa primero, lista como fallback
- Estado de cada clínica (En reclutamiento / Próximamente)

**FAQs:**
- 7 preguntas del documento, reformateadas para acordeón
- CTA final después de las FAQs

### Objeciones que resuelve el copy en cada sección
- Hero: "no necesito obra social / no me cuesta nada"
- Detalles: "es una vacuna ya aprobada la que se compara / está avalado por ANMAT"
- Elegibilidad: "condición preexistente estable está bien"
- Proceso: "puedo salirme cuando quiera"
- Próximos pasos: "sé exactamente qué hacer ahora"
- Mapa: "hay un centro cerca de mi casa"
- FAQs: "¿me pagan? / ¿cuánto dura? / ¿qué es el comparador?"

### Lo que NO se escribe en ningún lugar
- "Innovadora vacuna que podría salvar vidas"
- "Sea parte del futuro de la medicina"
- "Únase a una experiencia única"
- Cualquier cifra de efectividad no documentada
- Claims sobre resultados esperados del estudio

---

## 10. Estrategia de contenido visual y producción

### Qué tipo de visuales necesita el proyecto
- **Fotografía:** adultos mayores activos (no enfermos, no en cama), en entornos cotidianos y de consulta médica. Tonos cálidos, iluminación natural, personas reales con expresiones auténticas.
- **Contextos fotográficos ideales:** persona mayor en consulta con médico, adulto mayor caminando hacia un centro de salud, adulto mayor mirando una tablet/teléfono, par de adultos mayores.

### Si no hay fotografías propias (asunción actual)
Usar stock de alta calidad de Getty, Unsplash (selección editorial cuidada) o Adobe Stock. Criterios de selección:
- Personas claramente mayores de 65 años (no actores de 50 con pelo gris)
- Expresiones calmadas y de confianza, no de enfermedad o sufrimiento
- Sin fondos azules degradados de laboratorio
- Sin jeringas en primer plano (evitar imagen amenazante)
- Formato: WebP optimizado, lazy loading, srcset responsive

### Qué visuales dañarían la percepción
- Fotos de stock con marca de agua accidental
- Imágenes con estética de anuncio farmacéutico americano (muy glossy, modelos de 30 años "envejecidos")
- Gráficos de moléculas o células en fondo oscuro
- Ilustraciones vectoriales flat de "personas con mascarilla"
- Imágenes de jeringas o agujas en primer plano en el hero

### Hero visual
Una sola fotografía de alta calidad como fondo o bloque visual. Formato: aspect ratio 4:3 o 16:9 en desktop, crop cuadrado o 3:4 en mobile. Carga optimizada con LCP como prioridad (preload del recurso crítico).

---

## 11. Recomendación técnica — REVISIÓN V2

### Stack confirmado (V2)
**Astro 4.x** + **CSS Modules** + **GSAP core + ScrollTrigger** + **TypeScript** (opcional)

**Por qué Astro (refuerzo de razón técnica):**
- Genera HTML estático puro — sin framework JS en el bundle del cliente
- Componentes `.astro` = HTML + CSS scoped + JS opcional por componente
- Aislamiento real: una sección = un archivo = independiente
- El Comité de Ética puede revisar sección a sección sin navegar 400 líneas de HTML
- Deploy: `astro build` → `/dist` → Vercel/Netlify

**Por qué GSAP en V2 (y por qué no en V1):**
En V1 el motion era fade-in básico → IntersectionObserver + CSS era suficiente.
En V2 hay:
- Hero text stagger con timeline coordinada (no posible en CSS puro con precisión)
- Counter animation en números del estudio (840 participantes)
- ScrollTrigger para revelar elementos con timing preciso por sección
GSAP core + ScrollTrigger = ~45KB gzip. Justificado para el valor de motion que entrega.

**Manejo de prefers-reduced-motion en GSAP:**
```js
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.globalTimeline.timeScale(1000); // skip all animations instantly
}
```

**No se usa:**
- React, Vue, Svelte — overkill para una landing estática
- Tailwind CSS — para este nivel de control visual preciso, CSS custom properties son superiores
- Framer Motion — requiere React
- Next.js — SSR innecesario para contenido 100% estático

### Mapa
- **Google Maps Embed API** — implementación más simple, sin backend, clave pública restringida por dominio
- **Alternativa:** Leaflet.js con OpenStreetMap — gratuito sin API key, funciona offline, menor vendor lock-in
- Las 9 clínicas se hardcodean como array de datos. No requiere CMS.

### Formulario multi-step
- HTML forms nativas con JavaScript vanilla para la lógica de pasos y árbol de decisión
- Envío: **Formspree** (más simple) o endpoint API propio de Line Health (preferible para privacidad y control de datos)
- Validación: HTML5 nativa + JS para validaciones custom (árbol de decisión)
- No se usa ninguna librería de formularios (Formik, React Hook Form) — no aplica sin framework React

### Analytics e integraciones
- **Google Tag Manager** como contenedor de tags
- **GA4** para pageviews y eventos custom
- **Meta Pixel** si hay campañas de FB/IG (muy probable según el PDF)
- Eventos a implementar según el PDF:
  - `cta_click`
  - `prescreen_step1_submit`
  - `prescreen_step2_submit`
  - `eligible_status` (con parámetro: probable/posible/waitlist/no-eligible)

### Cookie consent
- **Obligatorio** por legislación argentina (Ley 25.326) y buenas prácticas internacionales
- Implementación: banner de consentimiento antes de cargar GTM/GA4/Meta Pixel
- Librería recomendada: **Cookieyes** (tiene plan gratuito) o implementación custom simple
- El footer debe incluir "Aviso de Cookies" que abre el centro de preferencias

### Performance
- Imágenes: WebP, srcset, lazy loading (excepto hero: preload)
- Fuentes: cargadas desde Google Fonts con `display=swap`, o self-hosted
- CSS: un archivo mínimo, sin frameworks CSS pesados (no Bootstrap, no Tailwind si no hay build pipeline)
- JS: diferido (`defer` o `type="module"`), sin bundles innecesarios
- Sin polyfills innecesarios para IE (no aplica en Argentina 2026)

---

## 12. KPIs, métricas de éxito y performance budget

### Conversión principal
- **Formulario Paso 2 completado** (prescreen_step2_submit) → lead calificado enviado

### Microconversiones relevantes
- CTA click (cta_click)
- Inicio de Paso 1 del formulario
- Scroll a sección de elegibilidad
- Click en clínica del mapa
- Expand de FAQ

### Métricas de engagement
- Scroll depth ≥ 60% (indicador de intención)
- Tiempo en página ≥ 2 minutos
- Bounce rate < 70% (considerando origen de campañas pagas)

### Objetivos de performance (Core Web Vitals, mobile)
| Métrica | Objetivo |
|---|---|
| LCP (mobile) | ≤ 2.5s |
| CLS | ≤ 0.1 |
| INP | ≤ 200ms |
| TTFB | ≤ 600ms |
| Peso total página inicial | ≤ 500KB (sin imágenes diferidas) |

### A/B testing inicial (según el PDF)
- Headline: "Ayude a mejorar la protección contra la gripe" vs variante más directa "¿Tiene 65 años o más? Puede participar en un estudio médico importante"
- CTA: "Ver si puede calificar" vs "Comenzar preselección"
- Ubicación del bloque de apoyo de transporte: near hero vs. dentro de eligibilidad

---

## 13. Integraciones y medición

### Stack de integraciones recomendado

| Integración | Herramienta | Impacto UX | Impacto Performance |
|---|---|---|---|
| Analytics | GA4 vía GTM | Ninguno visible | Mínimo (GTM async) |
| Ads | Meta Pixel vía GTM | Ninguno visible | Leve (+30ms) |
| Formulario backend | Formspree o API propia | Flujo post-submit | Ninguno en carga |
| Mapa | Google Maps Embed | Mapa interactivo | Carga diferida |
| Cookie consent | Cookieyes o custom | Banner inicial | Mínimo |
| Email transaccional | SendGrid o similar | Email de confirmación | Solo server-side |

### Eventos clave de conversión
Los eventos del PDF se implementan vía GTM con data layer push:
```javascript
dataLayer.push({ event: 'cta_click', location: 'hero' });
dataLayer.push({ event: 'prescreen_step1_submit' });
dataLayer.push({ event: 'prescreen_step2_submit' });
dataLayer.push({ event: 'eligible_status', status: 'probable' }); // probable | posible | waitlist | no-eligible
```

### Privacidad y consentimiento
- Aviso de cookies: banner al primer acceso, antes de activar GTM
- Texto de consentimiento del formulario: ya definido en el PDF (aprobado por CE)
- Aviso de datos personales: modal o página separada, texto aprobado en el PDF
- Política de Privacidad y Términos: páginas legales separadas, enlazadas desde el footer
- Transferencia internacional de datos (a EEUU): documentada en el aviso de privacidad del PDF

---

## 14. Plan de QA, validación y handoff

### Checklist de accesibilidad (WCAG 2.1 AA)
- [ ] Contraste de texto: ratio ≥ 4.5:1 en body, ≥ 3:1 en headings grandes
- [ ] Todos los inputs tienen `<label>` asociado correctamente
- [ ] Botones tienen texto descriptivo (no solo "Click aquí")
- [ ] Foco visible en todos los elementos interactivos (teclado)
- [ ] Estructura de headings lógica (H1 → H2 → H3, sin saltos)
- [ ] Imágenes tienen atributo `alt` descriptivo
- [ ] Acordeón de FAQs es navegable por teclado (Enter/Space para abrir)
- [ ] Formulario valida y comunica errores de forma accesible (aria-describedby, aria-invalid)
- [ ] `prefers-reduced-motion` implementado
- [ ] Tipografía body ≥ 17px en mobile

### Validación cross-device
- [ ] iPhone SE (375px) — caso estrecho
- [ ] iPhone 14 (390px) — referencia mobile
- [ ] Tablet 768px — media query intermedia
- [ ] Desktop 1280px — referencia desktop
- [ ] Desktop 1920px — pantalla grande
- [ ] Android Chrome — navegador secundario más usado en Argentina
- [ ] Safari iOS — crítico para público 65+ con iPhone

### Validación de performance
- [ ] Lighthouse mobile ≥ 85 en Performance
- [ ] LCP ≤ 2.5s medido en condiciones móviles (4G)
- [ ] CLS ≤ 0.1 — especialmente crítico en carga de mapa e imágenes
- [ ] Sin render-blocking resources en critical path

### Validación de formulario y tracking
- [ ] Todos los flujos del árbol de decisión probados (8 caminos + edge cases)
- [ ] Mensajes de éxito, rechazo y waitlist visibles correctamente
- [ ] Eventos GA4 disparando en cada paso (verificado en GA4 Debug View)
- [ ] Formulario funciona sin JavaScript (fallback básico)
- [ ] Consentimiento de cookies bloquea GTM hasta aceptación

### Testing mínimo recomendado
- [ ] Testing manual en 4 dispositivos físicos (iPhone, Android, tablet, desktop)
- [ ] Revisión de accesibilidad con WAVE o axe
- [ ] Test de carga del formulario con datos de prueba en todos los flujos
- [ ] Revisión legal del footer y textos de consentimiento por el equipo de Line Health
- [ ] Aprobación final de copy por Comité de Ética antes del lanzamiento

### Documentación para mantenimiento
- README con instrucciones de deploy y actualización de datos (clínicas, estados)
- Comentarios en código para el árbol de decisión del formulario
- Archivo de variables CSS con todos los tokens de color y tipografía
- Registro de eventos GTM documentado

---

## 15. Criterios de calidad final

La propuesta se considera válida profesionalmente cuando:

- [ ] El CTA "Ver si puede calificar" es visible en mobile sin hacer scroll
- [ ] El copy del hero comunica quién, qué y para quién en menos de 5 segundos de lectura
- [ ] El texto body es legible a ≥17px con contraste WCAG AA en todos los fondos
- [ ] No hay ninguna imagen de stock que parezca de una plantilla
- [ ] El formulario de 2 pasos tiene barra de progreso, microcopys de ayuda y mensajes de error accesibles
- [ ] El árbol de decisión está completamente implementado (9 reglas + 3 outcomes)
- [ ] El mapa muestra las 9 clínicas con sus estados
- [ ] Las 6 secciones de navegación son anclas que funcionan en mobile y desktop
- [ ] Lighthouse Performance mobile ≥ 85
- [ ] No hay secciones inventadas, métricas falsas ni prueba social simulada
- [ ] Los textos marcados "no modificar" en el PDF están intactos
- [ ] El aviso de privacidad y el consentimiento del formulario están implementados correctamente
- [ ] Los eventos de analytics se disparan correctamente en cada paso del funnel
- [ ] El sitio es navegable por teclado completamente
- [ ] prefers-reduced-motion está implementado

---

*Documento preparado por el equipo de dirección creativa y estrategia digital.*
*Versión 1.0 — Marzo 2026 — Para uso interno del proyecto NUSI-001 ARG.*
