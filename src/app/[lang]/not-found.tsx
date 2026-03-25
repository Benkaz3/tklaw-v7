import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <h2 className="text-3xl mt-4">Page Not Found</h2>
      <Link href="/vi" className="mt-4 text-primary hover:underline">
        Go Home
      </Link>
    </div>
  );
}
