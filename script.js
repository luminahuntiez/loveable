const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

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

let ticking = false;
function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
});

const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        if (!name || !email || !message) {
            alert('Vänligen fyll i alla fält.');
            return;
        }
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Skickar...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Tack för ditt meddelande! Jag kommer att kontakta dig snart.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #3b82f6;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    }, 100);
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.portfolio-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    document.querySelectorAll('.experience-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    document.querySelectorAll('.interest-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});

function toggleFullscreen() {
    const iframe = document.querySelector('.card-iframe iframe');
    const card = document.querySelector('.portfolio-card.featured');
    
    if (!document.fullscreenElement) {
        if (card.requestFullscreen) {
            card.requestFullscreen();
        } else if (card.webkitRequestFullscreen) {
            card.webkitRequestFullscreen();
        } else if (card.msRequestFullscreen) {
            card.msRequestFullscreen();
        }
        
        iframe.style.transform = 'scale(1)';
        iframe.style.width = '100%';
        iframe.style.height = '100vh';
        
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        
        iframe.style.transform = 'scale(0.9)';
        iframe.style.width = '111%';
        iframe.style.height = '889px';
    }
}

document.addEventListener('fullscreenchange', function() {
    const iframe = document.querySelector('.card-iframe iframe');
    if (!document.fullscreenElement) {
        iframe.style.transform = 'scale(0.9)';
        iframe.style.width = '111%';
        iframe.style.height = '889px';
    }
});

let currentLanguage = 'en';

function switchLanguage(lang) {
    currentLanguage = lang;
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`lang-${lang}`).classList.add('active');
    
    document.querySelectorAll('[data-en][data-sv]').forEach(element => {
        const enText = element.getAttribute('data-en');
        const svText = element.getAttribute('data-sv');
        
        const hasHTML = enText.includes('<') || svText.includes('<');
        
        if (hasHTML) {
            if (lang === 'en') {
                element.innerHTML = enText;
            } else {
                element.innerHTML = svText;
            }
        } else {
            if (lang === 'en') {
                element.textContent = enText;
            } else {
                element.textContent = svText;
            }
        }
    });
    
    localStorage.setItem('preferredLanguage', lang);
}

document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    switchLanguage(savedLanguage);
});