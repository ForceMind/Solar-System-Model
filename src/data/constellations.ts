import * as THREE from 'three';

export interface ConstellationData {
  name: string;
  nameZh: string;
  stars: { ra: number; dec: number }[]; // Right Ascension (hours), Declination (degrees)
  lines: number[][]; // Indices of stars to connect
}

// Helper to convert RA/Dec to 3D position on a sphere
export const getStarPosition = (ra: number, dec: number, radius: number): [number, number, number] => {
  const phi = (90 - dec) * (Math.PI / 180);
  const theta = (ra / 24) * (Math.PI * 2);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return [x, y, z];
};

export const constellations: ConstellationData[] = [
  {
    name: "Ursa Major (Big Dipper)",
    nameZh: "北斗七星",
    stars: [
      { ra: 11.06, dec: 61.75 }, // Dubhe
      { ra: 11.03, dec: 56.38 }, // Merak
      { ra: 11.89, dec: 53.69 }, // Phecda
      { ra: 12.25, dec: 57.03 }, // Megrez
      { ra: 12.90, dec: 55.96 }, // Alioth
      { ra: 13.39, dec: 54.92 }, // Mizar
      { ra: 13.79, dec: 49.31 }, // Alkaid
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [4, 5], [5, 6]]
  },
  {
    name: "Orion",
    nameZh: "猎户座",
    stars: [
      { ra: 5.92, dec: 7.41 },   // Betelgeuse
      { ra: 5.25, dec: 6.34 },   // Bellatrix
      { ra: 5.60, dec: -1.20 },  // Alnitak
      { ra: 5.60, dec: -1.94 },  // Alnilam
      { ra: 5.53, dec: -2.39 },  // Mintaka
      { ra: 5.79, dec: -9.67 },  // Saiph
      { ra: 5.24, dec: -8.20 },  // Rigel
    ],
    lines: [[0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6], [0, 1], [5, 6]]
  },
  {
    name: "Cassiopeia",
    nameZh: "仙后座",
    stars: [
      { ra: 0.15, dec: 59.15 }, // Caph
      { ra: 0.67, dec: 56.53 }, // Schedar
      { ra: 0.94, dec: 60.71 }, // Navi
      { ra: 1.42, dec: 60.23 }, // Ruchbah
      { ra: 1.90, dec: 63.67 }, // Segin
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]]
  }
];
