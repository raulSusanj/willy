import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-blue-100 text-gray-700 py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo */}
          <Link href="/">
            <Logo color="text-black" />
            <p>Feel Free</p>
          </Link>

          {/* Footer links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Poveznice</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">Početna</Link>
              </li>
              <li>
                <Link href="/employees">Djelatnici</Link>
              </li>
              <li>
                <Link href="/wiki">Wiki</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
