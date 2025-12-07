import { create } from "zustand";
import { useCart } from "./cartStore";


export const UseModal = create((set) => ({
  homemodalIndex: false,
  modalIndex: false,
  shopmodalIndex: false,
  pagesmodalIndex: false,
  blogmodalIndex: false,

  homeopenModal: () => set({ homemodalIndex: true }),
  homecloseModal: () => set({ homemodalIndex: false }),

  openModal: (product) => set({ modalIndex: true, selectedProduct: product }),
  closeModal: () => set({ modalIndex: false, selectedProduct: null }),

  shopopenModal: () => set({ shopmodalIndex: true }),
  shopcloseModal: () => set({ shopmodalIndex: false }),

  pagesopenModal: () => set({ pagesmodalIndex: true }),
  pagescloseModal: () => set({ pagesmodalIndex: false }),

  blogopenModal: () => set({ blogmodalIndex: true }),
  blogcloseModal: () => set({ blogmodalIndex: false }),
}));

export const useCategories = create((set,get) => ({
  categories: [],
  products: [],
  team:[],

  setCategories: (CategoryData) => set({ categories: CategoryData }),
  setProducts: (ProductData) => set({ products: ProductData }),
  setTeams: (TeamData) => set({ team: TeamData }),

}));

export const useUserData = create((set,get) => ({
 
  user: JSON.parse(localStorage.getItem("user")) || null,
  jwt: localStorage.getItem("jwt") || null,

  setUser: (user, jwt) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("jwt", jwt);
    set({ user, jwt });
  },

  restoreUser: () => {
    const savedUser = localStorage.getItem("user");
    const savedJwt = localStorage.getItem("jwt");
    if (savedUser && savedJwt) {
      set({ user: JSON.parse(savedUser), jwt: savedJwt });
    }
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    set({ user: null, jwt: null });
    const { clearCart } = useCart.getState();
    clearCart();
  },

openLoginModal: () => set({ showLoginModal: true }),
closeLoginModal: () => set({ showLoginModal: false }),


requireLogin: (action) => {
  const state = get(); 
  if (!state.user) {
    state.openLoginModal();
    return;
  }
  if (typeof action === "function") {
    action();
  }
}

}));

export const useSingleProductModal = create((set) => ({
  selectedProduct: null,
  isOpen: false,
  product: null,

  openModal: (product) => set({ isOpen: true, product }),
  closeModal: () => set({ isOpen: false, product: null }),
}));

export const useFav = create((set) => ({
  favItems: [],

  addToFav: (product) =>
    set((state) => {
      if (state.favItems.some((item) => item.documentId === product.documentId)) {
        return state; 
      }
      return { favItems: [...state.favItems, { ...product }] };
    }),

  removeFromFav: (documentId) =>
    set((state) => ({
      favItems: state.favItems.filter((item) => item.documentId !== documentId),
    })),
}));


export const useCompare = create((set) => ({
  compareItems: [],

  addToCompare: (product) =>
    set((state) => {
      if (state.compareItems.some((item) => item.documentId === product.documentId)) {
        return state;
      }
      return { compareItems: [...state.compareItems, { ...product }] };
    }),

  removeFromCompare: (documentId) =>
    set((state) => ({
      compareItems: state.compareItems.filter(
        (item) => item.documentId !== documentId
      ),
    })),
}));


export const useSearch = create((set) => ({
  isOpen: false,
  query: "",
  openSearch: () => set({ isOpen: true }),
  closeSearch: () => set({ isOpen: false, query: "" }),
  setQuery: (query) => set({ query }),
}));
