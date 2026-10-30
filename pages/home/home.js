/**
 * PetCare — Exploración de Servicios (Home)
 * Lógica nativa de búsqueda, filtrado, modal de detalle y redirección a reservas
 * 100% libre de estilos en línea
 */

// Proveedores de servicios registrados en PetCare
const providersData = [
  {
    id: 0,
    name: "Spa Canino & Grooming Huellitas",
    category: "Peluquería",
    badge: "✂️ Peluquería y Baño",
    location: "Chapinero",
    address: "Cra 13 # 54-20, Chapinero",
    rating: 4.9,
    reviewsCount: 38,
    basePrice: 35000,
    hours: "Lunes a Viernes: 8:00 AM - 6:00 PM · Sábados: 9:00 AM - 4:00 PM",
    description: "Especialistas en baño hipoalergénico, corte comercial y de raza, corte de uñas y limpieza de oídos. Contamos con manejo tranquilo para mascotas nerviosas.",
    services: [
      { name: "Baño Hipoalergénico + Corte de Pelaje", price: 35000, duration: "90 min" },
      { name: "Baño Básico + Limpieza de Oídos y Uñas", price: 25000, duration: "60 min" },
      { name: "Deslanado Especial Perros Grandes", price: 42000, duration: "90 min" }
    ],
    reviews: [
      { user: "Laura Martínez", rating: "★★★★★", comment: "Excelente atención con Luna, respetaron el horario acordado y tuvieron mucho cuidado con el secador." },
      { user: "Camilo Rojas", rating: "★★★★★", comment: "Precios claros desde el principio y el lugar es muy limpio." }
    ]
  },
  {
    id: 1,
    name: "Clínica Veterinaria San Francisco",
    category: "Veterinaria",
    badge: "🩺 Atención Veterinaria",
    location: "Usaquén",
    address: "Av. Cra 15 # 118-45, Usaquén",
    rating: 4.8,
    reviewsCount: 52,
    basePrice: 45000,
    hours: "Lunes a Sábado: 7:30 AM - 7:00 PM · Domingos: 9:00 AM - 2:00 PM",
    description: "Más de 15 años cuidando la salud de perros y gatos. Consulta médica general, vacunación, desparasitación, controles preventivos y remisión a especialistas.",
    services: [
      { name: "Consulta Médica Veterinaria General", price: 45000, duration: "40 min" },
      { name: "Aplicación de Vacuna Anual + Control", price: 55000, duration: "30 min" },
      { name: "Valoración Preventiva y Desparasitación", price: 38000, duration: "30 min" }
    ],
    reviews: [
      { user: "Andrea Gómez", rating: "★★★★★", comment: "El doctor Carlos explica cada procedimiento con mucha claridad y paciencia." },
      { user: "Felipe D.", rating: "★★★★☆", comment: "Muy puntuales con la cita agendada por la plataforma." }
    ]
  },
  {
    id: 2,
    name: "Rutas & Paseos Seguros Jorge A.",
    category: "Paseo",
    badge: "🦮 Paseo Canino",
    location: "Teusaquillo",
    address: "Parque Simón Bolívar / Teusaquillo",
    rating: 5.0,
    reviewsCount: 24,
    basePrice: 20000,
    hours: "Lunes a Sábado: 6:30 AM - 5:00 PM",
    description: "Paseador profesional con 5 años de experiencia. Grupos reducidos clasificados por tamaño y temperamento, con envío de reporte fotográfico durante el recorrido.",
    services: [
      { name: "Paseo Grupal Recreativo (60 minutos)", price: 20000, duration: "60 min" },
      { name: "Paseo Individual Personalizado (60 minutos)", price: 28000, duration: "60 min" },
      { name: "Visita y Acompañamiento a Domicilio", price: 32000, duration: "90 min" }
    ],
    reviews: [
      { user: "Natalia P.", rating: "★★★★★", comment: "Me envía fotos y videos durante todo el paseo, me da total confianza." }
    ]
  },
  {
    id: 3,
    name: "Hogar Canino Campestre Mi Manada",
    category: "Guardería",
    badge: "🏡 Cuidado Temporal",
    location: "Chapinero",
    address: "Vía La Calera Km 3 · Recogida en Chapinero",
    rating: 4.9,
    reviewsCount: 19,
    basePrice: 38000,
    hours: "Lunes a Domingo: 6:30 AM - 6:30 PM",
    description: "Día de sol, guardería diurna y hospedaje temporal libre de jaulas con supervisión permanente y zonas verdes seguras.",
    services: [
      { name: "Día de Guardería Recreacional (Pasadía)", price: 38000, duration: "8 horas" },
      { name: "Cuidado Temporal Fin de Semana (Por noche)", price: 55000, duration: "24 horas" }
    ],
    reviews: [
      { user: "Juan Pablo D.", rating: "★★★★★", comment: "Tienen muy bien registradas las rutinas de alimentación y cuidado." }
    ]
  }
];

// Formateador de moneda colombiana (COP)
function formatCOP(value) {
  return "$" + Number(value).toLocaleString("es-CO") + " COP";
}

