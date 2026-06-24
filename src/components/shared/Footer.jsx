"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Lawyers", href: "/lawyers" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

const socialLinks = [
  { icon: <FaFacebookF />, href: "#", label: "Facebook" },
  { icon: <FaXTwitter />, href: "#", label: "Twitter / X" },
  { icon: <FaLinkedinIn />, href: "#", label: "LinkedIn" },
  { icon: <FaInstagram />, href: "#", label: "Instagram" },
];

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    // TODO: wire up newsletter API
    setEmail("");
  };

  return (
    <footer className="bg-[#1a2e44] text-slate-400">
      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div>
            <Image 
            className="rounded-xl mb-3"
            src={'/assets/footerlogo.png'}
            alt="Logo"
            width={230}
            height={250}
            />
            <p className="text-sm text-slate-400 leading-relaxed max-w-[220px]">
              Connecting clients with trusted legal professionals. Find expert lawyers for any legal need, anywhere.
            </p>
            <div className="flex gap-2.5 mt-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg border border-[#2e4a6a] flex items-center justify-center text-slate-400 hover:border-[#814f30] hover:text-[#c8956e] transition-all text-sm"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-200 text-xs font-semibold uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-[#c8956e] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-slate-200 text-xs font-semibold uppercase tracking-widest mb-4">
              Legal
            </h4>
            <ul className="flex flex-col gap-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-[#c8956e] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-slate-200 text-xs font-semibold uppercase tracking-widest mb-3">
              Stay Updated
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Get legal tips, platform updates, and news delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 flex-1 bg-[#0f1e2e] border border-[#2e4a6a] rounded-lg px-3 py-2 focus-within:border-[#814f30] transition-all">
                <MdOutlineEmail className="text-slate-500 text-base flex-shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-transparent outline-none text-sm text-slate-200 placeholder:text-slate-600 w-full"
                />
              </div>
              <button
                onClick={handleSubscribe}
                className="px-4 py-2 rounded-lg bg-[#814f30] hover:bg-[#6b3f24] text-white text-sm font-semibold transition-all flex-shrink-0"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1e3550] pt-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} LegalEase. All rights reserved.
          </p>
          <div className="flex gap-5">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-slate-600 hover:text-[#c8956e] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;