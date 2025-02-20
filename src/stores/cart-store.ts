// src/stores/counter-store.ts
import { createStore } from "zustand/vanilla";
import { IProduct } from "@/types/products";
// store/cartStore.ts

export interface CartProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}
export interface CartState {
  items: CartProduct[];
  total: number;
  addItem: (product: IProduct) => void;
  removeItem: (productId: number) => void;
  plusQuantity: (productId: number) => void;
  minusQuantity: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export const createCartStore = () => {
  return createStore<CartState>((set) => ({
    items: [],
    total: 0,
    addItem: (product) =>
      set((state) => {
        const existingProduct = state.items.find(
          (item) => item.id === product.id
        );
        let updatedItems = [];
        let updatedTotal = state.total;

        if (existingProduct) {
          // If the product already exists, update the quantity and recalculate the total
          updatedItems = state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          updatedTotal += product.price; // Add product price to the total
        } else {
          // If the product does not exist, add it to the cart and recalculate the total
          updatedItems = [...state.items, { ...product, quantity: 1 }];
          updatedTotal += product.price; // Add product price to the total
        }

        return {
          items: updatedItems,
          total: Math.round(updatedTotal * 100) / 100,
        };
      }),
    removeItem: (productId) =>
      set((state) => {
        const productToRemove = state.items.find(
          (item) => item.id === productId
        );
        const updatedItems = state.items.filter(
          (item) => item.id !== productId
        );
        const updatedTotal =
          state.total -
          (productToRemove?.price ?? 0) * (productToRemove?.quantity ?? 0);

        return {
          items: updatedItems,
          total: Math.round(updatedTotal * 100) / 100,
        };
      }),
    plusQuantity: (productId) =>
      set((state) => {
        const existingProduct = state.items.find(
          (item) => item.id === productId
        );
        let updatedItems: CartProduct[] = [];
        let updatedTotal = state.total;

        if (existingProduct) {
          updatedItems = state.items.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          updatedTotal += existingProduct.price; // Add product price to the total
        }
        return {
          items: updatedItems,
          total: Math.round(updatedTotal * 100) / 100,
        };
      }),
    minusQuantity: (productId) =>
      set((state) => {
        const existingProduct = state.items.find(
          (item) => item.id === productId
        );
        let updatedItems: CartProduct[] = [];
        let updatedTotal = state.total;

        if (existingProduct) {
          if (existingProduct.quantity !== 1) {
            updatedItems = state.items.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            );
          } else {
            updatedItems = state.items.filter((item) => item.id !== productId);
          }
          updatedTotal -= existingProduct?.price;
        }
        return {
          items: updatedItems,
          total: Math.round(updatedTotal * 100) / 100,
        };
      }),
    updateQuantity: (productId, quantity) =>
      set((state) => {
        const updatedItems = state.items.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        );

        // Calculate the total again after updating quantity
        const updatedTotal = updatedItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );

        return {
          items: updatedItems,
          total: updatedTotal,
        };
      }),
    clearCart: () => set({ items: [], total: 0 }),
  }));
};
