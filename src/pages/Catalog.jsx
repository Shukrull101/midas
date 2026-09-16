import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../context";

const products = [
  {
    id: 1,
    name: "Лимонад Лимон-Мята",
    price: 25,
    image:
      "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=800&q=80",
    description:
      "Освежающий лимонад с натуральным лимоном, свежей мятой и льдом.",
  },
  {
    id: 2,
    name: "Мохито",
    price: 30,
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    description:
      "Безалкогольный мохито с лаймом, мятой и газированной водой.",
  },
  {
    id: 3,
    name: "Апельсиновый сок",
    price: 20,
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80",
    description:
      "Свежий натуральный апельсиновый сок с насыщенным цитрусовым вкусом.",
  },
  {
    id: 4,
    name: "Холодный чай",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80",
    description:
      "Освежающий холодный чай с лимоном и льдом.",
  },
  {
    id: 5,
    name: "Салат Цезарь",
    price: 40,
    image:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=800&q=80",
    description:
      "Свежий салат с курицей, сыром, овощами и фирменным соусом.",
  },
];

function Catalog() {
  const [searchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  const category = searchParams.get("category");

  // Если открыли другую категорию
  if (category !== "coldmeals") {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#19242F] px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">
            Категория не найдена
          </h1>

          <p className="mt-3 text-gray-400">
            Сейчас доступна только категория «Холодное».
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#19242F] px-4 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Заголовок */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Наше меню
          </p>

          <h1 className="text-3xl font-bold text-white md:text-4xl">
            ХОЛОДНЫЕ НАПИТКИ И БЛЮДА
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-gray-400">
            Освежающие напитки и лёгкие блюда
          </p>
        </div>

        {/* Карточки */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Изображение */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800">
                  Холодное
                </span>

                {/* Кнопка появляется при наведении */}
                <button
                  type="button"
                  onClick={() => setSelectedProduct(product)}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-16 rounded-full bg-orange-500 px-5 py-2 font-semibold text-white opacity-0 transition-all duration-300 hover:bg-orange-600 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  Подробнее
                </button>
              </div>

              {/* Информация */}
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-900">
                  {product.name}
                </h2>

                <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                  {product.description}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xl font-bold text-orange-500">
                    {product.price} сом
                  </span>

                  <button
                    type="button"
                    onClick={() => setSelectedProduct(product)}
                    className="text-sm font-semibold text-gray-400 transition hover:text-orange-500"
                  >
                    Подробнее →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Модальное окно */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Фото */}
            <div className="relative h-64">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="h-full w-full object-cover"
              />

              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl text-gray-700 shadow-lg hover:bg-gray-100"
              >
                ×
              </button>
            </div>

            {/* Информация */}
            <div className="p-6">
              <span className="text-sm font-semibold text-orange-500">
                Холодное
              </span>

              <h2 className="mt-2 text-2xl font-bold text-gray-900">
                {selectedProduct.name}
              </h2>

              <p className="mt-3 leading-6 text-gray-500">
                {selectedProduct.description}
              </p>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-2xl font-bold text-orange-500">
                  {selectedProduct.price} ₽
                </span>

                <button
                  type="button"
                  onClick={() => {
                    addToCart({
                      id: `catalog-${selectedProduct.id}`,
                      title: selectedProduct.name,
                      price: selectedProduct.price,
                      image: selectedProduct.image,
                      subtitle: 'Холодное',
                    });
                    setSelectedProduct(null);
                  }}
                  className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 cursor-pointer active:scale-95"
                >
                  Добавить в корзину
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Catalog;