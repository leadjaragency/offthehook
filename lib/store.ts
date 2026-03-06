"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartAddOn {
  name: string;
  price: number;
}

export interface CartItem {
  cartItemId: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  selectedOption?: string;
  addOns?: CartAddOn[];
  specialInstructions?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "cartItemId">) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  updateInstructions: (cartItemId: string, instructions: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const cartItemId = `${item.menuItemId}-${item.selectedOption ?? "default"}-${Date.now()}`;
        set((state) => ({
          items: [...state.items, { ...item, cartItemId }],
        }));
      },

      removeItem: (cartItemId) => {
        set((state) => ({
          items: state.items.filter((i) => i.cartItemId !== cartItemId),
        }));
      },

      updateQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(cartItemId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.cartItemId === cartItemId ? { ...i, quantity } : i
          ),
        }));
      },

      updateInstructions: (cartItemId, instructions) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.cartItemId === cartItemId
              ? { ...i, specialInstructions: instructions }
              : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        return get().items.reduce((total, item) => {
          const addOnTotal =
            item.addOns?.reduce((sum, a) => sum + a.price, 0) ?? 0;
          return total + (item.price + addOnTotal) * item.quantity;
        }, 0);
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "oth-cart",
    }
  )
);
