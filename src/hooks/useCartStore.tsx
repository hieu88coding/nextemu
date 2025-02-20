// src/providers/counter-store-provider.tsx
"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type CartState, createCartStore } from "@/stores/cart-store";

export interface CounterStoreProviderProps {
  children: ReactNode;
}
export type CounterStoreApi = ReturnType<typeof createCartStore>;
export const CounterStoreContext = createContext<CounterStoreApi | undefined>(
  undefined
);
export const CounterStoreProvider = ({
  children,
}: CounterStoreProviderProps) => {
  const storeRef = useRef<CounterStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createCartStore();
  }

  return (
    <CounterStoreContext.Provider value={storeRef.current}>
      {children}
    </CounterStoreContext.Provider>
  );
};

export const useCartStore = <T,>(selector: (store: CartState) => T): T => {
  const counterStoreContext = useContext(CounterStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
