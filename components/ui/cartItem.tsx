import { useCart, CartProduct } from "@/lib/cart-context";
import { Trash2 } from "lucide-react";
import { Button } from "./button";
import { Product } from "@/types/product";
import { useState, useRef } from "react";

export default function CartItem({ product }: { product: CartProduct }) {
  const [quantity, setQuantity] = useState(product.quantity);
  const { removeProduct, updateProductQuantity } = useCart();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleQuantityIncrease = () => {
    clearTimeout(timeoutRef.current as NodeJS.Timeout);
    setQuantity((prev) => prev + 1);

    timeoutRef.current = setTimeout(() => {
      updateProductQuantity(product._id, quantity + 1);
    }, 1000);
    //console.log("productId: ", product);
  };

  const handleQuantityDecrease = () => {
    if (quantity <= 1) return;
    clearTimeout(timeoutRef.current as NodeJS.Timeout);
    setQuantity((prev) => prev - 1);

    timeoutRef.current = setTimeout(() => {
      updateProductQuantity(product._id, quantity - 1);
    }, 1000);
  };

  return (
    <div
      key={product._id}
      className="flex gap-4 py-4 border-b border-gray-200 last:border-0"
    >
      <div className="w-24 h-24 bg-linear-to-br from-gray-300 to-gray-400 rounded-lg shrink-0 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-gray-600">₦{product?.price?.toLocaleString()}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleQuantityDecrease}
            >
              −
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleQuantityIncrease}
            >
              +
            </Button>
          </div>
          <p className="font-semibold">
            ₦{(product.price * product.quantity).toLocaleString()}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeProduct(product._id)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
