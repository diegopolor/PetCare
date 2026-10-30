# PetCare — Maquetación y Prototipado Interactivo de la Plataforma Web

> Fase de Maquetación del Taller de Análisis y Diseño de Sistemas. Prototipo navegable del Producto Mínimo Viable (MVP) desarrollado con tecnologías nativas (HTML5, CSS3 puro y JavaScript vanilla) para validar la estructura visual y la experiencia de navegación a partir del diseño en Figma.

---

## 1. Contexto y Alcance del Proyecto

Este repositorio corresponde a la **fase de maquetación inicial** del proyecto tecnológico **PetCare**, desarrollado en el marco del Taller de Diseño y Validación de Prototipos de Software.

El diseño y desarrollo mantienen coherencia con los requisitos funcionales, historias de usuario y el alcance del MVP estructurado en la Actividad 1.

---

## 2. Relación con los Entregables del Taller

El proyecto complementa el documento en formato PDF requerido para la sustentación del prototipo, integrando los siguientes aspectos:

- **Guía de Estilos Visual (UIKit de Figma):** Implementación fiel de la paleta cromática (tonos Brand Teal y acentos Coral), escala tipográfica (Plus Jakarta Sans), radios de borde, sombras y estados de interacción (hover, focus, active, disabled) en botones y campos de formulario.
- **Wireframes y Estructura Visual:** Distribución del contenido organizada mediante Flexbox y CSS Grid, respetando los wireframes de baja y alta fidelidad.
- **Prototipo Interactivo Navegable:** Navegación fluida entre pantallas para validar los User Flows y el Customer Journey Map de propietarios y proveedores.
- **Módulos Principales Maquetados:**
  1. **Login:** Inicio de sesión con selector de perfiles y recuperación de acceso.
  2. **Registro:** Creación de cuenta adaptativa según tipo de usuario (propietario o proveedor) con validación visual de contraseña.
  3. **Panel Principal:** Catálogo de proveedores, buscador con filtros combinados, visualización de tarifas y modal de detalle.
  4. **Gestión de Información:** Administración del perfil de cuenta y fichas de mascotas con notas comportamentales.
  5. **Reportes y Funcionalidades Clave:** Asistente guiado de agendamiento de citas en 3 pasos, historial de reservas y panel de control operativo del proveedor con indicadores y disponibilidad.
- **Validación y Pruebas de Usabilidad:** El prototipo sirve como base para evaluar la experiencia de uso con perfiles reales (dueños de mascotas y negocios del sector veterinario y de cuidado), incorporando mejoras sobre la claridad de las tarifas y la simplicidad de la reserva.

---

## 3. Módulos Desarrollados en el Prototipo

### 3.1. Panel Principal y Exploración (`pages/home/`)
- Buscador con filtros por categoría de servicio, ubicación y tarifa máxima.
- Accesos rápidos por categoría con conteo dinámico de resultados.
- Tarjetas de proveedores verificados con información de contacto, precios base y opiniones.
- Estado vacío asistido cuando un filtro no presenta coincidencias.
- Modal de perfil detallado con listado de tarifas desglosadas y horarios de atención.

### 3.2. Inicio de Sesión y Recuperación (`pages/login/`)
- Selector de rol (Propietario vs. Proveedor) para simular la experiencia de acceso diferenciada.
- Alternancia de visibilidad de contraseñas (mostrar/ocultar).
- Sub-vista integrada para solicitud de recuperación de contraseña por correo.

### 3.3. Registro de Usuarios (`pages/register/`)
- Formulario adaptativo que despliega campos comerciales (categoría de negocio, sede y cobertura) cuando se selecciona perfil proveedor.
- Medidor en tiempo real de la seguridad de la contraseña (longitud, mayúsculas y números).
- Casilla de confirmación de términos de uso y tratamiento de datos.

### 3.4. Mis Mascotas y Perfil (`pages/info/`)
- Fichas individuales con especie, raza, peso y notas de comportamiento o cuidados especiales.
- Formulario interactivo para registrar nuevas mascotas y sumarlas al perfil.
- Vista de datos del titular y estado de cuenta.

### 3.5. Reservas y Panel del Proveedor (`pages/bookings/`)
- Asistente de agendamiento en 3 pasos: selección de proveedor/servicio, fecha y franja horaria disponible, y selección de mascota con observaciones.
- Tarjeta de resumen reactiva que calcula en vivo el valor total y los detalles de la cita.
- Pestaña de historial de citas para el propietario con opción de cancelación.
- Pestaña de panel para el proveedor con indicadores clave (reservas totales, pendientes, ingresos estimados), tabla interactiva de turnos y gestor de disponibilidad horaria.

---

## 4. Tecnologías y Estándares de Maquetación

- **HTML5:** Marcado semántico y accesible sin código innecesario.
- **CSS3 Puro:**
  - Sistema de diseño centralizado con variables globales (`:root`).
  - Maquetación responsiva mediante CSS Grid y Flexbox.
  - Ausencia de frameworks externos (sin dependencias de Tailwind CSS, Bootstrap ni procesadores obligatorios).
- **JavaScript Vanilla (ES6+):** Lógica nativa de interacción, control de vistas modales, conmutadores y simulación del flujo de usuario.
- **Cero Estilos en Línea:** Separación estricta de presentación; no se utiliza el atributo `style="..."` en ninguna etiqueta HTML ni template string.

---

## 5. Estructura de Archivos del Proyecto

El proyecto utiliza una arquitectura modular por página, donde cada módulo agrupa su estructura (`.html`), estilos (`.css`) y lógica (`.js`):

```text
petcare/
├── index.html                                 # Enrutador de entrada al Panel Principal
├── README.md                                  # Documentación del proyecto
├── assets/
│   ├── css/
│   │   ├── global.css                         # Variables :root, reset, layout, formularios y footer
│   │   └── responsive.css                     # Media queries y breakpoints adaptativos
│   ├── js/
│   │   └── navigation.js                      # Utilidades de navegación
│   └── images/                                # Recursos gráficos
└── pages/
    ├── home/                                  # Módulo: Panel Principal
    │   ├── home.html
    │   ├── home.css
    │   └── home.js
    ├── login/                                 # Módulo: Inicio de Sesión
    │   ├── login.html
    │   ├── login.css
    │   └── login.js
    ├── register/                              # Módulo: Registro de Cuenta
    │   ├── register.html
    │   ├── register.css
    │   └── register.js
    ├── info/                                  # Módulo: Mascotas y Perfil
    │   ├── info.html
    │   ├── info.css
    │   └── info.js
    └── bookings/                              # Módulo: Reservas y Gestión
        ├── bookings.html
        ├── bookings.css
        └── bookings.js
```

---

## 6. Instrucciones de Ejecución

Al ser un prototipo web estático nativo, no requiere compilación previa (`npm build`) ni instalación de paquetes.

### Ejecución Directa
Abra el archivo `petcare/index.html` en cualquier navegador web moderno (Google Chrome, Microsoft Edge, Mozilla Firefox o Apple Safari).

### Ejecución con Servidor Local Estático

**Python 3:**
```bash
cd petcare
python -m http.server 8000
```
Acceda a `http://localhost:8000` en su navegador.

**Node.js:**
```bash
cd petcare
npx serve .
```

**Live Server (Visual Studio Code / Antigravity IDE):**
Haga clic derecho sobre `petcare/index.html` y seleccione la opción *Open with Live Server*.
