/*
  Identity Motion for 灵感阁楼
  - IntersectionObserver to trigger ink-bleed reveal
  - Magnetic hover for buttons (subtle)
  - Pointer-position aware hover glow
*/
(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Update year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // IntersectionObserver for reveals
  if (!prefersReduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          if (entry.target.classList.contains('ink-section')) {
            // compute local center within the element for mask origin
            const rect = entry.target.getBoundingClientRect();
            const mx = rect.width * 0.5;
            const my = rect.height * 0.35;
            entry.target.style.setProperty('--mx', mx + 'px');
            entry.target.style.setProperty('--my', my + 'px');
            // trigger ink animation
            requestAnimationFrame(() => entry.target.classList.add('revealed'));
          }
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }

  // Pointer-aware hover glow for buttons
  function handlePointerGlow(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // within element
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mx', x + 'px');
    e.currentTarget.style.setProperty('--my', y + 'px');
  }

  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('pointermove', handlePointerGlow);
  });

  // Subtle magnetic effect on hover (re-centers on leave)
  const strength = 6; // px
  function magnetize(e) {
    const t = e.currentTarget;
    const r = t.getBoundingClientRect();
    const relX = e.clientX - (r.left + r.width / 2);
    const relY = e.clientY - (r.top + r.height / 2);
    const distX = (relX / (r.width / 2)) * strength;
    const distY = (relY / (r.height / 2)) * strength;
    t.style.transform = `translate(${distX}px, ${distY}px)`;
  }
  function demagnetize(e) { e.currentTarget.style.transform = ''; }

  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('pointermove', magnetize);
    btn.addEventListener('pointerleave', demagnetize);
  });

  // Smooth scroll fallback for older browsers
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
      target.focus({ preventScroll: true });
    });
  });
})();
