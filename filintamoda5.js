(function () {
  function waitForElement(selector, callback, interval = 100, maxAttempts = 50) {
    let attempts = 0;
    const intervalId = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(intervalId);
        callback(element);
      } else if (++attempts >= maxAttempts) {
        clearInterval(intervalId);
        console.warn(`[bedenTablosu] '${selector}' bulunamadı.`);
      }
    }, interval);
  }

  function addBedenTablosu(targetDiv) {
    if (!targetDiv) return;

    let container = targetDiv.querySelector('.alis-dijital-script');
    if (!container) {
      container = document.createElement('div');
      container.className = 'alis-dijital-script';
      targetDiv.appendChild(container);
    }

    if (container.innerHTML.trim()) return; // Daha önce eklendiyse tekrar ekleme

    container.innerHTML = `
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
    console.log("[bedenTablosu] İçerik başarıyla eklendi.");
  }

  function observeUrlChanges() {
    let lastUrl = location.href;
    new MutationObserver(() => {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        runBedenTablosu();
      }
    }).observe(document.body, { childList: true, subtree: true });

    const originalPushState = history.pushState;
    history.pushState = function () {
      originalPushState.apply(this, arguments);
      runBedenTablosu();
    };
    const originalReplaceState = history.replaceState;
    history.replaceState = function () {
      originalReplaceState.apply(this, arguments);
      runBedenTablosu();
    };
    window.addEventListener('popstate', runBedenTablosu);
  }

  function runBedenTablosu() {
    waitForElement('.product-detail-page-easy-refund', addBedenTablosu);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      runBedenTablosu();
      observeUrlChanges();
    });
  } else {
    runBedenTablosu();
    observeUrlChanges();
  }
})();
