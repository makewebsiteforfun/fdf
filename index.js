// Mobile menu toggle functionality
        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuButton = document.getElementById('mobileMenuButton');
            const mobileMenu = document.getElementById('mobileMenu');
            const closeMobileMenu = document.getElementById('closeMobileMenu');
            
            mobileMenuButton.addEventListener('click', function() {
                mobileMenu.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            });
            
            closeMobileMenu.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                document.body.style.overflow = 'auto';
            });
            
            // Close menu when clicking outside
            mobileMenu.addEventListener('click', function(e) {
                if (e.target === mobileMenu) {
                    mobileMenu.classList.add('hidden');
                    document.body.style.overflow = 'auto';
                }
            });
            
            // Rulebook functionality
            const rulebookModal = document.getElementById('rulebookModal');
            const closeRulebook = document.getElementById('closeRulebook');
            const rulebookBtn = document.getElementById('rulebookBtn');
            const mobileRulebookBtn = document.getElementById('mobileRulebookBtn');
            const heroRulebookBtn = document.getElementById('heroRulebookBtn');
            const westernSound = document.getElementById('westernSound');
            
            function openRulebook() {
                rulebookModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                westernSound.play();
            }
            
            function closeRulebookHandler() {
                rulebookModal.style.display = 'none';
                document.body.style.overflow = 'auto';
                westernSound.pause();
                westernSound.currentTime = 0;
            }
            
            rulebookBtn.addEventListener('click', function(e) {
                e.preventDefault();
                openRulebook();
            });
            
            mobileRulebookBtn.addEventListener('click', function(e) {
                e.preventDefault();
                mobileMenu.classList.add('hidden');
                document.body.style.overflow = 'auto';
                openRulebook();
            });
            
            heroRulebookBtn.addEventListener('click', function(e) {
                e.preventDefault();
                openRulebook();
            });
            
            closeRulebook.addEventListener('click', closeRulebookHandler);
            
            rulebookModal.addEventListener('click', function(e) {
                if (e.target === rulebookModal) {
                    closeRulebookHandler();
                }
            });
            
            // About Us functionality
            const aboutModal = document.getElementById('aboutModal');
            const closeAbout = document.getElementById('closeAbout');
            const aboutBtn = document.getElementById('aboutBtn');
            const mobileAboutBtn = document.getElementById('mobileAboutBtn');
            const heroAboutBtn = document.getElementById('heroAboutBtn');
            const contactFromAbout = document.getElementById('contactFromAbout');
            
            function openAbout() {
                aboutModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
            
            function closeAboutHandler() {
                aboutModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
            
            aboutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                openAbout();
            });
            
            mobileAboutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                mobileMenu.classList.add('hidden');
                document.body.style.overflow = 'auto';
                openAbout();
            });
            
            heroAboutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                openAbout();
            });
            
            closeAbout.addEventListener('click', closeAboutHandler);
            
            aboutModal.addEventListener('click', function(e) {
                if (e.target === aboutModal) {
                    closeAboutHandler();
                }
            });
            
            contactFromAbout.addEventListener('click', function(e) {
                e.preventDefault();
                closeAboutHandler();
                
                // Scroll to contact section
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    window.scrollTo({
                        top: contactSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Language switcher functionality for rulebook
            const rulebookLanguageBtns = document.querySelectorAll('#rulebookModal .language-btn');
            
            rulebookLanguageBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Remove active class from all buttons
                    rulebookLanguageBtns.forEach(b => b.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Get the language to show
                    const lang = this.dataset.lang;
                    
                    // Hide all language contents
                    document.querySelectorAll('#rulebookModal .language-content').forEach(content => {
                        content.classList.remove('active');
                    });
                    
                    // Show the selected language content
                    document.getElementById(`${lang}-content`).classList.add('active');
                });
            });
            
            // Language switcher functionality for about us
            const aboutLanguageBtns = document.querySelectorAll('#aboutModal .language-btn');
            
            aboutLanguageBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Remove active class from all buttons
                    aboutLanguageBtns.forEach(b => b.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Get the language to show
                    const lang = this.dataset.lang;
                    
                    // Hide all language contents
                    document.querySelectorAll('#aboutModal .language-content').forEach(content => {
                        content.classList.remove('active');
                    });
                    
                    // Show the selected language content
                    document.getElementById(`${lang}-content`).classList.add('active');
                });
            });
            
            // Image zoom functionality with controls
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImage');
            const closeModal = document.getElementsByClassName('close-modal')[0];
            const openableImages = document.querySelectorAll('.openable-image');
            const zoomInBtn = document.getElementById('zoomIn');
            const zoomOutBtn = document.getElementById('zoomOut');
            const resetZoomBtn = document.getElementById('resetZoom');
            
            let currentScale = 0.1;
            const scaleStep = 0.5;
            const maxScale = 8;
            const minScale = 0.5;
            
            function updateImageScale() {
                modalImg.style.transform = `scale(${currentScale})`;
                
                // Adjust modal container height based on image size
                const imgHeight = modalImg.naturalHeight * currentScale;
                const container = document.querySelector('.modal-container');
                container.style.minHeight = `${imgHeight + 100}px`; // Add some padding
            }
            
            openableImages.forEach(img => {
                img.addEventListener('click', function() {
                    modal.style.display = 'block';
                    modalImg.src = this.src;
                    modalImg.alt = this.alt;
                    
                    // Wait for image to load before setting initial scale
                    modalImg.onload = function() {
                        currentScale = 0.1;
                        updateImageScale();
                        
                        // Center the image initially
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    };
                    
                    // In case image is already loaded
                    if (modalImg.complete) {
                        modalImg.onload();
                    }
                });
            });
            
            closeModal.addEventListener('click', function() {
                modal.style.display = 'none';
                currentScale = 0.1;
            });
            
            // Close modal when clicking outside the image
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.style.display = 'none';
                    currentScale = 0.1;
                }
            });
            
            // Close modal with ESC key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal.style.display === 'block') {
                    modal.style.display = 'none';
                    currentScale = 0.1;
                }
            });
            
            // Zoom in functionality
            zoomInBtn.addEventListener('click', function() {
                if (currentScale + scaleStep <= maxScale) {
                    currentScale += scaleStep;
                    updateImageScale();
                    
                    // Get current scroll position
                    const scrollY = window.scrollY;
                    const viewportHeight = window.innerHeight;
                    
                    // Calculate new scroll position to maintain visual center
                    const newScrollY = scrollY + (viewportHeight * scaleStep / 2);
                    
                    // Scroll to new position
                    window.scrollTo({
                        top: newScrollY,
                        behavior: 'smooth'
                    });
                }
            });
            
            // Zoom out functionality
            zoomOutBtn.addEventListener('click', function() {
                if (currentScale - scaleStep >= minScale) {
                    currentScale -= scaleStep;
                    updateImageScale();
                    
                    // Get current scroll position
                    const scrollY = window.scrollY;
                    const viewportHeight = window.innerHeight;
                    
                    // Calculate new scroll position to maintain visual center
                    const newScrollY = scrollY - (viewportHeight * scaleStep / 2);
                    
                    // Ensure we don't scroll above the top
                    const adjustedScrollY = Math.max(0, newScrollY);
                    
                    // Scroll to new position
                    window.scrollTo({
                        top: adjustedScrollY,
                        behavior: 'smooth'
                    });
                }
            });
            
            // Reset zoom functionality
            resetZoomBtn.addEventListener('click', function() {
                currentScale = 0.1;
                updateImageScale();
                
                // Scroll back to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // Handle pinch zoom on touch devices
            let initialDistance = null;
            
            modalImg.addEventListener('touchstart', function(e) {
                if (e.touches.length === 2) {
                    initialDistance = Math.hypot(
                        e.touches[0].clientX - e.touches[1].clientX,
                        e.touches[0].clientY - e.touches[1].clientY
                    );
                }
            });
            
            modalImg.addEventListener('touchmove', function(e) {
                if (e.touches.length === 2) {
                    e.preventDefault();
                    
                    const currentDistance = Math.hypot(
                        e.touches[0].clientX - e.touches[1].clientX,
                        e.touches[0].clientY - e.touches[1].clientY
                    );
                    
                    if (initialDistance !== null) {
                        const scaleChange = currentDistance / initialDistance;
                        const newScale = currentScale * scaleChange;
                        
                        // Limit the scale
                        if (newScale >= minScale && newScale <= maxScale) {
                            currentScale = newScale;
                            updateImageScale();
                        }
                    }
                    
                    initialDistance = currentDistance;
                }
            });
            
            modalImg.addEventListener('touchend', function() {
                initialDistance = null;
            });
            // Contact Form Submission
            const contactForm = document.getElementById('contactForm');
        const formMessage = document.getElementById('formMessage');
        const submitButton = document.getElementById('submitButton');
        const submitText = document.getElementById('submitText');
        const loadingSpinner = document.getElementById('loadingSpinner');

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            submitText.textContent = 'Sending...';
            loadingSpinner.style.display = 'block';
            submitButton.disabled = true;
            
            try {
                // Get form data
                const formData = new FormData(contactForm);
                
                // Try to submit via FormSubmit first
                try {
                    const response = await fetch('https://formsubmit.co/ajax/dikastudios@gmail.com', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(Object.fromEntries(formData))
                    });
                    
                    const data = await response.json();
                    
                    if (response.ok && data.success === "true") {
                        // Success message
                        formMessage.textContent = 'Thank you! Your message has been sent successfully./شكراً لك! تم إرسال رسالتك بنجاح.';
                        formMessage.className = 'form-message success';
                        contactForm.reset();
                    } else {
                        throw new Error('Form submission failed/فشل في إرسال النموذج');
                    }
                } catch (error) {
                    // Fallback to mailto if FormSubmit fails
                    const subject = formData.get('subject');
                    const body = `
                        Name: ${formData.get('name')}
                        Email: ${formData.get('email')}
                        Subject: ${subject}
                        Message: ${formData.get('message')}
                    `;
                    
                    const mailtoLink = `mailto:dikastudios@gmail.com?subject=Contact Form: ${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                    window.location.href = mailtoLink;
                    
                    formMessage.textContent = 'Your message is being prepared in your email client. Please send it to complete the process./يتم تحضير رسالتك في برنامج البريد الإلكتروني الخاص بك. يرجى إرسالها لإكمال العملية.';
                    formMessage.className = 'form-message success';
                    contactForm.reset();
                }
            } catch (error) {
                formMessage.textContent = 'There was an error sending your message. Please try again later or email us directly at dikastudios@gmail.com./حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى لاحقًا أو مراسلتنا مباشرة عبر البريد الإلكتروني: dikastudios@gmail.com.';
                formMessage.className = 'form-message error';
            } finally {
                // Reset button state
                submitText.textContent = 'Send Message/إرسال رسالة';
                loadingSpinner.style.display = 'none';
                submitButton.disabled = false;
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.className = 'form-message';
                    formMessage.textContent = '';
                }, 5000);
            }
        
        });
    });
