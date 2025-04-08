(function () {
  // Belirli bir selector için elementi bekler, belirli sayıda deneme sonunda fallback olarak document.body kullanır.
  function waitForElement(selector, callback, interval = 100, maxAttempts = 50) {
    let attempts = 0;
    const intervalId = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(intervalId);
        callback(element);
      } else if (++attempts >= maxAttempts) {
        clearInterval(intervalId);
        console.warn(`[filintaSection] '${selector}' bulunamadı. Fallback olarak document.body kullanılıyor.`);
        callback(document.body);
      }
    }, interval);
  }
  
  function addFilintaSection(targetDiv) {
    if (!targetDiv) return;
    if (document.querySelector('.filinta-section')) return;
  
    // Yeni container div’i oluşturuyoruz ve tüm HTML içeriğimizi içine ekliyoruz.
    const container = document.createElement('div');
    container.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
  
        .filinta-section {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px;
          background-color: #fff;
          color: #000;
          font-family: 'Poppins', sans-serif;
        }
  
        .filinta-title {
          text-align: center;
          font-size: 40px;
          font-weight: 700;
          margin-bottom: 40px;
          letter-spacing: 1px;
          color: #000;
        }
  
        .filinta-highlight {
          color: #556b2f;
        }
  
        .filinta-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 30px;
        }
  
        .filinta-col {
          flex: 1 1 300px;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
  
        .filinta-point {
          background-color: #fff;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          border-radius: 6px;
          padding: 20px;
        }
  
        .filinta-point h3 {
          font-size: 24px;
          font-weight: 700;
          color: #556b2f;
          margin-bottom: 10px;
        }
  
        .filinta-point p {
          font-size: 18px;
          line-height: 1.6;
          color: #444;
        }
  
        .filinta-col img {
          width: 280px;
          height: 380px;
          object-fit: cover;
          border-radius: 6px;
          margin: 0 auto;
        }
  
        .filinta-banner {
          text-align: center;
          margin: 40px 0 20px;
        }
  
        .filinta-banner img {
          max-width: 100%;
          height: auto;
        }
  
        .filinta-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          max-width: 1400px;
          margin: 0 auto;
          padding: 60px 20px;
          gap: 20px;
        }
  
        .filinta-left {
          flex: 1 1 400px;
          max-width: 600px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: left;
          padding-right: 20px;
        }
  
        .filinta-subtitle {
          font-size: 18px;
          font-weight: 600;
          color: #666;
          margin-bottom: 12px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
  
        .filinta-container .filinta-title {
          font-size: 48px;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 20px;
          color: #000;
          text-align: left;
        }
  
        .filinta-text {
          font-size: 20px;
          line-height: 1.6;
          color: #444;
        }
  
        .filinta-right {
          flex: 1 1 300px;
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }
  
        .filinta-video-wrapper {
          position: relative;
        }
  
        .filinta-video {
          width: 340px;
          height: 600px;
          object-fit: cover;
          border-radius: 8px;
          background: #000;
        }
  
        .sound-toggle {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(255,255,255,0.8);
          border: none;
          font-size: 20px;
          border-radius: 50%;
          cursor: pointer;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
  
        /* 🎯 Marquee */
        .marquee-wrapper {
          position: relative;
          overflow: hidden;
          padding: 150px 0;
        }
  
        .marquee-container {
          width: 200%;
          left: -50%;
          position: relative;
          overflow: hidden;
          transform-origin: center;
          margin-bottom: 40px;
          height: 120px;
        }
  
        .marquee {
          display: flex;
          align-items: center;
          will-change: transform;
          position: absolute;
          white-space: nowrap;
        }
  
        .marquee-content {
          display: inline-block;
        }
  
        .bg-dark {
          background-color: #000;
          transform: rotate(-8deg);
          z-index: 3;
        }
  
        .bg-light {
          background-color: #ccc;
          transform: rotate(6deg);
          z-index: 2;
        }
  
        .marquee-content img {
          height: 80px;
          margin-right: 60px;
          vertical-align: middle;
          filter: brightness(0) invert(1);
        }
  
        @media (max-width: 768px) {
          .filinta-container {
            flex-direction: column;
            padding: 20px;
          }
          .filinta-left, .filinta-right {
            max-width: 100%;
            flex: 1 1 100%;
            padding-right: 0;
          }
          .filinta-container .filinta-title {
            font-size: 32px;
          }
          .filinta-text {
            font-size: 18px;
          }
          .filinta-video {
            width: 100%;
            max-width: 340px;
            height: auto;
          }
          .marquee-wrapper {
            padding: 100px 0;
          }
          .marquee-container {
            height: 100px;
          }
          .marquee-content img {
            height: 60px;
            margin-right: 40px;
          }
        }
  
        /* ===== Before/After Slider Stilleri ===== */
        .ba-container {
          position: relative;
          width: 90%;
          max-width: 1000px;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
          background-color: #000;
          cursor: ew-resize;
          margin: 20px auto;
        }
        .ba-container img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          user-select: none;
          pointer-events: none;
        }
        .ba-after {
          clip-path: inset(0 50% 0 0);
          z-index: 2;
        }
        .ba-slider {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 4px;
          background-color: #fff;
          z-index: 3;
          transform: translateX(-2px);
        }
        .ba-handle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 30px;
          height: 30px;
          background: white;
          border: 2px solid #aaa;
          border-radius: 50%;
          font-weight: bold;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 4;
          cursor: ew-resize;
        }
        .ba-info {
          position: absolute;
          bottom: 20px;
          color: #fff;
          text-align: center;
          z-index: 5;
          background: rgba(0, 0, 0, 0.4);
          padding: 10px 15px;
          border-radius: 6px;
          transition: opacity 0.3s;
        }
        .ba-info-left {
          left: 20px;
        }
        .ba-info-right {
          right: 20px;
        }
        .ba-info .price p {
          margin: 0;
          font-size: 16px;
          line-height: 1.4;
        }
        .ba-info .price p:nth-child(2) {
          text-decoration: line-through;
          color: #ccc;
        }
        .ba-info .btn {
          display: inline-block;
          margin-top: 8px;
          padding: 8px 16px;
          background-color: #000;
          color: #fff;
          text-decoration: none;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .ba-info .btn:hover {
          background-color: #556b2f;
        }
        .ba-title {
          text-align: center;
          margin-top: 20px;
          font-size: 24px;
          color: #333;
        }
      </style>
  
      <!-- Filinta Section -->
      <div class="filinta-section">
        <h2 class="filinta-title">Neden <span class="filinta-highlight">FilintaModa</span>?</h2>
        <div class="filinta-row">
          <div class="filinta-col">
            <div class="filinta-point">
              <h3>Üstün Kumaş Kalitesi</h3>
              <p>Nefes alabilir ve pamuklu kumaşlarla konforlu bir deneyim sunar.</p>
            </div>
            <div class="filinta-point">
              <h3>Modern ve Şık Tasarım</h3>
              <p>Sezonun trendlerini yakalayan renk ve kesimlerle stilinizi yansıtın.</p>
            </div>
          </div>
          <div class="filinta-col">
            <img src="https://cdn.myikas.com/images/f6be0a16-369e-491e-9e6a-41737db55fc0/4b68541b-426e-40ec-90e3-76d1b6fca0cd/2560/img-20241219-wa0003.webp" alt="FilintaModa Ürünü">
          </div>
          <div class="filinta-col">
            <div class="filinta-point">
              <h3>Nefes Alabilir Kumaş</h3>
              <p>Terletmeyen, hava sirkülasyonu sağlayan dokuma teknikleriyle ferah hissedin.</p>
            </div>
            <div class="filinta-point">
              <h3>Rahatlık ve Uygun Fiyat</h3>
              <p>Konforlu kalıplar ve uygun fiyatlarla modaya yön verin.</p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Filinta Banner -->
      <div class="filinta-banner">
        <img src="https://cdn.myikas.com/images/theme-images/e160a7a6-cfc1-4b49-a98b-e577924c101a/image_2560.webp" alt="Jean Banner">
      </div>
  
      <!-- Filinta İçerik -->
      <div class="filinta-container">
        <div class="filinta-left">
          <p class="filinta-subtitle">FONKSİYONEL VE ŞIK TASARIMLAR</p>
          <h2 class="filinta-title">FilintaModa ile Özgürlüğü Hissedin ve Tarzınızı Yansıtın!</h2>
          <p class="filinta-text">Kıyafet sadece bir giyim ürünü değil, aynı zamanda bir yaşam tarzıdır. FilintaModa, günlük hayatınıza hem konforu hem de şıklığı bir arada sunar.</p>
        </div>
        <div class="filinta-right">
          <div class="filinta-video-wrapper">
            <video class="filinta-video" src="https://cdn.myikas.com/videos/f6be0a16-369e-491e-9e6a-41737db55fc0/ecf82b43-6926-4d99-b57b-29c3290b0c43/original.mp4" autoplay loop muted playsinline></video>
            <button class="sound-toggle">🔇</button>
          </div>
          <div class="filinta-video-wrapper">
            <video class="filinta-video" src="https://cdn.myikas.com/videos/f6be0a16-369e-491e-9e6a-41737db55fc0/3e2abc1b-b00e-4e06-82ab-a3bd9ed18234/original.mp4" autoplay loop muted playsinline></video>
            <button class="sound-toggle">🔇</button>
          </div>
        </div>
      </div>
  
      <!-- Marquee Alanları -->
      <div class="marquee-wrapper">
        <div class="marquee-container bg-dark">
          <div class="marquee" id="marquee1">
            <div class="marquee-content">
              ${'<img src="https://cdn.myikas.com/images/theme-images/55323615-6ef9-4207-bbcd-46cd57be300a/image_540.webp" alt="Logo">'.repeat(15)}
            </div>
          </div>
        </div>
        <div class="marquee-container bg-light">
          <div class="marquee" id="marquee2">
            <div class="marquee-content">
              ${'<img src="https://cdn.myikas.com/images/theme-images/55323615-6ef9-4207-bbcd-46cd57be300a/image_540.webp" alt="Logo">'.repeat(15)}
            </div>
          </div>
        </div>
      </div>
  
      <!-- Before/After Slider (Artık ayrı fonksiyon yerine bu container içerisine eklendi) -->
      <h1 class="ba-title">Siyah ve Beyazın muhteşem uyumu</h1>
      <div class="ba-container" id="ba-container">
        <a href="https://filintamoda.com/gomlekli-vip-desenli-takim-4" target="_blank">
          <img src="https://cdn.myikas.com/images/f6be0a16-369e-491e-9e6a-41737db55fc0/91688706-1b5d-4692-bd72-fda6b5126d81/image_1080.webp" alt="Siyah Kıyafet">
        </a>
        <a href="https://filintamoda.com/gomlekli-vip-desenli-takim" target="_blank">
          <img src="https://cdn.myikas.com/images/f6be0a16-369e-491e-9e6a-41737db55fc0/c74c65f7-1f43-4068-9eff-4b80a7233ed4/image_1080.webp" class="ba-after" id="afterImg" alt="Beyaz Kıyafet">
        </a>
        <div class="ba-slider" id="slider"></div>
        <div class="ba-handle" id="handle">⇆</div>
        <div class="ba-info ba-info-left" id="infoLeft">
          <div class="price">
            <p>Fiyatı: 1999TL</p>
            <p>Satış Fiyatı: 1599TL</p>
          </div>
          <a href="https://filintamoda.com/gomlekli-vip-desenli-takim-4" target="_blank" class="btn">Ürünü İncele</a>
        </div>
        <div class="ba-info ba-info-right" id="infoRight">
          <div class="price">
            <p>Fiyatı: 1999TL</p>
            <p>Satış Fiyatı: 1690TL</p>
          </div>
          <a href="https://filintamoda.com/gomlekli-vip-desenli-takim" target="_blank" class="btn">Ürünü İncele</a>
        </div>
      </div>
    `;
  
    // Hedef element document.body ise appendChild ile, değilse afterend ile ekliyoruz.
    if (targetDiv === document.body) {
      document.body.appendChild(container);
    } else {
      targetDiv.insertAdjacentElement("afterend", container);
    }
  
    // 200ms sonra çeşitli fonksiyonları (video ses kontrolleri, marquee animasyonu, before/after slider eventleri) başlatıyoruz.
    setTimeout(() => {
      // Ses kontrolü için event ekleme
      const toggles = container.querySelectorAll('.sound-toggle');
      toggles.forEach(btn => {
        btn.addEventListener('click', () => {
          const video = btn.parentElement.querySelector('video');
          if (video) {
            video.muted = !video.muted;
            btn.textContent = video.muted ? '🔇' : '🔊';
          }
        });
      });
  
      // Marquee başlatıcı fonksiyon
      function initMarquee(marqueeElement, baseSpeed, direction) {
        const contentEl = marqueeElement.querySelector('.marquee-content');
        contentEl.innerHTML += contentEl.innerHTML;
        const contentWidth = contentEl.scrollWidth / 2;
        let pos = 0, speedMultiplier = 1, lastScrollY = window.scrollY, velocity = 0;
        const damping = 0.1;
  
        function animate() {
          velocity *= (1 - damping);
          pos -= (baseSpeed * speedMultiplier * direction) + velocity;
          if (direction === 1 && pos <= -contentWidth) pos += contentWidth;
          if (direction === -1 && pos >= contentWidth) pos -= contentWidth;
          marqueeElement.style.transform = `translateX(${pos}px)`;
          requestAnimationFrame(animate);
        }
  
        function adjustSpeed() {
          const scrollChange = window.scrollY - lastScrollY;
          velocity = scrollChange * 0.5;
          lastScrollY = window.scrollY;
          speedMultiplier = 1 + Math.abs(velocity) / 40;
        }
  
        function resetSpeed() {
          speedMultiplier = 1;
        }
  
        window.addEventListener("wheel", adjustSpeed);
        window.addEventListener("scroll", resetSpeed);
        animate();
      }
  
      initMarquee(container.querySelector('#marquee1'), 0.2, 1);
      initMarquee(container.querySelector('#marquee2'), 0.2, -1);
  
      // Before/After slider için event'leri başlatıyoruz
      initializeBeforeAfter();
    }, 200);
  }
  
  function initializeBeforeAfter() {
    const container = document.getElementById('ba-container');
    if (!container) return;
    
    const slider = document.getElementById('slider');
    const afterImg = document.getElementById('afterImg');
    const handle = document.getElementById('handle');
    const infoLeft = document.getElementById('infoLeft');
    const infoRight = document.getElementById('infoRight');
    let isDragging = false;
  
    function moveSlider(e) {
      const rect = container.getBoundingClientRect();
      let posX = e.clientX - rect.left;
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
    
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      moveSlider(e);
    });
    
    window.addEventListener('mouseup', () => {
      isDragging = false;
    });
  
    container.addEventListener('touchstart', (e) => {
      e.preventDefault();
      isDragging = true;
      moveSlider(e.touches[0]);
    });
    
    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      moveSlider(e.touches[0]);
    });
    
    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  }
  
  function observeUrlChanges() {
    let lastUrl = location.href;
    new MutationObserver(() => {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        runFilintaSection();
      }
    }).observe(document.body, { childList: true, subtree: true });
  
    const originalPushState = history.pushState;
    history.pushState = function () {
      originalPushState.apply(this, arguments);
      runFilintaSection();
    };
    const originalReplaceState = history.replaceState;
    history.replaceState = function () {
      originalReplaceState.apply(this, arguments);
      runFilintaSection();
    };
    window.addEventListener('popstate', runFilintaSection);
  }
  
  function runFilintaSection() {
    waitForElement('.grid.grid-cols-1.sm\\:grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3.xl\\:grid-cols-3', addFilintaSection);
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      runFilintaSection();
      observeUrlChanges();
    });
  } else {
    runFilintaSection();
    observeUrlChanges();
  }
})();
