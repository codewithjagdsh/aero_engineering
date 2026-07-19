export type Stat = {
  value: number;
  suffix: string;
  label: string;
};

export const stats: Stat[] = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "+", label: "Installations" },
  { value: 70, suffix: "+", label: "Clients" },
  { value: 99, suffix: "%", label: "Customer Satisfaction" },
];
