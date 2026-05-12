// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add animation to elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.card, .princess, .btn').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Click animation effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.animation = 'ripple-animation 0.6s ease-out';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes float-animation {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Princess gallery interaction
const princesses = document.querySelectorAll('.princess');
princesses.forEach((princess, index) => {
    princess.addEventListener('click', function() {
        // Add celebration effect
        celebrateClick(this);
    });
    
    princess.addEventListener('mouseenter', function() {
        this.style.animation = 'float-animation 1s ease-in-out infinite';
    });
    
    princess.addEventListener('mouseleave', function() {
        this.style.animation = 'none';
    });
});

// Celebration effect with confetti
function celebrateClick(element) {
    const colors = ['#FF69B4', '#FFD700', '#DDA0DD', '#FFB6D9'];
    
    for (let i = 0; i < 5; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = element.offsetLeft + 50 + 'px';
        confetti.style.top = element.offsetTop + 50 + 'px';
        confetti.style.width = '8px';
        confetti.style.height = '8px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.animation = `confetti-fall ${2 + Math.random() * 1}s ease-in forwards`;
        
        const angle = (Math.PI * 2 * i) / 5;
        const velocity = 5 + Math.random() * 5;
        
        confetti.style.setProperty('--tx', Math.cos(angle) * velocity + 'px');
        confetti.style.setProperty('--ty', Math.sin(angle) * velocity + 'px');
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confetti-fall {
        to {
            transform: translateX(var(--tx)) translateY(var(--ty)) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Easter egg: Rainbow background on specific date
function checkSpecialDate() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    
    if (day === 25 && month === 7) {
        document.body.style.background = 'linear-gradient(45deg, #FF6B9D, #FFC75F, #845EC2, #FF9671, #FF6B9D)';
        document.body.style.backgroundSize = '400% 400%';
        document.body.style.animation = 'gradient-shift 15s ease infinite';
        
        const gradientStyle = document.createElement('style');
        gradientStyle.textContent = `
            @keyframes gradient-shift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        document.head.appendChild(gradientStyle);
    }
}

checkSpecialDate();

// Mobile menu optimization
if (window.innerWidth <= 768) {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.style.flex = '1';
    });
}

// Load animations
window.addEventListener('load', function() {
    // Add entrance animation to container
    const container = document.querySelector('.container');
    container.style.animation = 'slideDown 0.8s ease-out';
});

// Parallax effect for stars
window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    const stars = document.querySelector('.stars');
    if (stars) {
        stars.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
});