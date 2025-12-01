export interface PlanetData {
  name: string;
  nameZh: string;
  radius: number;
  distance: number;
  speed: number;
  color: string;
  textureUrl: string;
  ringUrl?: string;
  description: string;
  descriptionZh: string;
  moons?: { name: string; radius: number; distance: number; speed: number; color: string }[];
}

export const planets: PlanetData[] = [
  {
    name: "Mercury",
    nameZh: "水星",
    radius: 0.8,
    distance: 15,
    speed: 0.02,
    color: "#A5A5A5",
    textureUrl: "https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/mercurymap.jpg",
    description: "The smallest planet in our solar system and closest to the Sun.",
    descriptionZh: "太阳系中最小的行星，也是离太阳最近的行星。"
  },
  {
    name: "Venus",
    nameZh: "金星",
    radius: 1.5,
    distance: 22,
    speed: 0.015,
    color: "#E3BB76",
    textureUrl: "https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/venusmap.jpg",
    description: "Spinning in the opposite direction to most planets, Venus is the hottest planet.",
    descriptionZh: "金星的自转方向与大多数行星相反，是太阳系中最热的行星。"
  },
  {
    name: "Earth",
    nameZh: "地球",
    radius: 1.6,
    distance: 32,
    speed: 0.01,
    color: "#22A6B3",
    textureUrl: "https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/earthmap1k.jpg",
    description: "Our home planet, the only place we know of so far that's inhabited by living things.",
    descriptionZh: "我们的家园，目前已知唯一有生命存在的地方。",
    moons: [
      { name: "Moon", radius: 0.4, distance: 3, speed: 0.05, color: "#DDDDDD" }
    ]
  },
  {
    name: "Mars",
    nameZh: "火星",
    radius: 1.2,
    distance: 42,
    speed: 0.008,
    color: "#E0564C",
    textureUrl: "https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/marsmap1k.jpg",
    description: "Mars is a dusty, cold, desert world with a very thin atmosphere.",
    descriptionZh: "火星是一个多尘、寒冷的沙漠世界，大气层非常稀薄。"
  },
  {
    name: "Jupiter",
    nameZh: "木星",
    radius: 4.5,
    distance: 65,
    speed: 0.004,
    color: "#D9A066",
    textureUrl: "https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/jupitermap.jpg",
    description: "Jupiter is more than twice as massive as the other planets of our solar system combined.",
    descriptionZh: "木星的质量是太阳系其他行星质量总和的两倍多。"
  },
  {
    name: "Saturn",
    nameZh: "土星",
    radius: 3.8,
    distance: 90,
    speed: 0.003,
    color: "#EAD6B8",
    textureUrl: "https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/saturnmap.jpg",
    ringUrl: "https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/saturnringcolor.jpg",
    description: "Adorned with a dazzling, complex system of icy rings.",
    descriptionZh: "拥有令人眼花缭乱、复杂的冰环系统。"
  },
  {
    name: "Uranus",
    nameZh: "天王星",
    radius: 2.5,
    distance: 115,
    speed: 0.002,
    color: "#D1F3F6",
    textureUrl: "https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/uranusmap.jpg",
    ringUrl: "https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/uranusringcolour.jpg",
    description: "Uranus rotates at a nearly 90-degree angle from the plane of its orbit.",
    descriptionZh: "天王星的自转轴与轨道平面几乎成90度角。"
  },
  {
    name: "Neptune",
    nameZh: "海王星",
    radius: 2.4,
    distance: 135,
    speed: 0.001,
    color: "#4B70DD",
    textureUrl: "https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/neptunemap.jpg",
    description: "Neptune is dark, cold and whipped by supersonic winds.",
    descriptionZh: "海王星黑暗、寒冷，并伴有超音速强风。"
  }
];
