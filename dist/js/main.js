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

  // 5. Interactive Calculator / Simulator Logic
  const calcSlider = document.getElementById('calcSlider');
  const calcNumberInput = document.getElementById('calcNumberInput');
  const serviceButtons = document.querySelectorAll('.calc-service-btn');
  const cropSelect = document.getElementById('calcCropType');
  const sendCalcBtn = document.getElementById('btnSendCalcWhatsApp');

  const rangeLabel = document.getElementById('rangeLabel');
  const rangeUnit = document.getElementById('rangeUnit');
  const scaleMin = document.getElementById('scaleMin');
  const scaleMid = document.getElementById('scaleMid');
  const scaleMax = document.getElementById('scaleMax');

  const resServiceTitle = document.getElementById('resServiceTitle');
  const resTempo = document.getElementById('resTempo');
  const resRendimento = document.getElementById('resRendimento');
  const resBeneficio = document.getElementById('resBeneficio');
  const resBeneficioSub = document.getElementById('resBeneficioSub');
  const resPreco = document.getElementById('resPreco');

  let currentServiceType = 'pulverizacao';

  const serviceConfigs = {
    pulverizacao: {
      title: 'Pulverização Aérea com Drone',
      label: 'Tamanho da Área a Pulverizar:',
      unit: 'ha',
      min: 10,
      max: 1000,
      defaultVal: 100,
      scaleMin: '10 ha',
      scaleMid: '500 ha',
      scaleMax: '1.000+ ha',
      calc: (val) => {
        const dias = Math.max(1, Math.ceil(val / 120));
        return {
          tempo: dias === 1 ? '~1 Dia útil' : `~${dias} a ${dias + 1} Dias`,
          rendimento: 'Rendimento de alto padrão por dia',
          beneficio: '0% Amassamento',
          beneficioSub: 'Economia substancial de água e defensivos sem perda de plantas',
          preco: val >= 300 ? 'Condição Especial para Grande Área' : 'Orçamento Rápido por Hectare'
        };
      }
    },
    adubacao: {
      title: 'Dispersão de Sólidos & Sementes',
      label: 'Área para Adubação / Semeadura:',
      unit: 'ha',
      min: 10,
      max: 1000,
      defaultVal: 80,
      scaleMin: '10 ha',
      scaleMid: '500 ha',
      scaleMax: '1.000+ ha',
      calc: (val) => {
        const dias = Math.max(1, Math.ceil(val / 90));
        return {
          tempo: dias === 1 ? '~1 Dia' : `~${dias} a ${dias + 1} Dias`,
          rendimento: 'Distribuição homogênea com vazão dosada',
          beneficio: 'Distribuição Uniforme',
          beneficioSub: 'Sem desperdício de insumos com aplicação localizada',
          preco: 'Excelente Custo x Benefício / ha'
        };
      }
    },
    escavadeira: {
      title: 'Escavadeira Hidráulica & Terraplanagem',
      label: 'Estimativa de Horas de Trabalho:',
      unit: 'hrs',
      min: 10,
      max: 200,
      defaultVal: 30,
      scaleMin: '10 hrs',
      scaleMid: '100 hrs',
      scaleMax: '200+ hrs',
      calc: (val) => {
        const dias = Math.max(1, Math.ceil(val / 9));
        return {
          tempo: dias === 1 ? '~1 a 2 Dias de Operação' : `~${dias} Dias úteis (${val}h de máquina)`,
          rendimento: 'Maquinário pesado de grande porte com operador experiente',
          beneficio: 'Alta Produtividade',
          beneficioSub: 'Abertura técnica de açudes, drenagem e nivelamento robusto',
          preco: 'Diária ou Hora de Máquina Fechada'
        };
      }
    },
    mapeamento: {
      title: 'Mapeamento Aéreo & Topografia com Drone',
      label: 'Área Total para Mapeamento:',
      unit: 'ha',
      min: 20,
      max: 2000,
      defaultVal: 250,
      scaleMin: '20 ha',
      scaleMid: '1.000 ha',
      scaleMax: '2.000+ ha',
      calc: (val) => {
        const dias = Math.max(1, Math.ceil(val / 350));
        return {
          tempo: dias === 1 ? '~24 a 48h para entrega' : `~${dias + 1} Dias (Voo + Processamento)`,
          rendimento: 'Geração de Ortomosaico, Curvas de Nível e Modelo 3D',
          beneficio: 'Precisão Centimétrica',
          beneficioSub: 'Planejamento hídrico, relevo e demarcação de talhões',
          preco: 'Preço Sob Medida por Extensão'
        };
      }
    }
  };

  function updateCalculator() {
    const config = serviceConfigs[currentServiceType];
    if (!config) return;

    const val = parseInt(calcNumberInput.value, 10) || config.min;
    const res = config.calc(val);

    resServiceTitle.textContent = config.title;
    resTempo.textContent = res.tempo;
    resRendimento.textContent = res.rendimento;
    resBeneficio.textContent = res.beneficio;
    resBeneficioSub.textContent = res.beneficioSub;
    resPreco.textContent = res.preco;
  }

  function setServiceType(type) {
    if (!serviceConfigs[type]) return;
    currentServiceType = type;

    serviceButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-service') === type);
    });

    const cfg = serviceConfigs[type];
    rangeLabel.textContent = cfg.label;
    rangeUnit.textContent = cfg.unit;
    scaleMin.textContent = cfg.scaleMin;
    scaleMid.textContent = cfg.scaleMid;
    scaleMax.textContent = cfg.scaleMax;

    calcSlider.min = cfg.min;
    calcSlider.max = cfg.max;
    calcSlider.value = cfg.defaultVal;

    calcNumberInput.min = cfg.min;
    calcNumberInput.max = cfg.max * 3;
    calcNumberInput.value = cfg.defaultVal;

    updateCalculator();
  }

  if (calcSlider && calcNumberInput) {
    calcSlider.addEventListener('input', (e) => {
      calcNumberInput.value = e.target.value;
      updateCalculator();
    });

    calcNumberInput.addEventListener('input', (e) => {
      let val = parseInt(e.target.value, 10);
      if (!isNaN(val)) {
        calcSlider.value = Math.min(val, calcSlider.max);
        updateCalculator();
      }
    });

    serviceButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const sType = btn.getAttribute('data-service');
        setServiceType(sType);
      });
    });

    if (cropSelect) {
      cropSelect.addEventListener('change', updateCalculator);
    }

    if (sendCalcBtn) {
      sendCalcBtn.addEventListener('click', () => {
        const config = serviceConfigs[currentServiceType];
        const val = calcNumberInput.value;
        const crop = cropSelect ? cropSelect.value : 'Não informado';
        const tempo = resTempo.textContent;
        const benef = resBeneficio.textContent;

        const msgText = `*Olá Agrodrones! Realizei uma simulação no site:*%0A` +
          `🚜 *Serviço:* ${encodeURIComponent(config.title)}%0A` +
          `📐 *Volume/Área:* ${encodeURIComponent(val)} ${encodeURIComponent(config.unit)}%0A` +
          `🌱 *Aplicação/Cultura:* ${encodeURIComponent(crop)}%0A` +
          `⏱️ *Tempo Estimado:* ${encodeURIComponent(tempo)}%0A` +
          `✨ *Destaque:* ${encodeURIComponent(benef)}%0A` +
          `%0A*Gostaria de receber a cotação formal e confirmar disponibilidade na minha região.*`;

        const whatsappUrl = `https://wa.me/5599981300824?text=${msgText}`;
        window.open(whatsappUrl, '_blank');
      });
    }

    // Initialize with default
    setServiceType('pulverizacao');
  }
});

