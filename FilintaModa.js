(() => {
  // waitForElement: Belirtilen seçiciyi her 'interval' ms kontrol eder, 'maxAttempts' den sonra zaman aşımına uğrarsa durur.
  function waitForElement(selector, callback, interval = 100, maxAttempts = 50) {
    let attempts = 0;
    const intervalId = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(intervalId);
        console.log(`Element '${selector}' bulundu (${attempts * interval}ms sonra).`);
        callback(element);
      } else if (attempts >= maxAttempts) {
        clearInterval(intervalId);
        console.warn(`Element '${selector}' ${interval * maxAttempts}ms içinde bulunamadı.`);
      }
      attempts++;
    }, interval);
  }

  // addBedenTablosu: Hedef elementin içeriğini tamamen temizleyip, beden tablosu HTML içeriğini ekler.
  function addBedenTablosu(targetDiv) {
    targetDiv.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
        .alis-dijital-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px;
          background-color: #fff;
          color: #000;
          font-family: 'Poppins', sans-serif;
          line-height: 1.5;
          text-align: center;
          box-sizing: border-box;
        }
        .alis-dijital-title {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 40px;
          letter-spacing: 1px;
          color: #000;
          text-align: center;
        }
        .alis-dijital-cards {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-left: 0;
        }
        .alis-dijital-card {
          width: 100%;
          background-color: #fff;
          color: #000;
          border: 1px solid #ccc;
          border-radius: 4px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          text-align: center;
        }
        .alis-dijital-card-header {
          background-color: #000;
          color: #fff;
          padding: 12px;
          font-size: 18px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .alis-dijital-card-content {
          padding: 20px;
        }
        .alis-dijital-data-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin-top: 10px;
          overflow: hidden;
        }
        .alis-dijital-data-row {
          display: contents;
        }
        .alis-dijital-data-cell {
          padding: 10px;
          font-size: 14px;
          text-align: center;
          border-bottom: 1px solid #ccc;
          border-right: 1px solid #ccc;
          color: #000;
        }
        .alis-dijital-data-row .alis-dijital-data-cell:nth-child(2n) {
          border-right: none;
        }
        .alis-dijital-data-list .alis-dijital-data-row:last-child .alis-dijital-data-cell {
          border-bottom: none;
        }
        .alis-dijital-header-row {
          background-color: #000;
          color: #fff;
          font-weight: 600;
          text-transform: uppercase;
        }
      </style>
      <div class="alis-dijital-container">
        <h1 class="alis-dijital-title">Beden Tablosu</h1>
        <div class="alis-dijital-cards">
          <!-- 1. Kart: Model Bilgileri -->
          <div class="alis-dijital-card">
            <div class="alis-dijital-card-header">Model Bilgileri</div>
            <div class="alis-dijital-card-content">
              <div class="alis-dijital-data-list">
                <div class="alis-dijital-data-row alis-dijital-header-row">
                  <div class="alis-dijital-data-cell">Özellik</div>
                  <div class="alis-dijital-data-cell">Değer</div>
                </div>
                <div class="alis-dijital-data-row">
                  <div class="alis-dijital-data-cell">Model Boy (Height)</div>
                  <div class="alis-dijital-data-cell">180 cm</div>
                </div>
                <div class="alis-dijital-data-row">
                  <div class="alis-dijital-data-cell">Model Kilo (Weight)</div>
                  <div class="alis-dijital-data-cell">84 kg</div>
                </div>
                <div class="alis-dijital-data-row">
                  <div class="alis-dijital-data-cell">Model Beden (Size)</div>
                  <div class="alis-dijital-data-cell">M</div>
                </div>
                <div class="alis-dijital-data-row">
                  <div class="alis-dijital-data-cell">Model Beden (Size)</div>
                  <div class="alis-dijital-data-cell">33</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 2. Kart: Üst Giyim -->
          <div class="alis-dijital-card">
            <div class="alis-dijital-card-header">Üst Giyim</div>
            <div class="alis-dijital-card-content">
              <div class="alis-dijital-data-list">
                <div class="alis-dijital-data-row alis-dijital-header-row">
                  <div class="alis-dijital-data-cell">Kilo Aralığı</div>
                  <div class="alis-dijital-data-cell">Beden</div>
                </div>
                <div class="alis-dijital-data-row">
                  <div class="alis-dijital-data-cell">60 - 74</div>
                  <div class="alis-dijital-data-cell">S</div>
                </div>
                <div class="alis-dijital-data-row">
                  <div class="alis-dijital-data-cell">75 - 84</div>
                  <div class="alis-dijital-data-cell">M</div>
                </div>
                <div class="alis-dijital-data-row">
                  <div class="alis-dijital-data-cell">85 - 89</div>
                  <div class="alis-dijital-data-cell">L</div>
                </div>
                <div class="alis-dijital-data-row">
                  <div class="alis-dijital-data-cell">90 - 110</div>
                  <div class="alis-dijital-data-cell">XL</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 3. Kart: Alt Giyim -->
          <div class="alis-dijital-card">
            <div class="alis-dijital-card-header">Alt Giyim</div>
            <div class="alis-dijital-card-content">
              <div class="alis-dijital-data-list">
                <div class="alis-dijital-data-row alis-dijital-header-row">
                  <div class="alis-dijital-data-cell">Kilo Aralığı</div>
                  <div class="alis-dijital-data-cell">Beden</div>
                </div>
                <div class="alis-dijital-data-row">
                  <div class="alis-dijital-data-cell">60 - 74</div>
                  <div class="alis-dijital-data-cell">S</div>
                </div>
                <div class="alis-dijital-data-row">
                  <div class="alis-dijital-data-cell">75 - 84</div>
                  <div class="alis-dijital-data-cell">M</div>
                </div>
                <div class="alis-dijital-data-row">
                  <div class="alis-dijital-data-cell">85 - 89</div>
                  <div class="alis-dijital-data-cell">L</div>
                </div>
                <div class="alis-dijital-data-row">
                  <div class="alis-dijital-data-cell">90 - 110</div>
                  <div class="alis-dijital-data-cell">XL</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    console.log("Beden tablosu içeriği başarıyla güncellendi.");
  }

  // URL veya DOM değişikliklerini algılamak için (SPA ortamında yeniden ekleme)
  let previousUrl = window.location.href;
  function onUrlChange() {
    setTimeout(() => {
      if (window.location.href !== previousUrl) {
        previousUrl = window.location.href;
        const container = document.querySelector(".product-detail-page-easy-refund");
        if (container) {
          addBedenTablosu(container);
        }
      }
    }, 300);
  }

  // DOM değişikliklerini izlemek için MutationObserver kur
  function initializeObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length || mutation.removedNodes.length) {
          onUrlChange();
        }
      });
    });
    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  // initializeRender: Sayfa yüklendiğinde hedef elementi bekle, beden tablosunu ekle ve observer'ı başlat.
  function initializeRender() {
    waitForElement(".product-detail-page-easy-refund", addBedenTablosu, 100, 50);
    onUrlChange();
    initializeObserver();
  }

  window.addEventListener("load", initializeRender);
  window.addEventListener("popstate", onUrlChange);
  window.addEventListener("DOMContentLoaded", initializeRender);

  // URL değişimlerini yakalamak için history.pushState ve history.replaceState override'leri
  const pushState = history.pushState;
  history.pushState = function () {
    pushState.apply(history, arguments);
    onUrlChange();
  };

  const replaceState = history.replaceState;
  history.replaceState = function () {
    replaceState.apply(history, arguments);
    onUrlChange();
  };
})();
