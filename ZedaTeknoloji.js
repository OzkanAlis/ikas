
(function () {
  // Rastgele tamsayı üretme (min, max dahil)
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
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
    if (document.querySelector('.alis-dijital-script')) return;
  
    // Stok: Başlangıç değeri rastgele 29-49 arasında belirlensin.
    let stokValue = getRandomInt(29, 49);
  
    // Progress bar: soldan %10 kırmızı, geri kalan gri
    const progressFillWidth = "10%";
  
    // (B) Kişi Sayısı: Başlangıçta 30-70 arasında rastgele
    let personCount = getRandomInt(30, 70);
  
    const container = document.createElement('div');
    container.className = 'alis-dijital-script';
  
    container.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
  
        /* Ana container'ın genişliği 600px ile sınırlansın */
        .alis-dijital-container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          color: #000;
          font-family: 'Poppins', sans-serif;
          line-height: 1.5;
          box-sizing: border-box;
        }
  
        /* Fade (kaybolup geri gelme) animasyonu */
        @keyframes fade {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
        .pulse {
          animation: fade 2s infinite;
        }
  
        /* (1) Kişi Sayısı & Stok Bilgisi Yazıları */
        .info-line {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          font-size: 16px;
        }
        .info-line img.icon {
          width: 24px;
          height: 24px;
          margin-right: 6px;
        }
        .random-count {
          font-weight: bold;
          margin-right: 6px;
        }
  
        /* (2) Stok Bar */
        .stock-bar {
          width: 100%;
          height: 10px;
          background-color: #e0e0e0;
          border-radius: 10px;
          margin-bottom: 20px;
          position: relative;
        }
        .stock-bar-fill {
          background-color: #d9534f;
          height: 100%;
          border-radius: 10px 0 0 10px;
          width: ${progressFillWidth};
        }
  
        /* (3) TAKSİT BÖLÜMÜ - Yazı boyutu küçültüldü */
        .taksit-secenekleri {
          background-color: #f9f9f9;
          text-align: center;
          margin-bottom: 20px;
          border-radius: 8px;
          padding: 20px;
        }
        .taksit-secenekleri h3 {
          color: #000;
          font-size: 24px;
          margin-bottom: 20px;
          font-weight: 700;
          line-height: 1.3;
        }
        .taksit-badge {
          background-color: #536978;
          border-radius:10px;
          color: #fff;
          padding: 5px 10px;
          border-radius: 4px;
          margin: 0 6px;
          display: inline-block;
          font-weight: bold;
        }
        .bankName {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
          justify-items: center;
          margin-top: 10px;
        }
        .bankName span {
          background: #fff;
          border-radius: 12px;
          padding: 10px;
          box-shadow: 0 0 5px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .bankName img {
          max-width: 80px;
          height: auto;
          display: block;
        }
  
        /* (4) Specials (Avantajlar) */
        #specials_alis {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-top: 1rem;
          width: 100%;
          align-items: start;
          justify-items: start;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          font-size: 14px;
          color: #000;
        }
        #specials_alis > div {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        #specials_alis div span:first-child {
          font-size: 28px;
        }
  
        /* (5) Accordion (Model Bilgileri, Beden Tablosu) */
        details {
          border: 1px solid #ccc;
          border-radius: 4px;
          margin-bottom: 20px;
          padding: 0;
          overflow: hidden;
        }
        details summary {
          font-size: 16px;
          font-weight: 700;
          padding: 12px;
          cursor: pointer;
          background-color: #000;
          color: #fff;
          text-align: left;
          list-style: none;
          position: relative;
        }
        details summary::-webkit-details-marker {
          display: none;
        }
        details summary::after {
          content: '\\25BC';
          position: absolute;
          right: 20px;
          transition: transform 0.3s;
        }
        details[open] summary::after {
          transform: rotate(180deg);
        }
        .alis-dijital-card {
          background-color: #fff;
          color: #000;
          border-top: 1px solid #ccc;
          text-align: left;
          padding: 20px;
        }
        .alis-dijital-data-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border: 1px solid #ccc;
          border-radius: 4px;
          overflow: hidden;
          margin-top: 10px;
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
          font-weight: 700;
          text-transform: uppercase;
        }
  
        /* (6) İndirim Kuponu Alanı - Yazı boyutu küçültüldü */
        .discount-section {
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #fff;
          padding: 20px;
          margin-top: 20px;
          text-align: center;
        }
        .discount-section h4 {
          margin: 0 0 20px;
          font-size: 16px;
          font-weight: 700;
          text-align: center;
        }
        .show-code-btn {
          display: block;
          width: 50%;
          margin: 0 auto;
          background-color: #536978;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 14px;
          font-size: 16px;
          cursor: pointer;
          font-weight: 600;
          text-align: center;
        }
        .show-code-btn:hover {
          opacity: 0.9;
        }
        .coupon-section {
          display: none;
          text-align: center;
          opacity: 0;
          transform: translateY(10px);
          animation: fadeInUp 0.4s ease forwards;
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .coupon-section.show {
          display: block;
        }
        .coupon-code {
          display: inline-block;
          background-color: #f1f1f1;
          color: #228B22;
          font-size: 24px;
          font-weight: 700;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .copy-code-btn {
          display: block;
          width: 50%;
          background-color:#536978 ;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 14px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          margin: 0 auto;
        }
        .copy-code-btn:hover {
          opacity: 0.9;
        }
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(0); }
          20% { opacity: 1; transform: translateY(-5px); }
          80% { opacity: 1; transform: translateY(-5px); }
          100% { opacity: 0; transform: translateY(0); }
        }
        .copy-confirmation {
          animation: fadeInOut 3s ease forwards;
          text-align: center;
          font-size: 16px;
          margin-top: 10px;
          color: #000;
        }
  
        /* Mobil uyumluluk */
        @media screen and (max-width: 600px) {
          .alis-dijital-container {
            padding: 10px;
          }
          .info-line {
            font-size: 14px;
          }
          .info-line img.icon {
            width: 20px;
            height: 20px;
          }
          .taksit-secenekleri h3 {
            font-size: 20px;
          }
          .bankName {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .bankName img {
            max-width: 60px;
          }
          #specials_alis {
            grid-template-columns: 1fr;
            font-size: 12px;
          }
          details summary {
            font-size: 14px;
            padding: 10px;
          }
          .alis-dijital-card {
            padding: 15px;
          }
          .alis-dijital-data-cell {
            padding: 8px;
            font-size: 12px;
          }
        }
      </style>
  
      <div class="alis-dijital-container">
  
        <!-- (3) TAKSİT BÖLÜMÜ -->
        <div class="taksit-secenekleri">
          <h3>
            Tüm Kartlarda Geçerli <br>
            <span class="taksit-badge">12 TAKSİT</span> İmkanı!
          </h3>
          <div class="bankName">
            <span><img src="https://alisdijital.com/card/world.svg" alt="World"></span>
            <span><img src="https://alisdijital.com/card/maximum.svg" alt="Maximum"></span>
            <span><img src="https://alisdijital.com/card/paraf.svg" alt="Paraf"></span>
            <span><img src="https://alisdijital.com/card/axess.svg" alt="Axess"></span>
            <span><img src="https://alisdijital.com/card/cardFinans.svg" alt="Card Finans"></span>
            <span><img src="https://alisdijital.com/card/bonusCard.svg" alt="Bonus Card"></span>
            <span><img src="https://alisdijital.com/card/bankKart.svg" alt="Bank Kart"></span>
            <span><img src="https://alisdijital.com/card/advantage.svg" alt="Advantage"></span>
          </div>
        </div>
  
        <!-- (4) Specials (Avantajlar) -->
        <div id="specials_alis">
          <div>
            <span>🚚</span>
            <span>
              <strong>Ücretsiz Kargo!</strong><br />
              81 İl'e ücretsiz kargo ile ürünlerinizi gönderiyoruz.
            </span>
          </div>
          <div>
            <span>💳</span>
            <span>
              <strong>Vade Farksız 12 TAKSİT imkânı!</strong><br />
              Üstelik cebiniz rahat, ödemeler kolay!
            </span>
          </div>
          <div>
            <span>😊</span>
            <span>
              <strong>Satış Sonrası Hizmet!</strong><br />
              Ürünü aldıktan sonra da yanınızdayız!
            </span>
          </div>
          <div>
            <span>🏅</span>
            <span>
              <strong>2 Yıl Garantili!</strong><br />
              Ürünlerimizde kaliteye güveniyoruz.
            </span>
          </div>
        </div>
  
 <!-- (5) Ürün Bilgileri Accordion -->
