(function () {
  function waitForElements(selector, callback, interval = 100, maxAttempts = 50) {
    let attempts = 0;
    const timer = setInterval(() => {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        clearInterval(timer);
        elements.forEach((element) => callback(element));
      } else if (++attempts >= maxAttempts) {
        clearInterval(timer);
      }
    }, interval);
  }

  function insertRating(productNameElement) {
    const showRatingProbability = 1.0; // 1.0 = %100, 0.5 = %50
    if (Math.random() > showRatingProbability) {
      return;
    }

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
      rating = Math.round((Math.random() * 0.4 + 4.5) * 10) / 10; // 4.5 - 4.9
      sessionStorage.setItem(ratingKey, rating);
    }

    let reviewCount = sessionStorage.getItem(reviewKey);
    if (reviewCount === null) {
      reviewCount = Math.floor(Math.random() * (150 - 70 + 1)) + 70; // 70-150
      sessionStorage.setItem(reviewKey, reviewCount);
    }

    let favoriteCount = sessionStorage.getItem(favoriteKey);
    if (favoriteCount === null) {
      favoriteCount = Math.floor(Math.random() * (300 - 200 + 1)) + 200; // 200-300
      sessionStorage.setItem(favoriteKey, favoriteCount);
    }

    // SVG ikonları
    const fullStarSvg = `
      <svg role="img" aria-label="Tam yıldız" width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" style="vertical-align: middle;">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
      </svg>
    `;
    const halfStarSvg = `
      <svg role="img" aria-label="Yarım yıldız" width="16" height="16" viewBox="0 0 24 24" style="vertical-align: middle;">
        <defs>
          <linearGradient id="halfGrad">
            <stop offset="50%" stop-color="#FFD700"/>
            <stop offset="50%" stop-color="#999"/>
          </linearGradient>
        </defs>
        <path fill="url(#halfGrad)" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
      </svg>
    `;
    const heartSvg = `
      <svg role="img" aria-label="Favori kalp" width="16" height="16" viewBox="0 0 24 24" fill="#FF6060" style="vertical-align: middle;">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    `;
    const checkSvg = `
      <svg role="img" aria-label="Onay işareti" width="16" height="16" viewBox="0 0 24 24" fill="#28A745" style="vertical-align: middle;">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
    `;

    const starString = rating >= 4.75 
      ? fullStarSvg.repeat(5) 
      : fullStarSvg.repeat(4) + halfStarSvg;

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
          display: flex;
          gap: 2px;
        }
        .separator {
          color: #999;
        }
        .review-count {
          color: #666;
        }
        .favorite-line {
          margin-top: 6px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .favorite-text {
          color: #333;
        }
        .trust-points {
          margin-top: 6px;
          margin-bottom: 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .trust-point {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #444;
          margin-bottom: 10px;
        }
        .trust-point:last-child {
          margin-bottom: 0;
        }
        .stock-warning {
          font-size: 13px;
          font-weight: 600;
          color: #FF0000;
          text-transform: uppercase;
        }
      </style>
      <div class="rating-line" aria-label="Ürün puanı ${rating}, ${reviewCount} değerlendirme">
        <span class="rating-value">${rating}</span>
        <span class="separator">•</span>
        <span class="stars">${starString}</span>
        <span class="separator">•</span>
        <span class="review-count">${reviewCount} Değerlendirme</span>
      </div>
      <div class="favorite-line" aria-label="${favoriteCount} kişinin favorilerinde">
        <span class="heart">${heartSvg}</span>
        <span class="favorite-text"><strong>${favoriteCount} </strong> Kişinin Favorilerinde!</span>
      </div>
      <div class="trust-points" aria-label="Ürün güven bilgileri">
        <div class="trust-point">${checkSvg} <span>Üstün konfor, nefes alan kumaş</span></div>
        <div class="trust-point">${checkSvg} <span>Gündüzden geceye her tarza uygun</span></div>
        <div class="trust-point">${checkSvg} <span>Dayanıklı tasarım, uzun ömürlü kullanım</span></div>
      </div>
    `;
    productNameElement.insertAdjacentElement('afterend', ratingContainer);
  }

  waitForElements('.product-name', insertRating);
})();
