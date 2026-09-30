/* ============================================================
   PORTAFOLIO ISABELLA PRIETO SARABANDA
   JavaScript principal — Simulador de escritorio macOS
   ============================================================ */

/* ------------------------------------------------------------
   1. DATOS DE PROYECTOS DE CINE / TEMAS DEL ESCRITORIO
   (Modifica este objeto para cambiar el contenido de los polaroids)
   ------------------------------------------------------------ */
const PROJECTS = {
  'primer-corto': {
    title: 'Mi primer corto',
    emoji: '🎬',
    color: '#EC407A',
    subtitle: 'Dirección · Cortometraje',
    description: `
      <p style="font-size:15px; font-weight:600; color:#888; font-style:italic;">Próximamente.</p>
      <p>Este espacio está reservado para el primer cortometraje que voy a dirigir.
      La historia ya está en mi cabeza — solo falta el momento de filmarla.</p>
    `,
    tags: ['Cortometraje', 'Dirección', 'Próximamente'],
    link: '#',
    linkLabel: 'Próximamente'
  },
  'guiones': {
    title: 'Guiones',
    emoji: '📝',
    color: '#1E88E5',
    subtitle: 'Escritura · Guion cinematográfico',
    description: `
      <p>Me gusta construir historias desde cero. Escribir guiones es donde todo empieza:
      los personajes, la atmósfera, los silencios.</p>
      <p>Trabajo en historias que hablan de lo que casi nunca se habla.
      Influencias: Wong Kar-wai, Sofia Coppola, Luca Guadagnino.</p>
    `,
    tags: ['Escritura', 'Guion', 'Narrativa visual'],
    link: '#',
    linkLabel: 'Ver guiones'
  },
  'cine-90': {
    title: 'Cine de los 90',
    emoji: '🎞️',
    color: '#43A047',
    subtitle: 'Referentes · Estética · Nostalgia',
    description: `
      <p>Los años 90 son mi década de referencia. La estética granulada, los colores
      saturados y esa sensación de cercanía que tienen esas películas me inspiran mucho.</p>
      <p>Chungking Express, The Virgin Suicides, Lost in Translation (aunque es de 2003,
      tiene ese espíritu) — son películas que definen lo que quiero hacer.</p>
    `,
    tags: ['Años 90', 'Estética', 'Wong Kar-wai', 'Sofia Coppola'],
    link: '#',
    linkLabel: 'Ver lista'
  },
  'detras-camaras': {
    title: 'Detrás de cámaras',
    emoji: '🎥',
    color: '#FF9500',
    subtitle: 'Dirección · Producción · Técnica',
    description: `
      <p>No me gusta actuar. Me gusta estar detrás: dirigir, tomar decisiones de encuadre,
      trabajar con la luz, construir la escena.</p>
      <p>El director es quien da forma a la visión. Eso es lo que quiero ser.</p>
    `,
    tags: ['Dirección', 'Fotografía', 'Puesta en escena'],
    link: '#',
    linkLabel: 'Ver más'
  },
  'londres': {
    title: 'Londres',
    emoji: '🇬🇧',
    color: '#9C27B0',
    subtitle: 'London Film School · Meta 2028',
    description: `
      <p>Mi gran meta es estudiar en la London Film School en 2028. Es una de las escuelas
      de cine más importantes del mundo y el lugar donde quiero formarme como director.</p>
      <p>Londres representa el primer gran paso hacia la carrera que soñé desde siempre.</p>
    `,
    tags: ['London Film School', 'Meta 2028', 'Dirección de cine'],
    link: 'https://lfs.org.uk',
    linkLabel: 'Ver London Film School'
  },
  'escocia': {
    title: 'Escocia',
    emoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    color: '#1E88E5',
    subtitle: 'Estudios de cine · Después de Londres',
    description: `
      <p>Después de Londres, quiero irme a Escocia a estudiar cine formalmente y profundizar
      en la dirección y la escritura de guiones en un entorno más íntimo y creativo.</p>
      <p>La estética melancólica del paisaje escocés conecta perfectamente con el tipo
      de cine que quiero hacer.</p>
    `,
    tags: ['Escocia', 'Cine', 'Dirección', 'Guion'],
    link: '#',
    linkLabel: 'Próximamente'
  }
};

