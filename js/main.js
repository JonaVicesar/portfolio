//cargar el archivo json de proyectos
let projectData = null;
async function loadProjects() {
  try {
    const response = await fetch("assets/projects/projects.json");
    projectData = await response.json();
  } catch (error) {
    console.log(error);
  }
}

// estado del filtro activo
let activeFilter = "all";

//detectar el idioma del usuario
let userLanguage = navigator.language.slice(0, 2);

// event listeners unificados
document.addEventListener("DOMContentLoaded", async function () {
  await loadProjects();
  setLanguage(userLanguage);
  initTheme();

  // Theme toggle
  document
    .getElementById("theme-toggle")
    .addEventListener("click", toggleTheme);

  document
    .getElementById("project-modal")
    .addEventListener("click", function (e) {
      if (e.target === this) {
        closeProjectModal();
      }
    });

  // cerrar modal con esc
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeProjectModal();
    }
  });

  // filtros de proyectos
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      activeFilter = this.getAttribute("data-filter");
      renderProjects(userLanguage);
    });
  });
});

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
  const lang = userLanguage === "en" ? "en" : "es";
  const link = document.createElement("a");
  link.href = `assets/cv/Jonathan_Vicesar_CV_Portfolio_${lang.toUpperCase()}.pdf`;
  link.download = `Jonathan_Vicesar_CV_${lang.toUpperCase()}.pdf`;
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
  const theme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", theme);
  updateThemeIcon(theme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const toggle = document.getElementById("theme-toggle");
  toggle.textContent = theme === "dark" ? "☀️" : "🌛";
}

function renderProjects(lang) {
  const projectsContainer = document.querySelector(".projects");
  const allProjects = projectData[lang];

  // filtrar según categoría activa
  const projects =
    activeFilter === "all"
      ? allProjects
      : allProjects.filter((p) => p.category === activeFilter);

  const details = texts[lang].projects.detailsBtn;
  const visit = texts[lang].projects.visitBtn;

  // limpiar cards existentes
  document.querySelectorAll(".project").forEach((p) => p.remove());

  projects.forEach((project, index) => {
    // índice real en el array original (necesario para el modal)
    const realIndex = allProjects.indexOf(project);

    // imagen o emoji placeholder
    const imageHTML = project.coverImage
      ? `<img src="${project.coverImage}" alt="${project.title}" class="project-image" loading="lazy">`
      : `<div class="project-image-placeholder">${project.coverEmoji || "🗂️"}</div>`;

    // links extra para proyectos personales (GitHub, npm)
    const extraLinks = [
      project.githubUrl
        ? `<a href="${project.githubUrl}" target="_blank" rel="noopener" class="project-link-github"><i class="fab fa-github"></i> GitHub</a>`
        : "",
      project.npmUrl
        ? `<a href="${project.npmUrl}" target="_blank" rel="noopener" class="project-link-npm"><i class="fab fa-npm"></i> npm</a>`
        : "",
    ]
      .filter(Boolean)
      .join("");

    const primaryLink =
      project.visitUrl && project.visitUrl !== "#"
        ? `<a href="${project.visitUrl}" target="_blank">${visit}</a>`
        : project.category === "personal"
        ? "" // sin "proyecto privado" para personales sin demo
        : `<span class="disabled">${texts[lang].projects.privateProject}</span>`;

    const projectHTML = `
      <div class="project">
        ${imageHTML}
        <div class="project-content">
          <div>
            <h3>${project.title}</h3>
            <p class="project-type">${project.type}</p>
            <p>${project.description}</p>
          </div>
          <div>
            <div class="project-links">
              ${primaryLink}
              ${extraLinks}
              <a href="javascript:void(0)" class="details" onclick="openProjectModal(${realIndex})">${details}</a>
            </div>
            <div class="project-tech">
              ${project.tech.map((tech) => `<span class="tech-badge">${tech}</span>`).join("")}
            </div>
          </div>
        </div>
      </div>
    `;
    projectsContainer.insertAdjacentHTML("beforeend", projectHTML);
  });
}

