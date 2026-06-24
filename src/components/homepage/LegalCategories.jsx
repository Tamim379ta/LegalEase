"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Scale,
  Briefcase,
  Heart,
  Building,
  Home,
  Plane,
  Receipt,
  Shield,
  Users,
  Stethoscope,
} from "lucide-react";

const categories = [
  {
    label: "Family Law",
    description: "Divorce, child custody, adoption & domestic relations.",
    icon: Heart,
    filter: "Family Law",
    color: "bg-pink-50 text-pink-600 border-pink-100",
  },
  {
    label: "Corporate Law",
    description: "Business formation, contracts, mergers & commercial disputes.",
    icon: Briefcase,
    filter: "Corporate Law",
    color: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    label: "Criminal Law",
    description: "Defense against criminal charges & legal representation in court.",
    icon: Scale,
    filter: "Criminal Law",
    color: "bg-red-50 text-red-600 border-red-100",
  },
  {
    label: "Civil Litigation",
    description: "Resolving disputes between individuals or organizations in court.",
    icon: Building,
    filter: "Civil Litigation",
    color: "bg-purple-50 text-purple-600 border-purple-100",
  },
  {
    label: "Real Estate Law",
    description: "Property transactions, disputes, landlord & tenant issues.",
    icon: Home,
    filter: "Real Estate Law",
    color: "bg-green-50 text-green-600 border-green-100",
  },
  {
    label: "Immigration Law",
    description: "Visas, residency, citizenship & deportation defense.",
    icon: Plane,
    filter: "Immigration Law",
    color: "bg-yellow-50 text-yellow-600 border-yellow-100",
  },
  {
    label: "Tax Law",
    description: "Tax planning, disputes, audits & compliance matters.",
    icon: Receipt,
    filter: "Tax Law",
    color: "bg-orange-50 text-orange-600 border-orange-100",
  },
  {
    label: "Intellectual Property Law",
    description: "Patents, trademarks, copyrights & IP disputes.",
    icon: Shield,
    filter: "Intellectual Property Law",
    color: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
  {
    label: "Labor & Employment Law",
    description: "Workplace rights, wrongful termination & employment contracts.",
    icon: Users,
    filter: "Labor & Employment Law",
    color: "bg-teal-50 text-teal-600 border-teal-100",
  },
  {
    label: "Personal Injury Law",
    description: "Accidents, medical malpractice & compensation claims.",
    icon: Stethoscope,
    filter: "Personal Injury Law",
    color: "bg-rose-50 text-rose-600 border-rose-100",
  },
];

const LegalCategories = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-[#814f30] bg-[#814f30]/10 border border-[#814f30]/20">
          Practice Areas
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Browse by Legal Category
        </h2>
        <p className="mt-4 text-base text-slate-500 leading-relaxed">
          Not sure where to start? Pick your legal issue and we'll match you
          with the right specialist instantly.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {categories.map((cat, index) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.filter}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
            >
              <Link
                href={`/lawyers?category=${cat.filter}`}
                className="group flex flex-col gap-3 p-5 rounded-2xl border border-slate-100 bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full"
              >
                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${cat.color}`}>
                  <Icon size={20} />
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm group-hover:text-[#814f30] transition-colors">
                    {cat.label}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Arrow hint */}
                <span className="mt-auto text-xs font-medium text-[#814f30] opacity-0 group-hover:opacity-100 transition-opacity">
                  Browse lawyers →
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default LegalCategories;