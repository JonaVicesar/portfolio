gsap.registerPlugin(ScrollTrigger);

// Animaciones del hero
gsap.from('.hero-text', {
    y: 100,
    opacity: 0,
    duration: 1,
    delay: 0.5
});

gsap.from('.hero-categories .category', {
    y: 50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    delay: 1
});

// Animaciones al scroll
gsap.from('.about-image', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top center',
        toggleActions: 'play none none reverse'
    },
    x: -100,
    opacity: 0,
    duration: 1
});

gsap.from('.about-content', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top center',
        toggleActions: 'play none none reverse'
    },
    x: 100,
    opacity: 0,
    duration: 1
});

// Animación de las tech categories
gsap.from('.tech-category', {
    scrollTrigger: {
        trigger: '.tech-stack',
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2
});

// Filtro de proyectos
const filterButtons = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover clase active de todos los botones
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Agregar clase active al botón clickeado
        button.classList.add('active');

        const filter = button.dataset.filter;

        projects.forEach(project => {
            if (filter === 'all' || project.dataset.category === filter) {
                gsap.to(project, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.3
                });
            } else {
                gsap.to(project, {
                    opacity: 0.3,
                    scale: 0.95,
                    duration: 0.3
                });
            }
        });
    });
});

// Animación de la timeline
gsap.from('.timeline-item', {
    scrollTrigger: {
        trigger: '.education',
        start: 'top center',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.3
});

// Animación del formulario de contacto
gsap.from('.contact-container', {
    scrollTrigger: {
        trigger: '.contact',
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 50,
    duration: 1
});