"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/lib/cart-context";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import BEendpoints from "@/lib/urls/backendUrl";
import { Product } from "@/types/product";
import axios from "axios";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const { user } = useAuth();
  const productId = params.id as string;
  const { addProduct } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const id = params.id;
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(BEendpoints.get_single_product(id));
        const product = res.data.data as Product;
        //image:"https://www.task.com.br/blog/wp-content/uploads/placeholder-task-internet.png",
        setProduct(product);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading product");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!product) return;

    addProduct({
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Link href="/products">
              <Button>Back to Products</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Skeleton className="aspect-square" />
              <div className="space-y-6">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-32" />
              </div>
            </div>
          ) : product ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Product Image */}
              <div className="bg-linear-to-br from-gray-300 to-gray-400 rounded-lg aspect-square flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              {/* Product Info */}
              <div>
                <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
                <p className="text-2xl font-bold text-blue-600 mb-6">
                  ₦{product.price.toLocaleString()}
                </p>

                <p className="text-gray-700 mb-6">{product.description}</p>

                {product.specifications && (
                  <Card className="p-6 mb-6 border border-gray-200">
                    <h3 className="font-semibold mb-2">Specifications</h3>
                    <p className="text-sm text-gray-600 whitespace-pre-line">
                      {product.specifications}
                    </p>
                  </Card>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        −
                      </Button>
                      <Input
                        type="number"
                        value={quantity}
                        onChange={(e) =>
                          setQuantity(
                            Math.max(1, parseInt(e.target.value) || 1),
                          )
                        }
                        className="w-20 text-center"
                        min="1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full gap-2"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {addedToCart ? "Added to Cart!" : "Add to Cart"}
                  </Button>

                  {addedToCart && (
                    <p className="text-center text-sm text-green-600">
                      ✓ Added to cart successfully
                    </p>
                  )}
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    ✓ High quality materials
                    <br />
                    ✓ Fast production & delivery
                    <br />✓ Secure packaging
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <Footer />
    </div>
  );
}
