import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "./card";

export default function ProductCardSkeleton() {
  return (
    <Card className="p-4">
      <Skeleton className="h-48 w-full" />
      <div className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full" />
      </div>
    </Card>
  );
}
