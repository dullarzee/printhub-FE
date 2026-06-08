import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  return (
    <div>
      <Card
        key={product._id}
        className="overflow-hidden border border-gray-200 hover:shadow-lg transition"
      >
        <div className="aspect-square bg-linear-to-br from-gray-300 to-gray-400 max-h-64">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-bold text-blue-600 mb-4">
            ₦{product?.price?.toLocaleString()}
          </p>
          <Button
            className="w-full"
            onClick={() => router.push(`/products/${product._id}`)}
          >
            Add to Cart
          </Button>
        </div>
      </Card>
    </div>
  );
}
