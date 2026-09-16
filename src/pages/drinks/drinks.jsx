import { useMemo, useState } from "react";
import styles from "./drinks.module.css";

const products = [
  {
    id: 1,
    title: "Капучино",
    weight: "300 мл",
    price: 190,
    badge: "Хит",
    category: "Кофе",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=90",
    description: "Эспрессо с бархатной молочной пенкой и лёгкой горчинкой.",
  },
  {
    id: 2,
    title: "Латте",
    weight: "350 мл",
    price: 210,
    category: "Кофе",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=90",
    description: "Мягкий кофейный вкус с большим количеством молока.",
  },
  {
    id: 3,
    title: "Американо",
    weight: "300 мл",
    price: 150,
    oldPrice: 180,
    badge: "-17%",
    category: "Кофе",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=90",
    description: "Чистый вкус эспрессо, разбавленного горячей водой.",
  },
  {
    id: 4,
    title: "Чёрный листовой чай",
    weight: "400 мл",
    price: 140,
    category: "Чай",
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=90",
    description: "Крупнолистовой чай с насыщенным терпким вкусом.",
  },
  {
    id: 5,
    title: "Зелёный чай с жасмином",
    weight: "400 мл",
    price: 150,
    badge: "Новинка",
    category: "Чай",
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=90",
    description: "Лёгкий зелёный чай с ароматом жасминовых цветов.",
  },
  {
    id: 6,
    title: "Апельсиновый фреш",
    weight: "300 мл",
    price: 220,
    category: "Соки и морсы",
    image:
      "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=900&q=90",
    description: "Свежевыжатый сок из спелых апельсинов, без сахара.",
  },
  {
    id: 7,
    title: "Ягодный морс",
    weight: "350 мл",
    price: 180,
    oldPrice: 210,
    badge: "-14%",
    category: "Соки и морсы",
    image:
      "https://images.unsplash.com/photo-1571167530149-c72f2b2bff59?auto=format&fit=crop&w=900&q=90",
    description: "Домашний морс из клюквы, брусники и лесных ягод.",
  },
  {
    id: 8,
    title: "Лимонад домашний",
    weight: "400 мл",
    price: 200,
    badge: "Хит",
    category: "Соки и морсы",
    image:
      "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=900&q=90",
    description: "Освежающий лимонад с мятой и цитрусовыми нотами.",
  },
  {
    id: 9,
    title: "Смузи манго-банан",
    weight: "350 мл",
    price: 260,
    category: "Смузи",
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=900&q=90",
    description: "Густой тропический смузи с манго, бананом и йогуртом.",
  },
  {
    id: 10,
    title: "Смузи ягодный",
    weight: "350 мл",
    price: 260,
    oldPrice: 300,
    badge: "-13%",
    category: "Смузи",
    image:
      "https://images.unsplash.com/photo-1560801619-01e2a3ce6a71?auto=format&fit=crop&w=900&q=90",
    description: "Клубника, малина и черника в бархатной текстуре.",
  },
];

const categories = ["Все", "Кофе", "Чай", "Соки и морсы", "Смузи"];

export default function Drinks() {
  const [category, setCategory] = useState("Все");
  const [sort, setSort] = useState("asc");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});

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
        {/* HERO */}
        <section className={styles.hero}>
          <span className={`${styles.blob} ${styles.blobCyan}`} />
          <span className={`${styles.blob} ${styles.blobYellow}`} />
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>MIDAS DRINKS / БОДРОСТЬ И СВЕЖЕСТЬ</p>
            <h1 className={styles.title}>
              Напитки, <br />
              <span className={styles.accent}>которые бодрят</span>
            </h1>
            <p className={styles.subtitle}>
              Кофе на зёрнах, листовой чай, свежевыжатые соки и смузи —
              готовим сразу после заказа.
            </p>
          </div>
          <div className={styles.heroDecor}>
            <span className={styles.bubble} style={{ left: "15%", animationDelay: "0s" }} />
            <span className={styles.bubble} style={{ left: "45%", animationDelay: "0.8s" }} />
            <span className={styles.bubble} style={{ left: "70%", animationDelay: "1.6s" }} />
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeNum}>0₽</span>
              <span className={styles.heroBadgeText}>доставка напитков от&nbsp;1000₽</span>
            </div>
          </div>
        </section>

        {/* SEARCH + SORT */}
        <section className={styles.toolbar}>
          <div className={styles.search}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Найти напиток..."
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
          Главная <span className={styles.crumbSep}>/</span> Напитки
        </div>

        {/* GRID */}
        <section className={styles.grid}>
          {filteredProducts.map((product, index) => {
            const quantity = cart[product.id] || 0;

            return (
              <article
                key={product.id}
                className={styles.card}
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <div className={styles.cardImageWrap}>
                  <img src={product.image} alt={product.title} className={styles.cardImage} />
                  {product.badge && (
                    <span
                      className={`${styles.badge} ${
                        product.badge.startsWith("-") ? styles.badgeSale : ""
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}
                  <button onClick={() => addToCart(product.id)} className={styles.quickAdd}>
                    +
                  </button>
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
                      <button onClick={() => addToCart(product.id)} className={styles.addBtn} aria-label="Добавить в корзину">
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
            <button
              onClick={() => {
                setSearch("");
                setCategory("Все");
              }}
              className={styles.resetBtn}
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </main>

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