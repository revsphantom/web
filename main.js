document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const allLinks = document.querySelectorAll('a[href^="#"]');
    const siteTitle = document.querySelector('.site-title');
    const mainTitle = document.querySelector('.main-title');
    const header = document.querySelector('header');
    const backgroundContainer = document.querySelector('.background-container');

    function toggleMenu() {
        hamburger.classList.toggle('change');
        mobileMenu.classList.toggle('active');
        
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.style.visibility = 'visible';
            setTimeout(() => {
                mobileMenu.style.transform = 'translateY(0)';
            }, 10);
        } else {
            mobileMenu.style.transform = 'translateY(-100%)';
            setTimeout(() => {
                mobileMenu.style.visibility = 'hidden';
            }, 300);
        }
        
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    function closeMenu() {
        hamburger.classList.remove('change');
        mobileMenu.classList.remove('active');
        mobileMenu.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            mobileMenu.style.visibility = 'hidden';
        }, 300);
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', toggleMenu);

    mobileMenu.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            closeMenu();
            
            const targetId = e.target.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 900 && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                if (mobileMenu.classList.contains('active')) {
                    closeMenu();
                }

                const headerOffset = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const headerHeight = header.offsetHeight;
        const mainTitlePosition = mainTitle.offsetTop;

        if (scrollPosition > mainTitlePosition - headerHeight) {
            siteTitle.style.opacity = '1';
            mainTitle.style.transform = 'translateY(-100%)';
            mainTitle.style.opacity = '0';
        } else {
            siteTitle.style.opacity = '0';
            mainTitle.style.transform = 'translateY(0)';
            mainTitle.style.opacity = '1';
        }

        backgroundContainer.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        backgroundContainer.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    });

    window.dispatchEvent(new Event('scroll'));

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const token = turnstile.getResponse();
            
            if (!token) {
                alert('CAPTCHA Invalid!');
                return false;
            }
            
            let input = document.querySelector('[name="cf-turnstile-response"]');
            if (!input) {
                input = document.createElement('input');
                input.type = 'hidden';
                input.name = 'cf-turnstile-response';
                this.appendChild(input);
            }
            input.value = token;
            
            this.submit();
            alert('Your message has been sent!');
            this.reset();
            turnstile.reset();
        });
    }
});