/* Datos de carpetas (temas de cine) */
const FOLDERS = {
  'primer-corto': {
    title: 'Mi primer corto',
    color: '#EC407A',
    emoji: '🎬',
    description: 'El primer cortometraje que voy a dirigir. La historia ya existe — solo falta filmarla.',
    projects: ['primer-corto']
  },
  'cine-90': {
    title: 'Cine de los 90',
    color: '#43A047',
    emoji: '🎞️',
    description: 'Referentes estéticos y películas que me formaron como espectador y como futuro director.',
    projects: ['cine-90']
  },
  'guiones': {
    title: 'Guiones',
    color: '#1E88E5',
    emoji: '📝',
    description: 'Historias escritas desde cero: personajes, atmósfera, silencios.',
    projects: ['guiones']
  },
  'londres': {
    title: 'Londres',
    color: '#FF8C42',
    emoji: '🇬🇧',
    description: 'Mi meta de estudiar en la London Film School en 2028.',
    projects: ['londres', 'escocia']
  }
};


/* ------------------------------------------------------------
   2. ESTADO GLOBAL
   ------------------------------------------------------------ */
const state = {
  openWindows: new Set(),       // IDs de ventanas abiertas
  minimizedWindows: new Set(),  // IDs de ventanas minimizadas
  maximizedWindows: new Set(),  // IDs de ventanas maximizadas
  highestZ: 200,                // z-index más alto actual
  dragging: null                // ventana siendo arrastrada
};


/* ------------------------------------------------------------
   3. RELOJ DE LA BARRA DE MENÚ
   ------------------------------------------------------------ */
function updateClock() {
  const el = document.getElementById('menubar-time');
  if (!el) return;
  const now = new Date();
  const opts = { weekday: 'short', month: 'short', day: 'numeric',
                 hour: '2-digit', minute: '2-digit', hour12: false };
  el.textContent = now.toLocaleDateString('es-CO', opts);
}

updateClock();
setInterval(updateClock, 10000);


/* ------------------------------------------------------------
   4. GESTIÓN DE VENTANAS
   ------------------------------------------------------------ */

/**
 * Trae una ventana al frente aumentando su z-index.
 * @param {HTMLElement} win
 */
function bringToFront(win) {
  state.highestZ += 1;
  win.style.zIndex = state.highestZ;
}

/**
 * Abre una ventana por su ID.
 * Si ya está abierta, la trae al frente. Si estaba minimizada, la restaura.
 * @param {string} id — ID de la ventana (sin el prefijo "window-")
 */
function openWindow(id) {
  const win = document.getElementById(`window-${id}`);
  if (!win) return;

  // Si ya está abierta y visible, solo traerla al frente
  if (state.openWindows.has(id) && !state.minimizedWindows.has(id)) {
    bringToFront(win);
    win.classList.add('open');
    return;
  }

  // Si estaba minimizada, restaurarla
  if (state.minimizedWindows.has(id)) {
    restoreWindow(id);
    return;
  }

  // Abrir la ventana
  state.openWindows.add(id);
  win.classList.remove('minimizing');
  win.classList.add('open');
  bringToFront(win);

  // Marcar el ícono del dock como activo
  markDockActive(id, true);

  // Animar barras de habilidad si es la ventana de skills
  if (id === 'skills') {
    setTimeout(animateSkillBars, 300);
  }
}

/**
 * Cierra una ventana.
 * @param {string} id
 */
function closeWindow(id) {
  const win = document.getElementById(`window-${id}`);
  if (!win) return;

  win.classList.remove('open', 'minimizing', 'maximized');
  state.openWindows.delete(id);
  state.minimizedWindows.delete(id);
  state.maximizedWindows.delete(id);
  markDockActive(id, false);
}

/**
 * Minimiza una ventana con animación hacia el dock.
 * @param {string} id
 */
function minimizeWindow(id) {
  const win = document.getElementById(`window-${id}`);
  if (!win) return;

  win.classList.add('minimizing');
  state.minimizedWindows.add(id);

  // Después de la animación, ocultar completamente
  setTimeout(() => {
    win.classList.remove('open', 'minimizing');
  }, 320);

  // Hacer rebotar el ícono del dock
  bounceDockIcon(id);
}

/**
 * Restaura una ventana minimizada.
 * @param {string} id
 */
