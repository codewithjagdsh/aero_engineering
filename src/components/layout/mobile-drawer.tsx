"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { LinkButton } from "@/components/shared/link-button";
import { Logo } from "@/components/shared/logo";
import { navLinks } from "@/lib/data/navigation";
import { cn } from "@/lib/utils";

type MobileDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/** Mobile navigation drawer with nested products list. */
export function MobileDrawer({ open, onOpenChange }: MobileDrawerProps) {
  const [productsOpen, setProductsOpen] = useState(false);

  const close = () => onOpenChange(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[min(100%,360px)] p-0">
        <SheetHeader className="border-b border-border p-5 text-left">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <Logo />
        </SheetHeader>
        <nav className="flex flex-col gap-1 p-4" aria-label="Mobile">
          {navLinks.map((link) => {
            if (link.children) {
              return (
                <div key={link.href} className="rounded-xl">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-base font-medium"
                    onClick={() => setProductsOpen((v) => !v)}
                    aria-expanded={productsOpen}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "size-4 transition-transform",
                        productsOpen && "rotate-180"
                      )}
                    />
                  </button>
                  {productsOpen && (
                    <div className="mb-2 ml-2 space-y-1 border-l border-border pl-3">
                      <Link
                        href="/products"
                        onClick={close}
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-electric"
                      >
                        All Products
                      </Link>
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={close}
                          className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className="rounded-xl px-3 py-3 text-base font-medium hover:bg-muted"
              >
                {link.label}
              </Link>
            );
          })}
          <LinkButton
            href="/contact"
            onClick={close}
            className="mt-4 h-12 rounded-full bg-navy text-white dark:bg-electric dark:text-navy"
          >
            Get Free Quote
          </LinkButton>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
