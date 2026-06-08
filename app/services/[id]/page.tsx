'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/lib/cart-context';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

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
  specifications?: string;
  options: ServiceOption[];
}

export default function ServiceDetailPage() {
  const params = useParams();
  const serviceId = params.id as string;
  const { addService } = useCart();
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/services/${serviceId}`);
        if (!res.ok) throw new Error('Service not found');
        const data = await res.json();
        setService(data);
        
        // Initialize selected options with first value
        const initialOptions: Record<string, string> = {};
        if (data.options) {
          data.options.forEach((opt: ServiceOption) => {
            initialOptions[opt.name] = opt.values[0] || '';
          });
        }
        setSelectedOptions(initialOptions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading service');
      } finally {
        setIsLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  const handleAddToCart = () => {
    if (!service) return;
    
    addService({
      id: service.id,
      name: service.name,
      basePrice: service.basePrice,
      quantity,
      selectedOptions,
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
            <Link href="/services">
              <Button>Back to Services</Button>
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
          <Link href="/services" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Link>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Skeleton className="aspect-video" />
              <div className="space-y-6">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-32" />
              </div>
            </div>
          ) : service ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Service Image */}
              <div className="bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg h-96 flex items-center justify-center overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              {/* Service Info */}
              <div>
                <h1 className="text-4xl font-bold mb-2">{service.name}</h1>
                <p className="text-2xl font-bold text-blue-600 mb-6">From ₦{service.basePrice.toLocaleString()}</p>
                
                <p className="text-gray-700 mb-6">{service.description}</p>

                {service.specifications && (
                  <Card className="p-6 mb-6 border border-gray-200">
                    <h3 className="font-semibold mb-2">Specifications</h3>
                    <p className="text-sm text-gray-600 whitespace-pre-line">{service.specifications}</p>
                  </Card>
                )}

                <Card className="p-6 border border-gray-200 mb-6">
                  <h3 className="font-semibold mb-4">Customize Your Service</h3>
                  
                  {service.options && service.options.length > 0 ? (
                    <div className="space-y-4">
                      {service.options.map((option) => (
                        <div key={option.id}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {option.label}
                          </label>
                          <select
                            value={selectedOptions[option.name] || ''}
                            onChange={(e) => setSelectedOptions({
                              ...selectedOptions,
                              [option.name]: e.target.value
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {option.values.map((value) => (
                              <option key={value} value={value}>
                                {value}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">No customization options available</p>
                  )}
                </Card>

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
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
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
                    {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
                  </Button>

                  {addedToCart && (
                    <p className="text-center text-sm text-green-600">✓ Added to cart successfully</p>
                  )}
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
