export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <a href="#" className="text-gray-400 hover:text-gray-300">
            Terms
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300">
            Privacy
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300">
            Contact
          </a>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} BlogToGram. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}