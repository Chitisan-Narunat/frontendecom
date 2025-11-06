import React, { useState, useEffect } from "react";
import { api } from "../../services/api";

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

function FavHeart({ productId, defaultFav = false, token, onChanged, hasRemove = true }) {
  const [isFav, setIsFav] = useState(!!defaultFav);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsFav(!!defaultFav);
  }, [defaultFav]);

  const toggleFav = async (e) => {
    e.stopPropagation();
    if (loading) return;

    if (!token) {
      onChanged?.(false, { requireLogin: true, productId });
      return;
    }

    if (!hasRemove && isFav) return;

    const next = !isFav;
    setIsFav(next);
    onChanged?.(next);
    setLoading(true);
    try {
      if (next) {
        await api.post("/Favourite/AddFavourite", {}, { params: { ProductId: productId } });
      } else {
        await api.delete("/Favourite/RemoveFavourite", { params: { ProductId: productId } });
      }
    } catch (err) {
      setIsFav(!next);
      onChanged?.(!next);
      console.error("Fav API error:", err?.response?.status, err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFav}
      disabled={loading}
      aria-pressed={isFav}
      title={isFav ? "Unfavourite" : "Favourite"}
      className="p-1 rounded-full bg-black/30 backdrop-blur-sm hover:scale-110 transition-transform disabled:opacity-60"
    >
      {isFav ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
             fill="currentColor" className="size-6" style={{ color: "#000" }}>
          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"/>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
             viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
             className="size-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
             style={{ color: "#fff" }}>
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
        </svg>
      )}
    </button>
  );
}

export default function ProductGrid({ title, items, onSelect, token, onFavChange, hasRemove = true }) {
  return (
    <div className="container text-center mx-auto">
      {title && (
        <h1 className="text-3xl text-[#212529] text-left font-extrabold -ml-11 mt-28 font-playfair">
          {title}
        </h1>
      )}
      {chunk(items, 4).map((row, rowIdx) => (
        <div key={rowIdx} className="myContainer">
          {row.map((p) => {
            const primaryImageUrl = p.primaryImageUrl ?? p.PrimaryImageUrl ?? "/placeholder.png";
            const productName = p.productName ?? p.ProductName ?? "";
            const productDescription = p.productDescription ?? p.ProductDescription ?? "";
            const productPrice = p.productPrice ?? p.ProductPrice ?? 0;
            const stock = p.stock ?? p.Stock ?? 0;
            const inStock = stock > 0;

            return (
              <div
                key={p.productId ?? p.ProductId}
                onClick={() => inStock && onSelect?.(p)} 
                className={`containerBox relative transition ${
                  inStock ? "hover:shadow-lg" : "opacity-60 grayscale cursor-not-allowed"
                }`}
              >
                <div className="absolute top-2 right-2 z-10">
                  <FavHeart
                    productId={p.productId ?? p.ProductId}
                    defaultFav={!!(p.isFavourite ?? p.IsFavourite)}
                    token={token}
                    hasRemove={hasRemove}
                    onChanged={(next, meta) => {
                      onFavChange?.(p.productId ?? p.ProductId, next, meta);
                    }}
                  />
                </div>
                <img src={primaryImageUrl} alt={productName} className="imageInBox" loading="lazy" />
                {!inStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                    <span className="text-white font-semibold bg-red-600 px-3 py-1 rounded">
                      OUT OF STOCK
                    </span>
                  </div>
                )}
                <h3 className="headText">{productName}</h3>
                <h3 className="desText">{productDescription}</h3>
                <p className="priceText">฿{Number(productPrice).toLocaleString()}</p>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}