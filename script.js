document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: false,
        mirror: true,
        offset: 50,
        easing: 'ease-in-out'
    });

    // Hide loader
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }

    // Navbar functionality
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    let lastScrollTop = 0;

    // Scroll event handler
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar based on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;

        // Update active section
        const sections = document.querySelectorAll('section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollTop >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const navHeight = navbar.offsetHeight;
            
            window.scrollTo({
                top: targetSection.offsetTop - navHeight,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (document.querySelector('.nav-links').classList.contains('active')) {
                document.querySelector('.nav-links').classList.remove('active');
                document.querySelector('.nav-toggle').classList.remove('active');
            }
        });
    });

    // Mobile menu
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    navbar.querySelector('.container').appendChild(navToggle);

    navToggle.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        navToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', e => {
        const navLinks = document.querySelector('.nav-links');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (!navLinks.contains(e.target) && !navToggle.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Skill items hover effect
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });

    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Contact items hover effect
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
        });
    });

    // Add intersection observer for fade-in animations
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('section, .project-card, .skill-category, .contact-item').forEach(element => {
        observer.observe(element);
    });

    // Initialize particles.js with lighter configuration
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 30,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#2563eb"
            },
            "shape": {
                "type": "circle"
            },
            "opacity": {
                "value": 0.5,
                "random": false
            },
            "size": {
                "value": 3,
                "random": true
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#2563eb",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": false
                },
                "resize": true
            }
        },
        "retina_detect": true
    });

    // Simple Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Basic Project Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            projects.forEach(project => {
                if (filter === 'all' || project.dataset.category === filter) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });

    // Simple Skill Animation
    const skillBars = document.querySelectorAll('.skill-progress');
    const observerSkill = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const percentage = entry.target.parentElement.dataset.level;
                entry.target.style.width = percentage + '%';
            }
        });
    });

    skillBars.forEach(bar => observerSkill.observe(bar));

    // Matrix Background Animation
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    // Drawing the characters
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0fa';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            ctx.fillText(text, x, y);

            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    // Typing Animation
    function typeWriter(element) {
        const text = element.getAttribute('data-text');
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent = text.substring(0, i + 1);
                i++;
                setTimeout(type, 100);
            }
        }
        
        type();
    }

    // Initialize typing animations
    document.addEventListener('DOMContentLoaded', () => {
        const typingElements = document.querySelectorAll('.typing-text');
        typingElements.forEach((element, index) => {
            setTimeout(() => {
                typeWriter(element);
            }, index * 2000); // Delay each element by 2 seconds
        });
    });

    // Run matrix animation
    setInterval(draw, 33);

    // Glitch effect for buttons
    const glitchButtons = document.querySelectorAll('.glitch');
    glitchButtons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.animation = 'none';
            button.offsetHeight; // Trigger reflow
            button.style.animation = null;
        });
    });

    // Matrix Rain Effect
    const matrixCanvas = document.getElementById('matrix-canvas');
    const matrixCtx = matrixCanvas.getContext('2d');

    // Set canvas size
    const resizeMatrixCanvas = () => {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
    };
    resizeMatrixCanvas();
    window.addEventListener('resize', resizeMatrixCanvas);

    // Matrix characters
    const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
    const matrixCharArray = matrixChars.split('');
    const matrixFontSize = 14;
    const matrixColumns = matrixCanvas.width / matrixFontSize;
    const matrixDrops = Array(Math.floor(matrixColumns)).fill(1);

    // Drawing the characters
    function drawMatrix() {
        matrixCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

        matrixCtx.fillStyle = '#0fa';
        matrixCtx.font = matrixFontSize + 'px monospace';

        for (let i = 0; i < matrixDrops.length; i++) {
            const text = matrixCharArray[Math.floor(Math.random() * matrixCharArray.length)];
            const x = i * matrixFontSize;
            const y = matrixDrops[i] * matrixFontSize;

            matrixCtx.fillText(text, x, y);

            if (y > matrixCanvas.height && Math.random() > 0.975) {
                matrixDrops[i] = 0;
            }
            matrixDrops[i]++;
        }
    }

    // Binary Rain Effect
    function createBinaryRain() {
        const binaryContainer = document.getElementById('binaryRain');
        const width = window.innerWidth;
        const streams = Math.floor(width / 20);

        for (let i = 0; i < streams; i++) {
            const stream = document.createElement('div');
            stream.className = 'binary-stream';
            stream.style.left = `${(i * 20) + Math.random() * 10}px`;
            stream.style.animationDuration = `${3 + Math.random() * 5}s`;
            stream.style.animationDelay = `${Math.random() * 2}s`;
            
            const length = 10 + Math.floor(Math.random() * 20);
            for (let j = 0; j < length; j++) {
                const bit = document.createElement('div');
                bit.className = 'binary-bit';
                bit.textContent = Math.random() > 0.5 ? '1' : '0';
                stream.appendChild(bit);
            }
            
            binaryContainer.appendChild(stream);
        }
    }

    // Glowing Lines Effect
    function createGlowLines() {
        const container = document.querySelector('.glow-lines');
        const numLines = 10;

        for (let i = 0; i < numLines; i++) {
            const line = document.createElement('div');
            line.className = 'glow-line';
            line.style.left = `${Math.random() * 100}%`;
            line.style.animationDelay = `${Math.random() * 5}s`;
            container.appendChild(line);
        }
    }

    // Cyber Button Effect
    const cyberButtons = document.querySelectorAll('.cyber-button');
    cyberButtons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.querySelector('.cyber-button-glitch').style.display = 'block';
            setTimeout(() => {
                this.querySelector('.cyber-button-glitch').style.display = 'none';
            }, 200);
        });
    });

    // Tech Tags Animation
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.2}s`;
    });

    // Initialize everything
    document.addEventListener('DOMContentLoaded', () => {
        // Start Matrix animation
        setInterval(drawMatrix, 33);

        // Create binary rain
        createBinaryRain();

        // Create glowing lines
        createGlowLines();

        // Initialize typing animations
        const typingElements = document.querySelectorAll('.typing-text');
        typingElements.forEach((element, index) => {
            setTimeout(() => {
                typeWriter(element);
            }, index * 2000);
        });

        // Add scroll indicator animation
        const scrollIndicator = document.querySelector('.scroll-indicator');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        resizeMatrixCanvas();
        document.getElementById('binaryRain').innerHTML = '';
        createBinaryRain();
    });
});
