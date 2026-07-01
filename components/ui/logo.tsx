import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-2xl font-bold text-blue-600"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
        <span className="text-white">D</span>
      </div>
      <span className="hidden sm:inline">Dare-Prints</span>
    </Link>
  );
}