<details class="model-bilgileri">
  <summary style="background-color: #536978; color: #fff;">Ürün Bilgileri</summary>
  <div class="alis-dijital-card">
    <div class="alis-dijital-data-list">
      <div class="alis-dijital-data-row alis-dijital-header-row">
        <div class="alis-dijital-data-cell">Özellik</div>
        <div class="alis-dijital-data-cell">Değer</div>
      </div>
      <div class="alis-dijital-data-row">
        <div class="alis-dijital-data-cell">Güç</div>
        <div class="alis-dijital-data-cell">12 W</div>
      </div>
      <div class="alis-dijital-data-row">
        <div class="alis-dijital-data-cell">Voltaj</div>
        <div class="alis-dijital-data-cell">220–240 V</div>
      </div>
      <div class="alis-dijital-data-row">
        <div class="alis-dijital-data-cell">Renk Sıcaklığı</div>
        <div class="alis-dijital-data-cell">3000 K (Sıcak Beyaz)</div>
      </div>
      <div class="alis-dijital-data-row">
        <div class="alis-dijital-data-cell">CRI</div>
        <div class="alis-dijital-data-cell">&gt; 80</div>
      </div>
      <div class="alis-dijital-data-row">
        <div class="alis-dijital-data-cell">Ömür</div>
        <div class="alis-dijital-data-cell">25.000 Saat</div>
      </div>
    </div>
  </div>