function restoreWindow(id) {
  const win = document.getElementById(`window-${id}`);
  if (!win) return;

  state.minimizedWindows.delete(id);
  win.classList.remove('minimizing');
  win.classList.add('open');
  bringToFront(win);
}

/**
 * Alterna el estado maximizado de una ventana.
 * @param {string} id
 */
function toggleMaximize(id) {
  const win = document.getElementById(`window-${id}`);
  if (!win) return;

  if (state.maximizedWindows.has(id)) {
    win.classList.remove('maximized');
    state.maximizedWindows.delete(id);
  } else {
    win.classList.add('maximized');
    state.maximizedWindows.add(id);
    bringToFront(win);
  }
}

/**
 * Marca o desmarca el punto indicador en el dock.
 * @param {string} windowId
 * @param {boolean} active
 */
function markDockActive(windowId, active) {
  // El dock-item tiene data-window que puede coincidir con windowId
  document.querySelectorAll(`.dock-item[data-window="${windowId}"]`).forEach(item => {
    item.classList.toggle('active', active);
  });
  // También para "gallery" que tiene dos íconos (camera y photos)
  if (windowId === 'gallery') {
    document.querySelectorAll('.dock-item[data-window="gallery"]').forEach(item => {
      item.classList.toggle('active', active);
    });
  }
}

/**
 * Hace rebotar el ícono del dock al minimizar.
 * @param {string} windowId
 */
function bounceDockIcon(windowId) {
  const items = document.querySelectorAll(`.dock-item[data-window="${windowId}"]`);
  items.forEach(item => {
    item.classList.add('bouncing');
    item.addEventListener('animationend', () => item.classList.remove('bouncing'), { once: true });
  });
}


/* ------------------------------------------------------------
   5. ARRASTRAR VENTANAS (DRAG)
   ------------------------------------------------------------ */

/**
 * Inicializa el drag-and-drop en todas las barras de título.
 */
function initDraggable() {
  document.querySelectorAll('.window-titlebar').forEach(titlebar => {
    titlebar.addEventListener('mousedown', startDrag);
    titlebar.addEventListener('touchstart', startDragTouch, { passive: false });
  });
}

function startDrag(e) {
  // No iniciar drag si se clickeó un botón
  if (e.target.classList.contains('window-btn')) return;

  const titlebar = e.currentTarget;
  const win = titlebar.closest('.window');
  if (!win || state.maximizedWindows.has(getWindowId(win))) return;

  bringToFront(win);
  e.preventDefault();

  const rect = win.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const offsetY = e.clientY - rect.top;

  state.dragging = { win, offsetX, offsetY };
  win.style.transition = 'none';
  titlebar.style.cursor = 'grabbing';

  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
}

function startDragTouch(e) {
  if (e.target.classList.contains('window-btn')) return;
  const win = e.currentTarget.closest('.window');
  if (!win || state.maximizedWindows.has(getWindowId(win))) return;

  bringToFront(win);
  e.preventDefault();

  const touch = e.touches[0];
  const rect = win.getBoundingClientRect();
  const offsetX = touch.clientX - rect.left;
  const offsetY = touch.clientY - rect.top;

  state.dragging = { win, offsetX, offsetY };
  win.style.transition = 'none';

  document.addEventListener('touchmove', onDragTouch, { passive: false });
  document.addEventListener('touchend', stopDragTouch);
}

function onDrag(e) {
  if (!state.dragging) return;
  const { win, offsetX, offsetY } = state.dragging;

  let newX = e.clientX - offsetX;
  let newY = e.clientY - offsetY;

  // Limitar dentro de la pantalla
  const maxX = window.innerWidth  - win.offsetWidth;
  const maxY = window.innerHeight - win.offsetHeight;
  newX = Math.max(0, Math.min(newX, maxX));
  newY = Math.max(28, Math.min(newY, maxY)); // 28px = altura menubar

  win.style.left = `${newX}px`;
  win.style.top  = `${newY}px`;
}

function onDragTouch(e) {
  if (!state.dragging) return;
  e.preventDefault();
  const touch = e.touches[0];
  const { win, offsetX, offsetY } = state.dragging;

  let newX = touch.clientX - offsetX;
  let newY = touch.clientY - offsetY;

  const maxX = window.innerWidth  - win.offsetWidth;
  const maxY = window.innerHeight - win.offsetHeight;
  newX = Math.max(0, Math.min(newX, maxX));
  newY = Math.max(28, Math.min(newY, maxY));

  win.style.left = `${newX}px`;
  win.style.top  = `${newY}px`;
}

