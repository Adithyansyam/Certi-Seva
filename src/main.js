import './style.css'

// ===================================
// Smooth Scroll & Navigation
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  // Navigation scroll effect
  const nav = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Smooth scroll for anchor links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        const navLinksContainer = document.querySelector('.nav-links');
        if (navLinksContainer.classList.contains('active')) {
          navLinksContainer.classList.remove('active');
          menuToggle.classList.remove('active');
        }
      }
    });
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinksContainer = document.querySelector('.nav-links');

  if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
      menuToggle.classList.toggle('active');

      // Animate hamburger icon
      const spans = menuToggle.querySelectorAll('span');
      if (menuToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }
});

// ===================================
// Scroll Animations
// ===================================
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.problem-card, .solution-card, .feature-card, .step, .tech-card, .team-member');

  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(element);
  });
};

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', animateOnScroll);

// ===================================
// Download Button Interactions
// ===================================
const downloadButtons = document.querySelectorAll('.btn-download, .btn-primary[download]');
const APK_DOWNLOAD_URL = '/certiseva.apk';

downloadButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    // Only handle download if it's the actual download button
    if (button.classList.contains('btn-download') || button.textContent.includes('Download')) {
      e.preventDefault();

      // Create ripple effect
      const ripple = document.createElement('span');
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(0, 0, 0, 0.2)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.6s ease-out';
      ripple.style.pointerEvents = 'none';

      button.style.position = 'relative';
      button.style.overflow = 'hidden';
      button.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);

      // Handle download action
      showNotification('Downloading CertiSeva APK...');

      // Create a temporary anchor element to trigger download
      const downloadLink = document.createElement('a');
      downloadLink.href = APK_DOWNLOAD_URL;
      downloadLink.download = 'CertiSeva.apk';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      // Show success message after a delay
      setTimeout(() => {
        showNotification('Download started! Check your downloads folder.');
      }, 1500);
    }
  });
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ===================================
// Notification System
// ===================================
function showNotification(message) {
  // Remove existing notification if any
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;

  // Style notification
  Object.assign(notification.style, {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    backgroundColor: '#2563eb',
    color: '#fff',
    padding: '1rem 1.5rem',
    borderRadius: '0.75rem',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    zIndex: '10000',
    animation: 'slideInRight 0.3s ease-out',
    fontFamily: 'Inter, sans-serif',
    fontWeight: '600',
    fontSize: '0.875rem'
  });

  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(notificationStyle);

// ===================================
// Active Navigation Highlighting
// ===================================
const sections = document.querySelectorAll('section[id]');

const observerOptions = {
  threshold: 0.3,
  rootMargin: '-80px 0px 0px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

// ===================================
// Loading Animation
// ===================================
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease-in';
    document.body.style.opacity = '1';
  }, 100);
});

// ===================================
// Accessibility Enhancements
// ===================================
// Focus visible for better keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});

// Add focus styles
const focusStyle = document.createElement('style');
focusStyle.textContent = `
  .keyboard-nav *:focus {
    outline: 2px solid #2563eb;
    outline-offset: 4px;
  }
`;
document.head.appendChild(focusStyle);

console.log('🚀 CertiSeva Landing Page Loaded Successfully!');
