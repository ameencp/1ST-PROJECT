/**
 * WISDOM STUDENTS & ANTI-GRAVITY - 3-DAY WEB DEV WORKSHOP LANDING PAGE INTERACTIVES
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // --- Header Scroll Effect ---
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Mobile Navigation Menu Toggle ---
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  }

  hamburger.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // --- Smooth Scrolling for Navigation ---
  // Managed by HTML scroll-behavior: smooth, but we also ensure links update active state
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100; // Offset for header height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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

  // --- Interactive Schedule Tabs ---
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.schedule-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons and panels
      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      // Add active class to clicked button
      btn.classList.add('active');
      
      // Show corresponding panel
      const targetDay = btn.getAttribute('data-day');
      const targetPanel = document.getElementById(`day-${targetDay}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // --- FAQ Accordion ---
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all other FAQ items
      document.querySelectorAll('.faq-item').forEach(faqItem => {
        faqItem.classList.remove('active');
        faqItem.querySelector('.faq-answer').style.maxHeight = null;
      });

      // Toggle current FAQ item
      if (!isActive) {
        item.classList.add('active');
        const answer = item.querySelector('.faq-answer');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // --- Registration Modal Popup ---
  const registerModal = document.getElementById('register-modal');
  const openModalBtns = document.querySelectorAll('.open-register-modal');
  const closeModalBtn = document.querySelector('.modal-close');
  const modalOverlay = document.querySelector('.modal-overlay');

  function openModal(e) {
    if (e) e.preventDefault();
    registerModal.classList.add('active');
    document.body.classList.add('no-scroll');
  }

  function closeModal() {
    registerModal.classList.remove('active');
    document.body.classList.remove('no-scroll');
    // Clear validation states
    regForm.reset();
    resetValidationFeedback();
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  // Close modal on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && registerModal.classList.contains('active')) {
      closeModal();
    }
  });

  // --- Forms Validation & Submission ---
  
  // 1. Registration Modal Form
  const regForm = document.getElementById('registration-form');
  const regSuccessMsg = document.getElementById('reg-success-msg');

  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simple validation
      const name = document.getElementById('reg-name').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const phone = document.getElementById('reg-phone').value.trim();
      
      if (name === '' || email === '' || phone === '') {
        alert('Please fill out all required fields.');
        return;
      }

      // If valid, show success state
      regForm.style.display = 'none';
      regSuccessMsg.style.display = 'block';

      // Reset and close modal after a brief delay
      setTimeout(() => {
        closeModal();
        // Reset form for next open
        setTimeout(() => {
          regForm.style.display = 'block';
          regSuccessMsg.style.display = 'none';
        }, 500);
      }, 3000);
    });
  }

  // 2. Contact Section Form
  const contactForm = document.getElementById('contact-form');
  const contactSuccessMsg = document.getElementById('contact-success-msg');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (name === '' || email === '' || message === '') {
        alert('Please fill out all required fields.');
        return;
      }

      // If valid, show success
      contactForm.style.display = 'none';
      contactSuccessMsg.style.display = 'block';

      // Reset form after a brief delay
      setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = 'block';
        contactSuccessMsg.style.display = 'none';
      }, 4000);
    });
  }

  function resetValidationFeedback() {
    // Utility to reset any customized warning states in inputs
  }

});
