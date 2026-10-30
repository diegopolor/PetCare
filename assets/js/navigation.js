/**
 * PetCare — Navegación y Conmutadores de Vista (JavaScript Vanilla)
 * Gestión de viewport persistente y sub-vistas transaccionales
 */

// Conmutador de Vista Desktop / Mobile-First con persistencia en localStorage
function setViewport(mode) {
  const wrapper = document.getElementById('viewport-wrapper');
  const btnDesktop = document.getElementById('btn-desktop');
  const btnMobile = document.getElementById('btn-mobile');

  if (!wrapper || !btnDesktop || !btnMobile) return;

  if (mode === 'mobile') {
    wrapper.classList.add('mobile-frame');
    btnMobile.classList.add('active');
    btnDesktop.classList.remove('active');
    try {
      localStorage.setItem('petcare_viewport', 'mobile');
    } catch (e) {
      /* Silenciar errores de almacenamiento */
    }
  } else {
    wrapper.classList.remove('mobile-frame');
    btnDesktop.classList.add('active');
    btnMobile.classList.remove('active');
    try {
      localStorage.setItem('petcare_viewport', 'desktop');
    } catch (e) {
      /* Silenciar errores de almacenamiento */
    }
  }
}

// Aplicar viewport guardado al cargar
function restoreViewportPreference() {
  try {
    const saved = localStorage.getItem('petcare_viewport');
    if (saved === 'mobile') {
      setViewport('mobile');
    }
  } catch (e) {
    /* Silenciar errores de almacenamiento */
  }
}

// Conmutador de Sub-vistas en el Módulo de Reservas y Reportes
function switchSubReport(subId) {
  const subViews = document.querySelectorAll('.sub-report-view');
  subViews.forEach(v => v.classList.add('hidden'));

  const targetView = document.getElementById(subId);
  if (targetView) {
    targetView.classList.remove('hidden');
  }

  const subReportIds = ['sub-booking', 'sub-mybookings', 'sub-provider'];
  subReportIds.forEach(id => {
    const btn = document.getElementById('btn-' + id);
    if (btn) {
      if (id === subId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }
  });
}

// Inicializar preferencias de vista al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  restoreViewportPreference();
});
