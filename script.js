// Navigation mobile
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Fermer le menu mobile quand on clique sur un lien
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Navigation active
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animation des barres de compétences
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.setProperty('--target-width', width);
                bar.classList.add('animate');
            });
        }
    });
}, observerOptions);

// Observer les sections de compétences
document.addEventListener('DOMContentLoaded', () => {
    const competencesSection = document.querySelector('.competences');
    if (competencesSection) {
        skillObserver.observe(competencesSection);
    }
});

// Formulaire CV
const cvForm = document.getElementById('cvForm');

if (cvForm) {
    cvForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Récupérer les données du formulaire
    const formData = new FormData(cvForm);
    const data = {
        nom: formData.get('nom'),
        prenom: formData.get('prenom'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    // Validation
    if (!data.nom || !data.prenom || !data.email) {
        showNotification(notificationMessages[currentLanguage].required, 'error');
        return;
    }
    
    if (!isValidEmail(data.email)) {
        showNotification(notificationMessages[currentLanguage].email, 'error');
        return;
    }
    
    // Simuler l'envoi (remplacer par votre logique d'envoi)
    showNotification(notificationMessages[currentLanguage].processing, 'info');
    
    setTimeout(() => {
        // Simuler le téléchargement du CV
        downloadCV();
        showNotification(notificationMessages[currentLanguage].success, 'success');
        cvForm.reset();
    }, 2000);
    });
}

// Validation email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Téléchargement du CV
function downloadCV() {
    // Créer un lien de téléchargement vers le vrai CV
    const link = document.createElement('a');
    link.href = 'CV_Beysson_Adrien.pdf';
    link.download = 'CV_Beysson_Adrien.pdf';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Messages de notification traduits
const notificationMessages = {
    fr: {
        required: 'Veuillez remplir tous les champs obligatoires.',
        email: 'Veuillez entrer une adresse email valide.',
        processing: 'Traitement en cours...',
        success: 'CV téléchargé avec succès !'
    },
    en: {
        required: 'Please fill in all required fields.',
        email: 'Please enter a valid email address.',
        processing: 'Processing...',
        success: 'CV downloaded successfully!'
    }
};

// Fonction pour mettre à jour les messages de notification
function updateNotificationMessages(lang) {
    // Cette fonction sera utilisée pour mettre à jour les messages en temps réel
    // si nécessaire dans le futur
}

// Système de notifications
function showNotification(message, type = 'info') {
    // Supprimer les notifications existantes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Styles pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Fermer la notification
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-fermeture après 5 secondes
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Animation au scroll
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observer les éléments à animer
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.competence-card, .projet-card, .about-card, .stat');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateOnScroll.observe(el);
    });
});

// Effet de parallaxe pour le hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Smooth scroll pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Compenser la hauteur de la navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Effet de typing pour le titre principal
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialiser l'effet de typing au chargement
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Compteur animé pour les statistiques
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
        }
    }
    
    updateCounter();
}

// Observer pour les compteurs
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat h4');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent);
                if (!isNaN(target) && target > 0) {
                    animateCounter(counter, target);
                }
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.presentation-stats');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }
});

// Mode sombre (optionnel)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Charger le mode sombre depuis le localStorage
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});

// Gestion des erreurs
window.addEventListener('error', (e) => {
    console.error('Erreur JavaScript:', e.error);
});

