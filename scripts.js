document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling
    const links = document.querySelectorAll('a[href^="#"]');
    for (const link of links) {
        link.addEventListener('click', smoothScroll);
    }

    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        window.scrollTo({
            top: targetElement.offsetTop - 50,  // Adjust based on fixed navbar height
            behavior: 'smooth'
        });
    }

    // Fade-in on Scroll
    const sections = document.querySelectorAll('.section, .feature-card, .contact-section form');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.2
    });

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(50px)';
        observer.observe(section);
    });

    // Back-to-top Button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.classList.add('back-to-top');
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Form Validation
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (name === '' || message === '') {
            alert('Please fill out all fields.');
            return;
        }

        alert('Message sent successfully!');
        contactForm.reset();
    });

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }

    // Responsive Navbar (Hamburger Menu)
    const nav = document.querySelector('nav');
    const hamburger = document.createElement('div');
    hamburger.classList.add('hamburger');
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    nav.appendChild(hamburger);

    hamburger.addEventListener('click', () => {
        const navList = nav.querySelector('ul');
        navList.classList.toggle('show');
    });
});
