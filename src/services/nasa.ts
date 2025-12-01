import axios from 'axios';

const API_KEY = 'DEMO_KEY'; // In production, use a real key
const BASE_URL = 'https://api.nasa.gov/neo/rest/v1';

export interface NEO {
  id: string;
  name: string;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: {
    close_approach_date: string;
    relative_velocity: {
      kilometers_per_hour: string;
    };
    miss_distance: {
      kilometers: string;
    };
  }[];
}

export const fetchNEOs = async (): Promise<NEO[]> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const response = await axios.get(`${BASE_URL}/feed`, {
      params: {
        start_date: today,
        end_date: today,
        api_key: API_KEY
      }
    });
    
    const neos: NEO[] = [];
    const nearEarthObjects = response.data.near_earth_objects;
    
    Object.keys(nearEarthObjects).forEach(date => {
      neos.push(...nearEarthObjects[date]);
    });
    
    return neos;
  } catch (error) {
    console.error("Error fetching NASA data:", error);
    return [];
  }
};
