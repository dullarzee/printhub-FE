"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { AlertCircle, Loader2 } from "lucide-react";
import axios from "axios";
import BEendpoints from "@/lib/urls/backendUrl";
import { toast } from "sonner";

declare global {
  interface Window {
    PaystackPop: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { products, services, totalPrice, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: user?.email || "",
    fullName: user?.name || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    country: "",
  });

  //Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName || !formData.email || !formData.phone) {
      setError("Please fill in all contact details");
    }

    if (!formData.address || !formData.city || !formData.country) {
      setError("Please fill in all shipping details");
      return;
    }

    const reqBody = {
      userId: user!._id,
      clientName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phone,
      address: formData.address,
      city: formData.city,
      country: formData.country,
      products: products,
    };

    //submit order to backend
    try {
      setIsLoading(true);
      const { data } = await axios.post(BEendpoints.submit_order, reqBody);
      console.log("data: ", data);
      if (data.ok) {
        toast.success(data.message || "Order submitted sucessfully");
        router.push("/");
        clearCart();
      } else {
        throw Error(data.message || "Unable to submit order");
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "unable to submit order",
      );
      console.log("err at submitOrder: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  const hasItems = products.length > 0 || services.length > 0;

  if (!user) return null;
  else
    return (
      <div className="flex flex-col min-h-screen">
        <Header />

        <div className="flex-1 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-12">Checkout</h1>

            {!hasItems ? (
              <Card className="border border-gray-200 p-8 text-center">
                <p className="text-gray-600 mb-4">No items in cart</p>
                <Button onClick={() => router.push("/cart")}>
                  Back to Cart
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Checkout Form */}
                <div className="lg:col-span-2">
                  <Card className="border border-gray-200 p-8">
                    <h2 className="text-2xl font-bold mb-6">
                      Shipping & Billing Information
                    </h2>

                    {error && (
                      <div className="mb-6 flex items-center gap-3 rounded-lg bg-red-50 p-4 text-red-800 border border-red-200">
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        <p className="text-sm">{error}</p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <Input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                            disabled={isLoading}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            disabled={isLoading}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Address
                          </label>
                          <Input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Street address"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City
                          </label>
                          <Input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            disabled={isLoading}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Country
                          </label>
                          <Input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full gap-2 mt-6"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Submit for processing"
                        )}
                      </Button>
                    </form>
                  </Card>
                </div>

                {/* Order Summary */}
                <Card className="border border-gray-200 p-6 h-fit sticky top-24">
                  <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                  {products.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">Products</h3>
                      <div className="space-y-2 text-sm">
                        {products.map((p) => (
                          <div key={p._id} className="flex justify-between">
                            <span>
                              <span className="text-sky-700">{p.name}</span> x{" "}
                              <span className="font-bold">{p.quantity}</span>
                            </span>
                            <span>
                              ₦{(p.price * p.quantity).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {services.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">Services</h3>
                      <div className="space-y-2 text-sm">
                        {services.map((s) => (
                          <div key={s.id} className="flex justify-between">
                            <span>
                              {s.name} x {s.quantity}
                            </span>
                            <span>
                              ₦{(s.basePrice * s.quantity).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>₦{totalPrice().toLocaleString()}</span>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    );
}
