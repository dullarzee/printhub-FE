"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, LogOut, Menu } from "lucide-react";
import { useState } from "react";

export function Header() {
  const { user, logout } = useAuth();
  const { totalProducts, totalServices } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = totalProducts() + totalServices();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold text-blue-600"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <span className="text-white">P</span>
            </div>
            <span className="hidden sm:inline">Dare-Prints</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/products"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
            >
              Products
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
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
