"use client";

import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Zap, Truck } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import BEendpoints from "@/lib/urls/backendUrl";
import { Product } from "@/types/product";
import ProductCard from "@/components/ui/productCard";
import ProductCardSkeleton from "@/components/ui/productCardSkeleton";

export default function Home() {
  const [error, setError] = useState<string>();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BEendpoints.get_products}?limit=3`);
        const products = res.data.data as Product[];
        setProducts(products);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("failed to fetch products");
        setLoading(false);
      }
    };
    fetchProducts();
  }, [products?.length]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="flex-1 relative overflow-hidden bg-linear-to-l from-blue-50 to-white py-20 sm:py-32 border border-green-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border border-red-500">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Professional Printing Solutions
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              High-quality printing services and premium materials for
              businesses of all sizes. From branding to bulk orders, we've got
              you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="gap-2">
                  Browse Products <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose PrintHub?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center border border-gray-200">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-lg bg-blue-100">
                  {/*<Quality className="h-6 w-6 text-blue-600" />*/}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                We use only the finest materials and cutting-edge printing
                technology to ensure superior results.
              </p>
            </Card>

            <Card className="p-8 text-center border border-gray-200">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-lg bg-blue-100">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Turnaround</h3>
              <p className="text-gray-600">
                Quick production and delivery times without compromising on
                quality. Rush orders available.
              </p>
            </Card>

            <Card className="p-8 text-center border border-gray-200">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-lg bg-blue-100">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Reliable Shipping</h3>
              <p className="text-gray-600">
                Secure packaging and reliable delivery to ensure your products
                arrive in perfect condition.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link href="/products">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading &&
              Array.from({ length: 3 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Explore our wide range of printing services and materials. Quality
            prints delivered fast.
          </p>
          <Link href="/products">
            <Button size="lg" variant="secondary">
              Shop Now <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
