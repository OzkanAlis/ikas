document.addEventListener('DOMContentLoaded', () => {
    // Marquee Content Creation
    const marqueeContents = document.querySelectorAll('.marquee-content');
    marqueeContents.forEach(content => {
      for (let i = 0; i < 15; i++) {
        const img = document.createElement('img');
        img.src = 'https://cdn.myikas.com/images/theme-images/55323615-6ef9-4207-bbcd-46cd57be300a/image_540.webp';
        img.alt = 'FilintaModa Logosu';
        content.appendChild(img);
      }
    });
  
    // Sound Toggle
    document.querySelectorAll('.sound-toggle').forEach(button => {
      button.addEventListener('click', () => {
        const video = button.previousElementSibling;
        video.muted = !video.muted;
        button.textContent = video.muted ? '🔇' : '🔊';
        button.setAttribute('aria-pressed', !video.muted);
      });
    });
  
    // Marquee Animation
    function initMarquee(marqueeElement, baseSpeed, direction) {
      const contentEl = marqueeElement.querySelector('.marquee-content');
      contentEl.innerHTML += contentEl.innerHTML; // Duplicate content for seamless looping
      const contentWidth = contentEl.scrollWidth / 2;
      let pos = 0;
  
      function animate() {
        pos -= baseSpeed * direction;
        if (direction === 1 && pos <= -contentWidth) pos += contentWidth;
        if (direction === -1 && pos >= contentWidth) pos -= contentWidth;
        marqueeElement.style.transform = `translateX(${pos}px)`;
        requestAnimationFrame(animate);
      }
  
      animate();
    }
  
    const marquee1 = document.querySelector('#marquee1');
    const marquee2 = document.querySelector('#marquee2');
    if (marquee1) initMarquee(marquee1, 0.3, 1); // Hız artırıldı
    if (marquee2) initMarquee(marquee2, 0.3, -1); // Hız artırıldı
  
    // Before/After Slider
    const container = document.getElementById('ba-container');
    if (container) {
      const slider = document.getElementById('slider');
      const afterImg = document.getElementById('afterImg');
      const handle = document.getElementById('handle');
      const infoLeft = document.getElementById('infoLeft');
      const infoRight = document.getElementById('infoRight');
      let isDragging = false;
  
      function moveSlider(e) {
        const rect = container.getBoundingClientRect();
        let posX = (e.clientX || e.touches[0].clientX) - rect.left;
        posX = Math.max(0, Math.min(posX, rect.width));
        const percent = (posX / rect.width) * 100;
        afterImg.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
        slider.style.left = `${percent}%`;
        handle.style.left = `${percent}%`;
        const tolerance = 0.05 * rect.width;
        if (Math.abs(posX - rect.width / 2) <= tolerance) {
          infoLeft.style.opacity = 1;
          infoRight.style.opacity = 1;
        } else if (posX < rect.width / 2) {
          infoLeft.style.opacity = 1;
          infoRight.style.opacity = 0;
        } else {
          infoLeft.style.opacity = 0;
          infoRight.style.opacity = 1;
        }
      }
  
      container.addEventListener('mousedown', (e) => {
        isDragging = true;
        moveSlider(e);
      });
  
      container.addEventListener('touchstart', (e) => {
        e.preventDefault();
        isDragging = true;
        moveSlider(e);
      });
  
      window.addEventListener('mousemove', (e) => {
        if (isDragging) moveSlider(e);
      });
  
      window.addEventListener('touchmove', (e) => {
        if (isDragging) moveSlider(e);
      });
  
      window.addEventListener('mouseup', () => {
        isDragging = false;
      });
  
      window.addEventListener('touchend', () => {
        isDragging = false;
      });
    }
});