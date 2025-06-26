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
  link.href = "Jonathan_Vicesar_CV.pdf";
  link.download = "Jonathan_Vicesar_CV.pdf";
  link.click();
});

// link al blog
document.getElementById("blog-link").addEventListener("click", function (e) {
  e.preventDefault();
  
  window.open('https://blog.jonathanvicesar.com', '_blank');//todavia no tengo blog, pero proximante ^_-
  alert("Blog próximamente disponible");
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
