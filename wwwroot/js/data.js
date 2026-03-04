const IMG_BASE = 'images/';

const categories = [
  { id: 1, name: { az: 'Buketlər', en: 'Bouquets', ru: 'Букеты' }, imageUrl: IMG_BASE + 'Buketlər.jpg', slug: 'bouquets' },
  { id: 2, name: { az: 'Kompozisiyalar', en: 'Compositions', ru: 'Композиции' }, imageUrl: IMG_BASE + 'Kompozisiyalar.jpg', slug: 'compositions' },
  { id: 3, name: { az: 'Gəlin Buketləri', en: 'Bridal Bouquets', ru: 'Свадебные Букеты' }, imageUrl: IMG_BASE + 'category-bridal.jpg', slug: 'bridal' }
];

const products = [
  { id: 1, name: { az: 'Çəhrayı Güllər Buketi', en: 'Pink Roses Bouquet', ru: 'Букет Розовых Роз' }, description: { az: 'Təzə çəhrayı güllər ilə hazırlanmış zərif buket', en: 'Delicate bouquet made with fresh pink roses', ru: 'Нежный букет из свежих розовых роз' }, price: 70, imageUrl: IMG_BASE + 'Çəhrayı romantik güllər.jpg', categoryId: 1 },
  { id: 2, name: { az: 'Pion Kompozisiyası', en: 'Peony Arrangement', ru: 'Композиция из Пионов' }, description: { az: 'Ağ və çəhrayı pionlardan ibarət elegans kompozisiya', en: 'Elegant arrangement of white and blush peonies', ru: 'Элегантная композиция из белых и розовых пионов' }, price: 85, imageUrl: IMG_BASE + 'Ağ və çəhrayı pionlar.jpg', categoryId: 2 },
  { id: 3, name: { az: 'Klassik Gəlin Buketi', en: 'Classic Bridal Bouquet', ru: 'Классический Свадебный Букет' }, description: { az: 'Ağ güllər və eukaliptus ilə klassik gəlin buketi', en: 'Classic bridal bouquet with white roses and eucalyptus', ru: 'Классический свадебный букет с белыми розами и эвкалиптом' }, price: 100, imageUrl: IMG_BASE + 'Gəlin buketi.jpg', categoryId: 3 },
  { id: 4, name: { az: 'Rəngarəng Papatyalar Buketi', en: 'Colorful Daisy Bouquet', ru: 'Букет Разноцветных Ромашек' }, description: { az: 'Canlı tonların ahəngində hazırlanmış bu papatya buketi pozitiv duyğuların incə ifadəsidir.', en: 'Crafted in a lively palette, this daisy bouquet radiates positivity and refined charm.', ru: 'Созданный в живой цветовой палитре, этот букет излучает позитив и утончённое очарование.' }, price: 60, imageUrl: IMG_BASE + 'rengberengpapatyalar.jpg', categoryId: 1 },
  { id: 5, name: { az: 'Lavanda Çiçəkləri', en: 'Lavender Flowers', ru: 'Лавандовые Цветы' }, description: { az: 'Pastel rənglərdə zərif lavanda kompozisiyası', en: 'Delicate lavender composition in pastel colors', ru: 'Нежная лавандовая композиция в пастельных тонах' }, price: 55, imageUrl: IMG_BASE + 'Lavanda və zərif vaza kompozisiyası.jpg', categoryId: 2 },
  { id: 6, name: { az: 'Günəbaxan Buketi', en: 'Sunflower Bouquet', ru: 'Букет Подсолнухов' }, description: { az: 'Parlaq günəbaxan və papatya buketi', en: 'Bright sunflower and daisy bouquet', ru: 'Яркий букет из подсолнухов и ромашек' }, price: 60, imageUrl: IMG_BASE + 'Günəbaxan.jpg', categoryId: 1 },
  { id: 7, name: { az: 'Orkide Kompozisiyası', en: 'Orchid Arrangement', ru: 'Композиция из Орхидей' }, description: { az: 'Lüks orkide kompozisiyası şüşə vazoda', en: 'Luxury orchid arrangement in glass vase', ru: 'Роскошная композиция из орхидей в стеклянной вазе' }, price: 95, imageUrl: IMG_BASE + 'orkideler.jpg', categoryId: 2 },
  { id: 8, name: { az: 'Zərif Papatya Buketi', en: 'Elegant Daisy Bouquet', ru: 'Нежный Букет Ромашек' }, description: { az: 'Saf zərifliyin simvolu olan ağ papatyalar buketi', en: 'A refined bouquet of pure white daisies embodying timeless elegance', ru: 'Изысканный букет из белых ромашек, воплощающий чистоту и утончённость' }, price: 60, imageUrl: IMG_BASE + 'papatyalarbuketi.jpg', categoryId: 1 },
  { id: 9, name: { az: 'Gəlin Pion Buketi', en: 'Bridal Peony Bouquet', ru: 'Свадебный Букет из Пионов' }, description: { az: 'Ağ pionlar ilə nəfis gəlin buketi', en: 'Exquisite bridal bouquet with white peonies', ru: 'Изысканный свадебный букет из белых пионов' }, price: 120, imageUrl: IMG_BASE + 'gelinpionbuketi.jpg', categoryId: 3 },
  { id: 10, name: { az: 'Qarışıq Çiçək Buketi', en: 'Mixed Flower Bouquet', ru: 'Смешанный Букет Цветов' }, description: { az: 'Rəngarəng çiçəklərdən hazırlanmış xüsusi buket', en: 'Special bouquet made with colorful mixed flowers', ru: 'Особый букет из разноцветных цветов' }, price: 65, imageUrl: IMG_BASE + 'Lalələr.jpg', categoryId: 1 }
];

function getProductsByCategory(categoryId) {
  return products.filter(p => p.categoryId === categoryId);
}

function getProductById(id) {
  return products.find(p => p.id === id);
}

function getCategoryBySlug(slug) {
  return categories.find(c => c.slug === slug);
}