// Renderizado reactivo de la grilla de proveedores
function renderProviders(list) {
  const grid = document.getElementById("providers-grid");
  const emptyState = document.getElementById("empty-results-state");
  const counter = document.getElementById("results-counter");

  if (!grid) return;

  if (counter) {
    counter.textContent = `Mostrando ${list.length} proveedor(es) verificado(s)`;
  }

  if (list.length === 0) {
    grid.innerHTML = "";
    if (emptyState) emptyState.classList.remove("hidden");
    return;
  }

  if (emptyState) emptyState.classList.add("hidden");

  grid.innerHTML = list.map(p => `
    <article class="provider-card">
      <div>
        <div class="provider-card-header">
          <span class="badge-prov-category">${p.badge}</span>
          <span class="badge-prov-rating">★ ${p.rating.toFixed(1)} (${p.reviewsCount} opiniones)</span>
        </div>
        <h3 class="provider-name">${p.name}</h3>
        <p class="provider-address">📍 ${p.address} · <span class="provider-verified-badge">✔ Proveedor Verificado</span></p>
        <p class="provider-desc">${p.description}</p>
      </div>

      <div class="provider-card-footer">
        <div>
          <span class="provider-price-label">Tarifa desde</span>
          <span class="provider-price-val">${formatCOP(p.basePrice)}</span>
        </div>
        <div class="provider-actions">
          <button onclick="openProviderModal(${p.id})" class="btn-card-outline">
            Ver perfil y precios
          </button>
          <button onclick="goToBookProvider(${p.id})" class="btn-card-primary">
            Reservar ahora →
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

// Filtro multidimensional por categoría, localidad y precio
function filterProviders() {
  const catEl = document.getElementById("filter-category");
  const locEl = document.getElementById("filter-location");
  const priceEl = document.getElementById("filter-price");

  if (!catEl || !locEl || !priceEl) return;

  const cat = catEl.value;
  const loc = locEl.value;
  const maxPrice = Number(priceEl.value);

  const filtered = providersData.filter(p => {
    const matchCat = cat === "ALL" || p.category === cat;
    const matchLoc = loc === "ALL" || p.location === loc;
    const matchPrice = p.basePrice <= maxPrice;
    return matchCat && matchLoc && matchPrice;
  });

  renderProviders(filtered);
}

// Acceso rápido por botón de categoría
function quickCategory(cat) {
  const select = document.getElementById("filter-category");
  if (select) {
    select.value = cat;
    filterProviders();
  }
}

// Restablecer filtros y limpiar criterios
function resetFilters() {
  const cat = document.getElementById("filter-category");
  const loc = document.getElementById("filter-location");
  const price = document.getElementById("filter-price");

  if (cat) cat.value = "ALL";
  if (loc) loc.value = "ALL";
  if (price) price.value = "999999";
  filterProviders();
}

// Abrir modal de detalle del proveedor
function openProviderModal(id) {
  const p = providersData.find(item => item.id === id);
  if (!p) return;

  const modalCat = document.getElementById("modal-prov-category");
  const modalName = document.getElementById("modal-prov-name");
  const modalMeta = document.getElementById("modal-prov-meta");
  const modalDesc = document.getElementById("modal-prov-desc");
  const modalHours = document.getElementById("modal-prov-hours");
  const modalServices = document.getElementById("modal-prov-services");
  const modalReviews = document.getElementById("modal-prov-reviews");
  const modal = document.getElementById("provider-detail-modal");

  if (!modal) return;

  if (modalCat) modalCat.textContent = p.badge;
  if (modalName) modalName.textContent = p.name;
  if (modalMeta) modalMeta.textContent = `📍 ${p.address} · ★ ${p.rating} (${p.reviewsCount} reseñas verificadas)`;
  if (modalDesc) modalDesc.textContent = p.description;
  if (modalHours) modalHours.textContent = p.hours;

  if (modalServices) {
    modalServices.innerHTML = p.services.map(s => `
      <div class="modal-service-card">
        <div>
          <div class="modal-service-name">${s.name}</div>
          <div class="modal-service-duration">Duración aprox: ${s.duration}</div>
        </div>
        <div class="modal-service-price">${formatCOP(s.price)}</div>
      </div>
    `).join("");
  }

  if (modalReviews) {
    modalReviews.innerHTML = p.reviews.map(r => `
      <div class="modal-review-card">
        <div class="modal-review-header">
          <span>${r.user}</span>
          <span class="modal-review-rating">${r.rating}</span>
        </div>
        <p class="modal-review-comment">"${r.comment}"</p>
      </div>
    `).join("");
  }

  const bookBtn = document.getElementById("modal-book-btn");
  if (bookBtn) {
    bookBtn.onclick = () => {
      closeProviderModal();
      goToBookProvider(p.id);
    };
  }

  modal.classList.remove("hidden");
}

// Cerrar modal de detalle
function closeProviderModal() {
  const modal = document.getElementById("provider-detail-modal");
  if (modal) {
    modal.classList.add("hidden");
  }
}

// Redireccionar al módulo de reservas preseleccionando el proveedor
function goToBookProvider(providerId) {
  window.location.href = `../bookings/bookings.html?provider=${providerId}`;
}

// Inicialización al cargar la página
window.addEventListener("DOMContentLoaded", () => {
  renderProviders(providersData);
});