// Performance: Lazy loading des images (si ajoutées plus tard)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialiser le lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Préchargement des ressources critiques
function preloadCriticalResources() {
    const criticalResources = [
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// Initialiser le préchargement
preloadCriticalResources();

// Système de traduction
let currentLanguage = localStorage.getItem('language') || 'fr';

// Dictionnaire de traductions
const translations = {
    fr: {
        // Navigation
        'Mon Portfolio': 'Mon Portfolio',
        'Accueil': 'Accueil',
        'Présentation': 'Présentation',
        'Passions': 'Passions',
        'Compétences': 'Compétences',
        'Projets': 'Projets',
        'Télécharger CV': 'Télécharger CV',
        
        // Hero Section
        'Bonjour, je suis <span class=\'highlight\'>Adrien BEYSSON</span>': 'Bonjour, je suis <span class="highlight">Adrien BEYSSON</span>',
        'Étudiant BUT R&T - Parcours Cybersécurité': 'Étudiant BUT R&T - Parcours Cybersécurité',
        'Passionné par les réseaux, télécommunications et cybersécurité. En alternance chez Orange Business Services, je diagnostique et résous les problèmes techniques. Spécialisé dans la conception de réseaux sécurisés et la surveillance des systèmes d\'information.': 'Passionné par les réseaux, télécommunications et cybersécurité. En alternance chez Orange Business Services, je diagnostique et résous les problèmes techniques. Spécialisé dans la conception de réseaux sécurisés et la surveillance des systèmes d\'information.',
        'Voir mes projets': 'Voir mes projets',
        'Download CV': 'Télécharger CV',
        
        // Sections
        'À propos de moi': 'À propos de moi',
        'Mon parcours': 'Mon parcours',
        'Mes Passions': 'Mes Passions',
        'Mes Compétences': 'Mes Compétences',
        'Mes Projets': 'Mes Projets',
        'Télécharger mon CV': 'Télécharger mon CV',
        
        // Présentation
        'Actuellement en 3ème année de BUT Réseaux et Télécommunications avec un parcours spécialisé en Cybersécurité, je me forme aux technologies de pointe en matière de réseaux, sécurité informatique et gestion de projets.': 'Actuellement en 3ème année de BUT Réseaux et Télécommunications avec un parcours spécialisé en Cybersécurité, je me forme aux technologies de pointe en matière de réseaux, sécurité informatique et gestion de projets.',
        'En alternance chez Orange Business Services au service après-vente (SAV), j\'effectue des diagnostics et résous les problèmes techniques à distance. Lorsque les interventions nécessitent une expertise spécialisée, j\'active les équipes compétentes pour assurer une résolution optimale.': 'En alternance chez Orange Business Services au service après-vente (SAV), j\'effectue des diagnostics et résous les problèmes techniques à distance. Lorsque les interventions nécessitent une expertise spécialisée, j\'active les équipes compétentes pour assurer une résolution optimale.',
        'Mon expertise couvre la conception de réseaux sécurisés, l\'analyse de risques, les tests de pénétration et la surveillance des systèmes d\'information. Je suis passionné par la protection des infrastructures numériques et l\'innovation technologique.': 'Mon expertise couvre la conception de réseaux sécurisés, l\'analyse de risques, les tests de pénétration et la surveillance des systèmes d\'information. Je suis passionné par la protection des infrastructures numériques et l\'innovation technologique.',
        'Étudiant BUT R&T - Cybersécurité': 'Étudiant BUT R&T - Cybersécurité',
        '3ème année': '3ème année',
        'Alternance SAV': 'Alternance SAV',
        'Parcours spécialisé': 'Parcours spécialisé',
        
        // Passions
        'Voitures & Rallye': 'Voitures & Rallye',
        'Passionné par la mécanique automobile et l\'adrénaline de la compétition. J\'apprécie la complexité technique et la précision des véhicules de rallye.': 'Passionné par la mécanique automobile et l\'adrénaline de la compétition. J\'apprécie la complexité technique et la précision des véhicules de rallye.',
        'Aviation': 'Aviation',
        'Fasciné par l\'aviation où technologie et précision se rencontrent dans les airs. L\'ingénierie aéronautique représente pour moi l\'excellence technique.': 'Fasciné par l\'aviation où technologie et précision se rencontrent dans les airs. L\'ingénierie aéronautique représente pour moi l\'excellence technique.',
        'Horlogerie': 'Horlogerie',
        'Collectionneur de montres, attiré par l\'ingénierie mécanique et l\'artisanat horloger. Ces objets reflètent mon goût pour la précision et l\'excellence.': 'Collectionneur de montres, attiré par l\'ingénierie mécanique et l\'artisanat horloger. Ces objets reflètent mon goût pour la précision et l\'excellence.',
        
        // CV Section
        'Obtenez mon CV complet': 'Obtenez mon CV complet',
        'Remplissez le formulaire ci-dessous pour télécharger mon CV au format PDF. Cela m\'aide à garder une trace des personnes intéressées par mon profil.': 'Remplissez le formulaire ci-dessous pour télécharger mon CV au format PDF. Cela m\'aide à garder une trace des personnes intéressées par mon profil.',
        'Nom *': 'Nom *',
        'Prénom *': 'Prénom *',
        'Email *': 'Email *',
        'Message (optionnel)': 'Message (optionnel)',
        'Dites-moi pourquoi vous souhaitez mon CV...': 'Dites-moi pourquoi vous souhaitez mon CV...',
        'Télécharger le CV': 'Télécharger le CV',
        
        // Footer
        'Contactez-moi': 'Contactez-moi',
        'Prêt à collaborer sur votre prochain projet ?': 'Prêt à collaborer sur votre prochain projet ?',
        'Liens rapides': 'Liens rapides',
        'Tous droits réservés.': 'Tous droits réservés.'
    },
    en: {
        // Navigation
        'Mon Portfolio': 'My Portfolio',
        'Accueil': 'Home',
        'Présentation': 'About',
        'Passions': 'Passions',
        'Compétences': 'Skills',
        'Projets': 'Projects',
        'Télécharger CV': 'Download CV',
        
        // Hero Section
        'Bonjour, je suis <span class=\'highlight\'>Adrien BEYSSON</span>': 'Hello, I\'m <span class="highlight">Adrien BEYSSON</span>',
        'Étudiant BUT R&T - Parcours Cybersécurité': 'BUT R&T Student - Cybersecurity Track',
        'Passionné par les réseaux, télécommunications et cybersécurité. En alternance chez Orange Business Services, je diagnostique et résous les problèmes techniques. Spécialisé dans la conception de réseaux sécurisés et la surveillance des systèmes d\'information.': 'Passionate about networks, telecommunications and cybersecurity. Working as an apprentice at Orange Business Services, I diagnose and resolve technical issues. Specialized in secure network design and information systems monitoring.',
        'Voir mes projets': 'View my projects',
        'Download CV': 'Download CV',
        
        // Sections
        'À propos de moi': 'About me',
        'Mon parcours': 'My background',
        'Mes Passions': 'My Passions',
        'Mes Compétences': 'My Skills',
        'Mes Projets': 'My Projects',
        'Télécharger mon CV': 'Download my CV',
        
        // Présentation
        'Actuellement en 3ème année de BUT Réseaux et Télécommunications avec un parcours spécialisé en Cybersécurité, je me forme aux technologies de pointe en matière de réseaux, sécurité informatique et gestion de projets.': 'Currently in my 3rd year of BUT Networks and Telecommunications with a specialized Cybersecurity track, I am training in cutting-edge technologies in networks, computer security and project management.',
        'En alternance chez Orange Business Services au service après-vente (SAV), j\'effectue des diagnostics et résous les problèmes techniques à distance. Lorsque les interventions nécessitent une expertise spécialisée, j\'active les équipes compétentes pour assurer une résolution optimale.': 'Working as an apprentice at Orange Business Services in after-sales service (SAV), I perform diagnostics and resolve technical issues remotely. When interventions require specialized expertise, I activate the competent teams to ensure optimal resolution.',
        'Mon expertise couvre la conception de réseaux sécurisés, l\'analyse de risques, les tests de pénétration et la surveillance des systèmes d\'information. Je suis passionné par la protection des infrastructures numériques et l\'innovation technologique.': 'My expertise covers secure network design, risk analysis, penetration testing and information systems monitoring. I am passionate about protecting digital infrastructures and technological innovation.',
        'Étudiant BUT R&T - Cybersécurité': 'BUT R&T Student - Cybersecurity',
        '3ème année': '3rd year',
        'Alternance SAV': 'SAV Apprenticeship',
        'Parcours spécialisé': 'Specialized track',
        
        // Passions
        'Voitures & Rallye': 'Cars & Rally',
        'Passionné par la mécanique automobile et l\'adrénaline de la compétition. J\'apprécie la complexité technique et la précision des véhicules de rallye.': 'Passionate about automotive mechanics and the adrenaline of competition. I appreciate the technical complexity and precision of rally vehicles.',
        'Aviation': 'Aviation',
        'Fasciné par l\'aviation où technologie et précision se rencontrent dans les airs. L\'ingénierie aéronautique représente pour moi l\'excellence technique.': 'Fascinated by aviation where technology and precision meet in the air. Aeronautical engineering represents technical excellence for me.',
        'Horlogerie': 'Watchmaking',
        'Collectionneur de montres, attiré par l\'ingénierie mécanique et l\'artisanat horloger. Ces objets reflètent mon goût pour la précision et l\'excellence.': 'Watch collector, attracted by mechanical engineering and watchmaking craftsmanship. These objects reflect my taste for precision and excellence.',
        
        // CV Section
        'Obtenez mon CV complet': 'Get my complete CV',
        'Remplissez le formulaire ci-dessous pour télécharger mon CV au format PDF. Cela m\'aide à garder une trace des personnes intéressées par mon profil.': 'Fill out the form below to download my CV in PDF format. This helps me keep track of people interested in my profile.',
        'Nom *': 'Name *',
        'Prénom *': 'First name *',
        'Email *': 'Email *',
        'Message (optionnel)': 'Message (optional)',
        'Dites-moi pourquoi vous souhaitez mon CV...': 'Tell me why you want my CV...',
        'Télécharger le CV': 'Download CV',
        
        // Footer
        'Contactez-moi': 'Contact me',
        'Prêt à collaborer sur votre prochain projet ?': 'Ready to collaborate on your next project?',
        'Liens rapides': 'Quick links',
        'Tous droits réservés.': 'All rights reserved.'
    }
};

// Fonction pour changer la langue
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Mettre à jour le bouton de langue
    const languageBtn = document.getElementById('language-btn');
    const languageText = languageBtn.querySelector('.language-text');
    languageText.textContent = lang.toUpperCase();
    
    // Traduire tous les éléments avec des attributs data-fr et data-en
    const elementsToTranslate = document.querySelectorAll('[data-fr][data-en]');
    elementsToTranslate.forEach(element => {
        const translation = element.getAttribute(`data-${lang}`);
        if (translation) {
            element.innerHTML = translation;
        }
    });
    
    // S'assurer que les éléments vides sont remplis avec la traduction par défaut
    const emptyElements = document.querySelectorAll('[data-fr][data-en]');
    emptyElements.forEach(element => {
        const translation = element.getAttribute(`data-${lang}`);
        if (translation && (!element.innerHTML.trim() || element.innerHTML.trim() === '')) {
            element.innerHTML = translation;
        }
    });
    
    // Traduire les placeholders des inputs et textareas
    const textarea = document.getElementById('message');
    if (textarea) {
        const placeholders = {
            fr: 'Dites-moi pourquoi vous souhaitez mon CV...',
            en: 'Tell me why you want my CV...'
        };
        textarea.placeholder = placeholders[lang];
    }
    
    // Mettre à jour l'attribut lang du HTML
    document.documentElement.lang = lang;
    
    // Mettre à jour le titre de la page
    document.title = lang === 'fr' ? 'Mon Portfolio' : 'My Portfolio';
    
    // Mettre à jour les messages de notification
    updateNotificationMessages(lang);
}

// Initialiser la langue au chargement
document.addEventListener('DOMContentLoaded', () => {
    const languageBtn = document.getElementById('language-btn');
    if (languageBtn) {
        languageBtn.addEventListener('click', () => {
            const newLang = currentLanguage === 'fr' ? 'en' : 'fr';
            changeLanguage(newLang);
        });
        
        // Appliquer la langue sauvegardée
        changeLanguage(currentLanguage);
    }
});
