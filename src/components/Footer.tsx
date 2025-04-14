import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-gray-400 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col items-center justify-center gap-4 text-center">
        <div className="flex items-center gap-3">
          <span>Powered by</span>
          <Image
            src="/eagle-logo.png"
            alt="The EAGLE PROJECT Logo"
            width={28}
            height={28}
            className="rounded-full"
          />
          <Link
            href="https://www.youtube.com/@EagleProjectHQ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-medium hover:text-yellow-400 transition-colors"
          >
            The EAGLE PROJECT
          </Link>
        </div>
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
