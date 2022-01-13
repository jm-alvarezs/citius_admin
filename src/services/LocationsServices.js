import api from "./api";

const route = "/locations";

const LocationsService = {
  getLocations: () => api.get(route),
  postLocation: (location) => api.post(route, { ...location }),
  putLocation: (location) => api.put(route, { ...location }),
  deleteLocation: (location_id) => api.delete(`${route}/${location_id}`),
};

export default LocationsService;