</details>


  
        <!-- (7) İndirim Kuponu Alanı -->
        <div class="discount-section" id="discountSection">
          <h4>Bu ürüne özel kazanabileceğin %5 indirim kodun var!</h4>
          <button class="show-code-btn" id="showCodeBtn">Kodu Gör</button>
          <div class="coupon-section" id="couponSection">
            <div class="coupon-code" id="couponCode">KAMPANYA5</div><br/>
            <button class="copy-code-btn" id="copyCodeBtn">Kodu Kopyala</button>
            <div id="copyConfirmation"></div>
          </div>
        </div>
      </div>
    `;
  
    targetDiv.insertAdjacentElement("afterend", container);
    targetDiv.style.display = "none";
  
    // İndirim kuponu alanı olayları
    const showCodeBtn = container.querySelector('#showCodeBtn');
    const couponSection = container.querySelector('#couponSection');
    const couponCode = container.querySelector('#couponCode');
    const copyCodeBtn = container.querySelector('#copyCodeBtn');
    const copyConfirmation = container.querySelector('#copyConfirmation');
  
    showCodeBtn.addEventListener('click', () => {
      couponSection.classList.add('show');
      showCodeBtn.style.display = "none";
    });
  
    copyCodeBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(couponCode.textContent.trim())
        .then(() => {
          copyConfirmation.textContent = "Kod kopyalandı";
          copyConfirmation.className = "copy-confirmation";
          setTimeout(() => {
            copyConfirmation.textContent = "";
            copyConfirmation.className = "";
          }, 3000);
        })
        .catch(err => {
          console.error("Kopyalama hatası:", err);
        });
    });
  
    // (8) Stok sayısı her 34 saniyede 1 azalsın (stok değeri 1'in altına düşmesin)
    const stockValueEl = container.querySelector('#stockValue');
    setInterval(() => {
      if (stokValue > 1) {
        stokValue--;
        stockValueEl.textContent = stokValue;
      }
    }, 34000);
  
    // (9) Kişi sayısı 5 saniyede bir, -3 ile +3 arasında değişsin (30-70 sınırı korunacak)
    const randomCountEl = container.querySelector('.random-count');
    setInterval(() => {
      const delta = getRandomInt(-3, 3);
      personCount += delta;
      if (personCount < 30) personCount = 30;
      if (personCount > 70) personCount = 70;
      randomCountEl.textContent = personCount + " Kişi";
    }, 5000);
  
    console.log("[bedenTablosu] İndirim kuponu alanı eklendi (Beden Tablosu altı).");
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