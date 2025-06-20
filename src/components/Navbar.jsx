"use client";

import { useState } from "react";
import {
  HomeIcon,
  MapPinIcon,
  UserCircleIcon,
  ZapIcon,
  MenuIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/route", label: "Create Route", icon: MapPinIcon },
  { href: "/profile", label: "Profile", icon: UserCircleIcon },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b border-border py-3">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="p-2 bg-primary/20 rounded-lg shadow-sm">
            <ZapIcon className="w-5 h-5 text-primary animate-slow-spin" />
          </div>
          <span className="text-xl font-bold font-mono tracking-wide">
            <span className="text-primary">Stridr</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all",
                pathname === href
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-muted hover:text-primary text-foreground/80"
              )}
            >
              <Icon size={16} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile Nav Trigger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="w-5 h-5 mr-9" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <ZapIcon className="w-5 h-5 text-primary" />
                  <span className="text-xl font-bold font-mono tracking-wide text-primary">Stridr</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-4">
                {navItems.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={clsx(
                      "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all",
                      pathname === href
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted hover:text-primary text-foreground/80"
                    )}
                  >
                    <Icon size={16} />
                    {label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
