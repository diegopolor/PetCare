/**
 * PetCare — Registro de Usuarios
 * Lógica nativa de tipos de cuenta, campos dinámicos y medidor de seguridad
 * 100% libre de estilos en línea
 */

// Alternar entre perfil Propietario y Proveedor en el formulario de registro
function setRegisterType(type) {
  const ownerCard = document.getElementById("reg-card-owner");
  const provCard = document.getElementById("reg-card-provider");
  const provFields = document.getElementById("reg-provider-fields");
  const nameLabel = document.getElementById("reg-name-label");
  const nameInput = document.getElementById("reg-name");

  if (!ownerCard || !provCard || !provFields) return;

  if (type === "owner") {
    ownerCard.classList.add("active");
    provCard.classList.remove("active");
    provFields.classList.add("hidden");
    if (nameLabel) nameLabel.textContent = "Nombre completo del propietario";
    if (nameInput) nameInput.value = "Laura Martínez";
  } else {
    provCard.classList.add("active");
    ownerCard.classList.remove("active");
    provFields.classList.remove("hidden");
    if (nameLabel) nameLabel.textContent = "Nombre comercial del proveedor o profesional";
    if (nameInput) nameInput.value = "Estética Canina & Spa Peluditos";
  }
}

// Medidor dinámico de robustez de contraseña
function checkPasswordStrength(val) {
  const bar = document.getElementById("pass-strength-bar");
  const txt = document.getElementById("pass-strength-text");
  if (!bar || !txt) return;

  const hasLength = val.length >= 8;
  const hasUpper = /[A-Z]/.test(val);
  const hasNumber = /[0-9]/.test(val);
  const score = [hasLength, hasUpper, hasNumber].filter(Boolean).length;

  bar.className = "pass-strength-bar";
  txt.className = "pass-strength-text";

  if (score === 3) {
    bar.classList.add("strength-strong");
    txt.classList.add("pass-strength-text-strong");
    txt.textContent = "✔ Seguridad óptima: 8+ caracteres, mayúscula y número";
  } else if (score === 2) {
    bar.classList.add("strength-medium");
    txt.classList.add("pass-strength-text-medium");
    txt.textContent = "⚠️ Seguridad media: agrega al menos una mayúscula y un número";
  } else {
    bar.classList.add("strength-weak");
    txt.classList.add("pass-strength-text-weak");
    txt.textContent = "✕ Contraseña débil: mínimo 8 caracteres";
  }
}

// Simular validación de correo duplicado en el backend
function simulateDuplicateEmail() {
  const emailInput = document.getElementById("reg-email");
  if (emailInput) emailInput.value = "laura.martinez@petcare.co";
  const fb = document.getElementById("register-feedback");
  if (!fb) return;

  fb.className = "alert-box alert-error fade-in";
  fb.innerHTML = "⚠️ El correo electrónico <strong>laura.martinez@petcare.co</strong> ya se encuentra registrado en PetCare. Puedes iniciar sesión o recuperar tu contraseña.";
  fb.classList.remove("hidden");
}

// Manejo de envío del formulario de registro
function handleRegisterSubmit(e) {
  e.preventDefault();
  const fb = document.getElementById("register-feedback");
  if (!fb) return;

  fb.className = "alert-box alert-success fade-in";
  fb.innerHTML = "🎉 ¡Cuenta creada correctamente! Ahora puedes registrar a tus mascotas o reservar servicios.";
  fb.classList.remove("hidden");
}

