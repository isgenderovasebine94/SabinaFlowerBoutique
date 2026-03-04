const translations = {
  az: {
    nav: { home: 'Ana Səhifə', bouquets: 'Buketlər', compositions: 'Kompozisiyalar', bridal: 'Gəlin Buketləri', contact: 'Əlaqə', basket: 'Səbət', wishlist: 'İstək Siyahısı', login: 'Daxil ol' },
    hero: { title: 'Sabina Flower Boutique', subtitle: 'Hər anı xüsusi edən çiçəklər', cta: 'Buketlərə Bax' },
    home: { featured: 'Seçilmiş Məhsullar', categories: 'Kateqoriyalar', whyUs: 'Niyə Biz?', freshFlowers: 'Təzə Çiçəklər', freshFlowersDesc: 'Hər gün təzə çiçəklərlə işləyirik', freeDelivery: 'Pulsuz Çatdırılma', freeDeliveryDesc: 'Bakı daxili pulsuz çatdırılma', uniqueDesign: 'Unikal Dizayn', uniqueDesignDesc: 'Hər buket əl işi ilə hazırlanır' },
    product: { addToCart: 'Səbətə Əlavə Et', addToWishlist: 'İstəyə Əlavə Et', removeFromWishlist: 'İstəkdən Çıxar', price: 'Qiymət', description: 'Təsvir', viewDetails: 'Ətraflı Bax' },
    basket: { title: 'Səbətiniz', empty: 'Səbətiniz boşdur', total: 'Cəmi', checkout: 'Sifarişi Tamamla', remove: 'Sil', continueShopping: 'Alış-verişə Davam Et' },
    wishlist: { title: 'İstək Siyahınız', empty: 'İstək siyahınız boşdur', moveToCart: 'Səbətə Keçir' },
    contact: { title: 'Bizimlə Əlaqə', name: 'Ad', email: 'E-poçt', message: 'Mesaj', send: 'Göndər', address: 'Ünvan', phone: 'Telefon' },
    footer: { about: 'Haqqımızda', aboutText: 'Sabina Flower Boutique — Bakıda premium çiçək çatdırılma xidməti.', quickLinks: 'Sürətli Keçidlər', contactInfo: 'Əlaqə Məlumatları', rights: 'Bütün hüquqlar qorunur.' },
    auth: { login: 'Daxil ol', register: 'Qeydiyyat', fullName: 'Ad Soyad', email: 'E-poçt', password: 'Şifrə', loginBtn: 'Daxil ol', registerBtn: 'Qeydiyyatdan keç' },
    currency: '₼'
  },
  en: {
    nav: { home: 'Home', bouquets: 'Bouquets', compositions: 'Compositions', bridal: 'Bridal Bouquets', contact: 'Contact', basket: 'Basket', wishlist: 'Wishlist', login: 'Login' },
    hero: { title: 'Sabina Flower Boutique', subtitle: 'Flowers that make every moment special', cta: 'View Bouquets' },
    home: { featured: 'Featured Products', categories: 'Categories', whyUs: 'Why Choose Us?', freshFlowers: 'Fresh Flowers', freshFlowersDesc: 'We work with fresh flowers every day', freeDelivery: 'Free Delivery', freeDeliveryDesc: 'Free delivery within Baku', uniqueDesign: 'Unique Design', uniqueDesignDesc: 'Every bouquet is handcrafted with love' },
    product: { addToCart: 'Add to Cart', addToWishlist: 'Add to Wishlist', removeFromWishlist: 'Remove from Wishlist', price: 'Price', description: 'Description', viewDetails: 'View Details' },
    basket: { title: 'Your Basket', empty: 'Your basket is empty', total: 'Total', checkout: 'Checkout', remove: 'Remove', continueShopping: 'Continue Shopping' },
    wishlist: { title: 'Your Wishlist', empty: 'Your wishlist is empty', moveToCart: 'Move to Cart' },
    contact: { title: 'Contact Us', name: 'Name', email: 'Email', message: 'Message', send: 'Send', address: 'Address', phone: 'Phone' },
    footer: { about: 'About Us', aboutText: 'Sabina Flower Boutique — Premium flower delivery service in Baku.', quickLinks: 'Quick Links', contactInfo: 'Contact Info', rights: 'All rights reserved.' },
    auth: { login: 'Login', register: 'Register', fullName: 'Full Name', email: 'Email', password: 'Password', loginBtn: 'Login', registerBtn: 'Register' },
    currency: '₼'
  },
  ru: {
    nav: { home: 'Главная', bouquets: 'Букеты', compositions: 'Композиции', bridal: 'Свадебные Букеты', contact: 'Контакт', basket: 'Корзина', wishlist: 'Избранное', login: 'Войти' },
    hero: { title: 'Sabina Flower Boutique', subtitle: 'Цветы, которые делают каждый момент особенным', cta: 'Смотреть Букеты' },
    home: { featured: 'Избранные Товары', categories: 'Категории', whyUs: 'Почему Мы?', freshFlowers: 'Свежие Цветы', freshFlowersDesc: 'Мы работаем со свежими цветами каждый день', freeDelivery: 'Бесплатная Доставка', freeDeliveryDesc: 'Бесплатная доставка по Баку', uniqueDesign: 'Уникальный Дизайн', uniqueDesignDesc: 'Каждый букет создан вручную с любовью' },
    product: { addToCart: 'В Корзину', addToWishlist: 'В Избранное', removeFromWishlist: 'Убрать из Избранного', price: 'Цена', description: 'Описание', viewDetails: 'Подробнее' },
    basket: { title: 'Ваша Корзина', empty: 'Ваша корзина пуста', total: 'Итого', checkout: 'Оформить Заказ', remove: 'Удалить', continueShopping: 'Продолжить Покупки' },
    wishlist: { title: 'Ваше Избранное', empty: 'Ваше избранное пусто', moveToCart: 'В Корзину' },
    contact: { title: 'Свяжитесь с Нами', name: 'Имя', email: 'Эл. почта', message: 'Сообщение', send: 'Отправить', address: 'Адрес', phone: 'Телефон' },
    footer: { about: 'О Нас', aboutText: 'Sabina Flower Boutique — Премиум доставка цветов в Баку.', quickLinks: 'Быстрые Ссылки', contactInfo: 'Контактная Информация', rights: 'Все права защищены.' },
    auth: { login: 'Войти', register: 'Регистрация', fullName: 'Полное Имя', email: 'Эл. почта', password: 'Пароль', loginBtn: 'Войти', registerBtn: 'Зарегистрироваться' },
    currency: '₼'
  }
};

let currentLang = localStorage.getItem('sabina-lang') || 'az';

function t(path) {
  const keys = path.split('.');
  let val = translations[currentLang];
  for (const k of keys) { val = val?.[k]; }
  return val || path;
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('sabina-lang', lang);
  if (typeof renderPage === 'function') renderPage();
}
