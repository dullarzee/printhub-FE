'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Printer } from 'lucide-react';

interface Order {
  id: string;
  totalAmount: number;
  status: string;
  shippingAddress: string;
  createdAt: string;
  products: any[];
  services: any[];
}

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd fetch the order from the backend
    // For now, we'll simulate it
    const timer = setTimeout(() => {
      setOrder({
        id: orderId,
        totalAmount: 50000,
        status: 'completed',
        shippingAddress: 'Sample Address',
        createdAt: new Date().toISOString(),
        products: [],
        services: [],
      });
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          {/* Success Message */}
          <Card className="border border-green-200 bg-green-50 p-8 text-center mb-8">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-green-900 mb-2">Order Confirmed!</h1>
            <p className="text-green-700 mb-4">
              Thank you for your order. Your payment has been received and processing has begun.
            </p>
            {order && (
              <p className="text-sm text-green-600">
                Order ID: <span className="font-mono font-semibold">{order.id}</span>
              </p>
            )}
          </Card>

          {/* Order Details */}
          {order && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-4">Order Details</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-semibold font-mono">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Order Date</p>
                    <p className="font-semibold">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-semibold text-green-600 capitalize">{order.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-2xl font-bold text-blue-600">₦{order.totalAmount.toLocaleString()}</p>
                  </div>
                </div>
              </Card>

              <Card className="border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Delivery Address</p>
                    <p className="font-semibold">{order.shippingAddress}</p>
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-blue-900">
                      We&apos;ll send you tracking information via email as soon as your order ships.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Next Steps */}
          <Card className="border border-gray-200 p-6 mt-8">
            <h2 className="text-xl font-bold mb-4">Next Steps</h2>
            <ol className="space-y-3">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
                  1
                </span>
                <span className="text-gray-700">
                  We&apos;re preparing your order for production. This typically takes 1-2 business days.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
                  2
                </span>
                <span className="text-gray-700">
                  Once production is complete, your order will be packaged and handed over to our delivery partner.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
                  3
                </span>
                <span className="text-gray-700">
                  You&apos;ll receive a tracking number via email so you can monitor your delivery.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
                  4
                </span>
                <span className="text-gray-700">
                  Your order arrives at your door. We offer friendly delivery and support throughout.
                </span>
              </li>
            </ol>
          </Card>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg">Back to Home</Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="gap-2">
                <Printer className="h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
