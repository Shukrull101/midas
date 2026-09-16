import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context";

const products = [
  {
    id: 1,
    title: "Круассан классический",
    weight: "90 г",
    price: 190,
    oldPrice: 220,
    badge: "Свежее",
    category: "Слоёная",
    image: "https://images.unsplash.com/photo-1555507036-ab1c1f7b8c2b?auto=format&fit=crop&w=900&q=90",
    description: "Хрустящая золотистая корочка и нежное сливочное тесто.",
  },
  {
    id: 2,
    title: "Круассан с шоколадом",
    weight: "110 г",
    price: 250,
    badge: "Хит",
    category: "Слоёная",
    image: "https://images.unsplash.com/photo-1623334044303-241021148842?auto=format&fit=crop&w=900&q=90",
    description: "Воздушный круассан с насыщенным шоколадом внутри.",
  },
  {
    id: 3,
    title: "Булочка с корицей",
    weight: "120 г",
    price: 230,
    oldPrice: 260,
    badge: "Новинка",
    category: "Сладкая",
    image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=900&q=90",
    description: "Мягкая выпечка с корицей, сахаром и сливочной глазурью.",
  },
  {
    id: 4,
    title: "Датская слойка с ягодами",
    weight: "130 г",
    price: 290,
    category: "Слоёная",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=90",
    description: "Слоёное тесто, нежный крем и сочные свежие ягоды.",
  },
  {
    id: 5,
    title: "Бриошь сливочная",
    weight: "100 г",
    price: 210,
    category: "Сладкая",
    image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=900&q=90",
    description: "Нежная и воздушная бриошь со сливочным вкусом.",
  },
  {
    id: 6,
    title: "Чиабатта с травами",
    weight: "280 г",
    price: 320,
    badge: "Сегодня",
    category: "Хлеб",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=900&q=90",
    description: "Хрустящая корочка, крупные поры и аромат свежих трав.",
  },
  {
    id: 7,
    title: "Фокачча с розмарином",
    weight: "250 г",
    price: 340,
    category: "Хлеб",
    image: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&w=900&q=90",
    description: "Итальянская выпечка с оливковым маслом и розмарином.",
  },
  {
    id: 8,
    title: "Плюшка с сахаром",
    weight: "95 г",
    price: 170,
    category: "Сладкая",
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=900&q=90",
    description: "Румяная домашняя плюшка с хрустящими сахарными слоями.",
  },
];

const categories = ["Все", "Слоёная", "Сладкая", "Хлеб"];

