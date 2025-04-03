(() => {
  // Utility function to wait for an element to appear in the DOM
  const waitForElement = (selector, callback, interval = 100, maxAttempts = 10) => {
    let attempts = 0;
    const intervalId = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(intervalId);
        callback(element);
      }
      if (attempts >= maxAttempts) {
        clearInterval(intervalId);
      }
      attempts++;
    }, interval);
  };

  let previousUrl = window.location.href;

  // Alış Dijital içerik bileşeni: WhatsApp butonunun yerine gösterilecek HTML içeriği
  const createAlisDijitalContent = () => {
    return `
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
        /* Kartların kapsayıcısı: tüm cihazlarda alt alta yığılacak */
        .alis-dijital-cards {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-left: 0;
        }
        /* Her kart tam genişlikte */
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
        /* Kart başlığı */
        .alis-dijital-card-header {
          background-color: #000;
          color: #fff;
          padding: 12px;
          font-size: 18px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        /* Kart içeriği */
        .alis-dijital-card-content {
          padding: 20px;
        }
        /* Grid tabanlı tablo */
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
        /* Son sütunda sağ kenarlık kaldır */
        .alis-dijital-data-row .alis-dijital-data-cell:nth-child(2n) {
          border-right: none;
        }
        /* Son satırda alt kenarlığı kaldır */
        .alis-dijital-data-list .alis-dijital-data-row:last-child .alis-dijital-data-cell {
          border-bottom: none;
        }
        /* Başlık satırı */
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
  };

  // Sayfaya Alış Dijital içerik ekle (varsa yinelenmeyi önlemek için kontrol edilir)
  const addAlisDijitalContent = () => {
    const container = document.querySelector(".product-detail-page-easy-refund");
    if (!container || document.querySelector(".alis-dijital-container")) {
      return;
    }
    // Yeni içeriği ilgili container'ın üstüne ekleyelim
    container.insertAdjacentHTML("beforebegin", createAlisDijitalContent());
  };

  // URL değişikliklerinde içeriği güncelle
  const onUrlChange = () => {
    setTimeout(() => {
      if (window.location.href !== previousUrl) {
        previousUrl = window.location.href;
        document.querySelectorAll(".alis-dijital-container").forEach((el) => el.remove());
        waitForElement(".product-detail-page-easy-refund", addAlisDijitalContent, 100, 10);
      }
    }, 300);
  };

  // MutationObserver ile DOM değişikliklerini takip et
  const initializeObserver = () => {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.addedNodes.length || mutation.removedNodes.length) {
          onUrlChange();
          break;
        }
      }
    });
    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    }
  };

  // Başlangıç fonksiyonu: elementi bekleyip içeriği ekle, URL değişikliklerini dinle
  const initializeRender = () => {
    waitForElement(".product-detail-page-easy-refund", addAlisDijitalContent, 100, 10);
    onUrlChange();
    initializeObserver();
  };

  // Event listener'ları ekle
  window.addEventListener("load", initializeRender);
  window.addEventListener("popstate", onUrlChange);
  window.addEventListener("DOMContentLoaded", initializeRender);

  // History metodlarını geçersiz kılarak URL değişikliklerini yakala
  const originalPushState = history.pushState;
  history.pushState = function () {
    originalPushState.apply(history, arguments);
    onUrlChange();
  };

  const originalReplaceState = history.replaceState;
  history.replaceState = function () {
    originalReplaceState.apply(history, arguments);
    onUrlChange();
  };
})();
