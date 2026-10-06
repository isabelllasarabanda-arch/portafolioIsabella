/* Intro estilo MacBook: arranque -> bloqueo -> contraseña -> escritorio */
(function () {
  // Cambia aquí la contraseña de tu portafolio
  var PASSWORD = '1234';
  var NAME = 'Isabella';

  var boot = document.getElementById('boot');
  var lock = document.getElementById('lock');
  var pass = document.getElementById('lock-pass');
  var msg  = document.getElementById('lock-msg');
  if (!boot || !lock) return;

  function tick() {
    var d = new Date();
    var dia = d.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' });
    document.getElementById('lock-date').textContent = dia.charAt(0).toUpperCase() + dia.slice(1);
    document.getElementById('lock-time').textContent =
      d.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false });
  }
  tick(); setInterval(tick, 10000);
  document.getElementById('lock-name').textContent = NAME;
  document.getElementById('lock-avatar').textContent = NAME.charAt(0);

  setTimeout(function () { lock.classList.remove('is-hidden'); boot.classList.add('is-hidden'); }, 3600);

  function ask() {
    if (lock.classList.contains('is-asking')) return;
    lock.classList.add('is-asking');
    setTimeout(function () { pass.focus(); }, 50);
  }
  lock.addEventListener('click', ask);
  lock.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') ask(); });

  function enter() {
    if (pass.value === PASSWORD) {
      lock.classList.add('is-hidden');
      document.body.classList.remove('intro-active');
      setTimeout(function () { lock.style.display = 'none'; boot.style.display = 'none'; }, 1000);
    } else {
      msg.textContent = 'Contraseña incorrecta. Inténtalo de nuevo.';
      var box = pass.parentNode;
      box.classList.remove('is-shaking'); void box.offsetWidth; box.classList.add('is-shaking');
      pass.value = '';
    }
  }
  document.getElementById('lock-go').addEventListener('click', function (e) { e.stopPropagation(); enter(); });
  pass.addEventListener('click', function (e) { e.stopPropagation(); });
  pass.addEventListener('keydown', function (e) { e.stopPropagation(); if (e.key === 'Enter') enter(); });
})();