function stopDrag() {
  if (!state.dragging) return;
  state.dragging.win.style.transition = '';
  state.dragging = null;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
}

function stopDragTouch() {
  if (!state.dragging) return;
  state.dragging.win.style.transition = '';
  state.dragging = null;
  document.removeEventListener('touchmove', onDragTouch);
  document.removeEventListener('touchend', stopDragTouch);
}

/**
 * Obtiene el ID de una ventana a partir del elemento.
 * @param {HTMLElement} win
 * @returns {string}
 */
function getWindowId(win) {
  return win.id.replace('window-', '');
}


/* ------------------------------------------------------------
   6. BOTONES DE CONTROL DE VENTANA (cerrar, minimizar, maximizar)
   ------------------------------------------------------------ */
function initWindowButtons() {
  document.querySelectorAll('.window-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const win = btn.closest('.window');
      const id  = getWindowId(win);
      const action = btn.dataset.action;

      if (action === 'close')    closeWindow(id);
      if (action === 'minimize') minimizeWindow(id);
      if (action === 'maximize') toggleMaximize(id);
    });
  });
}

/* Clic en ventana → traer al frente */
function initWindowFocus() {
  document.querySelectorAll('.window').forEach(win => {
    win.addEventListener('mousedown', () => bringToFront(win), true);
  });
}


/* ------------------------------------------------------------
   7. DOCK — ABRIR VENTANAS AL HACER CLIC
   ------------------------------------------------------------ */
function initDock() {
  document.querySelectorAll('.dock-item').forEach(item => {
    item.addEventListener('click',   () => openWindow(item.dataset.window));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openWindow(item.dataset.window);
      }
    });
  });
}

/* Efecto magnético del dock al hacer hover */
function initDockMagnifier() {
  const dock  = document.getElementById('dock');
  const items = Array.from(dock.querySelectorAll('.dock-item'));

  dock.addEventListener('mousemove', e => {
    const dockRect = dock.getBoundingClientRect();
    const mouseX   = e.clientX;

    items.forEach((item, i) => {
      const rect   = item.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const dist   = Math.abs(mouseX - centerX);

      // Limpiar clases de vecino
      item.classList.remove('neighbor-1', 'neighbor-2');

      if (dist < 40) {
        // Nada — ya tiene el estilo :hover del CSS
      } else if (dist < 80) {
        item.classList.add('neighbor-1');
      } else if (dist < 120) {
        item.classList.add('neighbor-2');
      }
    });
  });

  dock.addEventListener('mouseleave', () => {
    items.forEach(item => item.classList.remove('neighbor-1', 'neighbor-2'));
  });
}


/* ------------------------------------------------------------
   8. CARPETAS — ABRIR VENTANA CON CONTENIDO
   ------------------------------------------------------------ */
function initFolders() {
  document.querySelectorAll('.folder[data-folder]').forEach(folder => {
    folder.addEventListener('click', () => openFolder(folder.dataset.folder));
    folder.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openFolder(folder.dataset.folder);
      }
    });
  });
}

/**
 * Abre la ventana de carpeta con el contenido correspondiente.
 * @param {string} folderId
 */
function openFolder(folderId) {
  const data = FOLDERS[folderId];
  if (!data) return;

  const titleEl   = document.getElementById('folder-window-title');
  const contentEl = document.getElementById('folder-window-content');
  const footerEl  = document.getElementById('folder-window-footer');

  titleEl.textContent  = data.title;
  footerEl.textContent = data.title.toLowerCase();

  // Construir el HTML del contenido
  let projectsHTML = data.projects.map(pid => {
    const p = PROJECTS[pid];
    if (!p) return '';
    return `
      <article class="project-card"
               data-project="${pid}"
               tabindex="0"
               role="button"
               aria-label="Ver detalle: ${p.title}"
               style="cursor:pointer;"
      >
        <div class="project-card-thumb-placeholder" aria-hidden="true">${p.emoji}</div>
        <div class="project-card-body">
          <div class="project-card-title">${p.title}</div>
          <p class="project-card-desc">${p.subtitle}</p>
          <div class="project-tags">
            ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
          </div>
        </div>
      </article>
    `;
  }).join('');

  contentEl.innerHTML = `
    <p style="color:#666; font-size:13px; margin-bottom:18px;">${data.description}</p>
    <div class="projects-grid">${projectsHTML}</div>
  `;

  // Activar clic en las tarjetas del contenido dinámico
  contentEl.querySelectorAll('.project-card[data-project]').forEach(card => {
    const handler = () => openProjectDetail(card.dataset.project);
    card.addEventListener('click',   handler);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); }
    });
  });

  openWindow('folder');
}


