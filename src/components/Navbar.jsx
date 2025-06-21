"use client";

import {
  HomeIcon,
  MapPinIcon,
  UserCircleIcon,
  ZapIcon,
  MenuIcon,
  LogOutIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  SignOutButton,
} from "@clerk/nextjs";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

const navItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/route", label: "Create Route", icon: MapPinIcon },
  { href: "/profile", label: "Profile", icon: UserCircleIcon },
];

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b border-border py-3">
      <div className="container mx-auto flex flex-row items-center justify-between px-4 gap-2 flex-wrap">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="p-2 bg-primary/20 rounded-lg shadow-sm">
            <ZapIcon className="w-5 h-5 text-primary animate-slow-spin" />
          </div>
          <span className="text-xl font-bold font-mono tracking-wide">
            <span className="text-primary">Stridr</span>
          </span>
        </Link>

        {/* =================== SIGNED IN =================== */}
        <SignedIn>
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
            <SignOutButton>
              <Button variant="ghost" size="icon" className="text-destructive">
                <LogOutIcon className="w-5 h-5" />
              </Button>
            </SignOutButton>
          </nav>

          {/* Mobile Nav (only when signed in) */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MenuIcon className="w-5 h-5 mr-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <ZapIcon className="w-5 h-5 text-primary" />
                    <span className="text-xl font-bold font-mono tracking-wide text-primary">
                      Stridr
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-6 flex flex-col gap-4">
                  {navItems.map(({ href, label, icon: Icon }) => (
                    <SheetClose asChild key={href}>
                      <Link
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
                    </SheetClose>
                  ))}

                  <SignOutButton>
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2 text-red-600 hover:bg-red-100 border border-red-200"
                      >
                        <LogOutIcon className="w-4 h-4" />
                        Logout
                      </Button>
                    </SheetClose>
                  </SignOutButton>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </SignedIn>

        {/* =================== SIGNED OUT =================== */}
        <SignedOut>
          <nav className="flex items-center gap-4 text-base font-medium">
            <SignInButton mode="modal" >
              <Button
                variant="ghost"
                className="text-base font-medium px-3 py-1.5"
              >
                Login
              </Button>
            </SignInButton>
            <SignUpButton mode="modal" >
              <Button
                variant="ghost"
                className="text-base font-medium px-3 py-1.5"
              >
                Signup
              </Button>
            </SignUpButton>
          </nav>
        </SignedOut>
      </div>
    </header>
  );
};

export default Navbar;
