

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
      { ra: 0.94, dec: 60.71 }, // Cih
      { ra: 1.42, dec: 60.23 }, // Ruchbah
      { ra: 1.90, dec: 63.67 }, // Segin
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]]
  },
  {
    name: "Cygnus",
    nameZh: "天鹅座",
    stars: [
      { ra: 20.69, dec: 45.28 }, // Deneb
      { ra: 20.38, dec: 40.25 }, // Sadr
      { ra: 20.77, dec: 33.96 }, // Aljanah
      { ra: 19.76, dec: 45.13 }, // Fawaris
      { ra: 19.51, dec: 27.96 }, // Albireo
    ],
    lines: [[0, 1], [1, 2], [1, 3], [1, 4]]
  },
  {
    name: "Leo",
    nameZh: "狮子座",
    stars: [
      { ra: 10.14, dec: 11.96 }, // Regulus
      { ra: 10.33, dec: 19.84 }, // Algieba
      { ra: 11.23, dec: 15.42 }, // Zosma
      { ra: 11.81, dec: 14.57 }, // Denebola
      { ra: 11.23, dec: 20.52 }, // Chertan
      { ra: 10.11, dec: 23.41 }, // Adhafera
    ],
    lines: [[0, 1], [1, 5], [1, 4], [4, 2], [2, 3], [4, 2]]
  },
  {
    name: "Scorpius",
    nameZh: "天蝎座",
    stars: [
      { ra: 16.48, dec: -26.43 }, // Antares
      { ra: 16.00, dec: -19.80 }, // Graffias
      { ra: 15.97, dec: -26.11 }, // Dschubba
      { ra: 16.35, dec: -28.21 }, // Alniyat
      { ra: 16.83, dec: -30.74 }, // Wei
      { ra: 16.84, dec: -34.29 }, // Sargas
      { ra: 17.61, dec: -37.10 }, // Shaula
      { ra: 17.56, dec: -37.29 }, // Lesath
    ],
    lines: [[0, 3], [3, 2], [2, 1], [0, 4], [4, 5], [5, 6], [6, 7]]
  },
  {
    name: "Taurus",
    nameZh: "金牛座",
    stars: [
      { ra: 4.59, dec: 16.50 }, // Aldebaran
      { ra: 5.43, dec: 28.60 }, // Elnath
      { ra: 3.79, dec: 24.10 }, // Alcyone (Pleiades)
      { ra: 4.47, dec: 15.62 }, // Hyadum I
      { ra: 4.33, dec: 15.87 }, // Hyadum II
    ],
    lines: [[0, 3], [3, 4], [0, 1]]
  },
  {
    name: "Gemini",
    nameZh: "双子座",
    stars: [
      { ra: 7.57, dec: 31.88 }, // Castor
      { ra: 7.75, dec: 28.02 }, // Pollux
      { ra: 6.61, dec: 22.51 }, // Alhena
      { ra: 7.33, dec: 21.98 }, // Wasat
      { ra: 7.06, dec: 20.57 }, // Mebsuta
    ],
    lines: [[0, 1], [1, 3], [3, 2], [3, 4]]
  }
];
