import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BookOpen, Users, Home } from "lucide-react";

const navItems = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/cursos", label: "Cursos", icon: BookOpen },
  { to: "/alumnos", label: "Alumnos", icon: Users },
];

export default function MainLayout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r bg-card flex flex-col">
        <div className="flex h-16 items-center border-b px-6">
          <span className="text-xl font-bold">MicroCursos</span>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === to
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="border-t p-4">
          <p className="text-xs text-muted-foreground">
            Cursos API: {import.meta.env.VITE_CURSOS_API_URL}
          </p>
          <p className="text-xs text-muted-foreground">
            Alumnos API: {import.meta.env.VITE_USUARIOS_API_URL}
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="pl-64">
        <header className="sticky top-0 z-40 flex h-16 items-center border-b bg-background px-8">
          <h2 className="text-sm font-medium text-muted-foreground">
            {navItems.find((i) => i.to === pathname)?.label ?? "Dashboard"}
          </h2>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
