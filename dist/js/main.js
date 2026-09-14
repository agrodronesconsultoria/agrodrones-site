document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const siteHeader = document.querySelector('.site-header');

  if (mobileBtn && siteHeader) {
    mobileBtn.addEventListener('click', () => {
      siteHeader.classList.toggle('mobile-open');
      const icon = mobileBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        siteHeader.classList.remove('mobile-open');
      });
    });
  }

  // 2. Hero Slider
  const slides = document.querySelectorAll('.hero-slide');
  let currentSlide = 0;
  const totalSlides = slides.length;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  }

  const nextBtn = document.getElementById('heroNext');
  const prevBtn = document.getElementById('heroPrev');

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetInterval();
    });
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetInterval();
    });
  }

  function startInterval() {
    slideInterval = setInterval(nextSlide, 6000);
  }

  function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
  }

  if (slides.length > 1) {
    startInterval();
  }

  // 3. Gallery Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 4. Interactive Quote Form sending to WhatsApp
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const phone = document.getElementById('clientPhone').value.trim();
      const service = document.getElementById('clientService').value;
      const area = document.getElementById('clientArea').value.trim();
      const msg = document.getElementById('clientMessage').value.trim();

      let serviceName = "Serviços Gerais";
      if (service === "drone") serviceName = "Pulverização com Drone Agrícola";
      if (service === "escavadeira") serviceName = "Escavadeira Hidráulica / Terraplanagem";
      if (service === "ambos") serviceName = "Drones & Escavadeira";
      if (service === "aereas") serviceName = "Imagens Aéreas & Topografia";

      const text = `*Olá Agrodrones! Gostaria de um orçamento:*%0A` +
        `👤 *Nome:* ${encodeURIComponent(name)}%0A` +
        `📞 *Telefone:* ${encodeURIComponent(phone)}%0A` +
        `🚜 *Serviço:* ${encodeURIComponent(serviceName)}%0A` +
        `📐 *Área:* ${encodeURIComponent(area || "Não informado")} hectares%0A` +
        `💬 *Detalhes:* ${encodeURIComponent(msg || "Gostaria de mais informações.")}`;

      const whatsappUrl = `https://wa.me/5599981300824?text=${text}`;
      window.open(whatsappUrl, '_blank');
    });
  }
});
