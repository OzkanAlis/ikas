document.addEventListener('DOMContentLoaded', function() {
  // waitForElement fonksiyonu: Belirli aralıklarla seçiciyi kontrol eder.
  function waitForElement(selector, callback, timeout = 5000, interval = 100) {
    const startTime = Date.now();
    const timer = setInterval(function() {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(timer);
        console.log(`Element '${selector}' bulundu (${Date.now() - startTime}ms sonra).`);
        callback(element);
      } else if (Date.now() - startTime > timeout) {
        clearInterval(timer);
        console.warn(`Element '${selector}' ${timeout}ms içinde bulunamadı.`);
      }
    }, interval);
  }

  // .product-detail-page-easy-refund elementinin bulunmasını bekle ve güncelle.
  waitForElement('.product-detail-page-easy-refund', function(targetDiv) {
    console.log("Güncelleme işlemi başlatılıyor...");
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
    console.log("İçerik başarıyla güncellendi.");
  });
});
