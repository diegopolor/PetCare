/**
 * PetCare — Reservas, Historial y Panel Proveedor
 * Lógica nativa de agendamiento en 3 pasos, cálculo en vivo, cancelación, aprobación de turnos y KPIs
 * 100% libre de estilos en línea
 */

// Proveedores registrados para agendamiento
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
    description: "Especialistas en baño hipoalergénico, corte comercial y de raza, corte de uñas y limpieza de oídos.",
    services: [
      { name: "Baño Hipoalergénico + Corte de Pelaje", price: 35000, duration: "90 min" },
      { name: "Baño Básico + Limpieza de Oídos y Uñas", price: 25000, duration: "60 min" },
      { name: "Deslanado Especial Perros Grandes", price: 42000, duration: "90 min" }
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
    description: "Consulta médica general, vacunación, desparasitación, controles preventivos y remisión a especialistas.",
    services: [
      { name: "Consulta Médica Veterinaria General", price: 45000, duration: "40 min" },
      { name: "Aplicación de Vacuna Anual + Control", price: 55000, duration: "30 min" },
      { name: "Valoración Preventiva y Desparasitación", price: 38000, duration: "30 min" }
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
    description: "Paseador profesional con 5 años de experiencia. Grupos reducidos clasificados por tamaño y temperamento.",
    services: [
      { name: "Paseo Grupal Recreativo (60 minutos)", price: 20000, duration: "60 min" },
      { name: "Paseo Individual Personalizado (60 minutos)", price: 28000, duration: "60 min" },
      { name: "Visita y Acompañamiento a Domicilio", price: 32000, duration: "90 min" }
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
    description: "Día de sol, guardería diurna y hospedaje temporal libre de jaulas con supervisión permanente.",
    services: [
      { name: "Día de Guardería Recreacional (Pasadía)", price: 38000, duration: "8 horas" },
      { name: "Cuidado Temporal Fin de Semana (Por noche)", price: 55000, duration: "24 horas" }
    ]
  }
];

// Mascotas registradas del usuario
const petsData = [
  {
    id: 1,
    name: "Luna",
    emoji: "🐶",
    breed: "Perro · Golden Retriever · 3 años",
    size: "Grande (28 kg)"
  },
  {
    id: 2,
    name: "Milo",
    emoji: "🐱",
    breed: "Gato · Doméstico Pelo Corto · 2 años",
    size: "Pequeño (4.2 kg)"
  }
];

// Reservas iniciales simuladas
let bookingsData = [
  {
    code: "#PC-4810",
    provider: "Spa Canino & Grooming Huellitas",
    service: "Baño Hipoalergénico + Corte de Pelaje",
    price: 35000,
    date: "2026-10-24",
    time: "10:30 AM",
    pet: "🐶 Luna (Golden Retriever)",
    note: "Nerviosa con el ruido del secador",
    status: "Pendiente"
  },
  {
    code: "#PC-4792",
    provider: "Clínica Veterinaria San Francisco",
    service: "Consulta Médica Veterinaria General",
    price: 45000,
    date: "2026-10-28",
    time: "09:00 AM",
    pet: "🐱 Milo (Gato Doméstico)",
    note: "Tímido en consultorio",
    status: "Confirmada"
  },
  {
    code: "#PC-4605",
    provider: "Rutas & Paseos Seguros Jorge A.",
    service: "Paseo Grupal Recreativo (60 minutos)",
    price: 20000,
    date: "2026-10-18",
    time: "08:00 AM",
    pet: "🐶 Luna (Golden Retriever)",
    note: "Llevar correa larga",
    status: "Completada"
  }
];

let selectedTimeSlot = "10:30 AM";

// Formateador de moneda colombiana (COP)
function formatCOP(value) {
  return "$" + Number(value).toLocaleString("es-CO") + " COP";
}

// Conmutador interno entre las sub-vistas del módulo
function switchSubReport(subId) {
  const views = ["sub-booking", "sub-mybookings", "sub-provider"];
  views.forEach(id => {
    const el = document.getElementById(id);
    const btn = document.getElementById("btn-" + id);
    if (el) {
      if (id === subId) {
        el.classList.remove("hidden");
      } else {
        el.classList.add("hidden");
      }
    }
    if (btn) {
      if (id === subId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    }
  });
}

// Actualizar lista de servicios según el proveedor seleccionado
function updateBookingProvider() {
  const provSelect = document.getElementById("book-provider");
  if (!provSelect) return;

  const provIndex = Number(provSelect.value);
  const prov = providersData[provIndex] || providersData[0];
  const serviceSelect = document.getElementById("book-service");

  if (!serviceSelect) return;

  serviceSelect.innerHTML = prov.services.map((s, idx) => `
    <option value="${idx}">${s.name} — ${formatCOP(s.price)}</option>
  `).join("");

  updateBookingSummary();
}

// Seleccionar franja horaria
function selectTimeSlot(slotText, btnEl) {
  selectedTimeSlot = slotText;
  document.querySelectorAll(".time-slot").forEach(b => {
    b.classList.remove("active");
    b.textContent = b.textContent.replace(" ✓", "");
  });
  btnEl.classList.add("active");
  btnEl.textContent = slotText + " ✓";
  updateBookingSummary();
}

// Actualizar la tarjeta de resumen interactivo
function updateBookingSummary() {
  const provSelect = document.getElementById("book-provider");
  if (!provSelect) return;

  const provIndex = Number(provSelect.value);
  const prov = providersData[provIndex] || providersData[0];
  const servSelect = document.getElementById("book-service");
  const servIndex = Number(servSelect ? servSelect.value : 0);
  const serv = prov.services[servIndex] || prov.services[0];
  const dateInput = document.getElementById("book-date");
  const petSelect = document.getElementById("book-pet");
  const noteInput = document.getElementById("book-note");

  const dateVal = dateInput ? dateInput.value : "2026-10-24";
  const petVal = petSelect ? petSelect.value : "🐶 Luna";
  const noteVal = noteInput ? noteInput.value : "";

  const sumProv = document.getElementById("sum-provider");
  const sumServ = document.getElementById("sum-service");
  const sumDate = document.getElementById("sum-datetime");
  const sumPet = document.getElementById("sum-pet");
  const sumNote = document.getElementById("sum-note");
  const sumPrice = document.getElementById("sum-price");

  if (sumProv) sumProv.textContent = prov.name;
  if (sumServ) sumServ.textContent = serv.name;
  if (sumDate) sumDate.textContent = `${dateVal} · ${selectedTimeSlot}`;
  if (sumPet) sumPet.textContent = petVal;
  if (sumNote) sumNote.textContent = `"${noteVal || "Sin observaciones adicionales"}"`;
  if (sumPrice) sumPrice.textContent = formatCOP(serv.price);
}

// Confirmar nueva reserva
function confirmNewBooking() {
  const provIndex = Number(document.getElementById("book-provider").value);
  const prov = providersData[provIndex];
  const servIndex = Number(document.getElementById("book-service").value || 0);
  const serv = prov.services[servIndex] || prov.services[0];
  const dateVal = document.getElementById("book-date").value;
  const petVal = document.getElementById("book-pet").value;
  const noteVal = document.getElementById("book-note").value;
  const newCode = "#PC-" + Math.floor(5000 + Math.random() * 4000);

  bookingsData.unshift({
    code: newCode,
    provider: prov.name,
    service: serv.name,
    price: serv.price,
    date: dateVal,
    time: selectedTimeSlot,
    pet: petVal,
    note: noteVal,
    status: "Pendiente"
  });

  renderBookingsAndProviderPanel();
  switchSubReport("sub-mybookings");
}

// Cancelar reserva
function cancelBooking(index) {
  bookingsData[index].status = "Cancelada";
  renderBookingsAndProviderPanel();
}

// Aprobar turno del lado del proveedor
function approveProviderBooking(index) {
  bookingsData[index].status = "Confirmada";
  renderBookingsAndProviderPanel();
}

// Renderizar listado de reservas del usuario, tabla del proveedor y KPIs
function renderBookingsAndProviderPanel() {
  // 1. Historial del Propietario
  const listEl = document.getElementById("user-bookings-list");
  if (listEl) {
    listEl.innerHTML = bookingsData.map((b, idx) => {
      let badgeClass = "badge-pending";
      if (b.status === "Confirmada") badgeClass = "badge-confirmed";
      if (b.status === "Completada") badgeClass = "badge-completed";
      if (b.status === "Cancelada") badgeClass = "badge-cancelled";

      return `
        <div class="booking-item-card">
          <div class="booking-item-meta">
            <div class="booking-item-top">
              <span class="booking-item-code">${b.code}</span>
              <span class="status-badge ${badgeClass}">${b.status}</span>
              <span class="booking-item-datetime">📅 ${b.date} a las ${b.time}</span>
            </div>
            <h4 class="booking-item-service">${b.service} — <span>${formatCOP(b.price)}</span></h4>
            <p class="booking-item-provider">Proveedor: <strong>${b.provider}</strong> · Mascota: <strong>${b.pet}</strong></p>
          </div>
          <div class="booking-item-actions">
            ${b.status !== "Cancelada" && b.status !== "Completada" ? `
              <button onclick="cancelBooking(${idx})" class="btn-cancel-booking">
                Cancelar reserva
              </button>
            ` : `<span class="booking-no-action">Sin acciones pendientes</span>`}
          </div>
        </div>
      `;
    }).join("");
  }

  // 2. Tabla del Proveedor
  const tableEl = document.getElementById("provider-requests-table");
  if (tableEl) {
    tableEl.innerHTML = bookingsData.map((b, idx) => {
      let badgeClass = "badge-pending";
      if (b.status === "Confirmada") badgeClass = "badge-confirmed";
      if (b.status === "Completada") badgeClass = "badge-completed";
      if (b.status === "Cancelada") badgeClass = "badge-cancelled";

      return `
        <tr>
          <td>
            <div class="table-code">${b.code}</div>
            <div class="table-datetime">${b.date} · ${b.time}</div>
          </td>
          <td>
            <div class="table-pet-name">${b.pet}</div>
            <div class="table-pet-note">📋 Nota: ${b.note}</div>
          </td>
          <td>
            <div class="table-service-name">${b.service}</div>
            <div class="table-service-price">${formatCOP(b.price)}</div>
          </td>
          <td>
            <span class="status-badge ${badgeClass}">${b.status}</span>
          </td>
          <td class="table-action-cell">
            ${b.status === "Pendiente" ? `
              <button onclick="approveProviderBooking(${idx})" class="btn-approve-booking">
                ✔ Confirmar turno
              </button>
            ` : `<span class="table-status-managed">Gestionado</span>`}
          </td>
        </tr>
      `;
    }).join("");
  }

  // 3. Indicadores Operativos (KPIs)
  const activeBookings = bookingsData.filter(b => b.status !== "Cancelada");
  const pendingCount = bookingsData.filter(b => b.status === "Pendiente").length;
  const totalRev = activeBookings.reduce((acc, item) => acc + item.price, 0);

  const kpiTotal = document.getElementById("kpi-total");
  const kpiPending = document.getElementById("kpi-pending");
  const kpiRevenue = document.getElementById("kpi-revenue");

  if (kpiTotal) kpiTotal.textContent = `${bookingsData.length} Reservas`;
  if (kpiPending) kpiPending.textContent = `${pendingCount} Pendiente(s)`;
  if (kpiRevenue) kpiRevenue.textContent = formatCOP(totalRev);
}

// Inicialización reactiva
window.addEventListener("DOMContentLoaded", () => {
  // Llenar selector de mascotas en el wizard
  const bookPetSelect = document.getElementById("book-pet");
  if (bookPetSelect) {
    bookPetSelect.innerHTML = petsData.map(pet => `
      <option value="${pet.emoji} ${pet.name} (${pet.breed.split('·')[1] || pet.breed})">${pet.emoji} ${pet.name} — ${pet.size}</option>
    `).join("");
  }

  // Leer parámetros URL (?provider=X y ?sub=...)
  const params = new URLSearchParams(window.location.search);
  const provParam = params.get("provider");
  if (provParam !== null) {
    const provSelect = document.getElementById("book-provider");
    if (provSelect) provSelect.value = provParam;
  }

  updateBookingProvider();
  renderBookingsAndProviderPanel();

  const subParam = params.get("sub");
  if (subParam === "provider") {
    switchSubReport("sub-provider");
  } else if (subParam === "mybookings") {
    switchSubReport("sub-mybookings");
  }
});

