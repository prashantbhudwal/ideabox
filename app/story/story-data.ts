export type Story = {
  id: string;
  coordinates: [number, number]; // [longitude, latitude]
  zoom: number;
  title: string;
  description?: string;
};

export const storyPoints: Story[] = [
  {
    id: "poonch",
    coordinates: [74.0933, 33.7714] as [number, number],
    zoom: 11,
    title: "Poonch, Jammu & Kashmir",
    description: "...",
  },
  {
    id: "jammu",
    coordinates: [74.857, 32.7266] as [number, number],
    zoom: 11.5,
    title: "Jammu, Jammu & Kashmir",
    description: "...",
  },
  {
    id: "mumbai",
    coordinates: [72.8777, 19.076] as [number, number],
    zoom: 10.5,
    title: "Mumbai, Maharashtra",
    description: "...",
  },
  {
    id: "bangalore",
    coordinates: [77.5946, 12.9716] as [number, number],
    zoom: 11,
    title: "Bangalore, Karnataka",
    description: "...",
  },
];
