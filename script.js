// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeCountdown();
    initializeMobileMenu();
    initializeScrollAnimations();
    initializeStatsCounter();
    initializeScrollToTop();
    initializeSmoothScrolling();
    initializeFormHandlers();
    initializeHeaderScroll();
});
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
   
    // Set colors to match the CSS
    const primaryColor = [74, 124, 89];    // #4a7c59
    const secondaryColor = [45, 80, 22];   // #2d5016
    const lightBgColor = [248, 249, 250];  // #f8f9fa
    const darkTextColor = [51, 51, 51];    // #333
   
    // Title section with gradient background effect
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 60, 'F');
   
    // Title
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("LIVESTOCK PROGRAM", 105, 30, { align: "center" });
   
    // Subtitle
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255, 0.9);
    doc.setFont("helvetica", "normal");
    doc.text("One Day Comprehensive Event", 105, 40, { align: "center" });
   
    // Event details card
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.5);
    doc.roundedRect(40, 55, 130, 25, 5, 5, 'FD');
   
    doc.setFontSize(16);
    doc.setTextColor(...secondaryColor);
    doc.setFont("helvetica", "bold");
    doc.text("Saturday, August 16, 2025", 105, 65, { align: "center" });
   
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Gaborone Agricultural Showgrounds", 105, 75, { align: "center" });
   
    // Program data
    const programData = [
        {
            title: "MORNING SESSION",
            items: [
                { time: "7:00 - 8:30 AM", activity: "Registration & Welcome", location: "Main Entrance" },
                { time: "8:30 - 9:00 AM", activity: "Opening Ceremony", location: "Main Arena" },
                { time: "9:00 - 10:30 AM", activity: "Goat Breeding Workshop", location: "Workshop Hall A" },
                { time: "10:30 - 11:00 AM", activity: "Networking Break", location: "Exhibition Area" },
                { time: "11:00 - 12:30 PM", activity: "Sheep Farming Excellence", location: "Workshop Hall B" }
            ]
        },
        {
            title: "AFTERNOON SESSION",
            items: [
                { time: "12:30 - 1:30 PM", activity: "Lunch Break", location: "Dining Pavilion" },
                { time: "1:30 - 2:30 PM", activity: "Livestock Competition", location: "Show Ring" },
                { time: "2:30 - 3:30 PM", activity: "Poultry & Rabbit Farming", location: "Workshop Hall A" },
                { time: "3:30 - 4:00 PM", activity: "Innovation Showcase", location: "Tech Pavilion" }
            ]
        },
        {
            title: "EVENING SESSION",
            items: [
                { time: "4:00 - 5:30 PM", activity: "Live Auction", location: "Auction Arena" },
                { time: "5:30 - 6:00 PM", activity: "Awards Ceremony", location: "Main Arena" },
                { time: "6:00 - 7:00 PM", activity: "Networking Reception", location: "Outdoor Pavilion" }
            ]
        }
    ];
   
    let yPosition = 95;
   
    programData.forEach((session, sessionIndex) => {
        // Check if we need a new page
        if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
        }
       
        // Session title with underline
        doc.setFontSize(16);
        doc.setTextColor(...secondaryColor);
        doc.setFont("helvetica", "bold");
        doc.text(session.title, 20, yPosition);
       
        // Underline
        doc.setDrawColor(...primaryColor);
        doc.setLineWidth(1);
        doc.line(20, yPosition + 2, 50, yPosition + 2);
       
        yPosition += 15;
       
        // Session items container
        doc.setFillColor(...lightBgColor);
        doc.setDrawColor(200, 200, 200);
        doc.roundedRect(20, yPosition - 5, 170, session.items.length * 12 + 10, 3, 3, 'F');
       
        // Session items
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
       
        session.items.forEach((item, itemIndex) => {
            // Check if we need a new page
            if (yPosition > 270) {
                doc.addPage();
                yPosition = 20;
            }
           
            // Time
            doc.setTextColor(...primaryColor);
            doc.setFont("helvetica", "bold");
            doc.text(item.time, 25, yPosition);
           
            // Activity
            doc.setTextColor(...secondaryColor);
            doc.setFont("helvetica", "normal");
            doc.text(item.activity, 80, yPosition);
           
            // Location badge
            doc.setFillColor(...primaryColor);
            doc.roundedRect(150, yPosition - 4, 35, 6, 3, 3, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(9);
            doc.text(item.location, 168, yPosition, { align: "center" });
           
            yPosition += 12;
        });
       
        yPosition += 15; // Extra space between sessions
    });
   
 
 
    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(`Gaborone Agricultural Showgrounds | Page ${i} of ${pageCount}`, 105, 290, { align: "center" });
    }
   
    // Save the PDF
    doc.save("Livestock_Program_Aug_16_2025.pdf");
}
 

 // Slideshow functionality
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.nav-dot');
        const totalSlides = slides.length;

        function showSlide(n) {
            // Hide all slides
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Wrap around if necessary
            if (n >= totalSlides) currentSlide = 0;
            if (n < 0) currentSlide = totalSlides - 1;
            
            // Show current slide
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            currentSlide++;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide--;
            showSlide(currentSlide);
        }

        // Auto-advance slideshow every 4 seconds
        setInterval(nextSlide, 4000);

        // Event listeners for navigation
        document.getElementById('nextBtn').addEventListener('click', nextSlide);
        document.getElementById('prevBtn').addEventListener('click', prevSlide);

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });


