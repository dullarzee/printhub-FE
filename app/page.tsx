"use client";

import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Zap, Truck, Star } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import BEendpoints from "@/lib/urls/backendUrl";
import { Product } from "@/types/product";
import ProductCard from "@/components/ui/productCard";
import ProductCardSkeleton from "@/components/ui/productCardSkeleton";
import ContactUsForm from "@/components/ui/contactUsForm";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

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
      <section className="flex justify-center w-full items-center flex-col md:flex-row flex-1 relative overflow-hidden bg-linear-to-br from-white to-sky-50 px-6 p-14 md:py-auto md:px-22 min-h-[90vh] max-w-screen sm:max-h-auto">
        <div className="mx-auto w-full md:max-w-7xl flex items-center flex-col lg:flex-row overflow-hidden">
          <div className="md:w-[54%] text-center lg:text-left ">
            <motion.h1
              initial={{ y: 300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-13 md:leading-18"
            >
              Professional Printing Services & Solution
            </motion.h1>
            <motion.p
              initial={{ y: 300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9 }}
              className="text-[1rem] sm:text-[1.125rem] text-center lg:text-left text-gray-400 mb-8 max-w-2xl leading-6"
            >
              High-quality printing services and premium materials for
              businesses of all sizes. From branding to bulk orders, we've got
              you covered.
            </motion.p>
            <motion.div
              initial={{ y: 300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-normal"
            >
              <Link href="/products">
                <Button
                  size="lg"
                  className="gap-2 bg-sky-500 hover:bg-sky-600 text-white text-lg px-10 py-6"
                >
                  Browse Products <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-6"
                >
                  Explore Services
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="lg:w-[46%] h-full hidden lg:flex items-center justify-end md:pr-8 px-5">
            <div className=" grid grid-cols-[38%_62%] grid-rows-2 gap-4 h-[70vh] md:w-105 my-4">
              <motion.div
                initial={{ y: -300, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className=" rounded-lg overflow-hidden"
              >
                <Image
                  alt="print product"
                  className="object-cover w-full h-full"
                  width={50}
                  height={200}
                  loading="lazy"
                  src="https://assets.bigcartel.com/product_images/200408687/IMG_1339.JPG?auto=format&fit=max&w=2000"
                />
              </motion.div>
              <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="row-span-2 rounded-lg overflow-hidden"
              >
                <Image
                  alt="print product"
                  width={50}
                  height={200}
                  loading="lazy"
                  className="object-cover w-full h-full"
                  src="https://cdn.shopify.com/s/files/1/0646/3881/2399/files/dtf.jpg?v=1686549423"
                />
              </motion.div>
              <motion.div
                initial={{ y: 300, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className=" rounded-lg overflow-hidden"
              >
                <Image
                  alt="print product"
                  width={50}
                  height={200}
                  loading="lazy"
                  className="object-cover w-full h-full"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPO3HITqT6HGpmKD7arYlJh7gaBTQIKXO6zdmTpbmUZ3T79ilFyFWmOxU&s=10"
                />
              </motion.div>
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
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              transition={{ duration: 0.4 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 text-center border border-gray-200">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-lg bg-blue-100">
                    <Star className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                <p className="text-gray-600">
                  We use only the finest materials and cutting-edge printing
                  technology to ensure superior results.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ x: 300, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
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
            </motion.div>

            <motion.div
              initial={{ x: 300, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 text-center border border-gray-200">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-lg bg-blue-100">
                    <Truck className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Reliable Shipping
                </h3>
                <p className="text-gray-600">
                  Secure packaging and reliable delivery to ensure your products
                  arrive in perfect condition.
                </p>
              </Card>
            </motion.div>
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
            {products?.map((product, i) => (
              <motion.div
                key={product._id}
                initial={{ x: 300, opacity: 0 }}
                transition={{ duration: 0.4 * (i + 1) }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact-us form Section*/}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center pt-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Get in touch with Us
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Tell us about your requirements, Our team will get back to you shortly
        </p>
      </div>

      <section className="flex py-16 justify-center items-center flex-col-reverse md:flex-row gap-4">
        <div className="flex flex-col gap-y-4">
          <Card className="border border-gray-200 p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-blue-100">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <a
                  href="mailto:info@printhub.com"
                  className="text-blue-600 hover:text-blue-700"
                >
                  info@printhub.com
                </a>
              </div>
            </div>
          </Card>

          <Card className="border border-gray-200 p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-blue-100">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Phone</h3>
                <a
                  href="tel:+2341234567890"
                  className="text-blue-600 hover:text-blue-700"
                >
                  +234 (123) 456-7890
                </a>
              </div>
            </div>
          </Card>

          <Card className="border border-gray-200 p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-blue-100">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Address</h3>
                <p className="text-gray-600 text-sm">
                  123 Business Ave
                  <br />
                  Lagos, Nigeria
                </p>
              </div>
            </div>
          </Card>
        </div>
        <ContactUsForm />
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="py-20 bg-blue-600 text-white"
      >
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
      </motion.section>

      <Footer />
    </div>
  );
}
