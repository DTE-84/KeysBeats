import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Music, Info, Mail, Menu, X } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "MUSIC", path: "/", icon: Music, active: true },
    { name: "IDENTITY", path: "/about", icon: Info, active: false },
    { name: "CONTACT", path: "/contact", icon: Mail, active: false },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[10002] px-6 py-6 md:py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Branding */}
          <Link
            to="/"
            data-hover-slow
            className="flex flex-col items-start group z-[10003]"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="font-sans font-bold text-xl md:text-2xl tracking-tighter text-white group-hover:text-primary transition-colors">
              KEYS BEATS
            </span>
            <span className="font-mono text-[8px] tracking-[0.3em] text-zinc-600 uppercase">
              [ NEXUS // NODE_01 ]
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-12">
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

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden z-[10003] p-2 text-white hover:text-primary transition-colors"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay Menu */}
      <div
        className={cn(
          "fixed inset-0 z-[10001] bg-black/95 backdrop-blur-2xl transition-all duration-500 flex flex-col items-center justify-center space-y-12 md:hidden",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none translate-y-4"
        )}
      >
        <div className="flex flex-col items-center space-y-12 w-full px-12">
          {navItems.map((item) => (
            <div
              key={item.name}
              className={cn(
                "flex flex-col items-center space-y-4",
                !item.active && "opacity-30 cursor-not-allowed"
              )}
            >
              <item.icon
                className={cn(
                  "w-10 h-10",
                  item.active ? "text-primary" : "text-zinc-600"
                )}
              />
              {item.active ? (
                <Link
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-sans font-bold text-4xl tracking-tighter text-white hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <span className="font-sans font-bold text-4xl tracking-tighter text-zinc-600">
                  {item.name}
                </span>
              )}
              {item.active && location.pathname === item.path && (
                <span className="font-mono text-[10px] tracking-[0.4em] text-primary uppercase">
                  [ CURRENT_LOC ]
                </span>
              )}
              {!item.active && (
                <span className="font-mono text-[10px] tracking-[0.4em] text-zinc-700 uppercase">
                  [ OFFLINE ]
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Footer Intel */}
        <div className="absolute bottom-12 flex flex-col items-center space-y-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-zinc-700 uppercase">
            DESIGN BY DTE SOLUTIONS
          </p>
          <div className="w-12 h-[1px] bg-zinc-800" />
        </div>
      </div>
    </>
  );
}

