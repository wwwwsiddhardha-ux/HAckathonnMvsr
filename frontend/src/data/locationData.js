import { useState, useEffect } from "react";
import axios from "axios";

// Static fallback (used only if API fails)
export const locationData = {
  Punjab: {
    Ludhiana: ["Ludhiana East", "Ludhiana West"],
    Amritsar: ["Amritsar North", "Amritsar South"],
  },
  Haryana: {
    Karnal: ["Karnal Central", "Indri"],
    Hisar: ["Hisar Urban", "Hansi"],
  },
  Maharashtra: {
    Nashik: ["Nashik Road", "Sinnar"],
    Pune: ["Haveli", "Baramati"],
  },
  Telangana: {
    Nizamabad: ["Nizamabad Urban", "Bodhan"],
    Warangal: ["Warangal Urban", "Hanamkonda"],
  },
  "Andhra Pradesh": {
    Srikakulam: ["Tekkali", "Srikakulam"],
    Visakhapatnam: ["Visakhapatnam Urban", "Bheemunipatnam"],
  },
};

export const crops = ["Wheat", "Rice", "Tomato", "Onion", "Maize"];

// Dynamic hook — fetches from backend, falls back to static
export function useLocationData() {
  const [states, setStates] = useState(Object.keys(locationData));
  const [cropList, setCropList] = useState(crops);

  useEffect(() => {
    axios.get("/api/location/states")
      .then(({ data }) => { if (data?.length) setStates(data); })
      .catch(() => {});
    axios.get("/api/location/crops")
      .then(({ data }) => { if (data?.length) setCropList(data); })
      .catch(() => {});
  }, []);

  async function fetchDistricts(state) {
    try {
      const { data } = await axios.get(`/api/location/districts?state=${encodeURIComponent(state)}`);
      return data?.length ? data : Object.keys(locationData[state] || {});
    } catch {
      return Object.keys(locationData[state] || {});
    }
  }

  async function fetchMandals(district) {
    try {
      const { data } = await axios.get(`/api/location/mandals?district=${encodeURIComponent(district)}`);
      return data?.length ? data : [];
    } catch {
      return [];
    }
  }

  return { states, cropList, fetchDistricts, fetchMandals };
}
