<script>
(() => {
  /*************************************************************
   * 1) URL DEĞİŞİKLİĞİNİ VE DOM DEĞİŞİKLİĞİNİ TAKİP EDEN FONKSİYON
   *************************************************************/
  const onUrlChange = () => {
    setTimeout(() => {
      waitForElement(".product-detail-page-easy-refund", addCustomHtml, 100, 10);
    }, 300);
    setTimeout(() => {
      waitForElement("footer", addFooterHtml, 100, 10);
    }, 300);
  };

  /*************************************************************
   * 2) BELİRLİ BİR ELEMAN YÜKLENENE KADAR BEKLEME FONKSİYONU
   *************************************************************/
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

  /*************************************************************
   * 3) ASIL İÇERİK EKLEME: safeSecure ALANI + “Birlikte İyi Gider”
   *************************************************************/
  const addCustomHtml = () => {
    // 3.1) .product-detail-page-easy-refund alanını bul
    const container = document.querySelector(".product-detail-page-easy-refund");
    // Daha önce eklenmişse tekrar ekleme
    if (!container || document.querySelector(".safeSecure")) return;

    // 3.2) safeSecure ALANI (taksit, banka logoları)
    const sliderTesxt = `
      <style>
        .product-detail-page-easy-refund {
          padding: 0px !important;
        }
        .safeSecure {
          width: 100%;
          height: auto;
          display: flex;
          gap: 2rem;
          margin-top: 1rem;
          align-items: center;
          border-radius: 8px;
          justify-content: center;
          flex-direction: column;
          padding: 1.5rem;
          background-color: #F9F9F9;
        }
        .safeSecure>h3 {
          font-size: 1.5em;
          font-weight: 500;
          color: #333;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .safeSecure>h3>div> {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .safeSecure>h3>div>strong {
          font-weight: 700;
          border-radius: 15px;
          padding: 0.5rem 1.2rem;
          line-height: 0 !important;
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
          width: 120px;
          height: auto;
        }
        @media screen and (max-width: 1540px) {
          .bankName>span {
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        @media screen and (max-width: 1126px) {
          .safeSecure>h3 {
            flex-direction: column;
          }
        }
        @media screen and (max-width: 1024px) {
          .safeSecure>h3 {
            font-size: 1em;
          }
          .bankName img {
            object-fit: contain;
            width: 80px;
            height: auto;
          }
        }
        @media screen and (max-width: 770px) {
          .bankName {
            grid-template-columns: repeat(4, 1fr);
            gap: 0.8rem;
          }
          .bankName img {
            width: 70px;
          }
        }
        @media screen and (max-width: 460px) {
          .bankName {
            grid-template-columns: repeat(4, 1fr);
            gap: 0.5rem;
          }
          .bankName img {
            width: 65px;
          }
          .safeSecure>h3 {
            font-size: 0.9em;
          }
        }
        @media screen and (max-width: 360px) {
          .bankName {
            grid-template-columns: repeat(4, 1fr);
            gap: 0.4rem;
          }
          .bankName img {
            width: 60px;
          }
          .safeSecure>h3 {
            font-size: 0.8em;
          }
        }
      </style>

      <div class="safeSecure">
        <h3>Tüm Kartlarda Geçerli <div><strong>12 TAKSİT</strong> İmkanı!</div></h3>
        <div class="bankName">
          <span><img src="https://alisdijital.com/card/world.svg" width="180" height="180"></span>
          <span><img src="https://alisdijital.com/card/maximum.svg" width="180" height="180"></span>
          <span><img src="https://alisdijital.com/card/paraf.svg" width="180" height="180"></span>
          <span><img src="https://alisdijital.com/card/axess.svg" width="180" height="180"></span>
          <span><img src="https://alisdijital.com/card/cardFinans.svg" width="180" height="180"></span>
          <span><img src="https://alisdijital.com/card/bonusCard.svg" width="180" height="180"></span>
          <span><img src="https://alisdijital.com/card/bankKart.svg" width="180" height="180"></span>
          <span><img src="https://alisdijital.com/card/advantage.svg" width="180" height="180"></span>
        </div>
      </div>
    `;
    container.insertAdjacentHTML("beforebegin", sliderTesxt);

    // 3.3) container'ın kendi içeriğini (Kargo, 12 Taksit vb.) ayarla
    container.innerHTML = `
      <div style="display:flex;flex-direction:column;width: 100%;">
        <div style="display: flex; justify-content: space-between;flex-direction:column; gap: 1.5rem;margin-top: 1rem; width: 100%; align-items: start; padding: 20px; background-color: #F9F9F9; border-radius: 8px; font-size: 12px;" id="specials_alis">
          <div style="display: flex; align-items: center;">
            <span style="font-size: 28px; margin-right: 10px;">🚚</span>
            <span><strong>Ücretsiz Kargo!</strong><br />81 İl'e ücretsiz kargo ile ürünlerinizi gönderiyoruz.</span>
          </div>    
          <div style="display: flex; align-items: center;">
            <span style="font-size: 28px; margin-right: 10px;">💳</span>
            <span><strong>12 ay taksit imkânı!</strong><br />Üstelik cebiniz rahat, ödemeler kolay!</span>
          </div>  
          <div style="display: flex; align-items: center;">
            <span style="font-size: 28px; margin-right: 10px;">😊</span>
            <span><strong>Satış Sonrası Hizmet!</strong><br />Gizliliğinizi önemsiyoruz ve verilerinizi koruyoruz.</span>
          </div>
          <div style="display: flex; align-items: center;">
            <span style="font-size: 28px; margin-right: 10px;">🏅</span>
            <span><strong>2 Yıl Garantili!</strong><br />Ürünlerimizde kaliteye güveniyoruz.</span>
          </div>
        </div>
      </div>
      <style>
        @media screen and (max-width: 680px) {
          #specials_alis {
            grid-template-columns: repeat(1, 1fr) !important;
          }
          #specials_alis div span {
            font-size: 15px;
          }
        }
      </style>
    `;

    // 3.4) safeSecure'in ALTINA “Birlikte İyi Gider” alanını ekle
    const pairsWellHTML = `
      <div class="zedateknoloji-pairs" style="margin-top: 20px; padding: 20px; background-color: #F9F9F9; border-radius: 8px;">
        <h2 style="font-size: 1.2rem; margin-bottom: 0.5rem;">Birlikte İyi Gider</h2>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <!-- Slider sayfa bilgisi (1/3) örnek -->
          <div style="background-color: #eee; border-radius: 4px; padding: 0.2rem 0.8rem;">1/3</div>
          <!-- Ürün kutusu -->
          <div style="border: 1px solid #ddd; border-radius: 6px; padding: 10px; min-width: 160px; background-color: #fff;">
            <p style="font-size: 0.9rem; color: #888; margin: 0 0 4px 0;">Krem</p>
            <p style="font-weight: 600; margin: 0 0 4px 0;">Rose Quartz Yüz Peelingi</p>
            <p style="color: #666; margin: 0;">79,00$'dan başlayan fiyatlarla</p>
            <div style="margin-top: 8px; display: flex; gap: 8px; align-items: center;">
              <button style="border: none; background: #007aff; color: #fff; padding: 6px 12px; border-radius: 4px; cursor: pointer;">Sepete Ekle</button>
            </div>
          </div>
        </div>
      </div>
    `;
    const safeSecureElement = document.querySelector(".safeSecure");
    if (safeSecureElement) {
      safeSecureElement.insertAdjacentHTML("afterend", pairsWellHTML);
    }
  };

  /*************************************************************
   * 4) FOOTER EKLEME FONKSİYONU
   *************************************************************/
  const addFooterHtml = (container) => {
    if (document.querySelector(".footer-content-added")) return;
    const footer = document.querySelector("footer");
    if (footer) {
      footer.insertAdjacentHTML(
        "beforeend",
        `
          <style>
            .footer-content-added {
              padding: 1rem;
              background: #fff;
            }
          </style>
          <div class="footer-content-added">
            <a href="https://www.zedateknoloji.com/" target="_blank" rel="noreferrer">
              <img style="display:block;margin:0 auto;width: 150px; height:auto;" src="https://via.placeholder.com/200x60?text=ZedaTeknoloji" alt="Zeda Teknoloji">
            </a>
          </div>
        `
      );
    }
  };

  /*************************************************************
   * 5) TARAYICI TARAFINDA URL/DOM DEĞİŞİKLİKLERİNİ YÖNETME
   *************************************************************/
  window.addEventListener("popstate", onUrlChange);

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

  // DOM değişikliklerini izleyerek eklenip silinen elemanları yakalar
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length || mutation.removedNodes.length) {
        onUrlChange();
      }
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Sayfa ilk yüklendiğinde de tetikle
  onUrlChange();
})();
</script>
