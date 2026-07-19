export type GalleryCategory = "installations" | "on-site";

export type GalleryItem = {
  id: string;
  title: string;
  category: GalleryCategory;
  image: string;
};

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    title: "Kitchen Dumbwaiter Installation",
    category: "installations",
    image: "/assets/gallery/aero-installation-01.png",
  },
  {
    id: "g2",
    title: "Dumbwaiter Structure Installation",
    category: "on-site",
    image: "/assets/gallery/aero-installation-02.png",
  },
  {
    id: "g3",
    title: "Service Lift Installation",
    category: "installations",
    image: "/assets/gallery/aero-installation-03.png",
  },
  {
    id: "g4",
    title: "Industrial Goods Lift",
    category: "installations",
    image: "/assets/gallery/aero-installation-04.png",
  },
  {
    id: "g5",
    title: "Lift Drive and Car Assembly",
    category: "on-site",
    image: "/assets/gallery/aero-installation-05.png",
  },
  {
    id: "g6",
    title: "Industrial Lift Landing",
    category: "installations",
    image: "/assets/gallery/aero-installation-06.png",
  },
  {
    id: "g7",
    title: "Goods Lift Shaft Work",
    category: "on-site",
    image: "/assets/gallery/aero-installation-07.png",
  },
  {
    id: "g8",
    title: "Heavy-Duty Goods Lift",
    category: "installations",
    image: "/assets/gallery/aero-installation-08.png",
  },
  {
    id: "g9",
    title: "Goods Lift Car Installation",
    category: "on-site",
    image: "/assets/gallery/aero-installation-09.png",
  },
  {
    id: "g10",
    title: "Factory Goods Lift",
    category: "installations",
    image: "/assets/gallery/aero-installation-10.png",
  },
  {
    id: "g11",
    title: "External Lift Shaft Construction",
    category: "on-site",
    image: "/assets/gallery/aero-installation-11.png",
  },
  {
    id: "g12",
    title: "Goods Lift Car and Landing",
    category: "installations",
    image: "/assets/gallery/aero-installation-12.png",
  },
];
