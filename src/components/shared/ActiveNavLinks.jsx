'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  File,
  Gear,
  House,
  Person,
  Persons,
  CreditCard,
  ChartMixed,
  PersonPencil,
} from "@gravity-ui/icons";

const clientNavItems = [
  { icon: House, label: "Dashboard", href: "/dashboard/client" },
  { icon: Briefcase, label: "Hiring History", href: "/dashboard/client/hiring-history" },
  { icon: Person, label: "Update Profile", href: "/dashboard/client/update-profile" },
  { icon: File, label: "My Comments", href: "/dashboard/client/comments" },
];

const lawyerNavItems = [
  { icon: House, label: "Dashboard", href: "/dashboard/lawyer" },
  { icon: Briefcase, label: "Hiring Requests", href: "/dashboard/lawyer/hiring-request" },
  { icon: Gear, label: "Manage Legal Profile", href: "/dashboard/lawyer/manage-legal-profile" },
];

const adminNavItems = [
  { icon: House, label: "Dashboard", href: "/dashboard/admin" },
  { icon: Persons, label: "Manage Users", href: "/dashboard/admin/manage-users" },
  { icon: PersonPencil, label: "Manage Lawyers", href: "/dashboard/admin/manage-lawyers" },
  { icon: CreditCard, label: "All Transactions", href: "/dashboard/admin/all-transactions" },
  { icon: ChartMixed, label: "Analytics Overview", href: "/dashboard/admin/analytics" },
];

export function ActiveNavLinks({ role }) {
  const pathname = usePathname();

  const items =
    role === "lawyer"
      ? lawyerNavItems
      : role === "admin"
      ? adminNavItems
      : clientNavItems;

  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors
              ${isActive
                ? "bg-[#f5ede8] text-[#814f30] font-semibold"
                : "text-foreground hover:bg-default"
              }`}
          >
            <item.icon className={`size-5 ${isActive ? "text-[#814f30]" : "text-muted"}`} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}