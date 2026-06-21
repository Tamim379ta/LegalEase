"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Lawyers", href: "/lawyers" },
];

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();

  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  if (isPending) return null;

  const user = session?.user;
  const userRole = user?.role

  const dynamicNavLinks = user
    ? [
        { label: "Home", href: "/" },
        { label: "Browse Lawyers", href: "/lawyers" },
        { label: "Dashboard", href: `/dashboard/${userRole}` },
      ]
    : navLinks;

  return (
    <nav className="bg-white border-b border-[#e8e2d9] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <Image
            src="/assets/logo.png"
            alt="LegalEase Logo"
            width={200}
            height={200}
            className="rounded-lg"
          />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1 flex-shrink-0">
          {dynamicNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-150 ${
                pathname === link.href
                  ? "bg-[#f5ede8] text-[#814f30] font-semibold"
                  : "text-slate-500 hover:bg-[#f5ede8] hover:text-[#814f30]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center gap-2 flex-1 min-w-0 max-w-xs bg-[#f8f7f4] border border-[#e8e2d9] rounded-xl px-3.5 py-2 focus-within:border-[#814f30] transition-all">
          <FiSearch className="text-gray-400 text-[15px] flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search lawyers, specialties..."
            className="bg-transparent outline-none text-sm text-[#1a2e44] placeholder:text-gray-400 w-full min-w-0"
          />
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2.5 flex-shrink-0">
          {user ? (
            <>
              <span className="text-sm text-slate-600 font-medium whitespace-nowrap max-w-[140px] truncate">
                Hi, {user.name || "User"}
              </span>

              <button
                onClick={() => authClient.signOut()}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-all "
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signIn"
                className="px-4 py-2 rounded-lg text-sm font-medium text-[#814f30] border border-[#814f30] hover:bg-[#814f30] hover:text-white transition-all whitespace-nowrap"
              >
                Log in
              </Link>

              <Link
                href="/signUp"
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#814f30] hover:bg-[#6b3f24] transition-all whitespace-nowrap"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-[#814f30] text-2xl flex-shrink-0"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#e8e2d9] px-4 py-4 flex flex-col gap-3">

          {/* Mobile Search */}
          <div className="flex items-center gap-2 bg-[#f8f7f4] border border-[#e8e2d9] rounded-xl px-3.5 py-2 focus-within:border-[#814f30] transition-all">
            <FiSearch className="text-gray-400 text-[15px] flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search lawyers, specialties..."
              className="bg-transparent outline-none text-sm text-[#1a2e44] placeholder:text-gray-400 w-full"
            />
          </div>

          {/* Mobile Nav Links */}
          <div className="flex flex-col gap-1">
            {dynamicNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  pathname === link.href
                    ? "bg-[#f5ede8] text-[#814f30] font-semibold"
                    : "text-slate-500 hover:bg-[#f5ede8] hover:text-[#814f30]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Actions */}
          <div className="flex gap-2 pt-1">
            {user ? (
              <>
                <div className="flex-1 text-center px-4 py-2 rounded-lg text-sm font-medium text-slate-600 truncate">
                  Hi, {user.name || "User"}
                </div>

                <button
                  onClick={() => {
                    authClient.signOut();
                    setMenuOpen(false);
                  }}
                  className="flex-1 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signIn"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center px-4 py-2 rounded-lg text-sm font-medium text-[#814f30] border border-[#814f30] hover:bg-[#814f30] hover:text-white transition-all"
                >
                  Log in
                </Link>

                <Link
                  href="/signUp"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#814f30] hover:bg-[#6b3f24] transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;