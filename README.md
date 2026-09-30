# Portafolio Personal — Isabella Prieto Sarabanda

Simulador de escritorio macOS construido con HTML, CSS y JavaScript vanilla.  
Sin frameworks, sin dependencias externas (solo Google Fonts).

---

## Cómo abrirlo

Abre `index.html` directamente en cualquier navegador moderno.  
No requiere servidor local ni proceso de compilación.

```
PORTAFOLIO PERSONAL/
├── index.html          ← punto de entrada
├── css/
│   └── styles.css      ← todo el estilo
├── js/
│   └── main.js         ← toda la lógica interactiva
├── assets/
│   ├── img/            ← coloca aquí tus fotos
│   └── icons/          ← íconos SVG del dock y carpetas
└── README.md
```

---

## Cómo personalizar textos

### Nombre y descripción (ventana "Sobre Mí")
Edita `index.html` y busca la sección con `id="window-about"`.  
Reemplaza el texto dentro de `.about-text` con tu información.

### Proyectos
Edita el objeto `PROJECTS` al inicio de `js/main.js`:

```js
const PROJECTS = {
  'mi-proyecto': {
    title:       'Título del proyecto',
    emoji:       '🚀',
    color:       '#1E88E5',        // color del ícono de fondo
    subtitle:    'Categoría · Tecnología',
    description: '<p>Descripción en HTML...</p>',
    tags:        ['Tag1', 'Tag2'],
    link:        'https://github.com/tu-usuario/repo',
    linkLabel:   'Ver en GitHub'
  },
  // ...más proyectos
};
```

Para agregar un nuevo polaroid en el escritorio, copia uno de los `<article class="polaroid">` en `index.html` y añade `data-project="mi-proyecto"`.

### Carpetas de colores
Edita el objeto `FOLDERS` en `js/main.js`:

```js
const FOLDERS = {
  'mi-carpeta': {
    title:       'Nombre de la carpeta',
    color:       '#EC407A',
    emoji:       '📂',
    description: 'Descripción breve de esta categoría.',
    projects:    ['mi-proyecto', 'otro-proyecto']  // IDs de PROJECTS
  },
};
```

En `index.html`, añade el botón de carpeta con `data-folder="mi-carpeta"` y la clase de posición que necesites.

### Habilidades
En `index.html`, busca `id="window-skills"` y edita:
- Los `<span class="skill-tag">` para las etiquetas de tecnología.
- Los `.skill-bar-item` para las barras de progreso (cambia el `data-width` del fill).

### Línea de tiempo (Formación)
En `index.html`, busca `id="window-timeline"` y edita o añade `.timeline-item`.  
Para metas futuras, añade la clase `future` al item.

### Recomendaciones
En `index.html`, busca `id="window-messages"` y edita los `.message-bubble`.  
Cambia el inicial en `.message-avatar`, el nombre, el texto y el rol.

### Links de GitHub y LinkedIn
En `index.html`, busca `window-skills` y actualiza los `href` de los dos botones:

```html
<a href="https://github.com/TU-USUARIO" ...>GitHub</a>
<a href="https://linkedin.com/in/TU-PERFIL" ...>LinkedIn</a>
```

---

## Cómo cambiar imágenes

### Foto personal (ventana "Sobre Mí")
1. Coloca tu foto en `assets/img/isabella.jpg` (recomendado: 400×530 px, blanco y negro).
2. En `index.html`, busca `window-about` y reemplaza el `div.about-photo-placeholder` por:

```html
<img
  class="about-photo"
  src="assets/img/isabella.jpg"
  alt="Foto de Isabella Prieto Sarabanda en blanco y negro"
/>
```

### Foto de fondo del escritorio
1. Coloca tu foto en `assets/img/fondo.jpg` (recomendado: mínimo 1920×1080 px, blanco y negro).
2. En `css/styles.css`, busca el comentario `/* Imagen de fondo */` dentro de `#desktop-bg` y agrega:

```css
#desktop-bg {
  background-image: url('../assets/img/fondo.jpg');
  /* mantén el resto de propiedades */
}
```

### Capturas de proyectos (galería)
1. Nombra tus capturas: `captura-api.jpg`, `captura-web.jpg`, `captura-db.jpg`, etc.
2. Colócalas en `assets/img/`.
3. En `index.html`, busca `window-gallery` y reemplaza cada `.gallery-placeholder` por:

```html
<img src="assets/img/captura-api.jpg" alt="Captura del proyecto API REST" />
```

### Miniaturas de proyectos (polaroids)
Reemplaza el `div.polaroid-img-placeholder` de cada polaroid en `index.html` por:

```html
<img class="polaroid-img" src="assets/img/mi-captura.jpg" alt="Descripción" />
```

---

## Interacción — Referencia rápida

| Acción | Resultado |
|--------|-----------|
| Clic en ícono del dock | Abre la ventana correspondiente |
| Clic en polaroid | Abre detalle del proyecto |
| Clic en carpeta de color | Abre listado de proyectos de esa categoría |
| Arrastrar barra de título | Mueve la ventana |
| Botón rojo (●) | Cierra la ventana |
| Botón amarillo (●) | Minimiza (animación al dock) |
| Botón verde (●) | Maximiza / restaura |
| Tecla `Escape` | Cierra la ventana del frente |
| Clic en imagen de galería | Abre lightbox ampliado |

---

## Compatibilidad

Probado en Chrome 120+, Firefox 121+, Safari 17+, Edge 120+.  
Funciona en móviles (ventanas a pantalla completa en pantallas < 768 px).

---

## Créditos

Diseño e implementación: Isabella Prieto Sarabanda  
Tipografías: [Pinyon Script](https://fonts.google.com/specimen/Pinyon+Script) + [Inter](https://fonts.google.com/specimen/Inter) vía Google Fonts
