// Havfly Advert Interactive JS Controller

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Scroll Shadow
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 2. Mobile Nav Toggle Menu
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.className = 'fa-solid fa-xmark';
        } else {
          icon.className = 'fa-solid fa-bars';
        }
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  // 3. Interactive FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all items
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const icon = otherItem.querySelector('.faq-toggle-icon i');
          if (icon) icon.className = 'fa-solid fa-plus';
        });

        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
          const icon = item.querySelector('.faq-toggle-icon i');
          if (icon) icon.className = 'fa-solid fa-minus';
        }
      });
    }
  });

  // Ensure first FAQ is active on load
  if (faqItems.length > 0 && !document.querySelector('.faq-item.active')) {
    faqItems[0].classList.add('active');
    const firstIcon = faqItems[0].querySelector('.faq-toggle-icon i');
    if (firstIcon) firstIcon.className = 'fa-solid fa-minus';
  }

  // 4. Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // 5. Interactive ROI & Revenue Loss Calculator (INR)
  const adSpendInput = document.getElementById('ad-spend-range');
  const spendValDisplay = document.getElementById('spend-val-display');
  const savedRevenueDisplay = document.getElementById('saved-revenue');
  const downtimeDaysDisplay = document.getElementById('downtime-days');
  const summarySavedVal = document.getElementById('summary-saved-val');
  const presetButtons = document.querySelectorAll('.preset-pill');

  if (adSpendInput && spendValDisplay) {
    const formatINR = (val) => '₹' + Math.round(val).toLocaleString('en-IN');

    const updateSliderFill = (spend, min, max) => {
      const percentage = Math.min(Math.max(((spend - min) / (max - min)) * 100, 0), 100);
      adSpendInput.style.background = `linear-gradient(to right, #10B981 ${percentage}%, #E5E7EB ${percentage}%)`;
    };

    const calculateROI = () => {
      const spend = parseInt(adSpendInput.value, 10);
      const min = parseInt(adSpendInput.min, 10) || 25000;
      const max = parseInt(adSpendInput.max, 10) || 1000000;

      // Update Slider Visual Track Fill
      updateSliderFill(spend, min, max);

      // Format spend in INR
      spendValDisplay.textContent = formatINR(spend);

      // Calculations:
      // When accounts are banned, an average of 10 days of downtime costs ~36% of monthly potential ad revenue
      const estimatedLoss = Math.round(spend * 0.36);
      const downtimeDays = 10;

      if (savedRevenueDisplay) savedRevenueDisplay.textContent = formatINR(estimatedLoss);
      if (downtimeDaysDisplay) downtimeDaysDisplay.textContent = downtimeDays + ' Days';
      if (summarySavedVal) summarySavedVal.textContent = formatINR(estimatedLoss);

      // Update preset pills active state
      presetButtons.forEach(btn => {
        const btnVal = parseInt(btn.getAttribute('data-amount'), 10);
        if (btnVal === spend) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    };

    adSpendInput.addEventListener('input', calculateROI);

    presetButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const amount = parseInt(btn.getAttribute('data-amount'), 10);
        if (!isNaN(amount)) {
          adSpendInput.value = amount;
          calculateROI();
        }
      });
    });

    calculateROI();
  }

  // 6. Testimonials Carousel Controller (Matching Screenshots 3, 4, 5)
  const testiSlides = document.querySelectorAll('.testimonial-slide');
  const prevTestiBtn = document.getElementById('prev-testi-btn');
  const nextTestiBtn = document.getElementById('next-testi-btn');
  const testiDots = document.querySelectorAll('.testi-dot');
  let currentTestiIndex = 0;

  if (testiSlides.length > 0) {
    const showTestimonial = (index) => {
      if (index < 0) {
        currentTestiIndex = testiSlides.length - 1;
      } else if (index >= testiSlides.length) {
        currentTestiIndex = 0;
      } else {
        currentTestiIndex = index;
      }

      testiSlides.forEach((slide, i) => {
        if (i === currentTestiIndex) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      testiDots.forEach((dot, i) => {
        if (i === currentTestiIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };

    if (prevTestiBtn) {
      prevTestiBtn.addEventListener('click', () => {
        showTestimonial(currentTestiIndex - 1);
      });
    }

    if (nextTestiBtn) {
      nextTestiBtn.addEventListener('click', () => {
        showTestimonial(currentTestiIndex + 1);
      });
    }

    testiDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        showTestimonial(idx);
      });
    });

    // Touch swipe support for mobile devices
    const testiTrack = document.getElementById('testimonials-track');
    if (testiTrack) {
      let touchStartX = 0;
      let touchEndX = 0;

      testiTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      testiTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diffX = touchStartX - touchEndX;
        if (Math.abs(diffX) > 40) {
          if (diffX > 0) {
            showTestimonial(currentTestiIndex + 1);
          } else {
            showTestimonial(currentTestiIndex - 1);
          }
        }
      }, { passive: true });
    }
  }

  // 7. Modal Handler
  const modalOverlay = document.getElementById('success-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');

  if (closeModalBtn && modalOverlay) {
    closeModalBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }
});
