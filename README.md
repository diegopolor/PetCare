# 🐾 PetCare — Plataforma Web de Servicios para Mascotas

> Aplicación web frontend nativa, moderna y responsive para la exploración, reserva y gestión de servicios especializados para mascotas (veterinarias, peluquerías, paseos y guarderías).

---

## 📋 Descripción del Proyecto

**PetCare** es una solución web desarrollada con tecnologías nativas del estándar web (**HTML5**, **CSS3 puro** y **JavaScript vanilla**). Conecta de manera fluida y transparente a **propietarios de mascotas** con **proveedores de servicios verificados** en Bogotá, eliminando la fricción de coordinar turnos a través de múltiples canales dispersos.

La arquitectura del proyecto está completamente modularizada por responsabilidades y agrupada por páginas, garantizando **cero estilos en línea (`style="..."`)** y total independencia de frameworks o librerías externas (sin Tailwind CSS, Bootstrap ni dependencias de empaquetado).

---

## ✨ Módulos y Funcionalidades

### 1. 🏠 Exploración y Búsqueda de Servicios (`pages/home/`)
- **Buscador interactivo multidimensional:** Filtros combinados por tipo de servicio (peluquería, veterinaria, paseo, guardería), zona/localidad y tarifa máxima.
- **Accesos directos por categoría:** Barra horizontal de filtrado rápido con conteo de resultados en tiempo real.
- **Tarjetas de proveedores verificados:** Información esencial de cada establecimiento (tarifa base en COP, calificación promedio, dirección y descripción).
- **Estado vacío asistido:** Vista guiada para restablecer criterios cuando una búsqueda no arroja resultados en una zona específica.
- **Modal de perfil detallado:** Desglose transparente de servicios con precios y duraciones, horarios de atención, garantía de opiniones verificadas y botón directo de reserva.

### 2. 🔐 Autenticación y Recuperación (`pages/login/`)
- **Conmutador de roles interactivo:** Selección entre perfil *Propietario* y *Proveedor*, adaptando los datos de prueba y la redirección post-inicio de sesión.
- **Control de visibilidad de contraseña:** Alternancia dinámica entre texto plano y oculto.
- **Recuperación de acceso:** Sub-vista integrada para solicitar restablecimiento seguro de clave por correo electrónico.

### 3. ✨ Registro Dinámico de Usuarios (`pages/register/`)
- **Selector de tipo de cuenta:** Interfaz adaptativa que despliega campos exclusivos de negocio (categoría comercial, dirección de sede/cobertura) al elegir perfil *Proveedor*.
- **Medidor dinámico de robustez de contraseña:** Validación en vivo según longitud, presencia de mayúsculas y números con indicador visual de estado (débil, medio, óptimo).
- **Tratamiento de datos:** Aceptación explícita de términos y políticas de tratamiento de datos.

### 4. 🐶 Mis Mascotas y Perfil de Cuenta (`pages/info/`)
- **Fichas comportamentales de mascotas:** Registro detallado de especie, raza, tamaño y observaciones especiales (alergias, rutinas o temperamento frente a secadores/consultas).
- **Formulario interactivo:** Modal desplegable para dar de alta nuevas mascotas y agregarlas instantáneamente al listado.
- **Perfil verificado:** Visualización de datos de contacto y configuración de notificaciones automáticas.

### 5. 📊 Reservas y Panel de Control (`pages/bookings/`)
- **Asistente de reserva en 3 pasos:**
  1. Selección guiada de proveedor y servicio específico.
  2. Elección de fecha en calendario y franja horaria disponible en bloques interactivos.
  3. Selección de la mascota registrada e ingreso de notas personalizadas para la cita.
- **Tarjeta de resumen en tiempo real:** Cálculo reactivo del valor estimado del servicio, proveedor seleccionado, horario y mascota antes de confirmar.
- **Historial "Mis Reservas":** Consulta de citas activas, estados en vivo (*Pendiente*, *Confirmada*, *Completada*, *Cancelada*) y acción de cancelación directa.
- **Panel operativo del proveedor:** Indicadores clave de rendimiento (KPIs: reservas totales, turnos pendientes e ingresos estimados), tabla interactiva para confirmar solicitudes y gestor de disponibilidad horaria por turnos.

---

## 🛠️ Tecnologías Utilizadas

- **HTML5:** Marcado semántico (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, etc.).
- **CSS3 Puro:**
  - Sistema de diseño centralizado con variables personalizadas (`:root`).
  - Maquetación moderna basada en **Flexbox** y **CSS Grid**.
  - Diseño responsive asistido con media queries adaptativas.
  - Cero dependencias de utilidades externas (sin Tailwind ni Bootstrap).
- **JavaScript Vanilla (ES6+):**
  - Manipulación nativa del DOM y eventos reactivos.
  - Gestión de estado local en memoria sin librerías externas.
  - Enrutamiento relativo entre páginas modulares.

---

## 📁 Estructura del Proyecto

```text
petcare/
├── index.html                                 # Enrutador inicial al Panel Principal
├── README.md                                  # Documentación del proyecto
├── assets/
│   ├── css/
│   │   ├── global.css                         # Variables :root, reset, layout y componentes compartidos
│   │   └── responsive.css                     # Reglas de adaptación y breakpoints
│   ├── js/
│   │   └── navigation.js                      # Utilidades de navegación
│   └── images/                                # Recursos gráficos e iconos
└── pages/
    ├── home/                                  # Módulo: Panel Principal
    │   ├── home.html
    │   ├── home.css
    │   └── home.js
    ├── login/                                 # Módulo: Autenticación
    │   ├── login.html
    │   ├── login.css
    │   └── login.js
    ├── register/                              # Módulo: Registro
    │   ├── register.html
    │   ├── register.css
    │   └── register.js
    ├── info/                                  # Módulo: Mascotas y Perfil
    │   ├── info.html
    │   ├── info.css
    │   └── info.js
    └── bookings/                              # Módulo: Reservas y Panel Proveedor
        ├── bookings.html
        ├── bookings.css
        └── bookings.js
```

---

## 🚀 Cómo Ejecutar el Proyecto

El proyecto no requiere ningún proceso de construcción (`build`), compilación previa ni instalación de dependencias `npm`.

### Opción 1: Abrir directamente en el navegador
1. Clona o descarga este repositorio.
2. Abre el archivo `petcare/index.html` en tu navegador favorito (Chrome, Edge, Firefox, Safari).

### Opción 2: Usar un servidor local estático

Con **Python 3**:
```bash
cd petcare
python -m http.server 8000
```
Luego abre `http://localhost:8000` en tu navegador.

Con **Node.js (serve o npx)**:
```bash
cd petcare
npx serve .
```

Con **VS Code / Cursor / Antigravity**:
- Instala la extensión **Live Server** y haz clic derecho en `index.html` $\rightarrow$ *"Open with Live Server"*.

---

## 📌 Principios de Calidad del Código

1. **Separación de responsabilidades:** Cada página agrupa exclusivamente su vista (`.html`), estilos (`.css`) y lógica de interacción (`.js`).
2. **Cero estilos en línea:** Ninguna etiqueta ni elemento inyectado mediante JavaScript hace uso del atributo `style="..."`.
3. **Persistencia y navegación relativa:** Todos los enlaces y llamadas a recursos utilizan rutas relativas funcionales en cualquier entorno de despliegue local o servidor web.

