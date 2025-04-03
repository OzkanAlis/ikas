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

  const productData = [
    {
      name: "pleksi marketi kahvaltı sunum tabağı",
      features: {
        Boyut: "25x15 cm",
        Şekil: "Yuvarlak",
        Malzeme: "Akrilik",
      },
    },
    {
      name: "pleksi marketi kilitli siyah kutu",
      features: {
        Boyut: "15x15x15 cm",
        Renk: "Füme",
        Malzeme: "Pleksi",
      },
    },
    {
      name: "pleksi marketi kilitli şeffaf kutu",
      features: {
        Boyut: "15x15x15 cm",
        Renk: "Şeffaf",
        Malzeme: "Pleksi",
      },
    },
    {
      name: "pleksi marketi turuncu raf",
      features: {
        Uzunluk: "70 cm",
        Derinlik: "5 cm",
        "İç Boşluk": "10 cm",
        Stil: "Transparan",
      },
    },
    {
      name: "pleksi marketi peçetelik",
      features: {
        Uzunluk: "20 cm",
        Genişlik: "11 cm",
        Derinlik: "6 cm",
        Stil: "Transparan",
      },
    },
    {
      name: "pleksi marketi küp kutu",
      features: {
        Boyut: "25x25 cm",
        Stil: "Transparan",
        Özellik: "Kilitli",
      },
    },
    {
      name: "pleksi marketi kalın yükseltici",
      features: {
        Çap: "25 cm",
        Kalınlık: "15 mm",
        Stil: "Şeffaf",
      },
    },
    {
      name: "pleksi marketi dilek kutusu",
      features: {
        Boyut: "20x20x20 cm",
        Özellik: "Kilitli",
        Fonksiyon: "Çok Amaçlı",
        Stil: "Şeffaf",
      },
    },
    {
      name: "pleksi marketi dekoratif vidalı poster",
      features: {
        Uzunluk: "20 cm",
        Genişlik: "14 cm",
        Fonksiyon: "Mıknatıslı",
        Stil: "Şeffaf",
      },
    },
    {
      name: "pleksi marketi 3'lü zigon sehpa",
      features: {
        "Büyük Sehpa Tabla": "46x30 cm",
        "Büyük Sehpa Yükseklik": "44 cm",
        "Orta Sehpa Tabla": "43x30 cm",
        "Orta Sehpa Yükseklik": "42 cm",
        "Küçük Sehpa Tabla": "40x30 cm",
        "Küçük Sehpa Yükseklik": "40 cm",
        Stil: "Şeffaf",
      },
    },
    {
      name: "pleksi marketi tekli fiskos",
      features: {
        Uzunluk: "20 cm",
        Genişlik: "14 cm",
        Fonksiyon: "Mıknatıslı",
        Stil: "Şeffaf",
      },
    },
    {
      name: "pleksi marketi c sehpa",
      features: {
        Ölçü: "35x50 cm",
        "Tekerlekli Yükseklik": "65 cm",
        Derinlik: "30 cm",
        Stil: "Şeffaf",
      },
    },
    {
      name: "pleksi marketi küçük ekran tutucu",
      features: {
        Genişlik: "30 cm",
        Malzeme: "Pleksi",
        Stil: "Şeffaf",
        Fonksiyon: "Alan Tasarrufu",
      },
    },
    {
      name: "pleksi marketi büyük ekran tutucu",
      features: {
        Genişlik: "50 cm",
        Malzeme: "Pleksi",
        Stil: "Şeffaf",
        Fonksiyon: "Alan Tasarrufu",
      },
    },
    {
      name: "pleksi marketi bilgisayar tutucu",
      features: {
        Genişlik: "50 cm",
        Fonksiyon: "Alan Tasarrufu",
      },
    },
  ];

  let previousUrl = window.location.href;

  const createProductTable = (features) => {
    let tableHtml = `
            <div class="product-detail-table" style="margin-bottom: 5px; margin-top: 20px; background-color: #F9F9F9; padding: 20px; border-radius: 8px;">
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="background-color: #eee;">
                    <th style="padding: 10px; border: 1px solid #CCC; text-align: left;">Özellik</th>
                    <th style="padding: 10px; border: 1px solid #CCC; text-align: left;">Detay</th>
                  </tr>
                </thead>
                <tbody>
          `;

    for (const [key, value] of Object.entries(features)) {
      tableHtml += `
              <tr>
                <td style="padding: 10px; border: 1px solid #CCC;">${key}</td>
                <td style="padding: 10px; border: 1px solid #CCC;">${value}</td>
              </tr>
            `;
    }

    tableHtml += `
                </tbody>
              </table>
            </div>
          `;

    return tableHtml;
  };

  const addCustomHtml = () => {
    const productNameElement = document.querySelector(".product-name");
    const container = document.querySelector(
      ".product-detail-page-easy-refund"
    );

    if (
      !productNameElement ||
      !container ||
      document.querySelector(".product-detail-table") ||
      document.querySelector(".safeSecure")
    ) {
      return;
    }

    const productName = productNameElement.textContent.toLowerCase();

    const product = productData.find((p) => productName.includes(p.name));

    if (product) {
      const tableHtml = `<div class="product-detail-table">${createProductTable(
        product.features
      )}</div>`;
      container.insertAdjacentHTML("beforebegin", tableHtml);
    }

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
                  gap: 2rem;
                  margin-top: 1rem;
                  align-items: center;
                  justify-content: center;
                  flex-direction: column;
                  padding: 1.5rem;
                  background-color: #f4f4f4;
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
                  width: 90px;
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
                      grid-template-columns: repeat(4, 1fr)
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
              <h3>Vade Farksız <div><strong>3 TAKSİT</strong> İmkanı!</div>
              </h3>
              <div class="bankName">
                  <span>
            <img src="https://alisdijital.com/card/world.svg" width="180" height="180">
        </span>
        <span>
            <img src="https://alisdijital.com/card/maximum.svg" width="180" height="180">
        </span>
        <span>
            <img src="https://alisdijital.com/card/paraf.svg" width="180" height="180">
        </span>
        <span>
            <img src="https://alisdijital.com/card/axess.svg" width="180" height="180">
        </span>
        <span>
            <img src="https://alisdijital.com/card/cardFinans.svg" width="180" height="180">
        </span>
        <span>
            <img src="https://alisdijital.com/card/bonusCard.svg" width="180" height="180">
        </span>
        <span>
            <img src="https://alisdijital.com/card/bankKart.svg" width="180" height="180">
        </span>
        <span>
            <img src="https://alisdijital.com/card/advantage.svg" width="180" height="180">
        </span>
              </div>
      </div>
      
            `;
    container.insertAdjacentHTML("beforebegin", sliderTesxt);

    container.innerHTML = `
            <div style="display:flex;flex-direction:column;width: 100%;">
              <div style="display: flex; justify-content: space-between;flex-direction:column; gap: 1.5rem;margin-top: 1rem; width: 100%; align-items: start; padding: 20px; background-color: #F9F9F9; border-radius: 8px; font-size: 12px;" id="specials_alis">
              <div style="display: flex; align-items: center;">
                  <span style="font-size: 28px; margin-right: 10px;">🚚</span>
                  <span><strong>Ücretsiz Kargo!</strong><br />81 İl'e ücretsiz kargo ile ürünlerinizi gönderiyoruz.</span>
                </div>    
                <div style="display: flex; align-items: center;">
                  <span style="font-size: 28px; margin-right: 10px;">💳</span>
                  <span><strong>Vade Farksız 3 ay taksit imkânı!</strong><br />Üstelik cebiniz rahat, ödemeler kolay!</span>
                </div>  
                <div style="display: flex; align-items: center;">
                  <span style="font-size: 28px; margin-right: 10px;">😊</span>
                  <span><strong>Satış Sonrası Hizmet!</strong><br />Ürünü aldıktan sonra da yanınızdayız!</span>
                </div>
                <div style="display: flex; align-items: center;">
                  <span style="font-size: 28px; margin-right: 10px;">🏅</span>
                  <span><strong>2 Yıl Garantili!</strong><br />Ürünlerimizde kaliteye güveniyoruz.</span>
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
  };

  const addFooterHtml = (container) => {
    if (document.querySelector(".footer-content-added")) {
      return;
    }

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
        <a href="https://www.alisdijital.com/?ref=https://pleksimarketi.com/" target="_blank" rel="noreferrer">
          <img style="display:block;margin:0 auto;width: 150px; height:auto;" src="https://alisdijital.com/image/logo.png" alt="Alis Dijital">
        </a>
      </div>
    `;
    }
  };

  const onUrlChange = () => {
    setTimeout(() => {
      if (window.location.href !== previousUrl) {
        previousUrl = window.location.href;
        document
          .querySelectorAll(".product-detail-table")
          .forEach((el) => el.remove());
        document.querySelectorAll(".safeSecure").forEach((el) => el.remove());
        waitForElement(
          ".product-detail-page-easy-refund",
          addCustomHtml,
          100,
          10
        );
        waitForElement(".footer-copyright", addFooterHtml, 100, 10);
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
    waitForElement(".footer-copyright", addFooterHtml, 100, 10);
    onUrlChange();
    initializeObserver();
  };

  window.addEventListener("load", initializeRender);
  window.addEventListener("popstate", onUrlChange);
  window.addEventListener("DOMContentLoaded", initializeRender);

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