/* ------------------------------------------------------------
   9. POLAROIDS — ABRIR VENTANA DE DETALLE DE PROYECTO
   ------------------------------------------------------------ */
function initPolaroids() {
  document.querySelectorAll('.polaroid[data-project]').forEach(pol => {
    pol.addEventListener('click',   () => openProjectDetail(pol.dataset.project));
    pol.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProjectDetail(pol.dataset.project);
      }
    });
  });
}

/**
 * Abre la ventana de detalle con los datos del proyecto indicado.
 * @param {string} projectId
 */
function openProjectDetail(projectId) {
  const data = PROJECTS[projectId];
  if (!data) return;

  const titleEl   = document.getElementById('project-window-title');
  const contentEl = document.getElementById('project-window-content');
  const footerEl  = document.getElementById('project-window-footer');

  titleEl.textContent  = data.title;
  footerEl.textContent = data.title.toLowerCase();

  contentEl.innerHTML = `
    <div class="project-detail-header">
      <div class="project-detail-icon" style="background:${data.color}22;">
        ${data.emoji}
      </div>
      <div>
        <div class="project-detail-title">${data.title}</div>
        <div class="project-detail-subtitle">${data.subtitle}</div>
      </div>
    </div>
    <div class="project-detail-body">
      ${data.description}
      <div class="project-tags" style="margin-bottom:20px;">
        ${data.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
      </div>
      <a href="${data.link}"
         target="_blank"
         rel="noopener noreferrer"
         class="project-detail-link"
         aria-label="${data.linkLabel} — ${data.title} (abre en nueva pestaña)"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M14 3h7v7l-2-2-7 7-2-2 7-7-3-3zm-1 4H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-8l-2-2v10H5V9h6l2-2z"/>
        </svg>
        ${data.linkLabel}
      </a>
    </div>
  `;

  // También activar clic en las tarjetas dentro de favoritos
  document.querySelectorAll('#window-favorites .project-card[data-project]').forEach(card => {
    card.onclick = () => openProjectDetail(card.dataset.project);
  });

  openWindow('project');
}


/* ------------------------------------------------------------
   10. TARJETAS EN VENTANA FAVORITOS
   ------------------------------------------------------------ */
function initFavoriteCards() {
  document.querySelectorAll('#window-favorites .project-card[data-project]').forEach(card => {
    card.addEventListener('click',   () => openProjectDetail(card.dataset.project));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProjectDetail(card.dataset.project);
      }
    });
  });
}


/* ------------------------------------------------------------
   11. GALERÍA Y LIGHTBOX
   ------------------------------------------------------------ */
function initGallery() {
  document.querySelectorAll('.gallery-item[data-lightbox]').forEach(item => {
    item.addEventListener('click',   () => openLightbox(item));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(item);
      }
    });
  });
}

/**
 * Abre el lightbox con la imagen o emoji del item de galería.
 * @param {HTMLElement} item
 */
function openLightbox(item) {
  const lightbox   = document.getElementById('lightbox');
  const emojiEl    = document.getElementById('lightbox-emoji');
  const captionEl  = document.getElementById('lightbox-caption');

  // Intentar mostrar el placeholder emoji si no hay imagen real
  const placeholder = item.querySelector('.gallery-placeholder span:first-child');
  emojiEl.textContent   = placeholder ? placeholder.textContent : '🖼️';
  captionEl.textContent = item.dataset.caption || '';

  lightbox.classList.add('open');
  document.getElementById('lightbox-close').focus();
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

function initLightbox() {
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox').addEventListener('click', e => {
    if (e.target === document.getElementById('lightbox')) closeLightbox();
  });
  // Nota: Escape se maneja de forma unificada en initKeyboard()
}


/* ------------------------------------------------------------
   12. ANIMACIÓN DE BARRAS DE HABILIDAD
   ------------------------------------------------------------ */
