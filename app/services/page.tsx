'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface ServiceOption {
  id: string;
  name: string;
  label: string;
  values: string[];
}

interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  image: string;
  isActive: boolean;
  options: ServiceOption[];
  createdAt: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services');
        if (!res.ok) throw new Error('Failed to fetch services');
        const data = await res.json();
        setServices(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading services');
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Our Services</h1>
            <p className="text-gray-600">Professional printing services tailored to your needs with customizable options</p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 text-red-800 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="border border-gray-200">
                  <Skeleton className="h-48" />
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-8 w-1/2" />
                  </div>
                </Card>
              ))}
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No services available yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => (
                <Link key={service.id} href={`/services/${service.id}`}>
                  <Card className="overflow-hidden border border-gray-200 hover:shadow-lg transition h-full">
                    <div className="h-48 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{service.description}</p>
                      <p className="text-2xl font-bold text-blue-600 mb-4">From ₦{service.basePrice.toLocaleString()}</p>
                      <Button className="w-full">Customize Service</Button>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
