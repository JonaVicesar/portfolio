// smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// descarga del cv
document.getElementById("download-cv").addEventListener("click", function (e) {
  e.preventDefault();
  
  const link = document.createElement("a");
  link.href = "assets/cv/Jonathan Vicesar.pdf"; 
  link.download = "Jonathan_Vicesar_CV.pdf";
  link.click();
});

// actualizar el nav activo al hacer scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

function updateActiveNav() {
  const scrollPos = window.scrollY + 100;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach((link) => {
        link.style.color =
          link.getAttribute("href") === `#${id}` ? "#2d3748" : "#718096";
      });
    }
  });
}

window.addEventListener("scroll", updateActiveNav);

// dark Mode
function initTheme() {
  const theme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeIcon(theme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const toggle = document.getElementById('theme-toggle');
  toggle.textContent = theme === 'dark' ? '☀️' : '🌛';
}

// Proyectos
const projectData = {
  rgtraslados: {
    title: "RgTraslados",
    type: "Sitio web empresarial • Argentina",
    description: "Desarrollo completo de sitio web para empresa de remises, enfocado en conversión y experiencia de usuario optimizada.",
    features: [
      "Diseño responsivo y moderno",
      "Optimización para velocidad de carga",
      "Formulario de contacto funcional",
      "Sección de servicios detallada",
      "Información de contacto y ubicación"
    ],
    tech: ["Astro", "JavaScript", "CSS", "Diseño Responsivo"]
  },
  carpinteria: {
    title: "Carpintería Los González",
    type: "Web App con Panel Admin • Paraguay",
    description: "Aplicación web completa con sistema de gestión de contenido, permitiendo al cliente actualizar productos y servicios de forma autónoma.",
    features: [
      "Panel de administración intuitivo",
      "Gestión de productos y servicios",
      "Base de datos en tiempo real",
      "Interfaz pública optimizada",
      "Sistema de autenticación seguro"
    ],
    tech: ["React", "Supabase", "JavaScript", "CSS Modules"]
  },
  quimica: {
    title: "Página de Química",
    type: "Sitio educativo interactivo",
    description: "Plataforma educativa especializada en química, diseñada para facilitar el aprendizaje mediante ejercicios interactivos y visualizaciones.",
    features: [
      "Ejercicios interactivos personalizados",
      "Visualizaciones de conceptos químicos",
      "Sistema de práctica progresiva",
      "Interfaz amigable para estudiantes",
      "Recursos educativos organizados"
    ],
    tech: ["HTML/CSS", "JavaScript", "Diseño UX", "Educación Digital"]
  }
};

// modal
function openProjectModal(projectId) {
  const project = projectData[projectId];
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  
  modalBody.innerHTML = `
    <div class="modal-project">
      <h3>${project.title}</h3>
      <p class="project-type">${project.type}</p>
      <p>${project.description}</p>
      
      <div class="modal-features">
        <h4>Características principales:</h4>
        <ul>
          ${project.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
      </div>
      
      <div class="modal-tech">
        ${project.tech.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
      </div>
    </div>
  `;
  
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  initTheme();
  
  // Theme toggle
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
  
  document.getElementById('project-modal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeProjectModal();
    }
  });
  
  // cerrar modal con esc
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeProjectModal();
    }
  });
});
