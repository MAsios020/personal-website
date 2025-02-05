document.addEventListener('DOMContentLoaded', () => {
    // Comprehensive Hover Sound Coverage
    function addHoverSoundToElements() {
        // Extremely broad selector to catch most interactive elements
        const hoverableElements = document.querySelectorAll(`
            a, button, input, textarea, select, 
            .nav-link, .project-card, .skill-tag, 
            [onclick], [onmouseover], 
            .quantum-button, .cyber-hover,
            .nav-logo, .holographic-avatar,
            .cta-buttons a,
            .experience-item,
            .education-item,
            .certifications-item,
            .contact-details p,
            .quantum-section,
            .section-title,
            .quantum-title,
            .quantum-subtitle,
            .skill-category,
            .section-content,
            .quantum-paragraph,
            .skill-tag
        `);

        hoverableElements.forEach(el => {
            // Prevent multiple event listeners
            if (!el.dataset.hoverSoundAdded) {
                el.addEventListener('mouseenter', async () => {
                    try {
                        await playSound('hover');
                    } catch (error) {
                        console.warn('Hover sound error:', error);
                    }
                });
                
                // Mark element to prevent duplicate listeners
                el.dataset.hoverSoundAdded = 'true';
            }
        });
    }

    // Synthetic Sound Generation with Autoplay Workaround
    function createSyntheticSound(type) {
        return new Promise((resolve, reject) => {
            try {
                // Create audio context in a way that might bypass autoplay restrictions
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                
                // Resume audio context if suspended
                if (audioContext.state === 'suspended') {
                    audioContext.resume();
                }

                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();

                // Different sound characteristics for different interactions
                const soundTypes = {
                    hover: { frequency: 880, duration: 0.05 },
                    click: { frequency: 440, duration: 0.1 },
                    navigate: { frequency: 660, duration: 0.2 },
                    typing: { frequency: 1760, duration: 0.03 },
                    error: { frequency: 220, duration: 0.5 }
                };

                const settings = soundTypes[type] || soundTypes.click;

                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(settings.frequency, audioContext.currentTime);
                
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + settings.duration);

                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);

                oscillator.start();
                oscillator.stop(audioContext.currentTime + settings.duration);

                oscillator.onended = resolve;
            } catch (error) {
                console.error('Synthetic sound generation error:', error);
                reject(error);
            }
        });
    }

    // Sound Utility Functions with Autoplay Workaround
    async function playSound(soundKey) {
        if (!SoundSettings.isMuted) {
            try {
                // Attempt to play synthetic sound directly
                await createSyntheticSound(soundKey);
            } catch (error) {
                console.error(`Error playing ${soundKey} sound:`, error);
            }
        }
    }

    // Global Sound Settings
    const SoundSettings = {
        masterVolume: 0.3,
        isMuted: false
    };

    // Sound Management with Fallback
    const SoundEffects = {
        hover: {
            play: async () => {
                try {
                    const response = await fetch('sounds/hover.txt');
                    const text = await response.text();
                    console.log('Hover Sound:', text);
                    return createSyntheticSound('hover');
                } catch (error) {
                    console.warn('Hover sound fallback:', error);
                    return createSyntheticSound('hover');
                }
            }
        },
        click: {
            play: async () => {
                try {
                    const response = await fetch('sounds/click.txt');
                    const text = await response.text();
                    console.log('Click Sound:', text);
                    return createSyntheticSound('click');
                } catch (error) {
                    console.warn('Click sound fallback:', error);
                    return createSyntheticSound('click');
                }
            }
        },
        navigate: {
            play: async () => {
                try {
                    const response = await fetch('sounds/navigate.txt');
                    const text = await response.text();
                    console.log('Navigate Sound:', text);
                    return createSyntheticSound('navigate');
                } catch (error) {
                    console.warn('Navigate sound fallback:', error);
                    return createSyntheticSound('navigate');
                }
            }
        },
        typing: {
            play: async () => {
                try {
                    const response = await fetch('sounds/typing.txt');
                    const text = await response.text();
                    console.log('Typing Sound:', text);
                    return createSyntheticSound('typing');
                } catch (error) {
                    console.warn('Typing sound fallback:', error);
                    return createSyntheticSound('typing');
                }
            }
        },
        error: {
            play: async () => {
                try {
                    const response = await fetch('sounds/error.txt');
                    const text = await response.text();
                    console.log('Error Sound:', text);
                    return createSyntheticSound('error');
                } catch (error) {
                    console.warn('Error sound fallback:', error);
                    return createSyntheticSound('error');
                }
            }
        }
    };

    // Keyboard Typing Sound on Page Load
    async function playKeyboardStartupSequence() {
        const typingSounds = [
            { text: 'Initializing system...', delay: 100 },
            { text: 'Loading quantum interface...', delay: 150 },
            { text: 'Connecting neural networks...', delay: 200 }
        ];

        const consoleOutput = document.createElement('div');
        consoleOutput.classList.add('startup-console');
        consoleOutput.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(0, 0, 0, 0.8);
            color: #0fa;
            font-family: 'Courier New', monospace;
            padding: 20px;
            border-radius: 10px;
            z-index: 9999;
            text-align: center;
            max-width: 80%;
            white-space: nowrap;
            overflow: hidden;
        `;
        document.body.appendChild(consoleOutput);

        for (const line of typingSounds) {
            await new Promise(resolve => {
                let index = 0;
                const typeText = () => {
                    if (index < line.text.length) {
                        consoleOutput.textContent += line.text[index];
                        
                        // Play typing sound
                        try {
                            createSyntheticSound('typing');
                        } catch (error) {
                            console.warn('Typing sound error:', error);
                        }
                        
                        index++;
                        setTimeout(typeText, line.delay);
                    } else {
                        setTimeout(resolve, 500);
                    }
                };
                typeText();
            });
        }

        // Fade out and remove console
        setTimeout(() => {
            consoleOutput.style.transition = 'opacity 1s ease-out';
            consoleOutput.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(consoleOutput);
            }, 1000);
        }, 1500);
    }

    // Autoplay Sound Initialization
    function initializeSounds() {
        // Create a tiny, silent buffer to unlock audio context
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const buffer = audioContext.createBuffer(1, 1, 22050);
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start(0);

        // Trigger startup sequence
        playKeyboardStartupSequence();
    }

    // Attempt to initialize sounds as early as possible
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeSounds);
    } else {
        initializeSounds();
    }

    // Fallback event listeners to ensure sound works
    ['mouseenter', 'touchstart', 'keydown'].forEach(eventType => {
        document.addEventListener(eventType, () => {
            try {
                createSyntheticSound('hover');
            } catch (error) {
                console.warn('Fallback sound initialization error:', error);
            }
        }, { once: true });
    });

    // Initial setup of hover sounds
    addHoverSoundToElements();

    // Observe and add hover sounds to dynamically added elements
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        addHoverSoundToElements();
                    }
                });
            }
        });
    });

    // Start observing the entire document
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Section Visibility Observer
    const sections = document.querySelectorAll('.quantum-section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Lightweight Quantum Particle System
    function createLightweightParticles() {
        const particleContainer = document.querySelector('.quantum-background');
        if (!particleContainer) return;

        const particleCount = 50; // Reduced from 200
        const colors = [
            'rgba(0, 255, 255, 0.3)',   // Cyan
            'rgba(0, 163, 255, 0.2)',   // Blue
            'rgba(126, 58, 255, 0.2)'   // Purple
        ];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('quantum-particle');

            // Simplified positioning and sizing
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            const size = Math.random() * 4 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random color
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            // Simplified animation using CSS
            particle.style.animation = `
                quantumParticleMovement 
                ${Math.random() * 10 + 5}s 
                ease-in-out 
                ${Math.random() * 2}s 
                infinite 
                alternate
            `;

            particleContainer.appendChild(particle);
        }
    }

    // Performance-optimized initialization
    document.addEventListener('DOMContentLoaded', () => {
        // Reduce computational load
        setTimeout(createLightweightParticles, 500);

        // Section Visibility Observer
        const sections = document.querySelectorAll('.quantum-section');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    });

    // Typing Effect
    function initTypeWriter() {
        const typingElements = document.querySelectorAll('.typing-text');
        typingElements.forEach(element => {
            const text = element.getAttribute('data-text');
            element.textContent = '';
            let index = 0;

            function type() {
                if (index < text.length) {
                    element.textContent += text.charAt(index);
                    index++;
                    setTimeout(type, 50 + Math.random() * 50);
                }
            }

            type();
        });
    }

    // Navigation Interactions
    function initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('mouseover', function() {
                this.style.transform = 'scale(1.1)';
                this.style.color = 'var(--quantum-primary)';
            });

            link.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.color = '';
            });
        });
    }

    // Button Interactions
    function initButtonInteractions() {
        const buttons = document.querySelectorAll('.quantum-button');
        buttons.forEach(button => {
            button.addEventListener('mousemove', function(e) {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                button.style.setProperty('--mouse-x', `${x}px`);
                button.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }

    // Initialize Quantum Experience
    function initQuantumExperience() {
        const particleContainer = document.querySelector('.particle-container');
        const neuralNetworkContainer = document.querySelector('.neural-network');

        // new QuantumParticleSystem(particleContainer);
        // new NeuralNetworkBackground(neuralNetworkContainer);
    }

    // Scroll Reveal
    function initScrollReveal() {
        const sections = document.querySelectorAll('.quantum-section');
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Initialize All Quantum Interactions
    initQuantumExperience();
    initTypeWriter();
    initNavigation();
    initButtonInteractions();
    initScrollReveal();

    // Advanced Quantum Interaction Layer
    document.addEventListener('DOMContentLoaded', () => {
        // Quantum Particle Background
        function createQuantumParticles() {
            const container = document.body;
            const particleCount = 100;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('quantum-particle');
                
                // Random positioning
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                
                // Random size and opacity
                const size = Math.random() * 5 + 1;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.opacity = Math.random() * 0.5 + 0.1;
                
                // Color variations
                const colors = [
                    'rgba(0, 255, 255, 0.3)',   // Cyan
                    'rgba(0, 163, 255, 0.2)',   // Blue
                    'rgba(126, 58, 255, 0.2)'   // Purple
                ];
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                
                // Complex movement
                particle.style.animation = `
                    quantum-drift 
                    ${Math.random() * 20 + 10}s 
                    ease-in-out 
                    ${Math.random() * 5}s 
                    infinite 
                    alternate
                `;
                
                container.appendChild(particle);
            }
        }

        // Interactive Section Reveal
        function revealSections() {
            const sections = document.querySelectorAll('.quantum-section');
            
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const sectionObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('section-visible');
                        entry.target.style.animation = `
                            quantum-float 1s ease-in-out,
                            quantum-pulse 2s infinite
                        `;
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            sections.forEach(section => {
                sectionObserver.observe(section);
            });
        }

        // Mouse-Driven Particle Interaction
        function particleMouseInteraction() {
            const particles = document.querySelectorAll('.quantum-particle');
            
            document.addEventListener('mousemove', (event) => {
                const { clientX, clientY } = event;
                
                particles.forEach(particle => {
                    const rect = particle.getBoundingClientRect();
                    const particleCenterX = rect.left + rect.width / 2;
                    const particleCenterY = rect.top + rect.height / 2;
                    
                    const distanceX = clientX - particleCenterX;
                    const distanceY = clientY - particleCenterY;
                    
                    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
                    const maxDistance = 200;
                    
                    if (distance < maxDistance) {
                        const normalizedDistance = 1 - (distance / maxDistance);
                        
                        particle.style.transform = `
                            translate(
                                ${distanceX * normalizedDistance * 0.2}px, 
                                ${distanceY * normalizedDistance * 0.2}px
                            )
                        `;
                    } else {
                        particle.style.transform = 'translate(0, 0)';
                    }
                });
            });
        }

        // Initialize Quantum Interactions
        createQuantumParticles();
        revealSections();
        particleMouseInteraction();
    });

    // Responsive Adjustments
    window.addEventListener('resize', () => {
        // Potential responsive logic
    });

    // Custom cursor removed as per user request

    // Network Statistics Animation
    function animateNetworkStats() {
        const statElements = document.querySelectorAll('.stat-value');
        
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statElement = entry.target;
                    const targetValue = parseInt(statElement.dataset.target);
                    
                    let currentValue = 0;
                    const duration = 2000; // 2 seconds
                    const increment = targetValue / (duration / 16); // 60fps

                    function updateCounter() {
                        if (currentValue < targetValue) {
                            currentValue += increment;
                            statElement.textContent = Math.round(currentValue);
                            requestAnimationFrame(updateCounter);
                        } else {
                            statElement.textContent = targetValue;
                        }
                    }

                    updateCounter();
                    observer.unobserve(statElement);
                }
            });
        }, options);

        statElements.forEach(statElement => {
            observer.observe(statElement);
        });
    }

    // Initialize on DOM load
    document.addEventListener('DOMContentLoaded', () => {
        animateNetworkStats();
    });

    // Load Font Awesome
    const fontAwesomeScript = document.createElement('script');
    fontAwesomeScript.src = 'https://kit.fontawesome.com/a076d05399.js';
    fontAwesomeScript.crossOrigin = 'anonymous';
    document.head.appendChild(fontAwesomeScript);
});