// textos para cada lenguaje
const texts = {
  es: {
    nav: {
      about: "Sobre mí",
      projects: "Proyectos",
    },
    hero: {
      greeting: "Hola, soy Jonathan",
      subtitle: "Software Developer & Estudiante de Ingenieria Informatica",
      description:
        "Desarrollo software desde los 18. A los 21 ya tengo sistemas en producción para negocios reales — desde catálogos digitales con pedidos por WhatsApp hasta paneles de administración completos. Me muevo cómodo en el stack completo y me importa que las cosas funcionen bien para quien las usa, no solo que compilen.",
      emailBtn: "Email",
      cvBtn: "Descargar CV",
    },
    about: {
      techTitle: "Tecnologías que uso",
    },
    projects: {
      title: "Proyectos destacados",
      visitBtn: "Visitar",
      detailsBtn: "Ver detalles ->",
      modalFeatures: "Características principales",
      privateProject: "Proyecto privado",
      filters: {
        all: "Todos",
        client: "Clientes",
        personal: "Open Source / Personal",
      },
    },
    footer: {
      contactTitle: "Contacto",
      available: "Disponible para proyectos",
      followTitle: "Sígueme",
      madeWith: "Hecho con ❤️ y mucho mate🧉.",
    },
  },
  en: {
    nav: {
      about: "About",
      projects: "Projects",
    },
    hero: {
      greeting: "Hi, I'm Jona Vicesar",
      subtitle: "Software Developer & Computer Science Student",
      description:
        "I've been building software since I was 18. At 21, I already have systems running in production for real businesses — from digital catalogs with WhatsApp ordering to full admin panels. I'm comfortable across the full stack, and I care about things working well for the people using them, not just compiling.",
      emailBtn: "Email",
      cvBtn: "Download CV",
    },
    about: {
      techTitle: "Technologies I use",
    },
    projects: {
      title: "Featured Projects",
      visitBtn: "Visit",
      detailsBtn: "View details ->",
      modalFeatures: "Key features",
      privateProject: "Private project",
      filters: {
        all: "All",
        client: "Clients",
        personal: "Open Source / Personal",
      },
    },
    footer: {
      contactTitle: "Contact",
      available: "Available for projects",
      followTitle: "Follow me",
      madeWith: "Made with ❤️ and lots of mate🧉.",
    },
  },
};

// cambiar el idioma
function setLanguage(lang) {
  userLanguage = lang;
  let text = texts[lang];

  // navbar
  document.querySelector('a[href="#about"]').textContent = text.nav.about;
  document.querySelector('a[href="#projects"]').textContent = text.nav.projects;

  // hero
  document.querySelector(".hero h1").textContent = text.hero.greeting;
  document.querySelector(".hero .subtitle").textContent = text.hero.subtitle;
  document.querySelector(".hero .description").textContent = text.hero.description;
  document.querySelector(".hero .btn.btn-primary").textContent = text.hero.emailBtn;
  document.querySelector(".hero .btn.btn-secondary").textContent = text.hero.cvBtn;

  // about
  document.querySelector(".about h3").textContent = text.about.techTitle;

  // proyectos título
  document.querySelector(".projects h2").textContent = text.projects.title;

  // filtros — actualizar texto de los botones
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((btn) => {
    const key = btn.getAttribute("data-filter");
    if (text.projects.filters[key]) {
      btn.textContent = text.projects.filters[key];
      if (btn.classList.contains("active")) {
        // mantener active
      }
    }
  });

  // footer
  document.querySelector(".footer-content h3").textContent = text.footer.contactTitle;
  document.querySelector(".footer-content .available").textContent = text.footer.available;
  document.querySelector(".footer-right h3").textContent = text.footer.followTitle;
  document.querySelector(".footer-bottom").textContent = text.footer.madeWith;

  renderProjects(lang);
}

// cambiar el idioma con los botones
document.querySelectorAll(".lang-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const lang = this.getAttribute("data-lang");
    setLanguage(lang);
  });
});

