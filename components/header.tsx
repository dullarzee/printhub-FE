"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, LogOut, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Logo } from "@/components/ui/logo";
import { usePathname } from "next/navigation";

export function Header() {
  const { user, logout } = useAuth();
  const { totalProducts, totalServices } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const cartCount = totalProducts() + totalServices();
  const pathname = usePathname();

  const links = {
    products: "products",
    services: "services",
    about: "about",
    contact: "contact",
    cart: "cart",
  };

  useEffect(() => {
    const detectActiveLink = () => {
      if (pathname.includes(links.products)) {
        setActiveLink(links.products);
      } else if (pathname.includes(links.services)) {
        setActiveLink(links.services);
      } else if (pathname.includes(links.about)) {
        setActiveLink(links.about);
      } else if (pathname.includes(links.contact)) {
        setActiveLink(links.contact);
      } else if (pathname.includes(links.cart)) {
        setActiveLink(links.cart);
      }
    };

    //for setting current active link

    detectActiveLink();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/products"
              className={`text-sm font-medium hover:text-blue-600 transition ${activeLink === links.products ? `text-blue-700` : "text-gray-700"}`}
            >
              Products
            </Link>
            <Link
              href="/services"
              className={`text-sm font-medium hover:text-blue-600 transition ${activeLink === links.services ? `text-blue-700` : "text-gray-700"}`}
            >
              Services
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium hover:text-blue-600 transition ${activeLink === links.about ? `text-blue-700` : "text-gray-700"}`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium hover:text-blue-600 transition ${activeLink === links.contact ? `text-blue-700` : "text-gray-700"}`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4 md:gap-9">
            {/* Cart Button */}
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-sm font-medium capitalize text-gray-700">
                  {user.name.split(" ")[0]}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    await logout();
                    window.location.href = "/";
                  }}
                  className="gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <div className="hidden sm:flex gap-2">
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-gray-200 py-4 space-y-2">
            <Link
              href="/products"
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
            >
              Products
            </Link>
            <Link
              href="/services"
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
            >
              Contact
            </Link>
            {!user && (
              <div className="px-4 py-2 space-y-2">
                <Link href="/login" className="block">
                  <Button variant="outline" size="sm" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/signup" className="block">
                  <Button size="sm" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
