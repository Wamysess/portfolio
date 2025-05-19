document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    // Intersection Observer for section animations
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Current year for footer
    const yearElement = document.querySelector('#current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Scroll to top button (optional)
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'fixed bottom-8 right-8 bg-indigo-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-indigo-700 transition hidden';
    scrollToTopBtn.id = 'scroll-to-top';
    document.body.appendChild(scrollToTopBtn);
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.remove('hidden');
        } else {
            scrollToTopBtn.classList.add('hidden');
        }
    });
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize skill levels on page load
        const skillBars = document.querySelectorAll('.skill-level div');
        skillBars.forEach(bar => {
            bar.style.width = '0%'; // Start at 0
        });
    
    });

});


// Email copy functionality
function copyEmail() {
    const email = 'ramessesmark@gmail.com';
    navigator.clipboard.writeText(email);
    
    const copyBtn = document.getElementById('copy-btn');
    const copiedMsg = document.getElementById('copied-msg');
    
    copyBtn.classList.add('hidden');
    copiedMsg.classList.remove('hidden');
    
    setTimeout(() => {
        copyBtn.classList.remove('hidden');
        copiedMsg.classList.add('hidden');
    }, 2000);
}

// Discord tag reveal
function showDiscordTag() {
    const discordTag = document.getElementById('discord-tag');
    discordTag.textContent = 'wamysess#2259';
    
    // Optional: Copy to clipboard
    navigator.clipboard.writeText('wamysess#2259');
    
    // Flash confirmation
    discordTag.classList.add('text-green-300');
    setTimeout(() => {
        discordTag.classList.remove('text-green-300');
    }, 1000);
}

document.addEventListener('DOMContentLoaded', function() {


    // Optional: Animate all skills when section comes into view
    const skillsSection = document.getElementById('skills');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-level div');
                skillBars.forEach(bar => {
                    const level = bar.getAttribute('data-level');
                    bar.style.width = level + '%';
                    
                    // Add percentage text
                    const percentageText = document.createElement('span');
                    percentageText.className = 'skill-percentage absolute bottom-1 right-2 text-xs font-bold text-indigo-600';
                    percentageText.textContent = level + '%';
                    bar.parentElement.appendChild(percentageText);
                });
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    if (skillsSection) {
        observer.observe(skillsSection);
    }

    const sliderContainer = document.querySelector('.skills-slider-container');
    const sliderTrack = document.querySelector('.skills-slider-track');
    const slides = document.querySelectorAll('.skill-slide');
    const prevBtn = document.querySelector('.skill-prev');
    const nextBtn = document.querySelector('.skill-next');
    
    let currentIndex = 0;
    const slideWidth = slides[0].offsetWidth + 12; // width + gap (px-3 = 0.75rem = 12px)
    const visibleSlides = Math.min(4, Math.floor(sliderContainer.offsetWidth / slideWidth));
    const totalSlides = slides.length;
    
    // Clone slides for infinite loop
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        sliderTrack.appendChild(clone);
    });
    
    // Auto-slide
    let autoSlideInterval = setInterval(nextSlide, 3000);
    
    function updateSlider() {
        sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
        
        // Reset timer when manually navigating
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 3000);
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
        
        // Reset timer when manually navigating
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 3000);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Pause on hover
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 3000);
    });
    
    // Responsive adjustments
    window.addEventListener('resize', () => {
        slideWidth = slides[0].offsetWidth + 12;
        updateSlider();
    });
    
    // Initialize
    updateSlider();
});



const projects = {
    aquanet: {
        title: "Aquanet",
        images: [
            "assets/projects/aquanet/project1.png",
            "assets/projects/aquanet/project1.2.png",
            "assets/projects/aquanet/project1.3.png",
            "assets/projects/aquanet/project1.4.png",
            "assets/projects/aquanet/project1.5.png",
            "assets/projects/aquanet/project1.6.jpg",
            // Add more images
        ]
    },

    NTC_scanners: {
        title: "NTC OCR License/Permits Scanner",
        images: [
            "assets/projects/scanners/1.png",
            "assets/projects/scanners/2.png",
            "assets/projects/scanners/3.jpg",   
        ]
    },

    humidity: {
        title: "Simple Humidity and Temperature Monitor",
        images: [
            "assets/projects/humidity/1.png",
            "assets/projects/humidity/2.png",   
        ]
    }
};

