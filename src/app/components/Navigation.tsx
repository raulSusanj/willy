import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav className="bg-blue-950 text-white shadow-md">
      <div className="mx-auto px-2 max-w-7xl">
        <div className="flex justify-between  h-16 items-center ">
          {/* Logo */}
          <Link href="/">
            <Logo />
          </Link>

          <div className="flex items-center space-x-6 ">
            <Link href="/">Početna</Link>
            <Link href="/employees">Djelatnici</Link>
            <Link href="/wiki">Wiki</Link>
          </div>

          <button>Odjava</button>
        </div>
      </div>
    </nav>
  );
}
