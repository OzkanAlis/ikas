(() => {
  // Namespace ve sabitler
  const NAMESPACE = 'adbt_';
  const TARGET_SELECTOR = '.product-detail-page-easy-refund';
  const MAX_ATTEMPTS = 15;
  const POLL_INTERVAL = 150;

  // Hedef elementi güvenilir şekilde bulma
  const waitForElement = (selector, callback, interval = POLL_INTERVAL, maxAttempts = MAX_ATTEMPTS) => {
    let attempts = 0;
    const intervalId = setInterval(() => {
      const element = document.querySelector(selector);
      
      if (element) {
        clearInterval(intervalId);
        callback(element);
        return;
      }
      
      if (++attempts >= maxAttempts) {
        clearInterval(intervalId);
        console.warn(`[${NAMESPACE}] Element bulunamadı: ${selector}`);
      }
    }, interval);
  };

  // Beden tablosu HTML ve CSS içeriği
  const getBedenTabloContent = () => `
    <style>
      .${NAMESPACE}container {
        max-width: 1400px;
        margin: 30px auto;
        padding: 25px;
        background: #fff;
        font-family: 'Poppins', sans-serif;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        border: 1px solid #e0e0e0;
      }
      
      .${NAMESPACE}title {
        font-size: 28px;
        font-weight: 700;
        margin: 0 0 35px 0;
        color: #2d2d2d;
        text-align: center;
        position: relative;
        padding-bottom: 15px;
      }
      
      .${NAMESPACE}title::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 3px;
        background: #2d2d2d;
      }
      
      .${NAMESPACE}cards {
        display: grid;
        gap: 25px;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      }
      
      .${NAMESPACE}card {
        background: #fff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        transition: transform 0.2s ease;
      }
      
      .${NAMESPACE}card:hover {
        transform: translateY(-3px);
      }
      
      .${NAMESPACE}card-header {
        background: #2d2d2d;
        color: #fff;
        padding: 15px;
        font-size: 18px;
        font-weight: 600;
        text-align: center;
      }
      
      .${NAMESPACE}card-content {
        padding: 20px 15px;
      }
      
      .${NAMESPACE}data-table {
        width: 100%;
        border-collapse: collapse;
        background: #f8f8f8;
        border-radius: 6px;
        overflow: hidden;
      }
      
      .${NAMESPACE}data-table th,
      .${NAMESPACE}data-table td {
        padding: 12px 10px;
        text-align: center;
        border-bottom: 1px solid #e0e0e0;
      }
      
      .${NAMESPACE}data-table th {
        background: #3a3a3a;
        color: #fff;
        font-weight: 600;
        text-transform: uppercase;
        font-size: 13px;
      }
      
      .${NAMESPACE}data-table tr:last-child td {
        border-bottom: none;
      }
      
      .${NAMESPACE}data-table tr:nth-child(even) {
        background: #f0f0f0;
      }
    </style>
    
    <div class="${NAMESPACE}container">
      <h2 class="${NAMESPACE}title">Ürün Beden Kılavuzu</h2>
      <div class="${NAMESPACE}cards">
        <!-- Model Bilgileri -->
        <div class="${NAMESPACE}card">
          <div class="${NAMESPACE}card-header">Model Ölçüleri</div>
          <div class="${NAMESPACE}card-content">
            <table class="${NAMESPACE}data-table">
              <tr><th>Özellik</th><th>Değer</th></tr>
              <tr><td>Boy</td><td>180 cm</td></tr>
              <tr><td>Kilo</td><td>84 kg</td></tr>
              <tr><td>Üst Beden</td><td>M</td></tr>
              <tr><td>Alt Beden</td><td>33</td></tr>
            </table>
          </div>
        </div>
        
        <!-- Üst Beden -->
        <div class="${NAMESPACE}card">
          <div class="${NAMESPACE}card-header">Üst Giyim</div>
          <div class="${NAMESPACE}card-content">
            <table class="${NAMESPACE}data-table">
              <tr><th>Kilo (kg)</th><th>Beden</th></tr>
              <tr><td>60-74</td><td>S</td></tr>
              <tr><td>75-84</td><td>M</td></tr>
              <tr><td>85-89</td><td>L</td></tr>
              <tr><td>90-110</td><td>XL</td></tr>
            </table>
          </div>
        </div>
        
        <!-- Alt Beden -->
        <div class="${NAMESPACE}card">
          <div class="${NAMESPACE}card-header">Alt Giyim</div>
          <div class="${NAMESPACE}card-content">
            <table class="${NAMESPACE}data-table">
              <tr><th>Kilo (kg)</th><th>Beden</th></tr>
              <tr><td>60-74</td><td>S</td></tr>
              <tr><td>75-84</td><td>M</td></tr>
              <tr><td>85-89</td><td>L</td></tr>
              <tr><td>90-110</td><td>XL</td></tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;

  // DOM enjeksiyon işlemi
  const injectBedenTablo = (targetElement) => {
    if (!targetElement) return;
    
    // Çakışma kontrolü
    if (targetElement.querySelector(`.${NAMESPACE}container`)) {
      console.log(`[${NAMESPACE}] Beden tablosu zaten ekli`);
      return;
    }
    
    // İçerik enjeksiyonu
    targetElement.innerHTML = getBedenTabloContent();
    console.log(`[${NAMESPACE}] Beden tablosu başarıyla eklendi`);
  };

  // MutationObserver konfigürasyonu
  const setupObserver = () => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (!mutation.addedNodes.length) return;
        
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1 && node.matches(TARGET_SELECTOR)) {
            injectBedenTablo(node);
          }
        });
      });
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  };

  // History API override
  const hijackHistoryAPI = () => {
    const methods = ['pushState', 'replaceState'];
    methods.forEach((method) => {
      const original = history[method];
      history[method] = function(...args) {
        const result = original.apply(this, args);
        window.dispatchEvent(new Event('urlchange'));
        return result;
      };
    });
  };

  // İlk yükleme ve SPA takibi
  const initialize = () => {
    // İlk enjeksiyon denemesi
    waitForElement(TARGET_SELECTOR, injectBedenTablo);
    
    // SPA navigasyon takibi
    window.addEventListener('urlchange', () => {
      waitForElement(TARGET_SELECTOR, injectBedenTablo);
    });
    
    // Observer'ı başlat
    setupObserver();
    hijackHistoryAPI();
  };

  // Doküman hazır olduğunda başlat
  if (document.readyState === 'complete') {
    initialize();
  } else {
    document.addEventListener('DOMContentLoaded', initialize);
    window.addEventListener('load', initialize);
  }
})();
