import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { siteConfig, getFullAddress } from "@/lib/site-config";
import { navLinks } from "@/lib/data/navigation";

const enquiryLinks = [
  {
    label: "Electric Goods Lift",
    href: "/contact?requirement=electric-goods-lift",
  },
  {
    label: "Hydraulic Goods Lift",
    href: "/contact?requirement=hydraulic-goods-lift",
  },
  {
    label: "Dumbwaiters for Restaurants, Cloud Kitchens, Hospitals ...",
    href: "/contact?requirement=dumbwaiters",
  },
  {
    label: "Custom Material Handling Lifting Solutions",
    href: "/contact?requirement=custom",
  },
];

/** Site-wide footer with links, contact, and socials. */
export function Footer() {
  const quickLinks = navLinks.filter((l) => l.href !== "/");

  return (
    <footer className="border-t border-border bg-navy text-white">
      <div className="container-narrow section-padding !py-16 md:!py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo variant="light" size="lg" />
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              Manufacturing precise goods lifts and dumbwaiters for factories,
              hotels, restaurants, bakeries, warehouses, and commercial
              buildings across India.
            </p>
            <div className="mt-6 flex gap-3">
              {Object.entries(siteConfig.social).map(([key, href]) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full bg-white/10 text-sm font-medium capitalize transition-colors hover:bg-electric"
                  aria-label={key}
                >
                  {key.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-electric">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-electric">
              Enquiry List
            </h3>
            <ul className="mt-4 space-y-2.5">
              {enquiryLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-electric">
              Contact
            </h3>
            <ul className="mt-4 space-y-4 text-sm text-white/70">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-electric" />
                <span>{getFullAddress()}</span>
              </li>
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="flex items-center gap-3 transition-colors hover:text-white"
                >
                  <Phone className="size-4 shrink-0 text-electric" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 transition-colors hover:text-white"
                >
                  <Mail className="size-4 shrink-0 text-electric" />
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <p>
            <a
              href={siteConfig.domain}
              className="transition-colors hover:text-white"
            >
              aeroeng.in
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
