<script>
(() => {
  /*******************************************************
   * 1) URL DEĞİŞİKLİĞİ VE DOM GÖZLEMLEME FONKSİYONLARI
   *******************************************************/
  const onUrlChange = () => {
    setTimeout(() => {
      waitForElement(".product-detail-page-easy-refund", addCustomHtml, 100, 10);
    }, 300);
    setTimeout(() => {
      waitForElement("footer", addFooterHtml, 100, 10);
    }, 300);
  };

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

  /*******************************************************
   * 2) ANA FONKSİYON: “safeSecure” + “Birlikte İyi Gider”
   *******************************************************/
  const addCustomHtml = () => {
    const container = document.querySelector(".product-detail-page-easy-refund");
    // Eğer container yoksa veya safeSecure zaten eklenmişse, tekrar ekleme
    if (!container || document.querySelector(".safeSecure")) return;

    // --- 2.1) safeSecure ALANI (Taksit & Banka Logoları) ---
    const safeSecureHTML = `
      <style>
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
          width: 120px;
          height: auto;
        }
        @media screen and (max-width: 1126px) {
          .safeSecure > h3 {
            flex-direction: column;
          }
        }
      </style>

      <div class="safeSecure">
        <h3>Vade Farksız <div><strong>3 TAKSİT</strong> İmkanı!</div></h3>
        <div class="bankName">
          <span><img src="https://alisdijital.com/card/world.svg" alt="World"></span>
          <span><img src="https://alisdijital.com/card/maximum.svg" alt="Maximum"></span>
          <span><img src="https://alisdijital.com/card/paraf.svg" alt="Paraf"></span>
          <span><img src="https://alisdijital.com/card/axess.svg" alt="Axess"></span>
          <span><img src="https://alisdijital.com/card/cardFinans.svg" alt="CardFinans"></span>
          <span><img src="https://alisdijital.com/card/bonusCard.svg" alt="Bonus"></span>
          <span><img src="https://alisdijital.com/card/bankKart.svg" alt="BankKart"></span>
          <span><img src="https://alisdijital.com/card/advantage.svg" alt="Advantage"></span>
        </div>
      </div>
    `;

    // safeSecure alanını, container'ın ÜSTÜNE ekleyerek mevcut container içeriğine dokunmuyoruz
    container.insertAdjacentHTML("beforebegin", safeSecureHTML);

    // --- 2.2) “Birlikte İyi Gider” (Pairs well with) ALANI ---
    // Türkçe, slider bilgisi vs. eklenebilir; burada basit bir örnek
    const pairsWellHTML = `
      <div class="pairs-well-section" style="margin-top: 20px; padding: 20px; background-color: #F9F9F9; border-radius: 8px;">
        <h2 style="font-size: 1.2rem; margin-bottom: 1rem;">Birlikte İyi Gider</h2>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <!-- Örnek ürün kutusu -->
          <div style="border: 1px solid #ddd; border-radius: 6px; padding: 10px; width: 200px; background-color: #fff;">
            <p style="font-size: 0.9rem; color: #888; margin: 0 0 4px;">Krem</p>
            <p style="font-weight: 600; margin: 0 0 4px;">Rose Quartz Yüz Peelingi</p>
            <p style="color: #666; margin: 0;">79,00 TL'den başlayan fiyatlarla</p>
          </div>
          <!-- İsterseniz başka ürünler de ekleyebilirsiniz -->
        </div>
      </div>
    `;

    // “Birlikte İyi Gider” alanını .safeSecure'in ALTINA ekliyoruz:
    const safeSecureElement = document.querySelector(".safeSecure");
    if (safeSecureElement) {
      safeSecureElement.insertAdjacentHTML("afterend", pairsWellHTML);
    }

    // **DİKKAT**: container.innerHTML = ... satırını tamamen kaldırdık,
    // böylece mevcut tasarımınız (150 TL üzeri kargo vb.) bozulmadan kalır.
  };

  /*******************************************************
   * 3) FOOTER'E ALIS DİJİTAL (VEYA FARKLI) LOGO EKLEME
   *******************************************************/
  const addFooterHtml = () => {
    if (document.querySelector(".footer-content-added")) {
      return;
    }
    const footer = document.querySelector("footer");
    if (footer) {
      footer.insertAdjacentHTML(
        "beforeend",
        `
          <style>
            .footer-content-added {
              padding: 1rem;
              background: #fff;
              text-align: center;
            }
          </style>
          <div class="footer-content-added">
            <a href="https://www.alisdijital.com/?ref=https://no239.com" target="_blank" rel="noreferrer">
              <img style="width: 150px; height:auto;" src="https://alisdijital.com/image/logo.png" alt="Alis Dijital">
            </a>
          </div>
        `
      );
    }
  };

  /*******************************************************
   * 4) TARAYICI OLAYLARI: URL DEĞİŞİKLİKLERİ vs.
   *******************************************************/
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

  // DOM değişikliklerini de izleyelim:
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length || mutation.removedNodes.length) {
        onUrlChange();
      }
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Sayfa ilk yüklendiğinde
  onUrlChange();
})();
</script>
