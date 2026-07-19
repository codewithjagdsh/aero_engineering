"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileDrawer } from "@/components/layout/mobile-drawer";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/shared/link-button";
import { navLinks } from "@/lib/data/navigation";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { cn } from "@/lib/utils";

/** Sticky navbar — transparent at top, solid on scroll; includes products mega menu. */
export function Navbar() {
  const { scrolled } = useScrollPosition(24);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  const productsLink = navLinks.find((l) => l.href === "/products");

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border/60 bg-white/90 shadow-soft backdrop-blur-xl dark:bg-navy/95"
            : "bg-transparent"
        )}
      >
        <div className="container-narrow flex h-16 items-center justify-between gap-4 md:h-20">
          <Logo variant={scrolled ? "auto" : "auto"} />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {navLinks.map((link) => {
              if (link.children) {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setMegaOpen(true)}
                    onMouseLeave={() => setMegaOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors",
                        scrolled
                          ? "text-ink hover:text-electric dark:text-white"
                          : "text-ink hover:text-electric dark:text-white"
                      )}
                      aria-expanded={megaOpen}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "size-3.5 transition-transform",
                          megaOpen && "rotate-180"
                        )}
                      />
                    </Link>

                    <div
                      className={cn(
                        "absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 pt-3 transition-all",
                        megaOpen
                          ? "pointer-events-auto opacity-100"
                          : "pointer-events-none opacity-0"
                      )}
                    >
                      <div className="rounded-2xl border border-border bg-white p-4 shadow-soft-lg dark:bg-card">
                        <div className="mb-3 flex items-center justify-between px-2">
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Our Products
                          </p>
                          <Link
                            href="/products"
                            className="text-xs font-medium text-electric hover:underline"
                            onClick={() => setMegaOpen(false)}
                          >
                            View all
                          </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          {productsLink?.children?.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setMegaOpen(false)}
                              className="rounded-xl p-3 transition-colors hover:bg-section dark:hover:bg-muted"
                            >
                              <p className="text-sm font-semibold text-navy dark:text-white">
                                {child.label}
                              </p>
                              {child.description && (
                                <p className="mt-0.5 text-xs text-muted-foreground">
                                  {child.description}
                                </p>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-3 py-2 text-sm font-medium text-ink transition-colors hover:text-electric dark:text-white dark:hover:text-electric"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <ThemeToggle />
            <LinkButton
              href="/contact"
              className="hidden rounded-full bg-navy px-5 text-white hover:bg-steel sm:inline-flex dark:bg-electric dark:text-navy dark:hover:bg-electric/90"
            >
              Get Free Quote
            </LinkButton>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
          </div>
        </div>
      </header>

      <MobileDrawer open={mobileOpen} onOpenChange={setMobileOpen} />
    </>
  );
}
