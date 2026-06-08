import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-gray-300 animate-pulse rounded-md w-80 h-100 ",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
