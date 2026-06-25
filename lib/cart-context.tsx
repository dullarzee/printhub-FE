"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./auth-context";
import BEendpoints from "./urls/backendUrl";
import axios from "axios";
import { toast } from "sonner";

export interface CartProduct {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CartService {
  id: string;
  name: string;
  basePrice: number;
  quantity: number;
  selectedOptions: Record<string, string>;
}

interface CartContextType {
  products: CartProduct[];
  services: CartService[];
  addProduct: (product: CartProduct) => void;
  removeProduct: (productId: string) => void;
  updateProductQuantity: (productId: string, quantity: number) => void;
  addService: (service: CartService) => void;
  removeService: (serviceId: string) => void;
  updateServiceQuantity: (serviceId: string, quantity: number) => void;
  updateServiceOptions: (
    serviceId: string,
    options: Record<string, string>,
  ) => void;
  clearCart: () => void;
  totalProducts: () => number;
  totalServices: () => number;
  totalPrice: () => number;
  mergeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [services, setServices] = useState<CartService[]>([]);
  const { user } = useAuth();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem("cart_products");
    const savedServices = localStorage.getItem("cart_services");

    //if user is logged in, load cart from db/backend
    const fetchCart = async () => {
      if (user) {
        console.log("Fetching cart from backend for user: ", user._id);
        try {
          const { data } = await axios.get(BEendpoints.get_cart(user._id));
          if (data.ok) {
            console.log("Cart data from backend: ", data.data);
            setProducts(data.data);
          }
        } catch (err) {
          console.log("Error fetching cart: ", err);
          setProducts([]);
        }
      } else {
        console.log("No user logged in, loading cart from localStorage");
        if (savedProducts) setProducts(JSON.parse(savedProducts));
        if (savedServices) setServices(JSON.parse(savedServices));
      }
    };
    fetchCart();
  }, [user]);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    if (!user) localStorage.setItem("cart_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    if (!user) localStorage.setItem("cart_services", JSON.stringify(services));
  }, [services]);

  const addProduct = async (product: CartProduct) => {
    //check if user is logged in, if not add to local storage, if yes add to db
    if (user) {
      try {
        const res0 = await axios.post(BEendpoints.add_to_cart, {
          productId: product._id,
          userId: user._id,
          quantity: product.quantity,
        });

        if (res0.data.ok) {
          const res = await axios.get(BEendpoints.get_cart(user._id));
          if (res.data.ok) {
            setProducts(res.data.data);
            console.log("products returned: ", res.data.data);
          }
        }
      } catch (err) {
        console.log("add to cart error: ", err);
      }
    } else
      setProducts((prev) => {
        const existing = prev.find((p) => p._id === product._id);
        if (existing) {
          return prev.map((p) =>
            p._id === product._id
              ? { ...p, quantity: p.quantity + product.quantity }
              : p,
          );
        }
        return [...prev, product];
      });
  };

  const removeProduct = async (productId: string) => {
    if (user) {
      const res = await axios.delete(
        BEendpoints.delete_cart_item(user._id, productId),
      );
      if (!res.data.ok) {
        toast.error("Failed to remove product from cart");
        return;
      }
    }
    setProducts((prev) => prev.filter((p) => p._id !== productId));
  };

  const mergeCart = async () => {
    const res = await axios.post(
      BEendpoints.merge_cart(user?._id as string),
      products,
    );
  };

  const updateProductQuantity = async (productId: string, quantity: number) => {
    if (user) {
      try {
        const res = await axios.patch(
          BEendpoints.update_cart(user._id, productId, quantity),
        );
        if (res.data.ok)
          console.log("quantity of product modified on DB successfully");
      } catch (err) {
        console.log("unable to change product quantity", " error: ", err);
        toast.error("failed to update quantity of cart item");
      }
    }
    if (quantity <= 0) {
      removeProduct(productId);
    } else {
      setProducts((prev) =>
        prev.map((p) => (p._id === productId ? { ...p, quantity } : p)),
      );
    }
  };

  const addService = (service: CartService) => {
    setServices((prev) => [...prev, service]);
  };

  const removeService = (serviceId: string) => {
    setServices((prev) => prev.filter((s) => s.id !== serviceId));
  };

  const updateServiceQuantity = (serviceId: string, quantity: number) => {
    if (quantity <= 0) {
      removeService(serviceId);
    } else {
      setServices((prev) =>
        prev.map((s) => (s.id === serviceId ? { ...s, quantity } : s)),
      );
    }
  };

  const updateServiceOptions = (
    serviceId: string,
    options: Record<string, string>,
  ) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === serviceId ? { ...s, selectedOptions: options } : s,
      ),
    );
  };

  const clearCart = async () => {
    if (user) {
      try {
        const { data } = await axios.delete(BEendpoints.clearCart(user._id));
        if(data.ok){
          setProducts([]);
          setServices([]);
        }
      } catch (err) {
        throw Error("unable to clear cart");
    }
  }else{
    setProducts([]);
    setServices([]);
  }
    
  };

  const totalProducts = () => products?.reduce((sum, p) => sum + p.quantity, 0);
  const totalServices = () => services?.reduce((sum, s) => sum + s.quantity, 0);
  const totalPrice = () => {
    const productTotal = products?.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0,
    );
    const serviceTotal = services.reduce(
      (sum, s) => sum + s.basePrice * s.quantity,
      0,
    );
    return productTotal + serviceTotal;
  };

  return (
    <CartContext.Provider
      value={{
        products,
        services,
        addProduct,
        removeProduct,
        updateProductQuantity,
        addService,
        removeService,
        updateServiceQuantity,
        updateServiceOptions,
        clearCart,
        totalProducts,
        totalServices,
        totalPrice,
        mergeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
