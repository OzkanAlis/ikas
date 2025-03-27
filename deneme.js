<script>
(() => {
  /************************************************************
   * 1) ORTAK FONKSİYON: Belirli bir eleman yüklenene kadar bekler
   ************************************************************/
  const waitForElement = (selector, callback, interval, maxAttempts) => {
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

  /************************************************************
   * 2) ANA FONKSİYON: safeSecure alanı + “Pairs well with” ekler
   ************************************************************/
  const addCustomHtml = () => {
    // Örnek: Sitenizde ürün detayına ait bir container varsa, onun seçicisi
    // (Burada ".product-detail-page-easy-refund" örnek olarak kullanılıyor)
    const container = document.querySelector(".product-detail-page-easy-refund");
    if (!container || document.querySelector(".safeSecure")) return;

    /*********************
     * 2.1) safeSecure ALANI
     *********************/
    const safeSecureHTML = `
      <style>
        .safeSecure {
          width: 100%;
          height: auto;
          display: flex;
          gap: 2rem;
          margin-top: 1rem;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 1.5rem;
          background-color: #f4f4f4;
        }
        .safeSecure > h3 {
          font-size: 1.5em;
          font-weight: 500;
          color: #333;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .safeSecure > h3 > div > strong {
          font-weight: 700;
          border-radius: 15px;
          padding: 0.5rem 1.2rem;
          background-color: #23ADB7;
          color: #f4f4f4;
        }
        .bankName {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          justify-items: center;
          gap: 1rem;
          width: 100%;
        }
        .bankName > span {
          padding: 0.2rem 1rem;
          background-color: #fff;
          border-radius: 180px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          position: relative;
          height: 50px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .bankName > span:hover {
          transform: scale(1.1);
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
        }
        .bankName img {
          object-fit: contain;
          width: 90px;
          height: auto;
        }
        @media screen and (max-width: 1126px) {
          .safeSecure > h3 {
            flex-direction: column;
          }
        }
      </style>

      <div class="safeSecure">
        <h3>
          Vade Farksız <div><strong>3 TAKSİT</strong> İmkanı!</div>
        </h3>
        <div class="bankName">
          <!-- Örnek banka logoları -->
          <span><img src="https://alisdijital.com/card/world.svg" alt="World"></span>
          <span><img src="https://alisdijital.com/card/maximum.svg" alt="Maximum"></span>
          <span><img src="https://alisdijital.com/card/paraf.svg" alt="Paraf"></span>
          <span><img src="https://alisdijital.com/card/axess.svg" alt="Axess"></span>
          <span><img src="https://alisdijital.com/card/cardFinans.svg" alt="CardFinans"></span>
          <span><img src="https://alisdijital.com/card/bonusCard.svg" alt="Bonus Card"></span>
          <span><img src="https://alisdijital.com/card/bankKart.svg" alt="Bankkart"></span>
          <span><img src="https://alisdijital.com/card/advantage.svg" alt="Advantage"></span>
        </div>
      </div>
    `;
    // safeSecure alanını container'ın üstüne ekleyelim
    container.insertAdjacentHTML("beforebegin", safeSecureHTML);

    /*****************************************
     * 2.2) safeSecure ALTINA “Pairs well with”
     *****************************************/
    const pairsWellHTML = `
      <div class="pairs-well-section" style="margin-top: 20px; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
        <h2 style="font-size: 1.2rem; margin-bottom: 1rem;">Pairs well with</h2>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <!-- Örnek bir ürün kutusu -->
          <div style="border: 1px solid #ddd; border-radius: 6px; padding: 10px; width: 200px; background-color: #fff;">
            <a href="#" style="text-decoration: none; color: inherit;">
              <img src="https://via.placeholder.com/150" alt="Rose quartz facial polish" style="width: 100%; height: auto; border-radius: 4px;" />
              <div style="margin-top: 10px;">
                <p style="font-weight: 600; margin-bottom: 4px;">Rose quartz facial polish</p>
                <p style="color: #666;">From $79.00</p>
              </div>
            </a>
          </div>
          <!-- Başka ürünler de eklenebilir -->
        </div>
      </div>
    `;
    // safeSecure elementini bul, hemen altına ekle
    const safeSecureElement = document.querySelector(".safeSecure");
    if (safeSecureElement) {
      safeSecureElement.insertAdjacentHTML("afterend", pairsWellHTML);
    }

    /************************************************
     * 2.3) CONTAINER İÇERİĞİNİ (Kargo vs.) GÜNCELLE
     ************************************************/
    container.innerHTML = `
      <div style="display:flex;flex-direction:column;width: 100%;">
        <div style="display: flex; flex-direction:column; gap: 1.5rem; margin-top: 1rem; width: 100%; align-items: start; padding: 20px; background-color: #F9F9F9; border-radius: 8px; font-size: 12px;" id="specials_zeda">
          <div style="display: flex; align-items: center;">
            <span style="font-size: 28px; margin-right: 10px;">🚚</span>
            <span><strong>Ücretsiz Kargo!</strong><br />81 ile hızlı ve güvenli teslimat.</span>
          </div>
          <div style="display: flex; align-items: center;">
            <span style="font-size: 28px; margin-right: 10px;">💳</span>
            <span><strong>Vade Farksız 3 Taksit!</strong><br />Ödemelerinizi rahatça planlayın.</span>
          </div>
          <div style="display: flex; align-items: center;">
            <span style="font-size: 28px; margin-right: 10px;">😊</span>
            <span><strong>Satış Sonrası Destek!</strong><br />Her zaman yanınızdayız.</span>
          </div>
          <div style="display: flex; align-items: center;">
            <span style="font-size: 28px; margin-right: 10px;">🏅</span>
            <span><strong>2 Yıl Garantili!</strong><br />Kalite ve güvence bizim işimiz.</span>
          </div>
        </div>
        <style>
          @media screen and (max-width: 680px) {
            #specials_zeda {
              grid-template-columns: repeat(1, 1fr) !important;
            }
            #specials_zeda div span {
              font-size: 15px;
            }
          }
        </style>
      </div>
    `;
  };

  /************************************************************
   * 3) FOOTER EKLEME: Zeda Teknoloji Logosu (örnek)
   ************************************************************/
  const addFooterHtml = () => {
    if (document.querySelector(".footer-content-added")) return;
    const footer = document.querySelector(".footer-copyright");
    if (footer) {
      footer.innerHTML = `
        <style>
          footer .footer-copyright {
            background-color: #fff !important;
            padding: 10px 0 !important;
          }
        </style>
        <div class="footer-content-added" style="padding: 1rem;">
          <a href="https://www.zedateknoloji.com/" target="_blank" rel="noreferrer">
            <img style="display:block;margin:0 auto;width: 150px; height:auto;" src="https://via.placeholder.com/200x60?text=ZedaTeknoloji" alt="Zeda Teknoloji">
          </a>
        </div>
      `;
    }
  };

  /************************************************************
   * 4) URL DEĞİŞİKLİĞİNİ YAKALAMA
   ************************************************************/
  let previousUrl = window.location.href;
  const onUrlChange = () => {
    setTimeout(() => {
      if (window.location.href !== previousUrl) {
        previousUrl = window.location.href;
        // Sayfa/URL değişince önceden eklenmiş blokları temizleyin
        document.querySelectorAll(".safeSecure")?.forEach((el) => el.remove());
        document.querySelectorAll(".pairs-well-section")?.forEach((el) => el.remove());

        waitForElement(".product-detail-page-easy-refund", addCustomHtml, 100, 10);
        waitForElement(".footer-copyright", addFooterHtml, 100, 10);
      }
    }, 300);
  };

  /************************************************************
   * 5) SAYFA YÜKLENDİKTEN SONRA BAŞLATMA (Observer Dahil)
   ************************************************************/
  const initializeObserver = () => {
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
  };

  const initializeRender = () => {
    waitForElement(".product-detail-page-easy-refund", addCustomHtml, 100, 10);
    waitForElement(".footer-copyright", addFooterHtml, 100, 10);
    onUrlChange();
    initializeObserver();
  };

  // Sayfa yükleme ve tarayıcı gezinme (pushState, popstate) olayları
  window.addEventListener("load", initializeRender);
  window.addEventListener("popstate", onUrlChange);
  window.addEventListener("DOMContentLoaded", initializeRender);

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
</script>
