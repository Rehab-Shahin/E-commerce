import { useSearch, useCategories } from "../../store";
import { FiSearch } from "react-icons/fi";
import { HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function SearchModal() {
  const { isOpen, query, setQuery, closeSearch } = useSearch();
  const { products } = useCategories();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const filteredProducts = products.filter((p) =>
    p.product_name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[200] flex justify-center items-start"
      onClick={closeSearch} 
    >
      <div
        className="flex flex-col bg-white w-full md:w-[800px] mt-10 p-15 rounded-lg shadow-lg relative"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex items-center md:w-150 border border-gray-300 rounded-full px-4 py-2">
          <FiSearch className="text-gray-500 text-lg" />
          <input
            type="text"
            className="flex-1 px-3 outline-none"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <button
          className="absolute right-25 top-17 text-2xl text-gray-600 hover:text-black"
          onClick={closeSearch}
        >
          <HiX />
        </button>

        {query && (
          <div className="mt-5">
            <h3 className="text-gray-700 text-sm font-semibold mb-3">PRODUCTS</h3>
            <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <div
                    onClick={() => {
                      navigate(`/products/${p.documentId}`);
                      closeSearch();
                    }}
                    key={p.documentId}
                    className="flex items-center gap-3 pb-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                  >
                    <img
                      src={p.product_img}
                      alt={p.product_name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800">{p.product_name}</span>
                      <span className="text-gray-500 text-sm">
                        Tk {p.product_price_after}{" "}
                        {p.product_price_before && (
                          <span className="line-through text-red-400 ml-1">
                            Tk {p.product_price_before}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No products found</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
