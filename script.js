// ===========================
// Mobile Navigation Toggle
// ===========================
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu automatically when a nav link is clicked
const navLinks = mainNav.querySelectorAll('a');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

// ===========================
// Active Nav Link on Scroll
// ===========================
const sections = document.querySelectorAll('main section');

const observerOptions = {
  rootMargin: '-40% 0px -55% 0px', // triggers when section is near vertical center
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        link.classList.toggle('active-link', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, observerOptions);

sections.forEach((section) => sectionObserver.observe(section));

// ===========================
// Scroll-to-Top Button
// ===========================
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===========================
// Contact Form Validation
// ===========================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

function setError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const errorEl = document.getElementById(errorId);
  input.closest('.form-group').classList.toggle('invalid', Boolean(message));
  errorEl.textContent = message;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  let isValid = true;

  if (name.length < 2) {
    setError('name', 'nameError', 'Please enter your name.');
    isValid = false;
  } else {
    setError('name', 'nameError', '');
  }

  if (!isValidEmail(email)) {
    setError('email', 'emailError', 'Please enter a valid email address.');
    isValid = false;
  } else {
    setError('email', 'emailError', '');
  }

  if (message.length < 10) {
    setError('message', 'messageError', 'Message should be at least 10 characters.');
    isValid = false;
  } else {
    setError('message', 'messageError', '');
  }

  if (isValid) {
    formStatus.textContent = `Thanks, ${name}! Your message has been noted (demo only — no backend connected yet).`;
    formStatus.classList.add('success');
    contactForm.reset();
  } else {
    formStatus.textContent = '';
    formStatus.classList.remove('success');
  }
});

// ===========================
// Dark Mode Toggle
// ===========================
const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;

function applyTheme(theme) {
  if (theme === 'dark') {
    htmlEl.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '&#9789;'; // moon icon
  } else {
    htmlEl.removeAttribute('data-theme');
    themeToggle.innerHTML = '&#9728;'; // sun icon
  }
}

// Load saved preference, if any
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) {
  applyTheme(savedTheme);
}

themeToggle.addEventListener('click', () => {
  const isDark = htmlEl.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  applyTheme(newTheme);
  localStorage.setItem('portfolio-theme', newTheme);
});