function animateSkillBars() {
  document.querySelectorAll('#window-skills .skill-bar-fill').forEach(bar => {
    const w = bar.dataset.width || '0';
    bar.style.width = `${w}%`;
  });
}


/* ------------------------------------------------------------
   13. FORMULARIO DE CONTACTO CON VALIDACIÓN
   ------------------------------------------------------------ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (validateForm()) {
      submitForm();
    }
  });

  // Validación en tiempo real al salir de cada campo
  ['contact-name', 'contact-email', 'contact-message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('blur',  () => validateField(el));
      el.addEventListener('input', () => clearError(el));
    }
  });
}

/**
 * Valida todo el formulario.
 * @returns {boolean} true si es válido
 */
function validateForm() {
  const nameOk  = validateField(document.getElementById('contact-name'));
  const emailOk = validateField(document.getElementById('contact-email'));
  const msgOk   = validateField(document.getElementById('contact-message'));
  return nameOk && emailOk && msgOk;
}

/**
 * Valida un campo individual.
 * @param {HTMLElement} el
 * @returns {boolean}
 */
function validateField(el) {
  if (!el) return true;
  const val      = el.value.trim();
  const errorEl  = document.getElementById(`${el.id.replace('contact-', '')}-error`);

  let msg = '';

  if (!val) {
    msg = 'Este campo es obligatorio.';
  } else if (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
    msg = 'Ingresa un correo electrónico válido.';
  } else if (el.tagName === 'TEXTAREA' && val.length < 10) {
    msg = 'El mensaje debe tener al menos 10 caracteres.';
  }

  if (msg) {
    el.classList.add('error');
    if (errorEl) errorEl.textContent = msg;
    return false;
  }

  el.classList.remove('error');
  if (errorEl) errorEl.textContent = '';
  return true;
}

/**
 * Limpia el error de un campo.
 * @param {HTMLElement} el
 */
function clearError(el) {
  el.classList.remove('error');
  const errorEl = document.getElementById(`${el.id.replace('contact-', '')}-error`);
  if (errorEl) errorEl.textContent = '';
}

/**
 * Simula el envío del formulario y muestra el mensaje de éxito.
 */
function submitForm() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');

  // Deshabilitar el botón mientras "envía"
  const btn = form.querySelector('.form-submit');
  const originalText = btn.textContent;
  btn.textContent = 'Enviando…';
  btn.disabled = true;

  // Simular latencia de red (en un proyecto real, aquí va fetch() al backend)
  setTimeout(() => {
    form.reset();
    ['contact-name', 'contact-email', 'contact-message'].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.classList.remove('error'); }
    });
    document.querySelectorAll('.form-error-msg').forEach(e => e.textContent = '');

    success.style.display = 'block';
    btn.textContent = originalText;
    btn.disabled = false;

    // Ocultar el mensaje de éxito después de 5 segundos
    setTimeout(() => { success.style.display = 'none'; }, 5000);
  }, 1200);
}


/* ------------------------------------------------------------
   14. BARRA DE MENÚ SUPERIOR — HORA
   ------------------------------------------------------------ */
/* Ya se inicializa en la sección 3 */


/* ------------------------------------------------------------
   15. TECLAS DE ACCESIBILIDAD
   ------------------------------------------------------------ */
function initKeyboard() {
  // Escape: cierra el lightbox si está abierto; si no, cierra la ventana del frente
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;

    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.classList.contains('open')) {
      closeLightbox();
      return;
    }

    // Encontrar la ventana más al frente
    let topWin = null;
    let topZ   = 0;
    document.querySelectorAll('.window.open').forEach(win => {
      const z = parseInt(win.style.zIndex || 0, 10);
      if (z > topZ) { topZ = z; topWin = win; }
    });
    if (topWin) closeWindow(getWindowId(topWin));
  });
}


/* ------------------------------------------------------------
   16. INICIALIZACIÓN GENERAL
   ------------------------------------------------------------ */
function init() {
  initDraggable();
  initWindowButtons();
  initWindowFocus();
  initDock();
  initDockMagnifier();
  initFolders();
  initPolaroids();
  initFavoriteCards();
  initGallery();
  initLightbox();
  initContactForm();
  initKeyboard();

  // Abrir la ventana "About" automáticamente al cargar
  // (simula que la aplicación Notas está abierta por defecto)
  setTimeout(() => openWindow('about'), 800);
}

// Arrancar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
