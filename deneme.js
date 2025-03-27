// @ts-nocheck
(() => {
  // Belirli bir seçiciyi (selector) bulana kadar belirli aralıklarla bekleyen fonksiyon
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

  // Mevcut URL'yi saklıyoruz
  let previousUrl = window.location.href;

  // HTML içeriğini ekleyen fonksiyon
  const addCustomHtml = () => {
    const container = document.querySelector(".product-detail-page-easy-refund");
    if (!container || document.querySelector(".pickup-info")) {
      return;
    }

    const contentHtml = `
      <style>
        .pickup-info {
          margin-bottom: 1rem;
        }
        .pickup-info a {
          color: #007aff;
          text-decoration: none;
        }
        .pairs-well-with {
          margin-bottom: 1rem;
        }
        .pairs-well-with h4 {
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }
        .pairs-well-with .product-card {
          border: 1px solid #ddd;
          padding: 1rem;
          display: inline-block;
        }
        .pairs-well-with .product-card strong {
          display: block;
          margin-bottom: 0.2rem;
        }
        details {
          margin-bottom: 0.8rem;
        }
        details summary {
          font-weight: bold;
          cursor: pointer;
          outline: none;
          list-style: none;
          margin-bottom: 0.4rem;
        }
        .action-buttons {
          margin-top: 1rem;
          display: flex;
          gap: 0.5rem;
        }
      </style>

      <div class="pickup-info">
        <p>Japonya mağazasında teslim alma mevcut</p>
        <p>Genellikle 24 saat içinde hazır</p>
        <a href="#">Diğer mağazalardaki stok durumunu kontrol et</a>
      </div>

      <div class="pairs-well-with">
        <h4>Birlikte İyi Gider <span>1/3</span></h4>
        <div class="product-card">
          <strong>Krem</strong>
          <p>Gül Kuvars Yüz Peelingi</p>
          <p>79$'dan başlayan fiyatlarla</p>
        </div>
      </div>

      <details>
        <summary>Genel Bakış</summary>
        <p>Ürün hakkında genel bilgiler burada yer alacaktır.</p>
      </details>

      <details>
        <summary>Nasıl Kullanılır</summary>
        <p>Ürünün kullanım talimatları burada yer alacaktır.</p>
      </details>

      <details>
        <summary>İçindekiler</summary>
        <p>Ürünün içindekiler listesi burada yer alacaktır.</p>
      </details>

      <div class="action-buttons">
        <button>Paylaş</button>
        <button>Soru Sor</button>
      </div>
    `;

    container.innerHTML = contentHtml;
  };

  // URL değişimlerini kontrol eden fonksiyon
  const onUrlChange = () => {
    setTimeout(() => {
      if (window.location.href !== previousUrl) {
        previousUrl = window.location.href;
        document.querySelectorAll(".pickup-info").forEach(el => el.remove());
        waitForElement(".product-detail-page-easy-refund", addCustomHtml, 100, 10);
      }
    }, 300);
  };

  // DOM değişikliklerini gözlemleyen fonksiyon
  const initializeObserver = () => {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length || mutation.removedNodes.length) {
          onUrlChange();
        }
      });
    });

    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    }
  };

  // Sayfa yüklendiğinde çalışacak fonksiyonlar
  const initializeRender = () => {
    waitForElement(".product-detail-page-easy-refund", addCustomHtml, 100, 10);
    onUrlChange();
    initializeObserver();
  };

  window.addEventListener("load", initializeRender);
  window.addEventListener("popstate", onUrlChange);
  window.addEventListener("DOMContentLoaded", initializeRender);

  // history.pushState ve replaceState'ı geçersiz kılma
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
