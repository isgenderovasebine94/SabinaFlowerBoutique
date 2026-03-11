function getBasket() {
  return JSON.parse(localStorage.getItem('sabina-basket') || '[]');
}
function saveBasket(basket) {
  localStorage.setItem('sabina-basket', JSON.stringify(basket));
  updateBadges();
}
function addToBasket(productId) {
  const basket = getBasket();
  const existing = basket.find(i => i.productId === productId);
  if (existing) { existing.quantity++; } else { basket.push({ productId, quantity: 1 }); }
  saveBasket(basket);
  showToast(getProductById(productId).name[currentLang] + ' — ' + t('product.addToCart'));
}
function removeFromBasket(productId) {
  saveBasket(getBasket().filter(i => i.productId !== productId));
}
function updateQuantity(productId, qty) {
  if (qty <= 0) { removeFromBasket(productId); return; }
  const basket = getBasket();
  const item = basket.find(i => i.productId === productId);
  if (item) item.quantity = qty;
  saveBasket(basket);
}

function getWishlist() {
  return JSON.parse(localStorage.getItem('sabina-wishlist') || '[]');
}
function saveWishlist(wl) {
  localStorage.setItem('sabina-wishlist', JSON.stringify(wl));
  updateBadges();
}
function toggleWishlist(productId) {
  const wl = getWishlist();
  const idx = wl.indexOf(productId);
  if (idx >= 0) wl.splice(idx, 1); else wl.push(productId);
  saveWishlist(wl);
}
function isInWishlist(productId) {
  return getWishlist().includes(productId);
}

function updateBadges() {
  const basketBadge = document.getElementById('basket-badge');
  const wishBadge = document.getElementById('wishlist-badge');
  const count = getBasket().reduce((s, i) => s + i.quantity, 0);
  const wCount = getWishlist().length;
  if (basketBadge) { basketBadge.textContent = count; basketBadge.style.display = count > 0 ? 'flex' : 'none'; }
  if (wishBadge) { wishBadge.textContent = wCount; wishBadge.style.display = wCount > 0 ? 'flex' : 'none'; }
}

function showToast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2500);
}

const icons = {
  heart: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
  heartFill: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
  bag: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
  trash: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
  arrowLeft: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>',
  send: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>',
  flower: '🌸',
  truck: '🚚',
  palette: '🎨',
  mapPin: '📍',
  phone: '📞',
  mail: '✉️',
};

function renderHeader() {
  return `
  <header class="header">
    <div class="container">
      <div class="header-inner">
        <a href="index.html" class="logo">
          <span class="logo-emoji">🌸</span>
          <div class="logo-text">
            <h1>Sabina</h1>
            <p>Flower Boutique</p>
          </div>
        </a>
        <nav class="nav-desktop">
          <a href="index.html">${t('nav.home')}</a>
          <a href="bouquets.html">${t('nav.bouquets')}</a>
          <a href="compositions.html">${t('nav.compositions')}</a>
          <a href="bridal.html">${t('nav.bridal')}</a>
          <a href="contact.html">${t('nav.contact')}</a>
        </nav>
        <div class="header-right">
          <select class="lang-select" onchange="setLanguage(this.value);location.reload();">
            <option value="az" ${currentLang==='az'?'selected':''}>AZ</option>
            <option value="en" ${currentLang==='en'?'selected':''}>EN</option>
            <option value="ru" ${currentLang==='ru'?'selected':''}>RU</option>
          </select>
          <a href="wishlist.html" class="icon-btn">
            ${icons.heart.replace('width="16"','width="20"').replace('height="16"','height="20"')}
            <span class="badge" id="wishlist-badge" style="display:none">0</span>
          </a>
          <a href="basket.html" class="icon-btn">
            ${icons.bag.replace('width="16"','width="20"').replace('height="16"','height="20"')}
            <span class="badge" id="basket-badge" style="display:none">0</span>
          </a>
          <a href="login.html" class="icon-btn" title="${t('nav.login')}">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </a>
          <button class="hamburger" onclick="document.getElementById('mobile-nav').classList.toggle('open')">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
      </div>
      <nav class="nav-mobile" id="mobile-nav">
        <a href="index.html">${t('nav.home')}</a>
        <a href="bouquets.html">${t('nav.bouquets')}</a>
        <a href="compositions.html">${t('nav.compositions')}</a>
        <a href="bridal.html">${t('nav.bridal')}</a>
        <a href="contact.html">${t('nav.contact')}</a>
        <a href="login.html">${t('nav.login')}</a>
      </nav>
    </div>
  </header>`;
}

