export interface Station {
  id: string;
  name: string;
  line: string;
  description: string;
  distance: string;
  features: string[];
  image: string;
  scrollPos: number; // 0 to 1
}

export const stations: Station[] = [
  {
    id: "airport",
    name: "Chennai Airport",
    line: "Blue Line",
    description:
      "Gateway connecting Chennai Metro to international and domestic flights. A state-of-the-art hub for global travelers.",
    distance: "0 km",
    features: ["Airport Link", "Parking", "Escalators", "Duty Free"],
    image: "/images/stations/airport.png",
    scrollPos: 0.1,
  },
  {
    id: "guindy",
    name: "Guindy",
    line: "Blue Line",
    description:
      "One of the busiest transit hubs connecting the IT corridor and industrial estates. A vital link for daily commuters.",
    distance: "8 km",
    features: ["Bus Hub", "Commercial Zone", "Railway Interchange"],
    image: "/images/stations/guindy.png",
    scrollPos: 0.3,
  },
  {
    id: "saidapet",
    name: "Saidapet",
    line: "Blue Line",
    description:
      "Historic locality with high passenger movement. Known for its vibrant markets and cultural heritage.",
    distance: "10 km",
    features: ["Bus Stand", "Market Area", "River View"],
    image: "/images/stations/saidapet.png",
    scrollPos: 0.5,
  },
  {
    id: "teynampet",
    name: "Teynampet",
    line: "Blue Line",
    description:
      "The heart of Chennai's central business district. Surrounded by government offices and corporate headquarters.",
    distance: "13 km",
    features: ["Business Hub", "Luxury Hotels", "Public Parks"],
    image: "/images/stations/teynampet.png",
    scrollPos: 0.7,
  },
  {
    id: "central",
    name: "Chennai Central",
    line: "Blue & Green Line",
    description:
      "The grand terminus and nerve center of Chennai's rail network. Connecting the city to the rest of India.",
    distance: "18 km",
    features: ["Interchange", "Heritage Building", "Major Terminal"],
    image: "/images/stations/central.png",
    scrollPos: 0.9,
  },
];
