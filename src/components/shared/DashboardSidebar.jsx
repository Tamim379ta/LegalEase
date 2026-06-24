import { getUserSession } from "@/lib/core/session";
import { Bars } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { ActiveNavLinks } from "./ActiveNavLinks";

export async function DashboardSidebar() {
  const user = await getUserSession();
  const userRole = user?.role;

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:border-r md:border-default md:p-4 gap-4">
        <div className="px-3 py-3 rounded-xl bg-default mb-2">
          <p className="text-sm font-semibold text-foreground truncate">{user?.name || "User"}</p>
          <p className="text-xs text-muted capitalize">{userRole}</p>
        </div>
        <ActiveNavLinks role={userRole} />
      </aside>

      {/* Mobile sticky bar with drawer */}
      <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-default bg-white sticky top-[68px] z-40">
        <Drawer>
          <Button variant="secondary" size="sm">
            <Bars />
            Menu
          </Button>
          <Drawer.Backdrop>
            <Drawer.Content placement="left">
              <Drawer.Dialog>
                <Drawer.CloseTrigger />
                <Drawer.Body className="pt-4">
                  <div className="px-3 py-3 rounded-xl bg-default mb-4">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-muted capitalize">{userRole}</p>
                  </div>
                  <ActiveNavLinks role={userRole} />
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
        <span className="text-sm font-medium text-slate-500">Dashboard</span>
      </div>
    </>
  );
}