function renderFooter() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-inner">
        <div>
          <div class="logo" style="margin-bottom:16px"><span class="logo-emoji">🌸</span><h3>Sabina Flower Boutique</h3></div>
          <p>${t('footer.aboutText')}</p>
          <div class="social-links">
            <a href="#" class="social-link">📷</a>
            <a href="#" class="social-link">📘</a>
          </div>
        </div>
        <div>
          <h3>${t('footer.quickLinks')}</h3>
          <div class="footer-links">
            <a href="bouquets.html">${t('nav.bouquets')}</a>
            <a href="compositions.html">${t('nav.compositions')}</a>
            <a href="bridal.html">${t('nav.bridal')}</a>
            <a href="contact.html">${t('nav.contact')}</a>
          </div>
        </div>
        <div>
          <h3>${t('footer.contactInfo')}</h3>
          <div class="footer-contact-item"><span class="icon">📍</span> Bakı, Nəsimi rayonu, Nizami küçəsi 42</div>
          <div class="footer-contact-item"><span class="icon">📞</span> +994 50 123 45 67</div>
          <div class="footer-contact-item"><span class="icon">✉️</span> info@sabinaflower.az</div>
        </div>
      </div>
      <div class="footer-bottom"><p>© 2026 Sabina Flower Boutique. ${t('footer.rights')}</p></div>
    </div>
  </footer>
  <div class="toast" id="toast"></div>`;
}

function renderProductCard(product) {
  const inWish = isInWishlist(product.id);
  return `
  <div class="product-card">
    <a href="product.html?id=${product.id}">
      <div class="product-card-img">
        <img src="${product.imageUrl}" alt="${product.name[currentLang]}" loading="lazy">
        <button class="product-wishlist-btn ${inWish?'active':''}" onclick="event.preventDefault();toggleWishlist(${product.id});renderPage();">
          ${inWish ? icons.heartFill : icons.heart}
        </button>
        <div class="product-add-cart">
          <button onclick="event.preventDefault();addToBasket(${product.id});">${icons.bag} ${t('product.addToCart')}</button>
        </div>
      </div>
      <h3>${product.name[currentLang]}</h3>
      <p class="price">${product.price} ${t('currency')}</p>
    </a>
  </div>`;
}

function initPage() {
  updateBadges();
}
document.addEventListener('DOMContentLoaded', initPage);

function completeOrder() {
  const basket = getBasket();
  const token = localStorage.getItem('sabina-token');
  const API_BASE = "https://sabinaflowerboutique-production-1d17.up.railway.app";

  if (!token) {
    showToast('Zəhmət olmasa əvvəl login olun');
    setTimeout(() => location.href = 'login.html', 1000);
    return;
  }

  if (basket.length === 0) {
    showToast('Səbət boşdur');
    return;
  }

  fetch(API_BASE + "/api/orders", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      items: basket.map(i => ({
        productId: i.productId,
        quantity: i.quantity
      }))
    })
  })
  .then(res => {
    if (!res.ok) throw new Error('Order error');
    return res.json();
  })
  .then( order => {
    console.log(res.status, res);
    showToast('Sifariş uğurla göndərildi!');
    localStorage.removeItem('sabina-basket');
    const summaryDiv = document.getElementById('order-summary');
    if (summaryDiv) {
      summaryDiv.innerHTML = `
        <p>Ad Soyad: ${order.user.fullName}</p>
        <p>Email: ${order.user.email}</p>
        <p>Ünvan: ${order.user.address}</p>
        <p>Telefon: ${order.user.phoneNumber}</p>
        <p>Ümumi Məbləğ: ${order.totalAmount} AZN</p>
      `;
    }
    setTimeout(() => location.href = 'index.html', 3000);
  })
  .catch(() => {
    showToast('Sifariş zamanı xəta baş verdi');
  });
}
