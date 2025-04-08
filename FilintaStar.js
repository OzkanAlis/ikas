(function () {
  function waitForElement(selector, callback, interval = 100, maxAttempts = 50) {
    let attempts = 0;
    const timer = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(timer);
        callback(element);
      } else if (++attempts >= maxAttempts) {
        clearInterval(timer);
      }
    }, interval);
  }

  function insertRating(productNameElement) {
    if (
      productNameElement.nextElementSibling &&
      productNameElement.nextElementSibling.classList.contains('rating-container')
    ) {
      return;
    }

    const productId = productNameElement.textContent.trim();
    const ratingKey = 'product-rating-' + encodeURIComponent(productId);
    const reviewKey = 'product-review-' + encodeURIComponent(productId);
    const favoriteKey = 'product-favorite-' + encodeURIComponent(productId);

    let rating = sessionStorage.getItem(ratingKey);
    if (rating === null) {
      rating = Math.round((Math.random() * 0.4 + 4.5) * 10) / 10; // Örn: 4.5 - 4.9 arası
      sessionStorage.setItem(ratingKey, rating);
    }

    let reviewCount = sessionStorage.getItem(reviewKey);
    if (reviewCount === null) {
      reviewCount = Math.floor(Math.random() * (150 - 70 + 1)) + 70; // 70-150 arası
      sessionStorage.setItem(reviewKey, reviewCount);
    }

    let favoriteCount = sessionStorage.getItem(favoriteKey);
    if (favoriteCount === null) {
      favoriteCount = Math.floor(Math.random() * (300 - 200 + 1)) + 200; // 200-300 arası
      sessionStorage.setItem(favoriteKey, favoriteCount);
    }

    // Eğer rating 4.75 ve üzerindeyse 5 yıldız, değilse 4 yıldız + yarım
    const starString = rating >= 4.75 ? '★★★★★' : '★★★★☆';

    const ratingContainer = document.createElement('div');
    ratingContainer.className = 'rating-container';
    ratingContainer.innerHTML = `
      <style>
        .rating-container {
          margin-top: 8px;
          font-size: 14px;
          color: #333;
          line-height: 1.4;
        }
        .rating-line {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .rating-value {
          font-weight: 600;
        }
        .stars {
          color: #FFD700;
          font-size: 16px;
        }
        .separator {
          color: #999;
        }
        .review-count {
          color: #666;
        }
        .favorite-line {
          margin-top: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .heart {
          color: #FF6060;
          font-size: 16px;
        }
        .favorite-text {
          color: #333;
        }
      </style>
      <div class="rating-line">
        <span class="rating-value">${rating}</span>
        <span class="separator">•</span>
        <span class="stars">${starString}</span>
        <span class="separator">•</span>
        <span class="review-count">${reviewCount} Değerlendirme</span>
      </div>
      <div class="favorite-line">
        <span class="heart">❤️</span>
        <span class="favorite-text"><strong>${favoriteCount} </strong> Kişinin Favorilerinde!</span>
      </div>
    `;
    productNameElement.insertAdjacentElement('afterend', ratingContainer);
  }

  waitForElement('.product-name', insertRating);
})();
