document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    const closeBtn = document.querySelector(".close-btn");
    const openInInstagram = document.getElementById("openInInstagram");
    const track = document.querySelector(".video-track");
    const cards = document.querySelectorAll(".video-card");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const dots = document.querySelectorAll(".dot-btn");
    const isMobile = window.innerWidth <= 768;
  
    // Modal kapatma işlevi
    const closeModal = function(e) {
      if (e) e.preventDefault();
      modal.style.display = "none";
      modalVideo.pause();
      modalVideo.src = "";
    };
  
    // Modal kapatma olayları
    closeBtn.addEventListener("click", closeModal);
    closeBtn.addEventListener("touchend", closeModal);
    
    // Modal dışına tıklayınca kapatma
    modal.addEventListener("click", function(e) {
      if (e.target === modal) {
        closeModal(e);
      }
    });
  
    // ESC tuşu ile kapatma
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape" && modal.style.display === "block") {
        closeModal(e);
      }
    });
  
    const videoLinks = [
      "https://www.instagram.com/basyaziciet/reel/DFaUxsYMd3f/",
      "https://www.instagram.com/basyaziciet/reel/DEIDqjVMx61/",
      "https://www.instagram.com/basyaziciet/reel/DC9GICHMYQf/",
      "https://www.instagram.com/basyaziciet/reel/DC3pL9Rs6xn/",
      "https://www.instagram.com/basyaziciet/reel/DCgh4iHMP8L/",
      "https://www.instagram.com/basyaziciet/reel/DDRvFaPMtjw/",
      "https://www.instagram.com/basyaziciet/reel/DEjjTA3M4CC/",
      "https://www.instagram.com/basyaziciet/reel/DFPtIx6Mjvz/"
    ];
  
    // Video kartları için tıklama/dokunma olayları
    cards.forEach((card, index) => {
      const video = card.querySelector("video");
      
      // Masaüstü için hover olayları
      if (!isMobile) {
        card.addEventListener("mouseenter", () => {
          video.play().catch(() => {});
        });
  
        card.addEventListener("mouseleave", () => {
          video.pause();
          video.currentTime = 0;
        });
      }
  
      const handleTap = function(e) {
        // Eğer kaydırma hareketi varsa video açılmasın
        if (isDragging) {
          e.preventDefault();
          return;
        }
  
        e.preventDefault();
        const videoSrc = video.getAttribute("src");
        modal.style.display = "block";
        modalVideo.src = videoSrc;
        modalVideo.muted = false;
        modalVideo.play().catch(() => {
          console.log("Video oynatma için tıklayın");
        });
        openInInstagram.href = videoLinks[index];
      };
  
      card.addEventListener("click", handleTap);
      
      if (isMobile) {
        card.addEventListener("touchend", (e) => {
          if (!isDragging) {
            handleTap(e);
          }
        });
      }
    });
  
    // Kaydırma işlevselliği
    let startX = null;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let isDragging = false;
    let currentIndex = 0;
    const totalSlides = cards.length - (isMobile ? 2 : 5);
  
    function updateDots() {
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    }
  
    // Performans optimizasyonları
    let rafId = null;
    let isThrottled = false;
  
    function throttle(func, limit) {
      if (isThrottled) return;
      isThrottled = true;
      func();
      setTimeout(() => {
        isThrottled = false;
      }, limit);
    }
  
    function updateSliderPosition() {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(() => {
        track.style.transform = `translateX(${currentTranslate}px)`;
      });
    }
  
    function setSliderPosition(index = currentIndex, animate = true) {
      currentIndex = index;
      
      // Sonsuz döngü için index kontrolü
      if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
      } else if (currentIndex >= totalSlides) {
        currentIndex = 0;
      }
  
      const cardWidth = cards[0].offsetWidth + 10;
      currentTranslate = -currentIndex * cardWidth;
  
      if (animate) {
        track.style.transition = "transform 0.3s ease-out";
      } else {
        track.style.transition = "none";
      }
  
      updateSliderPosition();
      updateDots();
      prevTranslate = currentTranslate;
    }
  
    // Video önbelleğe alma
    function preloadVideos() {
      cards.forEach(card => {
        const video = card.querySelector("video");
        if (video) {
          video.preload = "metadata";
        }
      });
    }
  
    // Görünür videoları oynatma
    function handleVisibleVideos() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const video = entry.target.querySelector("video");
          if (!video) return;
  
          if (entry.isIntersecting) {
            if (!isMobile) {
              video.play().catch(() => {});
            }
          } else {
            video.pause();
            video.currentTime = 0;
          }
        });
      }, {
        threshold: 0.5
      });
  
      cards.forEach(card => observer.observe(card));
    }
  
    // Mobil için dokunma olayları
    if (isMobile) {
      let touchStartX = null;
      let touchStartY = null;
      let isHorizontalScroll = false;
  
      track.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        startX = touchStartX;
        touchStartTime = Date.now();
        isDragging = false;
        isHorizontalScroll = false;
        track.style.transition = "none";
      }, { passive: true });
  
      track.addEventListener("touchmove", (e) => {
        if (startX === null) return;
        
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = currentX - touchStartX;
        const diffY = currentY - touchStartY;
  
        // İlk hareket yönünü belirle
        if (!isHorizontalScroll && !isDragging) {
          isHorizontalScroll = Math.abs(diffX) > Math.abs(diffY);
          if (!isHorizontalScroll) {
            // Dikey kaydırma ise touch olayını sonlandır
            startX = null;
            return;
          }
        }
  
        // Yatay kaydırma ise devam et
        if (isHorizontalScroll) {
          e.preventDefault();
          if (Math.abs(diffX) > 5) {
            isDragging = true;
          }
          
          const cardWidth = cards[0].offsetWidth + 10;
          currentTranslate = prevTranslate + diffX;
          updateSliderPosition();
        }
      }, { passive: false });
  
      track.addEventListener("touchend", (e) => {
        if (!isHorizontalScroll) {
          startX = null;
          return;
        }
  
        const touchEndTime = Date.now();
        const swipeTime = touchEndTime - touchStartTime;
        const currentX = e.changedTouches[0].clientX;
        const diff = currentX - touchStartX;
        
        // Hızlı kaydırma kontrolü
        isFastSwipe = Math.abs(diff) > 50 && swipeTime < 300;
  
        if (isDragging || isFastSwipe) {
          const cardWidth = cards[0].offsetWidth + 10;
          let nextIndex = currentIndex;
  
          if (Math.abs(diff) > cardWidth / 3 || isFastSwipe) {
            nextIndex = diff > 0 ? currentIndex - 1 : currentIndex + 1;
          }
  
          setSliderPosition(nextIndex);
        }
  
        // Touch olayını sıfırla
        startX = null;
        touchStartX = null;
        touchStartY = null;
        isDragging = false;
        isHorizontalScroll = false;
        
        setTimeout(() => {
          isFastSwipe = false;
        }, 100);
      });
  
      // Dokunma olaylarını engelleme
      track.addEventListener("touchcancel", () => {
        startX = null;
        touchStartX = null;
        touchStartY = null;
        isDragging = false;
        isHorizontalScroll = false;
      });
  
      // Yuvarlak butonlara tıklama olayları
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          setSliderPosition(index);
        });
      });
    } else {
      // Masaüstü için gelişmiş buton kontrolleri
      let autoplayInterval;
      
      function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(() => {
          throttle(() => {
            setSliderPosition(currentIndex + 1);
          }, 300);
        }, 5000);
      }
  
      function stopAutoplay() {
        if (autoplayInterval) {
          clearInterval(autoplayInterval);
        }
      }
  
      nextBtn.addEventListener("click", () => {
        throttle(() => {
          setSliderPosition(currentIndex + 1);
        }, 300);
        stopAutoplay();
      });
  
      prevBtn.addEventListener("click", () => {
        throttle(() => {
          setSliderPosition(currentIndex - 1);
        }, 300);
        stopAutoplay();
      });
  
      // Mouse hover olayları
      track.addEventListener("mouseenter", stopAutoplay);
      track.addEventListener("mouseleave", startAutoplay);
    }
  
    // Sayfa yüklendiğinde başlangıç ayarları
    preloadVideos();
    handleVisibleVideos();
    setSliderPosition(0, false);
    
    if (!isMobile) {
      startAutoplay();
    }
  
    // Pencere boyutu değiştiğinde
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        track.style.transition = "none";
        setSliderPosition(currentIndex, false);
      }, 100);
    });
  });