"use client";

import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CartItem from "@/components/ui/cartItem";

export default function CartPage() {
  const {
    products,
    services,
    removeProduct,
    removeService,
    updateProductQuantity,
    updateServiceQuantity,
    totalPrice,
    clearCart,
  } = useCart();
  const router = useRouter();
  const { user } = useAuth();
  const hasItems = products?.length > 0 || services?.length > 0;

  console.log("cart Items: ", products);

  // const dummyProduct = [
  //   {
  //     id: "1",
  //     name: "Sample Product",
  //     price: 50000,
  //     quantity: 2,
  //     image:
  //       "https://www.task.com.br/blog/wp-content/uploads/placeholder-task-internet.png",
  //   },
  // ];
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-12">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-8">
              {/* Products Section */}
              {products?.length > 0 && (
                <Card className="border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold mb-6">Products</h2>
                  <div className="space-y-4">
                    {products.map((product) => (
                      <CartItem key={product._id} product={product} />
                    ))}
                  </div>
                </Card>
              )}

              {/* Services Section */}
              {services?.length > 0 && (
                <Card className="border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold mb-6">Services</h2>
                  <div className="space-y-4">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className="py-4 border-b border-gray-200 last:border-0"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {service.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              ₦{service.basePrice.toLocaleString()} base price
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeService(service.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {Object.keys(service.selectedOptions).length > 0 && (
                          <div className="mb-4 p-3 bg-gray-50 rounded text-sm">
                            <p className="font-medium text-gray-700 mb-2">
                              Selected Options:
                            </p>
                            <ul className="space-y-1 text-gray-600">
                              {Object.entries(service.selectedOptions).map(
                                ([key, value]) => (
                                  <li key={key}>
                                    • {key}: {value}
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                updateServiceQuantity(
                                  service.id,
                                  service.quantity - 1,
                                )
                              }
                            >
                              −
                            </Button>
                            <span className="w-8 text-center">
                              {service.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                updateServiceQuantity(
                                  service.id,
                                  service.quantity + 1,
                                )
                              }
                            >
                              +
                            </Button>
                          </div>
                          <p className="font-semibold">
                            ₦
                            {(
                              service.basePrice * service.quantity
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Empty Cart */}
              {!hasItems && (
                <Card className="border border-gray-200 p-12 text-center">
                  <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h2 className="text-2xl font-bold mb-2">
                    Your cart is empty
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Start shopping to add items to your cart
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Link href="/products">
                      <Button>Browse Products</Button>
                    </Link>
                    <Link href="/services">
                      <Button variant="outline">Browse Services</Button>
                    </Link>
                  </div>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            {hasItems && (
              <Card className="border border-gray-200 p-6 h-fit sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">
                      ₦{totalPrice().toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-semibold">TBD</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <span className="font-bold text-lg">Total:</span>
                    <span className="font-bold text-lg">
                      ₦{totalPrice().toLocaleString()}
                    </span>
                  </div>
                </div>

                {user ? (
                  <Link href="/checkout" className="block">
                    <Button className="w-full gap-2 mb-2">
                      Proceed to Checkout <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <div className="space-y-2 mb-4">
                    <Link href="/login" className="block">
                      <Button className="w-full">Sign In to Checkout</Button>
                    </Link>
                    <p className="text-xs text-gray-600 text-center">
                      Or{" "}
                      <Link
                        href="/signup"
                        className="text-blue-600 hover:text-blue-700 font-semibold"
                      >
                        create an account
                      </Link>
                    </p>
                  </div>
                )}

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
