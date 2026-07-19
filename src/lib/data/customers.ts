export type CustomerSector =
  | "Restaurants and Bakeries"
  | "Industrial Manufacturing";

export type Customer = {
  name: string;
  logo: string;
  location: string;
  sector: CustomerSector;
  work: string;
};

/**
 * Selected Aero Engineering customers.
 * Locations and business descriptions use verified public information where
 * available; local brands use conservative regional descriptions.
 */
export const customers: Customer[] = [
  {
    name: "Shree Anandhaas",
    logo: "/assets/customers/anandhaas.png",
    location: "Coimbatore, Tamil Nadu",
    sector: "Restaurants and Bakeries",
    work: "Vegetarian restaurants, sweets, catering and event hospitality",
  },
  {
    name: "Geetha Canteen",
    logo: "/assets/customers/geetha-canteen.png",
    location: "Coimbatore, Tamil Nadu",
    sector: "Restaurants and Bakeries",
    work: "South Indian vegetarian restaurants and food service",
  },
  {
    name: "Shri Balaajee Bhavan",
    logo: "/assets/customers/balaajee-bhavan.png",
    location: "Chennai, Tamil Nadu",
    sector: "Restaurants and Bakeries",
    work: "Multi-location vegetarian restaurant chain",
  },
  {
    name: "Amman Unavagam",
    logo: "/assets/customers/amman-unavagam.png",
    location: "Tamil Nadu",
    sector: "Restaurants and Bakeries",
    work: "Restaurant and commercial food-service operations",
  },
  {
    name: "Padma",
    logo: "/assets/customers/padma.png",
    location: "Tamil Nadu",
    sector: "Restaurants and Bakeries",
    work: "Restaurant and food-service operations",
  },
  {
    name: "Peter's Kitchen",
    logo: "/assets/customers/peters-kitchen.png",
    location: "Tamil Nadu",
    sector: "Restaurants and Bakeries",
    work: "Restaurant and commercial kitchen operations",
  },
  {
    name: "Sree Akshayam",
    logo: "/assets/customers/sree-akshayam.png",
    location: "Tamil Nadu",
    sector: "Restaurants and Bakeries",
    work: "Vegetarian restaurant and food-service operations",
  },
  {
    name: "Aswins",
    logo: "/assets/customers/aswins.png",
    location: "Tamil Nadu",
    sector: "Restaurants and Bakeries",
    work: "Bakery, sweets and retail food outlets",
  },
  {
    name: "Eeebees",
    logo: "/assets/customers/eeebees.png",
    location: "Coimbatore, Tamil Nadu",
    sector: "Restaurants and Bakeries",
    work: "Bakery and confectionery since 1966",
  },
  {
    name: "Maharaja Bakery",
    logo: "/assets/customers/maharaja-bakery.png",
    location: "Pudukkottai, Tamil Nadu",
    sector: "Restaurants and Bakeries",
    work: "Bakery, confectionery and retail food production",
  },
  {
    name: "Raja Barley Biscuit Company",
    logo: "/assets/customers/raja-barley.png",
    location: "Madurai, Tamil Nadu",
    sector: "Restaurants and Bakeries",
    work: "Biscuits, bakery products, sweets and snacks",
  },
  {
    name: "LMW Limited",
    logo: "/assets/customers/lmw.png",
    location: "Coimbatore, Tamil Nadu",
    sector: "Industrial Manufacturing",
    work: "Textile machinery, CNC machine tools, foundry and aerospace systems",
  },
  {
    name: "Lakshmi Life Sciences",
    logo: "/assets/customers/lakshmi-life-sciences.png",
    location: "Coimbatore, Tamil Nadu",
    sector: "Industrial Manufacturing",
    work: "Industrial automation, precision plastics and contract manufacturing",
  },
  {
    name: "Spectra",
    logo: "/assets/customers/spectra.png",
    location: "Coimbatore, Tamil Nadu",
    sector: "Industrial Manufacturing",
    work: "Engineering plastics, conveyor components and industrial solutions",
  },
  {
    name: "POPE Professional",
    logo: "/assets/customers/pope-professional.png",
    location: "Coimbatore, Tamil Nadu",
    sector: "Industrial Manufacturing",
    work: "Professional audio equipment and acoustic systems manufacturing",
  },
];
