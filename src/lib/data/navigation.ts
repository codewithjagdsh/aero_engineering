export type NavLink = {
  href: string;
  label: string;
  children?: { href: string; label: string; description?: string }[];
};

export const navLinks: NavLink[] = [
  { href: "/about", label: "About Us" },
  {
    href: "/products",
    label: "Products",
    children: [
      {
        href: "/products/goods-lift",
        label: "Goods Lift",
        description: "Heavy-duty industrial platforms",
      },
      {
        href: "/products/hydraulic-goods-lift",
        label: "Hydraulic Goods Lift",
        description: "Smooth mid-rise hydraulic drive",
      },
      {
        href: "/products/electric-goods-lift",
        label: "Electric Goods Lift",
        description: "Traction for taller shafts",
      },
      {
        href: "/products/dumbwaiter",
        label: "Dumbwaiter",
        description: "Compact service lifts",
      },
      {
        href: "/products/hospital-dumbwaiter",
        label: "Hospital Dumbwaiter",
        description: "Clinical logistics ready",
      },
      {
        href: "/products/restaurant-dumbwaiter",
        label: "Restaurant Dumbwaiter",
        description: "Kitchen-to-floor flow",
      },
    ],
  },
  { href: "/projects", label: "Projects" },
  { href: "/customers", label: "Customers" },
  { href: "/industries", label: "Industries" },
  { href: "/why-choose-us", label: "Why Choose Us" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];