// Countdown Timer Functionality
function initializeCountdown() {
    // Set the event date (September 15, 2025)
    const eventDate = new Date('2025-11-01T09:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        if (distance < 0) {
            // Event has passed
            document.getElementById('countdown').innerHTML = '<div class="event-ended">Event Has Started!</div>';
            return;
        }
        
        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update DOM elements
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    // Update countdown immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Mobile Menu Functionality
function initializeMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = mobileToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (mobileToggle.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        });
        
        // Close mobile menu when clicking on a link
        navLinks.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
                
                // Reset hamburger menu
                const spans = mobileToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        });
    }
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.feature-card, .exhibitor-card, .section-title');
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        // Add staggered delay
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// Stats Counter Animation
function initializeStatsCounter() {
    const statsNumbers = document.querySelectorAll('.stat-number');
    let animationTriggered = false;
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animationTriggered) {
                animationTriggered = true;
                animateStats();
            }
        });
    }, { threshold: 0.5 });
    
    if (statsNumbers.length > 0) {
        observer.observe(statsNumbers[0].parentElement.parentElement);
    }
    
    function animateStats() {
        statsNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 20);
        });
    }
}

// Scroll to Top Functionality
function initializeScrollToTop() {
    // Create scroll to top button
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #4a7c59;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Handlers and CTAs
function initializeFormHandlers() {
    // Registration button handlers
    const registerBtns = document.querySelectorAll('#registerBtn, #registerNowBtn');
    registerBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            handleRegistration();
        });
    });
    
    // Exhibitor button handlers
    const exhibitorBtns = document.querySelectorAll('#exhibitorBtn, #becomeExhibitorBtn');
    exhibitorBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            handleExhibitorInquiry();
        });
    });
    
    // View all exhibitors button
    const viewExhibitorsBtn = document.getElementById('viewAllExhibitors');
    if (viewExhibitorsBtn) {
        viewExhibitorsBtn.addEventListener('click', function() {
            // Scroll to exhibitors section or navigate to exhibitors page
            const exhibitorsSection = document.getElementById('exhibitors');
            if (exhibitorsSection) {
                exhibitorsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Registration Handler
function handleRegistration() {
    // Show loading state
    const btn = event.target;
    const originalText = btn.textContent;
    btn.innerHTML = '<span class="spinner"></span> Processing...';
    btn.classList.add('loading');
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        btn.textContent = originalText;
        btn.classList.remove('loading');
        
        // Show success message (you would integrate with actual registration system)
        showNotification('Registration form will open soon! Stay tuned for updates.', 'success');
    }, 2000);
}

// Exhibitor Inquiry Handler
function handleExhibitorInquiry() {
    const btn = event.target;
    const originalText = btn.textContent;
    btn.innerHTML = '<span class="spinner"></span> Loading...';
    btn.classList.add('loading');
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove('loading');
        
        showNotification('Exhibitor information package will be sent to your email!', 'info');
    }, 1500);
}

// Header Scroll Effect
/*function initializeHeaderScroll() {
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
        
        // Hide header on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}*/
// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Manual close
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
    
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: 1rem;
    `;
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function getNotificationIcon(type) {
    const icons = {
        success: '✓',
        error: '✗',
        warning: '⚠',
        info: 'ℹ'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#4CAF50',
        error: '#F44336',
        warning: '#FF9800',
        info: '#2196F3'
    };
    return colors[type] || colors.info;
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance Optimization
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
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

// Initialize lazy loading if there are images with data-src
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You could send this to an error tracking service
});

// Performance Monitoring
window.addEventListener('load', function() {
    // Log page load time
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log('Page Load Time:', loadTime + 'ms');
});

// Accessibility Enhancements
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const navLinks = document.getElementById('navLinks');
        const mobileToggle = document.getElementById('mobileToggle');
        
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    }
});

// Add keyboard navigation for buttons
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.classList.contains('btn')) {
            e.preventDefault();
            e.target.click();
        }
    }
});