import { create } from "zustand";

export const useCart = create((set) => ({
  cartModal: false,
  cartItems: [],

  openCartModal: () => set({ cartModal: true }),
  closeCartModal: () => set({ cartModal: false }),

  buyNowItem: null, 

  addToCart: (product) =>
    set((state) => {
      const exists = state.cartItems.find(
        (item) => item.documentId === product.documentId
      );
      if (exists) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.documentId === product.documentId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cartItems: [...state.cartItems, { ...product, quantity: 1 }] };
    }),

  updateQuantity: (id, newQuantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.documentId === id ? { ...item, quantity: newQuantity } : item
      ),
    })),

  setBuyNowItem: (product, quantity = 1) =>
    set(() => ({
      buyNowItem: { ...product, quantity },
    })),

  clearBuyNow: () => set({ buyNowItem: null }),

  removeFromCart: (documentId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.documentId !== documentId),
    })),

  clearCart: () => set({ cartItems: [], buyNowItem: null }),
}));
