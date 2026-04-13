document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("bg-toggle");
  const body = document.body;

  // 1. Background Toggle Logic
  const preloadImages = () => {
    const images = [
      '../images/light-pollution-cape-town-no-stars.jpg',
      '../images/light-pollution-cape-town-stars.jpg'
    ];
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  };

  const updateBackground = () => {
    if (toggle) {
      body.classList.toggle("alt-background", toggle.checked);
    }
  };

  if (toggle) {
    toggle.addEventListener("change", updateBackground);
  }

  // 2. Typewriter Logic - wait for fonts to load before measuring
  const initTypewriter = () => {
    const logoTypewriter = document.querySelector('.brand-link .typewriter-text');
    if (logoTypewriter) {
      // Measure the full width of the text by temporarily setting overflow visible
      const measure = () => {
        logoTypewriter.style.width = 'auto';
        logoTypewriter.style.position = 'absolute';
        logoTypewriter.style.visibility = 'hidden';
        const fullWidth = logoTypewriter.offsetWidth;
        logoTypewriter.style.position = '';
        logoTypewriter.style.visibility = '';
        logoTypewriter.style.width = '0';
        return fullWidth;
      };

      const fullWidth = measure();
      logoTypewriter.style.setProperty('--full-width', fullWidth + 'px');

      // Start the typing animation
      logoTypewriter.classList.add('typing');

      // When animation completes, add finished class
      const handleAnimationEnd = (event) => {
        if (event.animationName === 'typing') {
          logoTypewriter.classList.add('finished');
          logoTypewriter.removeEventListener('animationend', handleAnimationEnd);
        }
      };

      logoTypewriter.addEventListener('animationend', handleAnimationEnd);
    }
  };

  // Wait for custom fonts to load before measuring
  if (document.fonts.ready) {
    document.fonts.ready.then(() => {
      initTypewriter();
    });
  } else {
    // Fallback for browsers that don't support FontFaceSet
    setTimeout(initTypewriter, 500);
  }

  preloadImages();
  updateBackground();

  // 3. Full-Screen Slider Logic
  const sliderWrapper = document.querySelector('.slider-wrapper');
  const sliderDots = document.querySelectorAll('.slider-dot');
  let currentSlide = 0;

  const updateSlider = (index) => {
    if (!sliderWrapper || sliderDots.length === 0) return;
    currentSlide = index;
    sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    sliderDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  };

  if (sliderWrapper && sliderDots.length) {
    sliderDots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        const slideIndex = parseInt(e.target.dataset.slide);
        updateSlider(slideIndex);
      });
    });

    // Auto-advance slider every 6 seconds
    setInterval(() => {
      updateSlider((currentSlide + 1) % sliderDots.length);
    }, 6000);
  }

  const menuToggle = document.getElementById('menuToggle');
  const bottomMenu = document.getElementById('bottomMenu');

  if (menuToggle && bottomMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = bottomMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      document.getElementById('menuContent').setAttribute('aria-hidden', String(!isOpen));
    });
  }
});