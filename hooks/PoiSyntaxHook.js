export function usePoiSyntax({ radius = 1000, longitude, latitude }) {
    return {
        parks: `
            node["leisure"~"^(park|playground|pitch|track|fitness_station|nature_reserve)$"](around:${radius},${latitude},${longitude});
            way["leisure"~"^(park|playground|pitch|track|fitness_station|nature_reserve)$"](around:${radius},${latitude},${longitude});
            relation["leisure"~"^(park|playground|pitch|track|fitness_station|nature_reserve)$"](around:${radius},${latitude},${longitude});`,

        forest: `
            way["landuse"="forest"](around:${radius},${latitude},${longitude});
            relation["landuse"="forest"](around:${radius},${latitude},${longitude});
            way["natural"="wood"](around:${radius},${latitude},${longitude});
            relation["natural"="wood"](around:${radius},${latitude},${longitude});`,

        water: `
            way["natural"="water"](around:${radius},${latitude},${longitude});
            relation["natural"="water"](around:${radius},${latitude},${longitude});
            way["waterway"~"^(river|riverbank)$"](around:${radius},${latitude},${longitude});`,

        touristic: `
            node["tourism"~"^(attraction|viewpoint|gallery)$"](around:${radius},${latitude},${longitude});
            node["historic"="memorial"](around:${radius},${latitude},${longitude});
            node["amenity"="artwork"](around:${radius},${latitude},${longitude});`,

        resting: `
            node["amenity"~"^(bench|cafe|fountain|drinking_water|water_point|shelter|toilets)$"](around:${radius},${latitude},${longitude});
            way["amenity"="cafe"](around:${radius},${latitude},${longitude});`,

        medical: `
            node["amenity"~"^(hospital|clinic|first_aid)$"](around:${radius},${latitude},${longitude});
            node["emergency"="yes"](around:${radius},${latitude},${longitude});`
    };
}