export default function FreshBakery() {
  const [category, setCategory] = useState("Все");
  const [sort, setSort] = useState("asc");
  const [search, setSearch] = useState("");
  const { cartItems, addToCart, removeFromCart, cartCount, cartTotal } = useCart();

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const categoryMatch = category === "Все" || product.category === category;
      const searchMatch = product.title.toLowerCase().includes(search.toLowerCase());
      return categoryMatch && searchMatch;
    });

    result = [...result].sort((a, b) => {
      if (sort === "asc") return a.price - b.price;
      return b.price - a.price;
    });

    return result;
  }, [category, sort, search]);

  const handleAddToCart = (product) => {
    addToCart({
      id: `bakery-${product.id}`,
      title: product.title,
      price: product.price,
      image: product.image,
      subtitle: product.weight,
    });
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(`bakery-${productId}`);
  };

  const getProductQuantity = (productId) => {
    const found = cartItems.find((item) => String(item.id) === `bakery-${productId}`);
    return found ? found.count : 0;
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-white">
      {/* ================= MAIN ================= */}
      <main className="mx-auto max-w-[1440px] px-5 md:px-8">
        <section className="relative overflow-hidden border-b border-white/[0.06] py-12 md:py-16">
          <div className="absolute left-[-200px] top-[-150px] h-[550px] w-[550px] rounded-full bg-blue-950/50 blur-3xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.25em] text-[#f5cf42]">
                MIODAS BAKERY / EVERY MORNING
              </p>
              <h1 className="font-light leading-[.88] tracking-[-5px] text-[60px] sm:text-[75px] md:text-[95px] lg:text-[105px]">
                Свежая
                <br />
                <span className="text-[#f5cf42]">выпечка</span>
              </h1>
              <p className="mt-7 max-w-[470px] text-[13px] leading-7 text-white/45">
                Тёплая выпечка, хрустящие слои и аромат свежего теста — каждый день из печи прямо к вам.
              </p>
            </div>

            <div className="relative hidden h-[270px] items-center justify-center lg:flex">
              <div className="absolute h-[320px] w-[320px] rounded-full bg-[#f5cf42]/5 blur-2xl" />
              <div className="relative grid h-[210px] w-[210px] rotate-[-10deg] place-items-center rounded-full border border-[#f5cf42]/50 text-center text-[#f5cf42]">
                <div>
                  <div className="text-[30px] font-bold leading-none">BAKED</div>
                  <div className="mt-2 text-[12px] tracking-[.35em]">FRESH</div>
                </div>
              </div>
              <div className="absolute right-[15%] top-8 grid h-16 w-16 rotate-[12deg] place-items-center rounded-full border border-[#f5cf42] text-center text-[#f5cf42]">
                <div>
                  <div className="text-[17px] font-bold">24</div>
                  <div className="text-[7px]">ЧАСА</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-7 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex w-full max-w-[400px] items-center border-b border-white/20 pb-2">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="mr-3 text-white/40">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
            <input
              id="bakery-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Найти выпечку..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
            />
          </div>

          <div className="flex items-center gap-2 text-[10px] uppercase text-white/40">
            <span>Сортировать:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="cursor-pointer bg-transparent text-[10px] uppercase text-white outline-none"
            >
              <option value="asc" className="bg-black">по возрастанию цены</option>
              <option value="desc" className="bg-black">по убыванию цены</option>
            </select>
          </div>
        </section>

        <section className="mt-6 flex gap-2 overflow-x-auto pb-1">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`shrink-0 border px-4 py-2 text-[10px] uppercase tracking-wider transition ${
                category === item
                  ? "border-[#f5cf42] bg-[#f5cf42] text-black"
                  : "border-white/15 text-white/45 hover:border-[#f5cf42] hover:text-[#f5cf42]"
              }`}
            >
              {item}
            </button>
          ))}
        </section>

        <div className="mt-6 text-[10px] text-white/35">
          Главная <span className="mx-2 text-white/15">/</span> Свежая выпечка
        </div>

        <section className="grid grid-cols-2 gap-x-3 gap-y-10 pb-28 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => {
            const quantity = getProductQuantity(product.id);

            return (
              <article key={product.id} className="group min-w-0">
                <div className="relative aspect-[1.15/1] overflow-hidden bg-[#15161a]">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  {product.badge && (
                    <span className="absolute left-2.5 top-2.5 bg-[#f5cf42] px-2 py-1 text-[8px] font-bold uppercase text-black">
                      {product.badge}
                    </span>
                  )}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="absolute bottom-2.5 right-2.5 grid h-9 w-9 place-items-center bg-[#f5cf42] text-black opacity-0 transition group-hover:opacity-100 cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <div className="pt-3">
                  <h2 className="text-[13px] font-semibold leading-tight text-white md:text-[15px]">
                    {product.title}
                  </h2>
                  <span className="mt-2 inline-block bg-white/10 px-1.5 py-1 text-[9px] text-white/55">
                    {product.weight}
                  </span>
                  <p className="mt-2 line-clamp-2 min-h-[30px] text-[9px] leading-[1.5] text-white/40 md:text-[10px]">
                    {product.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div className="flex flex-col">
                      {product.oldPrice && (
                        <del className="text-[9px] text-white/30">{product.oldPrice} ₽</del>
                      )}
                      <strong className="text-[16px] font-extrabold text-white">
                        {product.price} ₽
                      </strong>
                    </div>

                    {quantity === 0 ? (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="grid h-9 w-10 place-items-center bg-[#f5cf42] text-black transition hover:bg-[#ffe477] cursor-pointer"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                          <path d="M4 5h2l2 11h10l2-8H7" />
                          <circle cx="10" cy="20" r="1" />
                          <circle cx="18" cy="20" r="1" />
                        </svg>
                      </button>
                    ) : (
                      <div className="flex h-9 items-center border border-white/20">
                        <button
                          onClick={() => handleRemoveFromCart(product.id)}
                          className="grid h-full w-8 place-items-center text-white/70 hover:text-[#f5cf42] cursor-pointer"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-xs">{quantity}</span>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="grid h-full w-8 place-items-center text-white/70 hover:text-[#f5cf42] cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {filteredProducts.length === 0 && (
          <div className="flex min-h-[300px] flex-col items-center justify-center">
            <h2 className="text-2xl font-light">Ничего не найдено</h2>
            <button
              onClick={() => {
                setSearch("");
                setCategory("Все");
              }}
              className="mt-5 bg-[#f5cf42] px-5 py-3 text-xs font-bold text-black cursor-pointer"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </main>

      {/* ================= FLOATING CART ================= */}
      {cartCount > 0 && (
        <div className="fixed bottom-4 left-3 right-3 z-40 mx-auto flex max-w-[500px] items-center justify-between gap-3 bg-[#f5cf42] p-2.5 pl-4 text-black shadow-2xl md:left-auto md:right-6">
          <div className="flex flex-col">
            <span className="text-[8px] uppercase opacity-60">В корзине ({cartCount} шт)</span>
            <strong className="text-[16px]">{cartTotal.toLocaleString("ru-RU")} ₽</strong>
          </div>
          <Link
            to="/cart"
            className="bg-black px-4 py-3 text-[10px] font-bold uppercase text-white hover:bg-neutral-900 transition-colors flex items-center gap-1.5"
          >
            Перейти в корзину →
          </Link>
        </div>
      )}
    </div>
  );
}