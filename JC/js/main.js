// ========================================
// MODERN PORTFOLIO - JAVASCRIPT
// ========================================

// Project Data
const projects = [
    {
        nome_proje: 'Pesquisador de Perfil do GitHub',
        imagem: 'img/perfilGitHub.PNG',
        descri: 'Projeto feito em HTML, CSS e JavaScript que visa buscar perfis existentes no GitHub. Desenvolvido para praticar API do GitHub.',
        link: 'https://kevin9227.github.io/Repo_lesson/perfilGitHub/'
    },
    {
        nome_proje: 'Bloco de Anotações',
        imagem: 'img/Notas.PNG',
        descri: 'Projeto feito em HTML, CSS e JavaScript, que visou o estudo da função "localStorage" com fins de praticar.',
        link: 'https://kevin9227.github.io/Repo_lesson/Notas/'
    },
    {
        nome_proje: 'Pokémon Web',
        imagem: 'img/pokemon.PNG',
        descri: 'Website que lista os Pokémon disponíveis na API. Desenvolvido com HTML, CSS e JavaScript.',
        link: 'https://kevin9227.github.io/Repo_lesson/pokemon/'
    },
    {
        nome_proje: 'Desaparecidos S.O.S',
        imagem: 'img/desaparecidos.PNG',
        descri: 'Plataforma web para relatar desaparecimentos a nível nacional. Desenvolvido com HTML, CSS e JavaScript.',
        link: 'https://kevin9227.github.io/Repo_lesson/desaparecidos/'
    },
    {
        nome_proje: 'Posto de Venda POS',
        imagem: 'img/POS.JPG',
        descri: 'Sistema de venda open source desenvolvido para pequenas empresas. Desenvolvido em FOXPRO9.',
        link: 'https://github.com/Kevin9227/M_FOXPRO/tree/main/Sistem_POS'
    },
    {
        nome_proje: 'Gerenciador de VOOS - FLYAO',
        imagem: 'img/flyao.jpg',
        descri: 'Sistema desenvolvido para gerenciamento de voos de uma companhia aérea de Angola.',
        link: 'http://hendasoft.42web.io/Projecto_FlyAO'
    },
    {
        nome_proje: 'Reprodutor de Música',
        imagem: 'img/reprodutor.jpg',
        descri: 'Reprodutor de música desenvolvido para reproduzir arquivos em formato MP3.',
        link: 'https://kevin9227.github.io/Repo_lesson/PlaySound/'
    }
];

// ========================================
// DOM ELEMENTS
// ========================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const typingText = document.getElementById('typing-text');
const projectsGrid = document.getElementById('projects-grid');
const contactForm = document.getElementById('contact-form');

// ========================================
// TYPING ANIMATION
// ========================================
function typeWriter() {
    const text = 'Joaquim de Campos';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            typingText.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }
    
    type();
}

// ========================================
// NAVIGATION
// ========================================
// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active link on scroll
function setActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// ========================================
// PROJECTS
// ========================================
function loadProjects() {
    projectsGrid.innerHTML = '';
    
    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.style.animationDelay = `${index * 0.1}s`;
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.imagem}" alt="${project.nome_proje}" loading="lazy">
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.nome_proje}</h3>
                <p class="project-description">${project.descri}</p>
                <a href="${project.link}" target="_blank" class="project-link">
                    Ver Projeto
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// ========================================
// CONTACT FORM
// ========================================
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Create mailto link
    const subject = encodeURIComponent('Contato do Portfolio');
    const body = encodeURIComponent(
        `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`
    );
    
    window.location.href = `mailto:joaquimdecampos@outlook.com?subject=${subject}&body=${body}`;
    
    // Reset form
    contactForm.reset();
});

// ========================================
// INTERSECTION OBSERVER (Scroll Animations)
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
});

// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// INITIALIZE
// ========================================
window.addEventListener('DOMContentLoaded', () => {
    typeWriter();
    loadProjects();
    setActiveLink();
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
// Lazy load images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Debounce scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    setActiveLink();
}));
