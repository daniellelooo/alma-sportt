'use client';

import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { CartItem, Producto } from '@/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { productoId: string; talla: string; color: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productoId: string; talla: string; color: string; cantidad: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.findIndex(
        (i) =>
          i.producto.id === action.payload.producto.id &&
          i.talla === action.payload.talla &&
          i.color === action.payload.color
      );
      if (existing >= 0) {
        const updated = [...state.items];
        updated[existing] = {
          ...updated[existing],
          cantidad: updated[existing].cantidad + action.payload.cantidad,
        };
        return { ...state, items: updated, isOpen: true };
      }
      return { ...state, items: [...state.items, action.payload], isOpen: true };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          (i) =>
            !(
              i.producto.id === action.payload.productoId &&
              i.talla === action.payload.talla &&
              i.color === action.payload.color
            )
        ),
      };
    case 'UPDATE_QUANTITY': {
      if (action.payload.cantidad <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (i) =>
              !(
                i.producto.id === action.payload.productoId &&
                i.talla === action.payload.talla &&
                i.color === action.payload.color
              )
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.producto.id === action.payload.productoId &&
          i.talla === action.payload.talla &&
          i.color === action.payload.color
            ? { ...i, cantidad: action.payload.cantidad }
            : i
        ),
      };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    case 'LOAD_CART':
      return { ...state, items: action.payload };
    default:
      return state;
  }
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  addItem: (producto: Producto, talla: string, color: string, cantidad?: number) => void;
  removeItem: (productoId: string, talla: string, color: string) => void;
  updateQuantity: (productoId: string, talla: string, color: string, cantidad: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('alma-cart');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        dispatch({ type: 'LOAD_CART', payload: parsed });
      } catch {}
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem('alma-cart', JSON.stringify(state.items));
    }
  }, [state.items, hydrated]);

  const addItem = (producto: Producto, talla: string, color: string, cantidad = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { producto, talla, color, cantidad } });
  };

  const removeItem = (productoId: string, talla: string, color: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productoId, talla, color } });
  };

  const updateQuantity = (productoId: string, talla: string, color: string, cantidad: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productoId, talla, color, cantidad } });
  };

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' });
  const openCart = () => dispatch({ type: 'OPEN_CART' });
  const closeCart = () => dispatch({ type: 'CLOSE_CART' });

  const totalItems = state.items.reduce((sum, i) => sum + i.cantidad, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.producto.precio * i.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
