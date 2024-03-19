document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.slider-container');
    const slider = document.querySelector('.slider');
    const images = document.querySelectorAll('.slider img');
    let currentImageIndex = 0;
    let isAnimating = false;
    let startY = 0;
  
    function showImage(index) {
      if (isAnimating) return;
      isAnimating = true;
      
      images.forEach((img, i) => {
        if (i === index) {
          img.style.opacity = '1';
          img.style.transform = 'translateY(0)';
        } else {
          img.style.opacity = '0';
          img.style.transform = 'translateY(100%)';
        }
      });
  
      setTimeout(() => {
        isAnimating = false;
      }, 500); // Animation duration
    }
  
    showImage(currentImageIndex);
  
    sliderContainer.addEventListener('wheel', function(event) {
      event.preventDefault();
      if (event.deltaY > 0) {
        // Scrolling down
        currentImageIndex = (currentImageIndex + 1) % images.length;
      } else {
        // Scrolling up
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
      }
      showImage(currentImageIndex);
    });
  
    sliderContainer.addEventListener('touchstart', function(event) {
      startY = event.touches[0].clientY;
    });
  
    sliderContainer.addEventListener('touchmove', function(event) {
      event.preventDefault();
      const deltaY = event.touches[0].clientY - startY;
      if (deltaY > 50) {
        // Swiping down
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showImage(currentImageIndex);
      } else if (deltaY < -50) {
        // Swiping up
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showImage(currentImageIndex);
      }
    });
  });
  