let currentProject = null;
let currentIndex = 0;
let startX = 0;
let isDragging = false;

// Initialize project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        const projectId = this.getAttribute('data-project');
        openGallery(projectId);
    });
});

function openGallery(projectId) {
    const project = projects[projectId];
    if (!project) return;
    
    currentProject = projectId;
    currentIndex = 0;
    
    // Set title
    document.getElementById('gallery-title').textContent = project.title;
    
    // Load images
    const track = document.getElementById('gallery-track');
    const thumbnails = document.getElementById('gallery-thumbnails');
    track.innerHTML = '';
    thumbnails.innerHTML = '';
    
    project.images.forEach((image, index) => {
        // Main image
        const imgContainer = document.createElement('div');
        imgContainer.className = 'flex-shrink-0 w-full h-full flex items-center justify-center';
        
        const img = document.createElement('img');
        img.src = image;
        img.alt = `${project.title} screenshot ${index + 1}`;
        img.className = 'max-w-full max-h-full object-contain';
        img.dataset.index = index;
        
        imgContainer.appendChild(img);
        track.appendChild(imgContainer);
        
        // Thumbnail
        const thumbContainer = document.createElement('div');
        thumbContainer.className = `flex-shrink-0 w-16 h-16 rounded overflow-hidden cursor-pointer ${index === 0 ? 'ring-2 ring-blue-500' : ''}`;
        thumbContainer.onclick = () => goToImage(index);
        
        const thumbImg = document.createElement('img');
        thumbImg.src = image;
        thumbImg.alt = `Thumbnail ${index + 1}`;
        thumbImg.className = 'w-full h-full object-cover';
        
        thumbContainer.appendChild(thumbImg);
        thumbnails.appendChild(thumbContainer);
    });
    
    // Show modal
    document.getElementById('gallery-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Update position
    updateGalleryPosition();
}

function closeGallery() {
    document.getElementById('gallery-modal').classList.add('hidden');
    document.body.style.overflow = '';
}

function updateGalleryPosition() {
    const track = document.getElementById('gallery-track');
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update active thumbnail
    document.querySelectorAll('#gallery-thumbnails > div').forEach((thumb, index) => {
        thumb.classList.toggle('ring-2', index === currentIndex);
        thumb.classList.toggle('ring-blue-500', index === currentIndex);
    });
}

function goToImage(index) {
    currentIndex = index;
    updateGalleryPosition();
}

function prevImage() {
    if (currentIndex > 0) {
        currentIndex--;
        updateGalleryPosition();
    }
}

function nextImage() {
    const project = projects[currentProject];
    if (currentIndex < project.images.length - 1) {
        currentIndex++;
        updateGalleryPosition();
    }
}

// Touch/swipe handling
const galleryModal = document.getElementById('gallery-modal');
const track = document.getElementById('gallery-track');

galleryModal.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    track.style.transition = 'none';
});

galleryModal.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const x = e.touches[0].clientX;
    const diff = startX - x;
    track.style.transform = `translateX(calc(-${currentIndex * 100}% - ${diff}px))`;
});

galleryModal.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = 'transform 0.3s ease-out';
    
    const x = e.changedTouches[0].clientX;
    const diff = startX - x;
    
    if (diff > 50 && currentIndex < projects[currentProject].images.length - 1) {
        nextImage();
    } else if (diff < -50 && currentIndex > 0) {
        prevImage();
    } else {
        updateGalleryPosition();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (document.getElementById('gallery-modal').classList.contains('hidden')) return;
    
    if (e.key === 'Escape') {
        closeGallery();
    } else if (e.key === 'ArrowLeft') {
        prevImage();
    } else if (e.key === 'ArrowRight') {
        nextImage();
    }
});