// modal
function openProjectModal(realIndex) {
  const lang = userLanguage;
  const project = projectData[lang][realIndex];
  const modalFeaturesTitle = texts[lang].projects.modalFeatures;

  const modal = document.getElementById("project-modal");
  const modalBody = document.getElementById("modal-body");

  const imagesHTML =
    project.images && project.images.length > 0
      ? `<div class="modal-images">
         ${project.images
           .map(
             (img) => `<img 
               src="${img}" 
               alt="${project.title}" 
               loading="lazy"
               onclick="openLightbox('${img}', ${JSON.stringify(project.images).replace(/"/g, "'")})"
               style="cursor: pointer;"
             >`
           )
           .join("")}
       </div>`
      : "";

  // links extra para proyectos personales
  const extraLinksHTML = [
    project.githubUrl
      ? `<a href="${project.githubUrl}" target="_blank" rel="noopener" class="modal-extra-link"><i class="fab fa-github"></i> GitHub</a>`
      : "",
    project.npmUrl
      ? `<a href="${project.npmUrl}" target="_blank" rel="noopener" class="modal-extra-link modal-extra-link--npm"><i class="fab fa-npm"></i> npm</a>`
      : "",
    project.visitUrl && project.visitUrl !== "#"
      ? `<a href="${project.visitUrl}" target="_blank" rel="noopener" class="modal-extra-link modal-extra-link--demo"><i class="fas fa-external-link-alt"></i> ${texts[lang].projects.visitBtn}</a>`
      : "",
  ]
    .filter(Boolean)
    .join("");

  const extraLinksSection =
    extraLinksHTML
      ? `<div class="modal-extra-links">${extraLinksHTML}</div>`
      : "";

  modalBody.innerHTML = `
    <div class="modal-project">
      <h3>${project.title}</h3>
      <p class="project-type">${project.type}</p>
      <p>${project.description}</p>
      
      ${extraLinksSection}
      ${imagesHTML}
      
      <div class="modal-features">
        <h4>${modalFeaturesTitle}</h4>
        <ul>
          ${project.features.map((feature) => `<li>${feature}</li>`).join("")}
        </ul>
      </div>
      
      <div class="modal-tech">
        ${project.tech.map((tech) => `<span class="tech-badge">${tech}</span>`).join("")}
      </div>
    </div>
  `;

  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  const modal = document.getElementById("project-modal");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// lightbox
let currentImageIndex = 0;
let currentImages = [];

function openLightbox(imageUrl, allImages) {
  currentImages = allImages;
  currentImageIndex = allImages.indexOf(imageUrl);

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  lightboxImg.src = imageUrl;
  lightbox.style.display = "flex";
  document.body.style.overflow = "hidden";

  updateImageCounter();
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.style.display = "none";
  document.body.style.overflow = "auto";
}

function previousImage() {
  currentImageIndex =
    (currentImageIndex - 1 + currentImages.length) % currentImages.length;
  document.getElementById("lightbox-img").src = currentImages[currentImageIndex];
  updateImageCounter();
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % currentImages.length;
  document.getElementById("lightbox-img").src = currentImages[currentImageIndex];
  updateImageCounter();
}

function updateImageCounter() {
  const counter = document.getElementById("image-counter");
  counter.textContent = `${currentImageIndex + 1} / ${currentImages.length}`;
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("lightbox")?.addEventListener("click", function (e) {
    if (e.target === this) closeLightbox();
  });

  document.getElementById("lightbox-close")?.addEventListener("click", closeLightbox);
  document.getElementById("lightbox-prev")?.addEventListener("click", previousImage);
  document.getElementById("lightbox-next")?.addEventListener("click", nextImage);

  document.addEventListener("keydown", function (e) {
    const lightbox = document.getElementById("lightbox");
    if (lightbox && lightbox.style.display === "flex") {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") previousImage();
      if (e.key === "ArrowRight") nextImage();
    }
  });
});