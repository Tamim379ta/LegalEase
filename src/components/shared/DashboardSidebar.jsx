import { getUserSession } from "@/lib/core/session";
import {
  Bars,
  Briefcase,
  File,
  Gear,
  House,
  Person,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

const clientNavItems = [
  { icon: House, label: "Dashboard", href: "/dashboard" },
  { icon: Briefcase, label: "Hiring History", href: "/dashboard/user/hiring-history" },
  { icon: Person, label: "Update Profile", href: "/dashboard/user/update-profile" },
  { icon: File, label: "My Comments", href: "/dashboard/user/comments" },
];

const lawyerNavItems = [
  { icon: House, label: "Dashboard", href: "/dashboard" },
  { icon: Briefcase, label: "Hiring Requests", href: "/dashboard/lawyer/hiring-history" },
  { icon: Gear, label: "Manage Legal Profile", href: "/dashboard/lawyer/manage-legal-profile" },
];

function NavLinks({ items }) {
  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export async function DashboardSidebar() {
  const user = await getUserSession();
  const userRole = user?.role;

  const navItems = userRole === "lawyer" ? lawyerNavItems : clientNavItems;

  return (
    <>
      {/* Desktop: always-visible static sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:border-r md:border-default md:p-4">
        <NavLinks items={navItems} />
      </aside>

      {/* Mobile: drawer behind a menu button */}
      <div className="md:hidden">
        <Drawer>
          <Button variant="secondary">
            <Bars />
            Menu
          </Button>
          <Drawer.Backdrop>
            <Drawer.Content placement="left">
              <Drawer.Dialog>
                <Drawer.CloseTrigger />
                <Drawer.Body>
                  <NavLinks items={navItems} />
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </>
  );
}