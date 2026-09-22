document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const progress = document.querySelector('.progress-rail span');
  const revealItems = document.querySelectorAll('.reveal');
  const form = document.querySelector('#enquiryForm') || document.querySelector('#enquire form');
  const formMessage = document.querySelector('#formMessage');
  const navLinks = document.querySelectorAll('.navbar .nav-link');

  const updateScrollState = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.height = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
  };

  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => revealObserver.observe(item));

  navLinks.forEach((link) => link.addEventListener('click', () => {
    const menu = document.querySelector('#mainNav');
    if (menu.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(menu).hide();
  }));

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    formMessage.classList.remove('d-none');
    form.reset();
  });

  document.querySelector('.play').addEventListener('click', (event) => {
    const button = event.currentTarget;
    button.innerHTML = '<i class="bi bi-pause-fill"></i>';
    button.setAttribute('aria-label', 'Pause project film');
    button.classList.add('playing');
  });
});
