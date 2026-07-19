/**
 * Single source of truth for company details, contact info, and asset paths.
 * Update this file when you add your real logo, phone, address, and socials.
 */
export const siteConfig = {
  name: "Aero Engineering",
  legalName: "Aero Engineering",
  tagline: "Precision Vertical Lifting Solutions Built for Industry.",
  description:
    "Aero Engineering manufactures reliable Goods Lifts and Dumbwaiters engineered for safety, durability, and performance across industrial and commercial facilities in India.",
  domain: "https://aeroeng.in",
  url: "https://aeroeng.in",
  phone: "+91 98947 94567",
  phoneHref: "tel:+919894794567",
  email: "toaeroeng@gmail.com",
  whatsapp: "919894794567",
  whatsappMessage:
    "Hello Aero Engineering, I would like to enquire about your lifting solutions.",
  address: {
    line1: "No.10-D, T.B. Road",
    line2: "",
    city: "Madurai",
    state: "Tamil Nadu",
    pin: "625016",
    country: "India",
  },
  mapEmbedUrl:
    "https://www.google.com/maps?q=9.920961851056818,78.10610635649263&z=17&output=embed",
  social: {
    linkedin: "https://www.linkedin.com/company/aero-elevator",
    instagram: "https://www.instagram.com/aeroelevator",
    facebook: "https://www.facebook.com/aeroelevator",
  },
  logo: "/assets/logo/logo.png",
  logoDark: "/assets/logo/logo.png",
  ogImage: "/assets/hero/og-image.svg",
} as const;

export type SiteConfig = typeof siteConfig;

export function getWhatsAppUrl(customMessage?: string) {
  const text = encodeURIComponent(
    customMessage ?? siteConfig.whatsappMessage
  );
  return `https://wa.me/${siteConfig.whatsapp}?text=${text}`;
}

export function getFullAddress() {
  const { line1, line2, city, state, pin, country } = siteConfig.address;
  return [line1, line2, `${city}, ${state} ${pin}`, country]
    .filter(Boolean)
    .join(", ");
}
