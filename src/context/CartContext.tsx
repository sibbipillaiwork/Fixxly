import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductItem, SolutionBundle } from '../data/products';

export interface CartItem {
  product: ProductItem;
  quantity: number;
  selectedOptionId?: string;
  selectedOptionLabel?: string;
  unitPrice: number;
  unitMrp: number;
}

interface CartContextType {
  items: Record<string, CartItem>;
  addToCart: (product: ProductItem, optionId?: string, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  addBundleToCart: (bundle: SolutionBundle) => void;
  clearCart: () => void;
  totalCount: number;
  totalAmount: number;
  totalMrp: number;
  totalSavings: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  lastAddedItemName: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Record<string, CartItem>>(() => {
    try {
      const saved = localStorage.getItem('fixxly_cart');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedItemName, setLastAddedItemName] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('fixxly_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addToCart = (product: ProductItem, optionId?: string, qty: number = 1) => {
    setItems(prev => {
      const existing = prev[product.id];
      let unitPrice = product.price;
      let unitMrp = product.mrp;
      let optionLabel = product.spec;

      if (optionId && product.options) {
        const opt = product.options.find(o => o.id === optionId);
        if (opt) {
          unitPrice = opt.price;
          unitMrp = opt.mrp;
          optionLabel = opt.spec || opt.label;
        }
      }

      const newQty = existing ? existing.quantity + qty : qty;
      return {
        ...prev,
        [product.id]: {
          product,
          quantity: newQty,
          selectedOptionId: optionId,
          selectedOptionLabel: optionLabel,
          unitPrice,
          unitMrp
        }
      };
    });

    setLastAddedItemName(product.name);
    setTimeout(() => setLastAddedItemName(null), 3000);
  };

  const removeFromCart = (productId: string) => {
    setItems(prev => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prev => {
      if (!prev[productId]) return prev;
      return {
        ...prev,
        [productId]: {
          ...prev[productId],
          quantity
        }
      };
    });
  };

  const addBundleToCart = (bundle: SolutionBundle) => {
    setItems(prev => {
      const updated = { ...prev };
      bundle.items.forEach(bundleItem => {
        const existing = updated[bundleItem.id];
        updated[bundleItem.id] = {
          product: {
            id: bundleItem.id,
            name: bundleItem.name,
            brand: bundleItem.brand,
            category: "Solution Bundle Item",
            categoryId: "bundle-item",
            delivery_time_mins: bundle.delivery_time_mins,
            image: bundleItem.image,
            spec: bundleItem.spec,
            unit: "Piece",
            price: bundleItem.price,
            mrp: bundleItem.mrp,
            discount_percent: Math.round(((bundleItem.mrp - bundleItem.price) / bundleItem.mrp) * 100),
            rating: 4.8,
            reviews_count: 500,
            in_stock: true,
            tags: []
          },
          quantity: (existing?.quantity || 0) + 1,
          unitPrice: bundleItem.price,
          unitMrp: bundleItem.mrp,
          selectedOptionLabel: bundleItem.spec
        };
      });
      return updated;
    });

    setLastAddedItemName(bundle.title);
    setTimeout(() => setLastAddedItemName(null), 3000);
  };

  const clearCart = () => setItems({});

  const totalCount = Object.values(items).reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = Object.values(items).reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const totalMrp = Object.values(items).reduce((acc, item) => acc + item.unitMrp * item.quantity, 0);
  const totalSavings = Math.max(0, totalMrp - totalAmount);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        addBundleToCart,
        clearCart,
        totalCount,
        totalAmount,
        totalMrp,
        totalSavings,
        isCartOpen,
        setIsCartOpen,
        lastAddedItemName
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
