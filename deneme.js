(() => {
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

  let previousUrl = window.location.href;

  const addCustomHtml = () => {
    const container = document.querySelector(".product-detail-page-easy-refund");

    // Eğer container yoksa veya "safeSecure" sınıfı zaten eklenmişse hiçbir şey yapma.
    if (!container || document.querySelector(".safeSecure")) {
      return;
    }

    // Üst kısma eklenecek tahmini teslimat, ücretsiz kargo & iade, ödeme ikonları
    const sliderTesxt = `
      <style>
        * {
          margin: 0;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          padding: 0;
          box-sizing: border-box;
        }
  
        .safeSecure {
          width: 100%;
          height: auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          background-color: #f4f4f4;
        }
        
        .safeSecure p {
          font-size: 14px;
          color: #333;
          margin: 0;
          line-height: 1.4;
        }
        
        .safeSecure p strong {
          font-weight: 600;
        }
  
        .bankName {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          justify-items: center;
          gap: 1rem;
          width: 100%;
          margin-top: 0.5rem;
        }
  
        .bankName>span {
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
  
        .bankName>span:hover {
          transform: scale(1.1);
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
        }
  
        .bankName img {
          object-fit: contain;
          width: 70px;
          height: auto;
        }
  
        @media screen and (max-width: 1024px) {
          .bankName img {
            width: 60px;
          }
        }
  
        @media screen and (max-width: 770px) {
          .bankName {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      </style>
  
      <div class="safeSecure">
        <p><strong>Tahmini Teslimat:</strong> 23 Ocak - 26 Ocak</p>
        <p><strong>Ücretsiz Kargo &amp; İade:</strong> 79 TL üzeri siparişlerde geçerlidir</p>
        <div class="bankName">
          <span>
            <img src="https://alisdijital.com/card/world.svg" alt="World">
          </span>
          <span>
            <img src="https://alisdijital.com/card/maximum.svg" alt="Maximum">
          </span>
          <span>
            <img src="https://alisdijital.com/card/paraf.svg" alt="Paraf">
          </span>
          <span>
            <img src="https://alisdijital.com/card/axess.svg" alt="Axess">
          </span>
          <span>
            <img src="https://alisdijital.com/card/cardFinans.svg" alt="CardFinans">
          </span>
          <span>
            <img src="https://alisdijital.com/card/bonusCard.svg" alt="Bonus">
          </span>
          <span>
            <img src="https://alisdijital.com/card/bankKart.svg" alt="BankKart">
          </span>
          <span>
            <img src="https://alisdijital.com/card/advantage.svg" alt="Advantage">
          </span>
        </div>
      </div>
    `;

    // "sliderTesxt" içeriğini container'ın üstüne ekliyoruz
    container.insertAdjacentHTML("beforebegin", sliderTesxt);

    // Ürün sekmeleri (Açıklama, Ek Bilgiler, Yorumlar) ve "Ürün hakkında sorunuz mu var?" bölümü
    container.innerHTML = `
      <div style="display:flex; flex-direction:column; width: 100%;">
        <div style="display: flex; flex-direction:column; gap: 1rem; margin-top: 1rem; width: 100%; align-items: start; padding: 20px; background-color: #F9F9F9; border-radius: 8px; font-size: 14px;" id="specials_alis">
          
          <!-- Ürün Hakkında Soru -->
          <div style="display: flex; align-items: center;">
            <span style="font-size: 24px; margin-right: 10px;">❓</span>
            <span><strong>Ürün hakkında sorunuz mu var?</strong><br />Bize yazın, en kısa sürede yardımcı olalım.</span>
          </div>    

          <!-- Açıklama -->
          <div style="display: flex; align-items: center;">
            <span style="font-size: 24px; margin-right: 10px;">📄</span>
            <span><strong>Açıklama</strong><br />Ürün özelliklerini ve detaylarını burada bulabilirsiniz.</span>
          </div>  

          <!-- Ek Bilgiler -->
          <div style="display: flex; align-items: center;">
            <span style="font-size: 24px; margin-right: 10px;">ℹ️</span>
            <span><strong>Ek Bilgiler</strong><br />Boyut, malzeme veya ek teknik detaylar için burayı inceleyin.</span>
          </div>

          <!-- Yorumlar -->
          <div style="display: flex; align-items: center;">
            <span style="font-size: 24px; margin-right: 10px;">💬</span>
            <span><strong>Yorumlar</strong><br />Müşterilerimizin ürün hakkındaki düşüncelerini okuyun.</span>
          </div>

        </div>
        <style>
          @media screen and (max-width: 680px) {
            #specials_alis div span {
              font-size: 13px;
            }
          }
        </style>
      </div>
    `;
  };

  const onUrlChange = () => {
    setTimeout(() => {
      if (window.location.href !== previousUrl) {
        previousUrl = window.location.href;
        // Eski "safeSecure" içeriğini temizle
        document.querySelectorAll(".safeSecure").forEach(el => el.remove());
        waitForElement(".product-detail-page-easy-refund", addCustomHtml, 100, 10);
      }
    }, 300);
  };

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
    onUrlChange();
    initializeObserver();
  };

  window.addEventListener("load", initializeRender);
  window.addEventListener("popstate", onUrlChange);
  window.addEventListener("DOMContentLoaded", initializeRender);

  // pushState ve replaceState güncellemeleri
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
