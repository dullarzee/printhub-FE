import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Award, Users, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">About PrintHub</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;re dedicated to delivering premium printing solutions that bring your vision to life with exceptional quality and service.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="h-96 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg" />
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Founded in 2018, PrintHub started with a simple mission: to make high-quality printing accessible to businesses of all sizes. What began as a small operation has grown into a trusted partner for thousands of businesses across the region.
              </p>
              <p className="text-gray-700">
                We invest in the latest printing technology and maintain partnerships with premium material suppliers to ensure that every product leaving our facility exceeds expectations. Our team is passionate about quality, reliability, and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 border border-gray-200 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-lg bg-blue-100">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality First</h3>
              <p className="text-gray-600">
                We never compromise on quality. Every product undergoes rigorous quality checks to ensure perfection.
              </p>
            </Card>

            <Card className="p-8 border border-gray-200 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-lg bg-blue-100">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer Focus</h3>
              <p className="text-gray-600">
                Your satisfaction is our success. We listen, adapt, and go the extra mile for every customer.
              </p>
            </Card>

            <Card className="p-8 border border-gray-200 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-lg bg-blue-100">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">
                We continuously invest in latest technology and methods to improve our services and efficiency.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="text-blue-600 text-2xl">✓</div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Experience & Expertise</h3>
                  <p className="text-gray-600">6+ years of industry experience serving thousands of satisfied clients</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-blue-600 text-2xl">✓</div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Latest Technology</h3>
                  <p className="text-gray-600">State-of-the-art printing equipment ensuring superior quality</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-blue-600 text-2xl">✓</div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Competitive Pricing</h3>
                  <p className="text-gray-600">Best value for money without compromising on quality</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="text-blue-600 text-2xl">✓</div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Fast Turnaround</h3>
                  <p className="text-gray-600">Quick production timelines and reliable delivery schedules</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-blue-600 text-2xl">✓</div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Dedicated Support</h3>
                  <p className="text-gray-600">Responsive customer service team ready to help anytime</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-blue-600 text-2xl">✓</div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Customization</h3>
                  <p className="text-gray-600">Flexible solutions tailored to your specific needs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Work With Us?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Let&apos;s bring your printing vision to life with our expert team and premium services.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
