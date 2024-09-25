const slider = document.getElementById('slider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dots = document.getElementById('dots').children;

let currentIndex = 0;
let slides = document.querySelectorAll('.slide');
let totalSlides = slides.length;
let interval;
let autoSlide = true;

const updateSlider = () => {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  
  // Update dot active class
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove('active');
  }
  dots[currentIndex].classList.add('active');
};

// Next Slide
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlider();
});

// Previous Slide
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateSlider();
});

// Auto Slide
const startAutoSlide = () => {
  interval = setInterval(() => {
    if (autoSlide) {
      nextBtn.click();
    }
  }, 3000);
};

const stopAutoSlide = () => {
  clearInterval(interval);
};

// Pause on hover
slider.addEventListener('mouseenter', () => {
  autoSlide = false;
});

slider.addEventListener('mouseleave', () => {
  autoSlide = true;
});

// Pagination Dots
for (let i = 0; i < dots.length; i++) {
  dots[i].addEventListener('click', () => {
    currentIndex = i;
    updateSlider();
  });
}

// Swipe functionality for touch screens
let startX = 0;

slider.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

slider.addEventListener('touchend', (e) => {
  let endX = e.changedTouches[0].clientX;
  if (startX > endX + 50) {
    nextBtn.click();
  } else if (startX < endX - 50) {
    prevBtn.click();
  }
});

// Start auto slide on load
startAutoSlide();
