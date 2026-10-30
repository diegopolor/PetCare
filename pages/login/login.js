/**
 * PetCare — Login y Recuperación de Contraseña
 * Lógica nativa de validación, cambio de rol, simulación de sesión y recuperación
 * 100% libre de estilos en línea
 */

let currentLoginRole = "owner";

// Conmutar entre rol Propietario y Proveedor
function setLoginRole(role) {
  currentLoginRole = role;
  const ownerBtn = document.getElementById("login-role-owner");
  const provBtn = document.getElementById("login-role-provider");
  const emailInput = document.getElementById("login-email");

  if (!ownerBtn || !provBtn || !emailInput) return;

  if (role === "owner") {
    ownerBtn.classList.add("active");
    provBtn.classList.remove("active");
    emailInput.value = "laura.martinez@petcare.co";
  } else {
    provBtn.classList.add("active");
    ownerBtn.classList.remove("active");
    emailInput.value = "carlos.sanfrancisco@petcare.co";
  }
}

// Alternar visibilidad de contraseña
function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;

  if (input.type === "password") {
    input.type = "text";
    btn.textContent = "Ocultar";
  } else {
    input.type = "password";
    btn.textContent = "Mostrar";
  }
}

// Simular error de autenticación
function simulateLoginError() {
  const box = document.getElementById("login-feedback");
  if (!box) return;

  box.className = "alert-box alert-error fade-in";
  box.innerHTML = `<span>⚠️ Credenciales incorrectas: verifica tu correo o contraseña.</span>`;
  box.classList.remove("hidden");
}

// Manejo de envío del formulario de login
function handleLoginSubmit(e) {
  e.preventDefault();
  const box = document.getElementById("login-feedback");
  if (!box) return;

  box.className = "alert-box alert-success fade-in";
  box.classList.remove("hidden");

  if (currentLoginRole === "owner") {
    const nameEl = document.getElementById("active-user-name");
    const roleEl = document.getElementById("active-user-role");
    if (nameEl) nameEl.textContent = "Laura Martínez";
    if (roleEl) roleEl.textContent = "Propietaria · Bogotá";
    box.innerHTML = `<span>✔ ¡Bienvenida Laura! Redirigiendo al Panel Principal...</span>`;
    setTimeout(() => {
      window.location.href = "../home/home.html";
    }, 900);
  } else {
    const nameEl = document.getElementById("active-user-name");
    const roleEl = document.getElementById("active-user-role");
    if (nameEl) nameEl.textContent = "Dr. Carlos Mendoza";
    if (roleEl) roleEl.textContent = "Proveedor · Clínica San Francisco";
    box.innerHTML = `<span>✔ ¡Bienvenido Dr. Carlos! Abriendo tu Panel de Gestión...</span>`;
    setTimeout(() => {
      window.location.href = "../bookings/bookings.html?sub=provider";
    }, 900);
  }
}

// Alternar vista de recuperación de contraseña
function toggleRecoveryView(showRecovery) {
  const formView = document.getElementById("login-form-view");
  const recView = document.getElementById("login-recovery-view");
  if (!formView || !recView) return;

  if (showRecovery) {
    formView.classList.add("hidden");
    recView.classList.remove("hidden");
  } else {
    formView.classList.remove("hidden");
    recView.classList.add("hidden");
  }
}

// Manejo de envío del formulario de recuperación
function handleRecoverySubmit(e) {
  e.preventDefault();
  const fb = document.getElementById("recovery-feedback");
  if (fb) {
    fb.classList.remove("hidden");
  }
}

