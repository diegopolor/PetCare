/**
 * PetCare — Gestión de Información (Mascotas y Perfil)
 * Lógica nativa de registro de mascotas, fichas comportamentales y renderizado reactivo
 * 100% libre de estilos en línea
 */

let petsData = [
  {
    id: 1,
    name: "Luna",
    emoji: "🐶",
    breed: "Perro · Golden Retriever · 3 años",
    size: "Grande (28 kg)",
    status: "Vacunas al día",
    notes: "Sociable con otros animales, pero se pone nerviosa con el ruido fuerte del secador."
  },
  {
    id: 2,
    name: "Milo",
    emoji: "🐱",
    breed: "Gato · Doméstico Pelo Corto · 2 años",
    size: "Pequeño (4.2 kg)",
    status: "Control al día",
    notes: "Tímido con personas desconocidas durante los primeros minutos de consulta."
  }
];

// Renderizar tarjetas de mascotas en la interfaz
function renderPets() {
  const container = document.getElementById("pets-list-container");
  if (!container) return;

  container.innerHTML = petsData.map(pet => `
    <div class="pet-card">
      <div>
        <div class="pet-card-header">
          <div class="pet-card-icon">${pet.emoji}</div>
          <span class="pet-badge-status">✔ ${pet.status}</span>
        </div>
        <h4 class="pet-name">${pet.name}</h4>
        <p class="pet-meta">${pet.breed} · ${pet.size}</p>

        <div class="pet-notes-box">
          <strong class="pet-notes-title">📋 Ficha visible para el proveedor:</strong>
          "${pet.notes}"
        </div>
      </div>

      <div class="pet-card-footer">
        <span class="pet-id-tag">ID Mascota #0${pet.id}</span>
        <a href="../bookings/bookings.html" class="link-btn">
          📅 Agendarle cita →
        </a>
      </div>
    </div>
  `).join("");
}

// Alternar visibilidad del formulario de nueva mascota
function toggleNewPetForm() {
  const formBox = document.getElementById("new-pet-form-box");
  if (formBox) {
    formBox.classList.toggle("hidden");
  }
}

// Registrar nueva mascota y actualizar la vista
function addNewPet(e) {
  e.preventDefault();
  const name = document.getElementById("pet-name").value;
  const breed = document.getElementById("pet-breed").value;
  const size = document.getElementById("pet-size").value;
  const notes = document.getElementById("pet-notes").value;

  petsData.push({
    id: petsData.length + 1,
    name,
    emoji: breed.toLowerCase().includes("gat") ? "🐱" : "🐕",
    breed,
    size,
    status: "Ficha activa",
    notes
  });

  document.getElementById("pet-name").value = "";
  document.getElementById("pet-breed").value = "";
  document.getElementById("pet-notes").value = "";
  toggleNewPetForm();
  renderPets();
}

// Inicialización reactiva
window.addEventListener("DOMContentLoaded", () => {
  renderPets();
});

