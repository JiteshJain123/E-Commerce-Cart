// ProductsGrid.jsx
import React from "react";

export default function ProductsGrid({ products = [], onAdd }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col"
          >
            <div className="w-full h-40 md:h-48 lg:h-52 bg-gray-100">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {p.description}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-lg font-bold">₹{Number(p.price).toFixed(2)}</div>
                <button
                  onClick={() => onAdd && onAdd(p)}
                  className="ml-3 inline-flex items-center justify-center px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
