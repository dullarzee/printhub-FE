'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/auth-context';
import { AlertCircle, ChevronRight, ChevronLeft, Check } from 'lucide-react';

interface CheckoutFormData {
  email: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { products, services, totalPrice, clearCart } = useCart();
  const [stage, setStage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: user?.email || '',
    fullName: user?.name || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Nigeria',
  });

  // Redirect if no items
  useEffect(() => {
    if (products.length === 0 && services.length === 0) {
      router.push('/cart');
    }
  }, [products, services, router]);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=/checkout');
    }
  }, [user, router]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Street address is required';
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    // State validation
    if (!formData.state.trim()) {
      newErrors.state = 'State/Province is required';
    }

    // Zip code validation
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Postal code is required';
    }

    // Country validation
    if (!formData.country) {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleContinueToReview = () => {
    if (validateForm()) {
      setStage(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToForm = () => {
    setStage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    try {
      // Create order
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          shippingDetails: formData,
          products: products,
          services: services,
          totalPrice: totalPrice,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const order = await response.json();
      clearCart();
      router.push(`/order-confirmation/${order.id}`);
    } catch (error) {
      setErrors({ general: error instanceof Error ? error.message : 'Failed to place order' });
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotal = () => {
    return totalPrice;
  };

  const orderTotal = calculateTotal();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                  stage >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {stage > 1 ? <Check className="w-5 h-5" /> : '1'}
                </div>
                <div className="ml-3">
                  <p className={`font-semibold ${stage >= 1 ? 'text-blue-600' : 'text-gray-600'}`}>
                    Shipping Details
                  </p>
                </div>
              </div>
              <div className={`h-1 flex-1 mx-4 rounded ${stage > 1 ? 'bg-blue-600' : 'bg-gray-300'}`} />
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                  stage >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  2
                </div>
                <div className="ml-3">
                  <p className={`font-semibold ${stage >= 2 ? 'text-blue-600' : 'text-gray-600'}`}>
                    Review Order
                  </p>
                </div>
              </div>
            </div>
          </div>

          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-800">{errors.general}</p>
            </div>
          )}

          {/* Stage 1: Shipping Details Form */}
          {stage === 1 && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Shipping Details</h2>
                  
                  {/* Contact Information Section */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Contact Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && (
                          <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+234 (0) 123 456 7890"
                          className={errors.phone ? 'border-red-500' : ''}
                        />
                        {errors.phone && (
                          <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className={errors.fullName ? 'border-red-500' : ''}
                      />
                      {errors.fullName && (
                        <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
                      )}
                    </div>
                  </div>

                  {/* Shipping Address Section */}
                  <div className="border-t pt-8">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Shipping Address</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Street Address *
                        </label>
                        <Input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="123 Main Street, Apt 4B"
                          className={errors.address ? 'border-red-500' : ''}
                        />
                        {errors.address && (
                          <p className="text-red-600 text-sm mt-1">{errors.address}</p>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City *
                          </label>
                          <Input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="Lagos"
                            className={errors.city ? 'border-red-500' : ''}
                          />
                          {errors.city && (
                            <p className="text-red-600 text-sm mt-1">{errors.city}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            State/Province *
                          </label>
                          <Input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            placeholder="Lagos State"
                            className={errors.state ? 'border-red-500' : ''}
                          />
                          {errors.state && (
                            <p className="text-red-600 text-sm mt-1">{errors.state}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Postal Code *
                          </label>
                          <Input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            placeholder="101001"
                            className={errors.zipCode ? 'border-red-500' : ''}
                          />
                          {errors.zipCode && (
                            <p className="text-red-600 text-sm mt-1">{errors.zipCode}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Country *
                          </label>
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.country ? 'border-red-500' : 'border-gray-300'
                            }`}
                          >
                            <option value="Nigeria">Nigeria</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Kenya">Kenya</option>
                            <option value="South Africa">South Africa</option>
                            <option value="Other">Other</option>
                          </select>
                          {errors.country && (
                            <p className="text-red-600 text-sm mt-1">{errors.country}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Continue Button */}
                  <div className="border-t pt-8 mt-8">
                    <Button
                      onClick={handleContinueToReview}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                    >
                      Continue to Review <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Order Summary Sidebar */}
              <div>
                <Card className="p-6 sticky top-4">
                  <h3 className="text-lg font-bold mb-4">Order Summary</h3>
                  
                  <div className="space-y-3 mb-6 pb-6 border-b">
                    {products.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm text-gray-700 mb-2">Products</h4>
                        {products.map((product) => (
                          <div key={product.id} className="flex justify-between text-sm mb-1">
                            <span>{product.name} x{product.quantity}</span>
                            <span className="font-medium">₦{(product.price * product.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {services.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm text-gray-700 mb-2">Services</h4>
                        {services.map((service) => (
                          <div key={service.id} className="flex justify-between text-sm mb-1">
                            <span>{service.name} x{service.quantity}</span>
                            <span className="font-medium">₦{(service.price * service.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₦{orderTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t pt-3">
                      <span>Total</span>
                      <span className="text-blue-600">₦{orderTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Stage 2: Order Review */}
          {stage === 2 && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Review Your Order</h2>

                  {/* Shipping Details Review */}
                  <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Shipping Details</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Full Name</p>
                        <p className="font-semibold">{formData.fullName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Email</p>
                        <p className="font-semibold">{formData.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Phone</p>
                        <p className="font-semibold">{formData.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Country</p>
                        <p className="font-semibold">{formData.country}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-600 mb-1">Address</p>
                        <p className="font-semibold">
                          {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={handleBackToForm}
                      variant="outline"
                      className="mt-4"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Edit Details
                    </Button>
                  </div>

                  {/* Order Items Review */}
                  <div className="border-t pt-8">
                    <h3 className="text-lg font-semibold mb-4">Items in Order</h3>
                    <div className="space-y-4">
                      {products.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Products</h4>
                          {products.map((product) => (
                            <div key={product.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg mb-2">
                              <div>
                                <p className="font-semibold">{product.name}</p>
                                <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                              </div>
                              <p className="font-semibold">₦{(product.price * product.quantity).toLocaleString()}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {services.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Services</h4>
                          {services.map((service) => (
                            <div key={service.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg mb-2">
                              <div>
                                <p className="font-semibold">{service.name}</p>
                                <p className="text-sm text-gray-600">Quantity: {service.quantity}</p>
                              </div>
                              <p className="font-semibold">₦{(service.price * service.quantity).toLocaleString()}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Place Order Button */}
                  <div className="border-t pt-8 mt-8 flex gap-4">
                    <Button
                      onClick={handleBackToForm}
                      variant="outline"
                      className="flex-1"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      onClick={handlePlaceOrder}
                      disabled={isLoading}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                    >
                      {isLoading ? 'Processing...' : 'Place Order'}
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Final Summary Sidebar */}
              <div>
                <Card className="p-6 sticky top-4">
                  <h3 className="text-lg font-bold mb-4">Order Total</h3>
                  
                  <div className="space-y-3 mb-6 pb-6 border-b">
                    {products.length > 0 && products.map((product) => (
                      <div key={product.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">{product.name} x{product.quantity}</span>
                        <span className="font-medium">₦{(product.price * product.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                    {services.length > 0 && services.map((service) => (
                      <div key={service.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">{service.name} x{service.quantity}</span>
                        <span className="font-medium">₦{(service.price * service.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₦{orderTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-3">
                      <span>Total</span>
                      <span className="text-blue-600">₦{orderTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="mt-6 p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-700">
                      ✓ Secure checkout. Your payment details are encrypted and secure.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
