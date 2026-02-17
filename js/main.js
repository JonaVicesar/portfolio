//cargar el archivo json de proyectos
let projectData = null;
async function loadProjects() {
  try {
    const response = await fetch("assets/projects/projects.json");
    console.log("dddd", response);
    projectData = await response.json();
  } catch (error) {
    console.log(error);
  }
}
//detectar el idioma del usuario
let userLanguage = navigator.language.slice(0, 2); //ahora solo obtener las dos primeras letras ("en" no en-US )
console.log('lenguaje', userLanguage)

console.log('funciona', document.querySelector('a[href="#about"]').textContent)

// event listeners unificados
document.addEventListener("DOMContentLoaded", async function () {
  await loadProjects();
  console.log("aca es", projectData);
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
      ``;
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
  const projects = projectData[lang];

  const details = texts[lang].projects.detailsBtn;
  const visit = texts[lang].projects.visitBtn;

  const actualProjects = document.querySelectorAll(".project");
  let cont = 0;

  actualProjects.forEach((project) => project.remove());

  projects.forEach((project) => {
    const projectHTML = `
      <div class="project">
        <img src="${project.coverImage}" alt="${
      project.title
    }" class="project-image" loading="lazy">
        <div class="project-content">
          <h3>${project.title}</h3>
          <p class="project-type">${project.type}</p>
          <p>${project.description}</p>
         <div class="project-links">
  ${
    project.visitUrl && project.visitUrl !== "#"
      ? `<a href="${project.visitUrl}" target="_blank">${visit}</a>`
      : `<span class="disabled">${texts[lang].projects.privateProject}</span>`
  }
  <a href="javascript:void(0)" class="details" onclick="openProjectModal('${cont}')"> ${details} </a>
</div>
          <div class="project-tech">
            ${project.tech
              .map((tech) => `<span class="tech-badge">${tech}</span>`)
              .join("")}
          </div>
        </div>
      </div>
    `;
    projectsContainer.insertAdjacentHTML("beforeend", projectHTML);
    cont += 1;
  });
}
// textos para cada lenguaje
const texts = {
  es: {
    nav: {
      logo: "Jona Vicesar",
      about: "Sobre mí",
      projects: "Proyectos",
    },
    hero: {
      greeting: "Hola, soy Jonathan",
      subtitle: "Software Developer & Estudiante de Ingenieria Informatica",
      description:
        "Me apasiona crear soluciones simples, útiles y bien pensadas. Tengo experiencia en desarrollo web, apps móviles y automatización, y disfruto convertir ideas en productos funcionales.",
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
    },
    footer: {
      contactTitle: "Contacto",
      location: "Paraguay",
      available: "Disponible para proyectos",
      followTitle: "Sígueme",
      madeWith: "Hecho con ❤️ y mucho mate🧉.",
    },
  },
  en: {
    nav: {
      logo: "Jonathan",
      about: "About",
      projects: "Projects",
    },
    hero: {
      greeting: "Hi, I'm Jona Vicesar",
      subtitle: "Software Developer & Computer Science Student",
      description:
        "I'm passionate about creating simple, useful and well-thought solutions. I have experience in web development, mobile apps and automation, and I enjoy turning ideas into functional products.",
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
    },
    footer: {
      contactTitle: "Contact",
      location: "Paraguay",
      available: "Available for projects",
      followTitle: "Follow me",
      madeWith: "Made with ❤️ and lots of mate🧉.",
    },
  },
};

//funcion para cambiar el idoma
function setLanguage(lang) {
  userLanguage = lang; 
  console.log('ACA', texts[lang])
  let text = texts[lang];
  
  const about = document.querySelector(
    ".footer-content .available"
  ).textContent;
  console.log('aboutt',about);

  //navbar
  document.querySelector('a[href="#about"]').textContent = text.nav.about;
  document.querySelector('a[href="#projects"]').textContent = text.nav.projects;

  //hero
  document.querySelector(".hero h1").textContent = text.hero.greeting;
  document.querySelector(".hero .subtitle").textContent = text.hero.subtitle;
  document.querySelector(".hero .description").textContent =
    text.hero.description;
  document.querySelector(".hero .btn.btn-primary").textContent =
    text.hero.emailBtn;
  document.querySelector(".hero .btn.btn-secondary").textContent =
    text.hero.cvBtn;

  //about
  document.querySelector(".about h3").textContent = text.about.techTitle;

  //proyectos
  document.querySelector(".projects h2").textContent = text.projects.title;

  //footer
  document.querySelector(".footer-content h3").textContent =
    text.footer.contactTitle;
  document.querySelector(".footer-content .available").textContent =
    text.footer.available;
  document.querySelector(".footer-right h3").textContent =
    text.footer.followTitle;
  document.querySelector(".footer-bottom").textContent = text.footer.madeWith;

  renderProjects(lang);
}

//cambiar el idioma con los botones
document.querySelectorAll(".lang-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const lang = this.getAttribute("data-lang");
    setLanguage(lang);
  });
});

// modal
function openProjectModal(position) {
  const lang = userLanguage;
  const project = projectData[userLanguage][position];
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
               onclick="openLightbox('${img}', ${JSON.stringify(
               project.images
             ).replace(/"/g, "'")})"
               style="cursor: pointer;"
             >`
           )
           .join("")}
       </div>`
      : "";

  modalBody.innerHTML = `
    <div class="modal-project">
      <h3>${project.title}</h3>
      <p class="project-type">${project.type}</p>
      <p>${project.description}</p>
      
      ${imagesHTML}
      
      <div class="modal-features">
        <h4>${modalFeaturesTitle}</h4>
        <ul>
          ${project.features.map((feature) => `<li>${feature}</li>`).join("")}
        </ul>
      </div>
      
      <div class="modal-tech">
        ${project.tech
          .map((tech) => `<span class="tech-badge">${tech}</span>`)
          .join("")}
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
  document.getElementById("lightbox-img").src =
    currentImages[currentImageIndex];
  updateImageCounter();
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % currentImages.length;
  document.getElementById("lightbox-img").src =
    currentImages[currentImageIndex];
  updateImageCounter();
}

function updateImageCounter() {
  const counter = document.getElementById("image-counter");
  counter.textContent = `${currentImageIndex + 1} / ${currentImages.length}`;
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("lightbox")?.addEventListener("click", function (e) {
    if (e.target === this) {
      closeLightbox();
    }
  });

  document
    .getElementById("lightbox-close")
    ?.addEventListener("click", closeLightbox);
  document
    .getElementById("lightbox-prev")
    ?.addEventListener("click", previousImage);
  document
    .getElementById("lightbox-next")
    ?.addEventListener("click", nextImage);
  document.addEventListener("keydown", function (e) {
    const lightbox = document.getElementById("lightbox");
    if (lightbox && lightbox.style.display === "flex") {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") previousImage();
      if (e.key === "ArrowRight") nextImage();
    }
  });
});