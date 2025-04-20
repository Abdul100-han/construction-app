import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900">Construction App</h1>
      <p className="mt-4 text-lg text-gray-600">
        A platform for buyers, vendors, and riders in the construction industry.
      </p>
      <div className="mt-6">
        <Link
          href="/register"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}