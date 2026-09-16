import { useMemo, useState } from "react";
import styles from "./desserts.module.css";

const products = [
  {
    id: 1,
    title: "Медовик классический",
    weight: "180 г",
    price: 350,
    oldPrice: 390,
    badge: "-10%",
    category: "Торты",
    image: "/medovik.jpg", // Своя картинка для медовика
    description: "Тончайшие медовые коржи с нежным сметанным кремом.",
  },
  {
    id: 2,
    title: "Тирамису",
    weight: "160 г",
    price: 420,
    badge: "Хит",
    category: "В стакане",
    image: "/tiramisu_dessert.jpg", // Картинка тирамису
    description: "Итальянский десерт с сыром маскарпоне и пропиткой эспрессо.",
  },
  {
    id: 3,
    title: "Наполеон воздушный",
    weight: "200 г",
    price: 380,
    category: "Торты",
    image: "/napoleon.jpg", // Своя картинка для наполеона
    description: "Хрустящее слоеное тесто с заварным ванильным кремом.",
  },
  {
    id: 4,
    title: "Эклер с шоколадом",
    weight: "90 г",
    price: 250,
    oldPrice: 280,
    badge: "-10%",
    category: "Пирожные",
    image: "/eclair.jpg", // Своя картинка для эклера
    description: "Заварное тесто, глазурь из бельгийского шоколада и крем.",
  },
  {
    id: 5,
    title: "Мороженое Ягодный пломбир",
    weight: "150 г",
    price: 290,
    badge: "25% скидка",
    category: "Мороженое",
    image: "/icecream.jpg", // Своя картинка для мороженого
    description: "Натуральный сливочный пломбир со свежими лесными ягодами.",
  },
];

const categories = ["Все", "Торты", "Пирожные", "В стакане", "Мороженое"];

export default function Desserts() {
  const [category, setCategory] = useState("Все");
  const [sort, setSort] = useState("asc");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});
  const [activeImage, setActiveImage] = useState(null);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const categoryMatch = category === "Все" || product.category === category;
      const searchMatch = product.title.toLowerCase().includes(search.toLowerCase());
      return categoryMatch && searchMatch;
    });

    result = [...result].sort((a, b) =>
      sort === "asc" ? a.price - b.price : b.price - a.price
    );

    return result;
  }, [category, sort, search]);

  const addToCart = (id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const next = { ...prev };
      if (!next[id]) return prev;
      next[id]--;
      if (next[id] <= 0) delete next[id];
      return next;
    });
  };

  const cartCount = Object.values(cart).reduce((total, count) => total + count, 0);
  const cartTotal = Object.entries(cart).reduce((total, [id, count]) => {
    const product = products.find((p) => p.id === Number(id));
    return total + (product?.price || 0) * count;
  }, 0);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* HERO СЕКЦИЯ */}
        <section className={styles.hero}>
          <div className={styles.heroBgOverlay} />
          <span className={`${styles.blob} ${styles.blobDarkBlue}`} />

          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>MIDAS DESSERTS / СЛАДКОЕ НАСТРОЕНИЕ</p>
            <h1 className={styles.title}>
              Десерты, <br />
              <span className={styles.accent}>ради которых стоит жить</span>
            </h1>
            <p className={styles.subtitle}>
              Торты, пирожные и десерты в стакане — из свежих сливок, бельгийского шоколада и сезонных ягод.
            </p>
          </div>

          <div className={styles.heroPerks}>
            <div className={styles.perkCard}>
              <span className={styles.perkNum}>🔥 -25%</span>
              <span className={styles.perkText}>скидка на мороженое</span>
            </div>
            <div className={styles.perkCard}>
              <span className={styles.perkNum}>🚀 0 ₽</span>
              <span className={styles.perkText}>бесплатная доставка от 1500 ₽</span>
            </div>
          </div>
        </section>

        {/* TOOLBAR */}
        <section className={styles.toolbar}>
          <div className={styles.search}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Найти десерт..."
              className={styles.searchInput}
            />
          </div>

          <div className={styles.sort}>
            <span>Сортировать:</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className={styles.sortSelect}>
              <option value="asc">по возрастанию цены</option>
              <option value="desc">по убыванию цены</option>
            </select>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className={styles.tabs}>
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`${styles.tab} ${category === item ? styles.tabActive : ""}`}
            >
              {item}
            </button>
          ))}
        </section>

        <div className={styles.breadcrumbs}>
          Главная <span className={styles.crumbSep}>/</span> Десерты
        </div>

        {/* GRID */}
        <section className={styles.grid}>
          {filteredProducts.map((product, index) => {
            const quantity = cart[product.id] || 0;

            return (
              <article key={product.id} className={styles.card} style={{ animationDelay: `${index * 0.06}s` }}>
                <div 
                  className={styles.cardImageWrap} 
                  onClick={() => setActiveImage(product)}
                  title="Нажмите, чтобы увеличить"
                >
                  <img src={product.image} alt={product.title} className={styles.cardImage} />
                  {product.badge && <span className={`${styles.badge} ${styles.badgeSale}`}>{product.badge}</span>}
                  <div className={styles.zoomHint}>🔍</div>
                </div>

                <div className={styles.cardBody}>
                  <h2 className={styles.cardTitle}>{product.title}</h2>
                  <span className={styles.weight}>{product.weight}</span>
                  <p className={styles.description}>{product.description}</p>

                  <div className={styles.cardFooter}>
                    <div className={styles.priceBlock}>
                      {product.oldPrice && <del className={styles.oldPrice}>{product.oldPrice} ₽</del>}
                      <strong className={styles.price}>{product.price} ₽</strong>
                    </div>

                    {quantity === 0 ? (
                      <button onClick={() => addToCart(product.id)} className={styles.addBtn}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                          <path d="M4 5h2l2 11h10l2-8H7" />
                          <circle cx="10" cy="20" r="1" />
                          <circle cx="18" cy="20" r="1" />
                        </svg>
                      </button>
                    ) : (
                      <div className={styles.stepper}>
                        <button onClick={() => removeFromCart(product.id)} className={styles.stepperBtn}>−</button>
                        <span className={styles.stepperValue}>{quantity}</span>
                        <button onClick={() => addToCart(product.id)} className={styles.stepperBtn}>+</button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {filteredProducts.length === 0 && (
          <div className={styles.empty}>
            <h2>Ничего не найдено</h2>
            <button onClick={() => { setSearch(""); setCategory("Все"); }} className={styles.resetBtn}>
              Сбросить фильтры
            </button>
          </div>
        )}
      </main>

      {/* МОДАЛЬНОЕ ОКНО */}
      {activeImage && (
        <div className={styles.modalOverlay} onClick={() => setActiveImage(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setActiveImage(null)}>✕</button>
            <img src={activeImage.image} alt={activeImage.title} className={styles.modalImage} />
            <div className={styles.modalInfo}>
              <h3>{activeImage.title}</h3>
              <p>{activeImage.description}</p>
              <span className={styles.modalPrice}>{activeImage.price} ₽</span>
            </div>
          </div>
        </div>
      )}

      {cartCount > 0 && (
        <div className={styles.floatingCart}>
          <div>
            <span className={styles.floatingCartLabel}>В корзине</span>
            <strong className={styles.floatingCartTotal}>{cartTotal.toLocaleString("ru-RU")} ₽</strong>
          </div>
          <button className={styles.floatingCartBtn}>Перейти в корзину →</button>
        </div>
      )}
    </div>
  );
}