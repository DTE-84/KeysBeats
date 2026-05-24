import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Music, Info, Mail } from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { name: "MUSIC", path: "/", icon: Music, active: true },
    { name: "IDENTITY", path: "/about", icon: Info, active: false },
    { name: "CONTACT", path: "/contact", icon: Mail, active: false },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[50] px-6 py-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Branding */}
        <Link
          to="/"
          data-hover-slow
          className="flex flex-col items-start group"
        >
          <span className="font-sans font-bold text-xl tracking-tighter text-white group-hover:text-primary transition-colors">
            KEYS BEATS
          </span>
          <span className="font-mono text-[8px] tracking-[0.3em] text-zinc-600 uppercase">
            [ NEXUS // NODE_01 ]
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8 md:space-x-12">
          {navItems.map((item) => (
            <div
              key={item.name}
              className={cn(
                "relative flex items-center space-x-2 group",
                !item.active && "opacity-40 cursor-not-allowed"
              )}
            >
              <item.icon
                className={cn(
                  "w-4 h-4 transition-colors",
                  item.active ? "text-primary" : "text-zinc-500"
                )}
              />
              {item.active ? (
                <Link
                  to={item.path}
                  data-hover-slow
                  className="font-sans font-bold text-xs tracking-widest text-white hover:text-primary transition-colors py-2"
                >
                  {item.name}
                </Link>
              ) : (
                <span className="font-sans font-bold text-xs tracking-widest text-zinc-500 py-2">
                  {item.name}
                </span>
              )}
              {/* Active Indicator */}
              {location.pathname === item.path && item.active && (
                <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-primary animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
